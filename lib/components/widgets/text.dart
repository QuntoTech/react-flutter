import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../utils/type_converters.dart';

/// Text组件映射
class TextComponent extends FlutterComponent {
  @override
  String get componentType => 'Text';
  
  @override
  String get description => 'Flutter Text组件映射';
  
  @override
  Map<String, Type> get supportedProps => {
    'text': String,
    'fontSize': double,
    'color': String,
    'fontWeight': String,
    'textAlign': String,
    'maxLines': int,
    'overflow': String,
  };
  
  @override
  bool get supportsChildren => false;
  
  @override
  Widget build(VirtualDOM vdom) {
    // 获取文本内容
    final text = vdom.getProp<String>('text') ?? '空文本';
    
    // 解析样式属性
    final fontSize = vdom.getPropOrDefault<double>('fontSize', 16.0);
    final colorString = vdom.getProp<String>('color');
    final fontWeightString = vdom.getProp<String>('fontWeight');
    final textAlignString = vdom.getProp<String>('textAlign');
    final maxLines = vdom.getProp<int>('maxLines');
    final overflowString = vdom.getProp<String>('overflow');
    
    // 转换属性
    final color = TypeConverters.parseColor(colorString);
    final fontWeight = TypeConverters.parseFontWeight(fontWeightString);
    final textAlign = TypeConverters.parseTextAlign(textAlignString);
    final overflow = TypeConverters.parseTextOverflow(overflowString);
    
    return Text(
      text,
      style: TextStyle(
        fontSize: fontSize,
        color: color,
        fontWeight: fontWeight,
      ),
      textAlign: textAlign,
      maxLines: maxLines,
      overflow: overflow,
    );
  }
}
