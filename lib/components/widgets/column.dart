import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';
import '../../utils/type_converters.dart';
import '../../utils/style_parsers/index.dart';

/// Column组件映射
class ColumnComponent extends FlutterComponent {
  @override
  String get componentType => 'Column';
  
  @override
  String get description => 'Flutter Column组件映射';
  
  @override
  Map<String, Type> get supportedProps => {
    'mainAxisAlignment': String,    // 主轴对齐
    'crossAxisAlignment': String,   // 交叉轴对齐
    'mainAxisSize': String,        // 主轴大小
    'textDirection': String,       // 文本方向
    'verticalDirection': String,   // 垂直方向
    'textBaseline': String,        // 文本基线
    'id': String,                  // 标识属性
  };
  
  @override
  bool get supportsChildren => true;
  
  @override
  Widget build(VirtualDOM vdom) {
    // 解析所有Column属性
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
    
    // 解析新增属性
    final textDirection = TextParsers.parseTextDirection(
      vdom.getProp<String>('textDirection')
    );
    final verticalDirection = TextParsers.parseVerticalDirection(
      vdom.getProp<String>('verticalDirection')
    );
    final textBaseline = TextParsers.parseTextBaseline(
      vdom.getProp<String>('textBaseline')
    );
    final id = vdom.getProp<String>('id');
    
    // 构建子组件
    final children = <Widget>[];
    for (final child in vdom.getChildrenList()) {
      final widget = ComponentRegistry.instance.buildComponent(child);
      if (widget != null) {
        children.add(widget);
      }
    }
    
    return Column(
      key: id != null ? Key(id) : null,
      mainAxisAlignment: mainAxisAlignment,
      crossAxisAlignment: crossAxisAlignment,
      mainAxisSize: mainAxisSize,
      textDirection: textDirection,
      verticalDirection: verticalDirection,
      textBaseline: textBaseline,
      children: children,
    );
  }
}
