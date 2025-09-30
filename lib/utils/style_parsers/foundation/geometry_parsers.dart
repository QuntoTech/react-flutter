import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/rendering.dart';
import 'primitive_parsers.dart';

/// 几何类型解析器
/// 处理几何、变换、约束等相关解析
class GeometryParsers {
  /// 解析Alignment对齐方式
  static Alignment? parseAlignment(dynamic value) {
    if (value == null) return null;
    
    if (value is String) {
      // 严格按照Flutter API标准的camelCase格式
      switch (value) {
        case 'topLeft': return Alignment.topLeft;
        case 'topCenter': return Alignment.topCenter;
        case 'topRight': return Alignment.topRight;
        case 'centerLeft': return Alignment.centerLeft;
        case 'center': return Alignment.center;
        case 'centerRight': return Alignment.centerRight;
        case 'bottomLeft': return Alignment.bottomLeft;
        case 'bottomCenter': return Alignment.bottomCenter;
        case 'bottomRight': return Alignment.bottomRight;
        default: return null;
      }
    }
    
    if (value is Map<String, dynamic>) {
      final double x = value['x']?.toDouble() ?? 0.0;
      final double y = value['y']?.toDouble() ?? 0.0;
      return Alignment(x, y);
    }
    
    return null;
  }

  /// 解析BoxConstraints约束
  static BoxConstraints? parseBoxConstraints(dynamic value) {
    if (value == null) return null;
    
    if (value is Map<String, dynamic>) {
      final double minWidth = value['minWidth']?.toDouble() ?? 0.0;
      final double maxWidth = value['maxWidth']?.toDouble() ?? double.infinity;
      final double minHeight = value['minHeight']?.toDouble() ?? 0.0;
      final double maxHeight = value['maxHeight']?.toDouble() ?? double.infinity;
      
      return BoxConstraints(
        minWidth: minWidth,
        maxWidth: maxWidth,
        minHeight: minHeight,
        maxHeight: maxHeight,
      );
    }
    
    return null;
  }

  /// 解析Clip裁剪行为
  static Clip parseClipBehavior(dynamic value) {
    if (value == null) return Clip.none;
    
    switch (value.toString()) {
      case 'none': return Clip.none;
      case 'hardEdge': return Clip.hardEdge;
      case 'antiAlias': return Clip.antiAlias;
      case 'antiAliasWithSaveLayer': return Clip.antiAliasWithSaveLayer;
      default: return Clip.none;
    }
  }

  /// 解析Matrix4变换矩阵
  static Matrix4? parseTransform(dynamic value) {
    if (value == null) return null;
    
    // 支持直接的Matrix4数组格式（16个元素）
    if (value is List && value.length == 16) {
      final List<double> matrixData = [];
      for (int i = 0; i < 16; i++) {
        final element = value[i];
        if (element is num) {
          matrixData.add(element.toDouble());
        } else {
          return null; // 无效数据
        }
      }
      return Matrix4.fromList(matrixData);
    }
    
    if (value is Map<String, dynamic>) {
      Matrix4 matrix = Matrix4.identity();
      
      // 平移
      if (value['translate'] != null) {
        final translate = value['translate'];
        if (translate is List && translate.length >= 2) {
          matrix.translate(
            translate[0]?.toDouble() ?? 0.0,
            translate[1]?.toDouble() ?? 0.0,
            translate.length > 2 ? translate[2]?.toDouble() ?? 0.0 : 0.0,
          );
        }
      }
      
      // 缩放
      if (value['scale'] != null) {
        final scale = value['scale'];
        if (scale is num) {
          matrix.scale(scale.toDouble());
        } else if (scale is List && scale.length >= 2) {
          matrix.scale(
            scale[0]?.toDouble() ?? 1.0,
            scale[1]?.toDouble() ?? 1.0,
            scale.length > 2 ? scale[2]?.toDouble() ?? 1.0 : 1.0,
          );
        }
      }
      
      // 旋转
      if (value['rotate'] != null) {
        final rotate = value['rotate']?.toDouble() ?? 0.0;
        matrix.rotateZ(rotate);
      }
      
      return matrix;
    }
    
    return null;
  }

