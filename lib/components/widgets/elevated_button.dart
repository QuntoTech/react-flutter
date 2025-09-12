import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';

/// ElevatedButton组件映射
class ElevatedButtonComponent extends FlutterComponent {
  
  @override
  String get componentType => 'ElevatedButton';
  
  @override
  String get description => 'Flutter ElevatedButton组件映射';
  
  @override
  Map<String, Type> get supportedProps => {
    'onPressed': String,
    'disabled': bool,
  };
  
  @override
  List<String> get supportedEvents => ['onPressed'];
  
  @override
  bool get supportsChildren => true;
  
  @override
  Widget build(VirtualDOM vdom) {
    // 1. 解析按钮自身的属性
    final onPressedEvent = vdom.getProp<String>('onPressed');
    final disabled = vdom.getPropOrDefault<bool>('disabled', false);
    
    // 处理点击事件
    VoidCallback? onPressed;
    if (!disabled && onPressedEvent != null) {
      onPressed = () => ComponentRegistry.instance.triggerEvent(onPressedEvent);
    }
    
    // 2. 统一、递归地构建所有子元素
    final List<Widget> childrenWidgets = vdom.getChildrenList()
        .map((childVdom) => ComponentRegistry.instance.buildComponent(childVdom))
        .where((widget) => widget != null)
        .cast<Widget>()
        .toList();
    
    // 3. 将构建好的子元素作为 child 传递给按钮
    // 注意：如果子元素多于一个，它们应该已经被一个布局组件（如Row/Column）包裹
    final Widget? child = childrenWidgets.isNotEmpty ? childrenWidgets.first : null;
    
    return ElevatedButton(
      onPressed: onPressed,
      child: child,
    );
  }
}
