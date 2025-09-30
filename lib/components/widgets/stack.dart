import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';
import '../../utils/type_converters.dart';
import '../../utils/style_parsers/index.dart';


/// Stack组件映射
class StackComponent extends FlutterComponent {
  @override
  String get componentType => 'Stack';
  
  @override
  String get description => 'Flutter Stack组件映射 - 层叠布局';
  
  @override
  Map<String, Type> get supportedProps => {
    'alignment': String,           // 对齐方式
    'textDirection': String,       // 文本方向
    'fit': String,                // 尺寸适应策略
    'clipBehavior': String,        // 裁剪行为
    'id': String,                 // 标识属性
  };
  
  @override
  bool get supportsChildren => true;
  
  @override
  Widget build(VirtualDOM vdom) {
    // 解析Stack属性
    final alignment = GeometryParsers.parseAlignment(vdom.getProp<String>('alignment')) ?? Alignment.topLeft;
    final textDirection = TextParsers.parseTextDirection(vdom.getProp<String>('textDirection'));
    final fit = _parseStackFit(vdom.getProp<String>('fit')) ?? StackFit.loose;
    final clipBehavior = GeometryParsers.parseClipBehavior(vdom.getProp<String>('clipBehavior')) ?? Clip.none;
    final id = vdom.getProp<String>('id');
    
    // 处理子组件
    final List<Widget> children = vdom.getChildrenList()
        .map((childVdom) => ComponentRegistry.instance.buildComponent(childVdom))
        .where((widget) => widget != null)
        .cast<Widget>()
        .toList();
    
    // 构建Stack组件
    return Stack(
      key: id != null ? Key(id) : null,
      alignment: alignment,
      textDirection: textDirection,
      fit: fit,
      clipBehavior: clipBehavior,
      children: children,
    );
  }
  
  /// 解析StackFit枚举值
  StackFit? _parseStackFit(String? value) {
    if (value == null) return null;
    
    switch (value) {
      case 'loose': return StackFit.loose;
      case 'expand': return StackFit.expand;
      case 'passthrough': return StackFit.passthrough;
      default: return null;
    }
  }
}
