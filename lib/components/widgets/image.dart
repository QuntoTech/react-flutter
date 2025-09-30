import 'dart:io';
import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../utils/style_parsers/foundation/primitive_parsers.dart';
import '../../utils/style_parsers/foundation/geometry_parsers.dart';

/// Flutter Image组件映射
/// 
/// 对应React端的Image组件
/// 支持网络图片、本地资源、文件图片等
class ImageComponent extends FlutterComponent {
  @override
  String get componentType => 'Image';

  @override
  String get description => 'Flutter Image组件映射';

  @override
  Map<String, Type> get supportedProps => {
    'src': String,
    'srcType': String,
    'width': num,
    'height': num,
    'fit': String,
    'alignment': String,
    'repeat': String,
    'color': dynamic,
    'colorBlendMode': String,
    'cacheWidth': int,
    'cacheHeight': int,
    'semanticLabel': String,
    'id': String,
  };

  @override
  bool get supportsChildren => false;

  @override
  Widget build(VirtualDOM vdom) {
    final src = vdom.getProp<String>('src');
    
    if (src == null || src.isEmpty) {
      throw FlutterError('Image组件必须设置src属性');
    }

    final srcType = vdom.getProp<String>('srcType') ?? 'network';
    final width = vdom.getProp<num>('width')?.toDouble();
    final height = vdom.getProp<num>('height')?.toDouble();
    final fit = _parseBoxFit(vdom.getProp<String>('fit'));
    final alignment = GeometryParsers.parseAlignment(vdom.getProp<String>('alignment')) ?? Alignment.center;
    final repeat = _parseImageRepeat(vdom.getProp<String>('repeat')) ?? ImageRepeat.noRepeat;
    final color = PrimitiveParsers.parseColor(vdom.getProp('color'));
    final colorBlendMode = _parseBlendMode(vdom.getProp<String>('colorBlendMode'));
    final cacheWidth = vdom.getProp<int>('cacheWidth');
    final cacheHeight = vdom.getProp<int>('cacheHeight');
    final semanticLabel = vdom.getProp<String>('semanticLabel');
    final id = vdom.getProp<String>('id');

    // 根据srcType选择对应的Image构造函数
    // 直接在Image组件上设置key，而不是用KeyedSubtree包裹
    switch (srcType) {
      case 'network':
        return Image.network(
          src,
          key: id != null ? Key(id) : null,
          width: width,
          height: height,
          fit: fit,
          alignment: alignment,
          repeat: repeat,
          color: color,
          colorBlendMode: colorBlendMode,
          cacheWidth: cacheWidth,
          cacheHeight: cacheHeight,
          semanticLabel: semanticLabel,
        );
        
      case 'asset':
        return Image.asset(
          src,
          key: id != null ? Key(id) : null,
          width: width,
          height: height,
          fit: fit,
          alignment: alignment,
          repeat: repeat,
          color: color,
          colorBlendMode: colorBlendMode,
          cacheWidth: cacheWidth,
          cacheHeight: cacheHeight,
          semanticLabel: semanticLabel,
        );
        
      case 'file':
        return Image.file(
          File(src),
          key: id != null ? Key(id) : null,
          width: width,
          height: height,
          fit: fit,
          alignment: alignment,
          repeat: repeat,
          color: color,
          colorBlendMode: colorBlendMode,
          cacheWidth: cacheWidth,
          cacheHeight: cacheHeight,
          semanticLabel: semanticLabel,
        );
        
      default:
        // 默认使用network
        return Image.network(
          src,
          key: id != null ? Key(id) : null,
          width: width,
          height: height,
          fit: fit,
          alignment: alignment,
          repeat: repeat,
          color: color,
          colorBlendMode: colorBlendMode,
          cacheWidth: cacheWidth,
          cacheHeight: cacheHeight,
          semanticLabel: semanticLabel,
        );
    }
  }

  /// 解析BoxFit
  BoxFit? _parseBoxFit(String? value) {
    if (value == null) return null;
    
    switch (value) {
      case 'fill':
        return BoxFit.fill;
      case 'contain':
        return BoxFit.contain;
      case 'cover':
        return BoxFit.cover;
      case 'fitWidth':
        return BoxFit.fitWidth;
      case 'fitHeight':
        return BoxFit.fitHeight;
      case 'none':
        return BoxFit.none;
      case 'scaleDown':
        return BoxFit.scaleDown;
      default:
        return null;
    }
  }

  /// 解析ImageRepeat
  ImageRepeat? _parseImageRepeat(String? value) {
    if (value == null) return null;
    
    switch (value) {
      case 'repeat':
        return ImageRepeat.repeat;
      case 'repeatX':
        return ImageRepeat.repeatX;
      case 'repeatY':
        return ImageRepeat.repeatY;
      case 'noRepeat':
        return ImageRepeat.noRepeat;
      default:
        return null;
    }
  }

  /// 解析BlendMode
  BlendMode? _parseBlendMode(String? value) {
    if (value == null) return null;
    
    switch (value) {
      case 'clear':
        return BlendMode.clear;
      case 'src':
        return BlendMode.src;
      case 'dst':
        return BlendMode.dst;
      case 'srcOver':
        return BlendMode.srcOver;
      case 'dstOver':
        return BlendMode.dstOver;
      case 'srcIn':
        return BlendMode.srcIn;
      case 'dstIn':
        return BlendMode.dstIn;
      case 'srcOut':
        return BlendMode.srcOut;
      case 'dstOut':
        return BlendMode.dstOut;
      case 'srcATop':
        return BlendMode.srcATop;
      case 'dstATop':
        return BlendMode.dstATop;
      case 'xor':
        return BlendMode.xor;
      case 'plus':
        return BlendMode.plus;
      case 'modulate':
        return BlendMode.modulate;
      case 'screen':
        return BlendMode.screen;
      case 'overlay':
        return BlendMode.overlay;
      case 'darken':
        return BlendMode.darken;
      case 'lighten':
        return BlendMode.lighten;
      case 'colorDodge':
        return BlendMode.colorDodge;
      case 'colorBurn':
        return BlendMode.colorBurn;
      case 'hardLight':
        return BlendMode.hardLight;
      case 'softLight':
        return BlendMode.softLight;
      case 'difference':
        return BlendMode.difference;
      case 'exclusion':
        return BlendMode.exclusion;
      case 'multiply':
        return BlendMode.multiply;
      case 'hue':
        return BlendMode.hue;
      case 'saturation':
        return BlendMode.saturation;
      case 'color':
        return BlendMode.color;
      case 'luminosity':
        return BlendMode.luminosity;
      default:
        return null;
    }
  }
}
