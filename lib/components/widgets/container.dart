import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';
import '../../utils/type_converters.dart';
import '../../utils/style_parsers.dart';

// 开发模式调试输出控制
const bool _kDebugMode = false;

/// Container组件映射
class ContainerComponent extends FlutterComponent {
  @override
  String get componentType => 'Container';
  
  @override
  String get description => 'Flutter Container组件映射';
  
  @override
  Map<String, Type> get supportedProps => {
    'style': Map,  // 新的统一style属性
    // 保留旧属性以向后兼容
    'padding': dynamic,
    'margin': dynamic,
    'width': double,
    'height': double,
    'color': String,
    'decoration': Map,
    'foregroundDecoration': Map,  // 新增foregroundDecoration属性
    'alignment': String,  // 新增alignment属性
    'constraints': Map,   // 新增constraints属性
    'clipBehavior': String,       // 新增clipBehavior属性
    'transformAlignment': String, // 新增transformAlignment属性
    'transform': List,            // 新增transform属性
    'id': String,         // 通用id属性，用于测试和查找
  };
  
  @override
  bool get supportsChildren => true;
  
  @override
  Widget build(VirtualDOM vdom) {
    // 首先尝试从style属性中解析，如果没有则回退到旧的独立属性
    final styleMap = vdom.props['style'] as Map<String, dynamic>?;
    
    // 解析样式属性（优先从style中获取，否则从独立属性获取）
    final width = _getStyleProperty<double>(styleMap, vdom, 'width');
    final height = _getStyleProperty<double>(styleMap, vdom, 'height');
    
    final padding = StyleParsers.parseEdgeInsets(
      _getStyleProperty(styleMap, vdom, 'padding')
    );
    final margin = StyleParsers.parseEdgeInsets(
      _getStyleProperty(styleMap, vdom, 'margin')
    );
    
    final color = StyleParsers.parseColor(
      _getStyleProperty(styleMap, vdom, 'color')
    );
    
    final alignment = StyleParsers.parseAlignment(
      _getStyleProperty(styleMap, vdom, 'alignment')
    );
    
    final constraints = StyleParsers.parseBoxConstraints(
      _getStyleProperty(styleMap, vdom, 'constraints')
    );
    
    final clipBehavior = StyleParsers.parseClipBehavior(
      _getStyleProperty(styleMap, vdom, 'clipBehavior')
    );
    
    final transformAlignment = StyleParsers.parseAlignment(
      _getStyleProperty(styleMap, vdom, 'transformAlignment')
    );
    
    final transform = StyleParsers.parseTransform(
      _getStyleProperty(styleMap, vdom, 'transform')
    );
    
    // 获取id属性（用于测试和调试）
    final id = vdom.getProp<String>('id');
    
    // 统一、递归地构建所有子元素
    final List<Widget> childrenWidgets = vdom.getChildrenList()
        .map((childVdom) => ComponentRegistry.instance.buildComponent(childVdom))
        .where((widget) => widget != null)
        .cast<Widget>()
        .toList();
    
    // Container通常只有一个子元素
    final Widget? child = childrenWidgets.isNotEmpty ? childrenWidgets.first : null;
    
    // 解析decoration和color（遵循Flutter Container的互斥原则）
    Decoration? decoration;
    Color? containerColor;
    
    final decorationMap = _getStyleProperty<Map<String, dynamic>>(styleMap, vdom, 'decoration');
    
    if (decorationMap != null) {
      // 如果有decoration，使用decoration（可能包含color、border等）
      decoration = StyleParsers.parseDecoration(decorationMap);
    } else if (color != null) {
      // 如果没有decoration但有color，直接使用Container.color
      containerColor = color;
    }
    
    // 解析foregroundDecoration（前景装饰，在子组件之上绘制）
    final foregroundDecorationMap = _getStyleProperty<Map<String, dynamic>>(styleMap, vdom, 'foregroundDecoration');
    Decoration? foregroundDecoration;
    if (foregroundDecorationMap != null) {
      foregroundDecoration = StyleParsers.parseDecoration(foregroundDecorationMap);
    }
    
    // 如果没有child但有width/height，添加一个空的SizedBox确保Container有尺寸
    Widget? finalChild = child;
    if (child == null && (width != null || height != null)) {
      finalChild = const SizedBox.expand();
    }
    
    return Container(
      key: id != null ? Key(id) : null,  // 使用id作为key
      width: width,
      height: height,
      padding: padding,
      margin: margin,
      color: containerColor,
      decoration: decoration,
      foregroundDecoration: foregroundDecoration,  // 新增前景装饰
      alignment: alignment,
      constraints: constraints,
      clipBehavior: clipBehavior,  // 新增裁剪行为
      transformAlignment: transformAlignment,  // 新增变换中心点
      transform: transform,  // 新增Matrix4变换
      child: finalChild,
    );
  }
  
  /// 获取样式属性的辅助方法
  /// 优先从style对象中获取，否则从独立属性中获取
  T? _getStyleProperty<T>(Map<String, dynamic>? styleMap, VirtualDOM vdom, String propertyName) {
    // 首先尝试从style对象中获取
    if (styleMap != null && styleMap.containsKey(propertyName)) {
      final value = styleMap[propertyName];
      if (value is T) return value;
      // 尝试类型转换
      if (T == double && value is num) return value.toDouble() as T;
      if (T == int && value is num) return value.toInt() as T;
      return value as T?;
    }
    
    // 回退到独立属性
    return vdom.getProp<T>(propertyName);
  }
  
}
