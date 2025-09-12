import 'package:flutter/material.dart';
import '../components/base/flutter_component.dart';
import 'virtual_dom_parser.dart';

/// 组件注册中心
/// 管理所有React到Flutter的组件映射
class ComponentRegistry {
  static final ComponentRegistry _instance = ComponentRegistry._internal();
  factory ComponentRegistry() => _instance;
  ComponentRegistry._internal();
  
  static ComponentRegistry get instance => _instance;
  
  final Map<String, FlutterComponent> _components = {};
  Function(String)? _eventCallback;
  
  /// 注册组件
  void register(FlutterComponent component) {
    _components[component.componentType] = component;
    // debugPrint('注册组件: ${component.componentType}');
  }
  
  /// 批量注册组件
  void registerAll(List<FlutterComponent> components) {
    for (final component in components) {
      register(component);
    }
  }
  
  /// 获取组件
  FlutterComponent? getComponent(String type) {
    return _components[type];
  }
  
  /// 构建组件Widget
  Widget? buildComponent(VirtualDOM vdom) {
    final component = _components[vdom.type];
    if (component == null) {
      // debugPrint('未找到组件类型: ${vdom.type}');
      return _buildUnknownComponent(vdom);
    }
    
    try {
      return component.build(vdom);
    } catch (e) {
      // debugPrint('构建组件 ${vdom.type} 失败: $e');
      return _buildErrorComponent(vdom, e);
    }
  }
  
  /// 检查组件是否已注册
  bool isRegistered(String type) {
    return _components.containsKey(type);
  }
  
  /// 获取所有已注册的组件类型
  List<String> getRegisteredTypes() {
    return _components.keys.toList()..sort();
  }
  
  /// 获取组件信息
  Map<String, dynamic> getComponentInfo(String type) {
    final component = _components[type];
    if (component == null) return {};
    
    return {
      'type': component.componentType,
      'description': component.description,
      'supportedProps': component.supportedProps,
      'supportedEvents': component.supportedEvents,
      'supportsChildren': component.supportsChildren,
    };
  }
  
  /// 清除所有注册的组件
  void clear() {
    _components.clear();
  }
  
  /// 设置事件回调
  void setEventCallback(Function(String)? callback) {
    _eventCallback = callback;
  }
  
  /// 触发事件
  void triggerEvent(String eventName) {
    if (_eventCallback != null) {
      _eventCallback!(eventName);
    } else {
      // debugPrint('事件触发但无回调: $eventName');
    }
  }
  
  /// 构建未知组件的占位符
  Widget _buildUnknownComponent(VirtualDOM vdom) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.red, width: 1),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.error, color: Colors.red, size: 16),
          const SizedBox(height: 4),
          Text(
            '未知组件: ${vdom.type}',
            style: const TextStyle(
              fontSize: 12,
              color: Colors.red,
            ),
          ),
        ],
      ),
    );
  }
  
  /// 构建错误组件的占位符
  Widget _buildErrorComponent(VirtualDOM vdom, dynamic error) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.orange, width: 1),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.warning, color: Colors.orange, size: 16),
          const SizedBox(height: 4),
          Text(
            '${vdom.type} 构建失败',
            style: const TextStyle(
              fontSize: 12,
              color: Colors.orange,
            ),
          ),
          Text(
            error.toString(),
            style: const TextStyle(
              fontSize: 10,
              color: Colors.grey,
            ),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }
}