  /// 解析BoxShape形状
  static BoxShape parseBoxShape(dynamic value) {
    if (value == null) return BoxShape.rectangle;
    
    switch (value.toString().toLowerCase()) {
      case 'rectangle': return BoxShape.rectangle;
      case 'circle': return BoxShape.circle;
      default: return BoxShape.rectangle;
    }
  }

  /// 解析DecorationImage装饰图片
  static DecorationImage? parseDecorationImage(dynamic value) {
    if (value == null) return null;
    
    if (value is Map<String, dynamic>) {
      final String? image = value['image'] as String?;
      if (image == null) return null;
      
      final BoxFit fit = parseBoxFit(value['fit']);
      final Alignment alignment = parseAlignment(value['alignment']) ?? Alignment.center;
      final ImageRepeat repeat = parseImageRepeat(value['repeat']);
      
      // 这里简化处理，实际需要根据image类型创建相应的ImageProvider
      return DecorationImage(
        image: NetworkImage(image), // 简化处理
        fit: fit,
        alignment: alignment,
        repeat: repeat,
      );
    }
    
    return null;
  }

  /// 解析BoxFit图片适配方式
  static BoxFit parseBoxFit(dynamic value) {
    if (value == null) return BoxFit.cover;
    
    switch (value.toString()) {
      case 'fill': return BoxFit.fill;
      case 'contain': return BoxFit.contain;
      case 'cover': return BoxFit.cover;
      case 'fitWidth': return BoxFit.fitWidth;
      case 'fitHeight': return BoxFit.fitHeight;
      case 'none': return BoxFit.none;
      case 'scaleDown': return BoxFit.scaleDown;
      default: return BoxFit.cover;
    }
  }

  /// 解析ImageRepeat图片重复方式
  static ImageRepeat parseImageRepeat(dynamic value) {
    if (value == null) return ImageRepeat.noRepeat;
    
    switch (value.toString()) {
      case 'repeat': return ImageRepeat.repeat;
      case 'repeatX': return ImageRepeat.repeatX;
      case 'repeatY': return ImageRepeat.repeatY;
      case 'noRepeat': return ImageRepeat.noRepeat;
      default: return ImageRepeat.noRepeat;
    }
  }

  /// 解析完整的BoxDecoration装饰
  static BoxDecoration parseDecoration(Map<String, dynamic> decorationMap) {
    return BoxDecoration(
      color: PrimitiveParsers.parseColor(decorationMap['color']),
      image: parseDecorationImage(decorationMap['image']),
      border: PrimitiveParsers.parseBorder(decorationMap['border']),
      borderRadius: PrimitiveParsers.parseBorderRadius(decorationMap['borderRadius']),
      boxShadow: PrimitiveParsers.parseBoxShadow(decorationMap['boxShadow']),
      gradient: GradientParsers.parseGradient(decorationMap['gradient']),
      shape: parseBoxShape(decorationMap['shape']),
    );
  }
}

/// 渐变解析器（单独分离出来，因为比较复杂）
class GradientParsers {
  static const double _twoPi = 2 * 3.141592653589793;

  /// 解析Gradient渐变
  static Gradient? parseGradient(dynamic value) {
    if (value == null) return null;
    
    if (value is Map<String, dynamic>) {
      final String type = value['type']?.toString().toLowerCase() ?? 'linear';
      
      switch (type) {
        case 'linear':
          return parseLinearGradient(value);
        case 'radial':
          return parseRadialGradient(value);
        case 'sweep':
          return parseSweepGradient(value);
        default:
          return parseLinearGradient(value);
      }
    }
    
    return null;
  }

  /// 解析LinearGradient线性渐变
  static LinearGradient parseLinearGradient(Map<String, dynamic> gradientMap) {
    final colors = parseGradientColors(gradientMap['colors']);
    if (colors.isEmpty) {
      throw ArgumentError('LinearGradient colors cannot be empty');
    }
    
    final begin = GeometryParsers.parseAlignment(gradientMap['begin']) ?? Alignment.centerLeft;
    final end = GeometryParsers.parseAlignment(gradientMap['end']) ?? Alignment.centerRight;
    final stops = parseGradientStops(gradientMap['stops']);
    final tileMode = parseTileMode(gradientMap['tileMode']);
    
    return LinearGradient(
      begin: begin,
      end: end,
      colors: colors,
      stops: stops,
      tileMode: tileMode,
    );
  }

