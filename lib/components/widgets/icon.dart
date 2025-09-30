import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../utils/style_parsers/components/text_parsers.dart';
import '../../utils/style_parsers/foundation/primitive_parsers.dart';

/// Flutter Icon组件映射
/// 
/// 对应React端的Icon命名空间组件
/// 支持Material Design所有图标
class IconComponent extends FlutterComponent {
  @override
  String get componentType => 'Icon';

  @override
  String get description => 'Flutter Icon组件映射';

  @override
  Map<String, Type> get supportedProps => {
    'icon': Map, // IconData对象 {codePoint, fontFamily, fontPackage, matchTextDirection}
    'size': num,
    'color': dynamic, // Color对象或字符串
    'semanticLabel': String,
    'textDirection': String,
    'id': String,
  };

  @override
  bool get supportsChildren => false;

  @override
  Widget build(VirtualDOM vdom) {
    final iconMap = vdom.getProp<Map<String, dynamic>>('icon');
    
    if (iconMap == null) {
      throw FlutterError('Icon组件必须设置icon属性');
    }

    // 解析IconData
    final codePoint = iconMap['codePoint'];
    if (codePoint == null) {
      throw FlutterError('IconData必须包含codePoint属性');
    }

    final iconData = IconData(
      codePoint is int ? codePoint : int.parse(codePoint.toString()),
      fontFamily: iconMap['fontFamily'] as String? ?? 'MaterialIcons',
      fontPackage: iconMap['fontPackage'] as String?,
      matchTextDirection: iconMap['matchTextDirection'] as bool? ?? false,
    );

    // 解析其他属性
    final size = vdom.getProp<num>('size')?.toDouble();
    final color = PrimitiveParsers.parseColor(vdom.getProp('color'));
    final semanticLabel = vdom.getProp<String>('semanticLabel');
    final textDirection = TextParsers.parseTextDirection(
      vdom.getProp<String>('textDirection')
    );
    final id = vdom.getProp<String>('id');

    return Icon(
      iconData,
      key: id != null ? Key(id) : null,
      size: size,
      color: color,
      semanticLabel: semanticLabel,
      textDirection: textDirection,
    );
  }
}
