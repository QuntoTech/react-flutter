import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';
import '../../utils/type_converters.dart';

/// Column组件映射
class ColumnComponent extends FlutterComponent {
  @override
  String get componentType => 'Column';
  
  @override
  String get description => 'Flutter Column组件映射';
  
  @override
  Map<String, Type> get supportedProps => {
    'mainAxisAlignment': String,
    'crossAxisAlignment': String,
    'mainAxisSize': String,
  };
  
  @override
  bool get supportsChildren => true;
  
  @override
  Widget build(VirtualDOM vdom) {
    // 解析对齐属性
    final mainAxisAlignment = TypeConverters.parseMainAxisAlignment(
      vdom.getProp<String>('mainAxisAlignment')
    );
    final crossAxisAlignment = TypeConverters.parseCrossAxisAlignment(
      vdom.getProp<String>('crossAxisAlignment')
    );
    
    // 解析主轴大小
    MainAxisSize mainAxisSize = MainAxisSize.max;
    final mainAxisSizeString = vdom.getProp<String>('mainAxisSize');
    if (mainAxisSizeString == 'min') {
      mainAxisSize = MainAxisSize.min;
    }
    
    // 构建子组件
    final children = <Widget>[];
    for (final child in vdom.getChildrenList()) {
      final widget = ComponentRegistry.instance.buildComponent(child);
      if (widget != null) {
        children.add(widget);
      }
    }
    
    return Column(
      mainAxisAlignment: mainAxisAlignment,
      crossAxisAlignment: crossAxisAlignment,
      mainAxisSize: mainAxisSize,
      children: children,
    );
  }
}