  /// 解析RadialGradient径向渐变
  static RadialGradient parseRadialGradient(Map<String, dynamic> gradientMap) {
    final colors = parseGradientColors(gradientMap['colors']);
    if (colors.isEmpty) {
      throw ArgumentError('RadialGradient colors cannot be empty');
    }
    
    final center = GeometryParsers.parseAlignment(gradientMap['center']) ?? Alignment.center;
    final radius = _parseNumber(gradientMap['radius'], 0.5);
    final stops = parseGradientStops(gradientMap['stops']);
    final tileMode = parseTileMode(gradientMap['tileMode']);
    final focal = GeometryParsers.parseAlignment(gradientMap['focal']);
    final focalRadius = _parseNumber(gradientMap['focalRadius'], 0.0);
    
    return RadialGradient(
      center: center,
      radius: radius,
      colors: colors,
      stops: stops,
      tileMode: tileMode,
      focal: focal,
      focalRadius: focalRadius,
    );
  }

  /// 解析SweepGradient扫描渐变
  static SweepGradient parseSweepGradient(Map<String, dynamic> gradientMap) {
    final colors = parseGradientColors(gradientMap['colors']);
    if (colors.isEmpty) {
      throw ArgumentError('SweepGradient colors cannot be empty');
    }
    
    final center = GeometryParsers.parseAlignment(gradientMap['center']) ?? Alignment.center;
    final startAngle = _parseNumber(gradientMap['startAngle'], 0.0);
    final endAngle = _parseNumber(gradientMap['endAngle'], _twoPi);
    final stops = parseGradientStops(gradientMap['stops']);
    final tileMode = parseTileMode(gradientMap['tileMode']);
    
    return SweepGradient(
      center: center,
      startAngle: startAngle,
      endAngle: endAngle,
      colors: colors,
      stops: stops,
      tileMode: tileMode,
    );
  }

  /// 解析渐变颜色列表
  static List<Color> parseGradientColors(dynamic value) {
    if (value == null) return [];
    
    if (value is List) {
      final List<Color> colors = [];
      for (final colorData in value) {
        final Color? color = PrimitiveParsers.parseColor(colorData);
        if (color != null) {
          colors.add(color);
        }
      }
      return colors;
    }
    
    return [];
  }

  /// 解析渐变停止位置
  static List<double>? parseGradientStops(dynamic value) {
    if (value == null) return null;
    
    if (value is List) {
      final List<double> stops = [];
      for (final stopData in value) {
        if (stopData is num) {
          stops.add(stopData.toDouble());
        }
      }
      return stops.isNotEmpty ? stops : null;
    }
    
    return null;
  }

  /// 解析TileMode平铺模式
  static TileMode parseTileMode(dynamic value) {
    if (value == null) return TileMode.clamp;
    
    switch (value.toString().toLowerCase()) {
      case 'clamp': return TileMode.clamp;
      case 'repeated': return TileMode.repeated;
      case 'mirror': return TileMode.mirror;
      default: return TileMode.clamp;
    }
  }

  /// 解析数值 - 委托给PrimitiveParsers
  static double _parseNumber(dynamic value, double defaultValue) {
    return PrimitiveParsers.parseNumber(value, defaultValue);
  }

  /// 解析HitTestBehavior命中测试行为
  static HitTestBehavior? parseHitTestBehavior(String? value) {
    if (value == null) return null;
    switch (value) {
      case 'deferToChild':
        return HitTestBehavior.deferToChild;
      case 'opaque':
        return HitTestBehavior.opaque;
      case 'translucent':
        return HitTestBehavior.translucent;
      default:
        return null;
    }
  }

  /// 解析DragStartBehavior拖拽开始行为
  static DragStartBehavior? parseDragStartBehavior(String? value) {
    if (value == null) return null;
    switch (value) {
      case 'down':
        return DragStartBehavior.down;
      case 'start':
        return DragStartBehavior.start;
      default:
        return null;
    }
  }
}
