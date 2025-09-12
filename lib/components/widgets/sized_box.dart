import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';

/// SizedBox组件映射
class SizedBoxComponent extends FlutterComponent {
  @override
  String get componentType => 'SizedBox';
  
  @override
  String get description => 'Flutter SizedBox组件映射';
  
  @override
  Map<String, Type> get supportedProps => {
    'width': double,
    'height': double,
  };
  
  @override
  bool get supportsChildren => true;
  
  @override
  Widget build(VirtualDOM vdom) {
    final width = vdom.getProp<double>('width');
    final height = vdom.getProp<double>('height');
    
    // 统一、递归地构建所有子元素
    final List<Widget> childrenWidgets = vdom.getChildrenList()
        .map((childVdom) => ComponentRegistry.instance.buildComponent(childVdom))
        .where((widget) => widget != null)
        .cast<Widget>()
        .toList();
    
    // SizedBox通常只有一个子元素
    // 如果子元素多于一个，它们应该已经被一个布局组件（如Row/Column）包裹
    final Widget? child = childrenWidgets.isNotEmpty ? childrenWidgets.first : null;
    
    return SizedBox(
      width: width,
      height: height,
      child: child,
    );
  }
}
