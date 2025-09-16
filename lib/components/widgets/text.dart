import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../utils/type_converters.dart';
import '../../utils/style_parsers/index.dart';

/// Text组件映射
class TextComponent extends FlutterComponent {
  @override
  String get componentType => 'Text';
  
  @override
  String get description => 'Flutter Text组件映射';
  
  @override
  Map<String, Type> get supportedProps => {
    'text': String,                  // 文本内容
    'style': Map,                    // 统一style属性，包含所有视觉样式
    'textAlign': String,             // 文本对齐 - 独立属性
    'textDirection': String,         // 文本方向 - 独立属性
    'maxLines': int,                 // 最大行数 - 独立属性
    'overflow': String,              // 溢出处理 - 独立属性
    'softWrap': bool,                // 软换行 - 独立属性
    'textScaleFactor': double,       // 文本缩放 - 独立属性
    'semanticsLabel': String,        // 语义标签 - 独立属性
    'locale': String,                // 本地化 - 独立属性
    'id': String,                    // 标识属性
  };
  
  @override
  bool get supportsChildren => false;
  
  @override
  Widget build(VirtualDOM vdom) {
    // 获取文本内容
    final text = vdom.getProp<String>('text') ?? '空文本';
    
    // 解析style属性（视觉样式）
    final styleMap = vdom.props['style'] as Map<String, dynamic>?;
    final textStyle = TextParsers.parseTextStyle(styleMap);
    
    // 解析独立属性（行为、布局）
    final textAlign = TypeConverters.parseTextAlign(vdom.getProp<String>('textAlign'));
    final textDirection = TextParsers.parseTextDirection(vdom.getProp<String>('textDirection'));
    final maxLines = vdom.getProp<int>('maxLines');
    final overflow = TypeConverters.parseTextOverflow(vdom.getProp<String>('overflow'));
    final softWrap = vdom.getProp<bool>('softWrap');
    final textScaleFactor = vdom.getProp<double>('textScaleFactor');
    final semanticsLabel = vdom.getProp<String>('semanticsLabel');
    final localeString = vdom.getProp<String>('locale');
    final id = vdom.getProp<String>('id');
    
    // 解析locale
    Locale? locale;
    if (localeString != null) {
      final parts = localeString.split('_');
      locale = parts.length == 2 ? Locale(parts[0], parts[1]) : Locale(parts[0]);
    }
    
    return Text(
      text,
      key: id != null ? Key(id) : null,
      style: textStyle,
      textAlign: textAlign,
      textDirection: textDirection,
      maxLines: maxLines,
      overflow: overflow,
      softWrap: softWrap,
      textScaleFactor: textScaleFactor,
      semanticsLabel: semanticsLabel,
      locale: locale,
    );
  }
}
