import 'package:flutter/material.dart';
import 'virtual_dom_parser.dart';
import 'component_registry.dart';

/// Widget信息存储结构
class _WidgetInfo {
  final String id;
  final String type;
  Map<String, dynamic> props;
  final List<String> children;
  Widget? widget;
  
  _WidgetInfo({
    required this.id,
    required this.type,
    required this.props,
    required this.children,
    this.widget,
  });
}

/// Widget管理器 - 统一管理Widget实例和层级关系
class WidgetManager {
  static final WidgetManager _instance = WidgetManager._internal();
  factory WidgetManager() => _instance;
  WidgetManager._internal();
  
  static WidgetManager get instance => _instance;
  
  // 统一的Widget信息存储
  final Map<String, _WidgetInfo> _widgets = {};
  
  /// 清空所有Widget信息
  void clear() {
    _widgets.clear();
  }
  
  /// 应用指令（统一处理初次渲染和增量更新）
  Widget? applyInstructions(List<dynamic> instructions) {
    
    bool hasChanges = false;
    
    // 统一处理所有指令
    for (final instruction in instructions) {
      if (instruction is List && instruction.isNotEmpty) {
        final command = instruction[0] as String;
        
        switch (command) {
          case 'createWidget':
            if (instruction.length >= 4) {
              _handleCreateWidget(
                instruction[1] as String,  // id
                instruction[2] as String,  // type
                instruction[3] as Map<String, dynamic>,  // props
              );
              hasChanges = true;
            }
            break;
            
          case 'appendChild':
            if (instruction.length >= 5) {
              _handleAppendChild(
                instruction[1] as String,  // parentId
                instruction[2] as String,  // childId
                instruction[3] as String,  // childType
                instruction[4] as Map<String, dynamic>,  // childProps
              );
              hasChanges = true;
            }
            break;
            
          case 'updateWidget':
            if (instruction.length >= 3) {
              _handleUpdateWidget(
                instruction[1] as String,  // id
                instruction[2] as Map<String, dynamic>,  // newProps
              );
              hasChanges = true;
            }
            break;
        }
      }
    }
    
    // 如果有变化，重新构建并返回根Widget
    if (hasChanges) {
      _buildAllWidgets();
      return _getRootWidget();
    }
    
    return null;
  }
  
  /// 获取初始Widget（用于首次渲染）
  Widget? getInitialWidget() {
    return _getRootWidget();
  }
  
  /// 处理创建Widget指令
  void _handleCreateWidget(String id, String type, Map<String, dynamic> props) {
    _widgets[id] = _WidgetInfo(
      id: id,
      type: type,
      props: Map.from(props)..['id'] = id,
      children: [],
    );
  }
  
  /// 处理appendChild指令
  void _handleAppendChild(String parentId, String childId, String childType, Map<String, dynamic> childProps) {
    // 确保子Widget存在
    if (!_widgets.containsKey(childId)) {
      _handleCreateWidget(childId, childType, childProps);
    }
    
    // 确保父Widget存在
    if (!_widgets.containsKey(parentId)) {
      debugPrint('⚠️ 父Widget不存在: $parentId');
      return;
    }
    
    // 建立父子关系
    final parent = _widgets[parentId]!;
    if (!parent.children.contains(childId)) {
      parent.children.add(childId);
    }
  }
  
  /// 处理更新Widget指令
  void _handleUpdateWidget(String id, Map<String, dynamic> newProps) {
    final widgetInfo = _widgets[id];
    if (widgetInfo == null) {
      debugPrint('⚠️ 未找到Widget: $id');
      return;
    }
    
    
    // 更新props
    widgetInfo.props = Map.from(newProps)..['id'] = id;
    widgetInfo.widget = null; // 标记需要重新构建
    
    // 标记包含此Widget的父级Widget也需要重建
    _markParentsForRebuild(id);
  }
  
  /// 标记父级Widget需要重建（递归到根Widget）
  void _markParentsForRebuild(String childId) {
    for (final parent in _widgets.values) {
      if (parent.children.contains(childId)) {
        if (parent.widget != null) {
          parent.widget = null; // 标记父级需要重建
          // 递归标记父级的父级，确保根Widget也被重建
          _markParentsForRebuild(parent.id);
        }
      }
    }
  }
  
  /// 构建所有需要重建的Widget实例
  void _buildAllWidgets() {
    // 只构建标记为需要重建的Widget（widget == null）
    final needRebuild = _widgets.values.where((w) => w.widget == null).toList();
    
    for (final widgetInfo in needRebuild) {
      _buildWidget(widgetInfo.id);
    }
  }
  
  /// 构建单个Widget
  void _buildWidget(String id) {
    final widgetInfo = _widgets[id];
    if (widgetInfo == null) return;
    
    // 构建子组件的VirtualDOM
    final childrenVdoms = <Map<String, dynamic>>[];
    for (final childId in widgetInfo.children) {
      final childInfo = _widgets[childId];
      if (childInfo != null) {
        // 递归构建子Widget
        _buildWidget(childId);
        
        // 构建子组件的VirtualDOM
        childrenVdoms.add({
          'type': childInfo.type,
          'props': childInfo.props,
          'children': _buildChildrenVdoms(childId),
        });
      }
    }
    
    // 创建VirtualDOM
    final vdom = VirtualDOM(
      type: widgetInfo.type,
      props: widgetInfo.props,
      children: childrenVdoms,
    );
    
    // 构建Widget
    widgetInfo.widget = ComponentRegistry.instance.buildComponent(vdom);
  }
  
  /// 递归构建子组件的VirtualDOM
  List<Map<String, dynamic>> _buildChildrenVdoms(String parentId) {
    final parent = _widgets[parentId];
    if (parent == null) return [];
    
    final childrenVdoms = <Map<String, dynamic>>[];
    for (final childId in parent.children) {
      final child = _widgets[childId];
      if (child != null) {
        childrenVdoms.add({
          'type': child.type,
          'props': child.props,
          'children': _buildChildrenVdoms(childId),
        });
      }
    }
    return childrenVdoms;
  }
  
  /// 获取根Widget
  Widget? _getRootWidget() {
    // 找到没有被任何Widget包含的根Widget
    final allChildren = <String>{};
    for (final widget in _widgets.values) {
      allChildren.addAll(widget.children);
    }
    
    final rootIds = _widgets.keys.where((id) => !allChildren.contains(id)).toList();
    
    // 优先返回非系统容器的根Widget
    for (final rootId in rootIds) {
      if (rootId != '__root__' && _widgets.containsKey(rootId)) {
        final widgetInfo = _widgets[rootId]!;
        if (widgetInfo.widget != null) {
          return widgetInfo.widget;
        }
      }
    }
    
    // 如果没找到，返回第一个根Widget
    if (rootIds.isNotEmpty) {
      final widgetInfo = _widgets[rootIds.first]!;
      if (widgetInfo.widget != null) {
        return widgetInfo.widget;
      }
    }
    
    debugPrint('❌ 未找到根Widget');
    return null;
  }
}