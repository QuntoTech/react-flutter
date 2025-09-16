import 'package:flutter/material.dart';

/// 样式解析工具类
/// 为所有组件提供通用的样式解析功能
class StyleParsers {
  
  /// 解析EdgeInsets值
  /// React端已统一转换格式，Flutter端直接解析
  static EdgeInsets? parseEdgeInsets(dynamic value) {
    if (value == null) return null;
    
    // React端已转换为标准格式：{top, right, bottom, left}
    if (value is Map<String, dynamic>) {
      final top = _parseNumber(value['top'], 0.0);
      final right = _parseNumber(value['right'], 0.0);
      final bottom = _parseNumber(value['bottom'], 0.0);
      final left = _parseNumber(value['left'], 0.0);
      
      return EdgeInsets.fromLTRB(left, top, right, bottom);
    }
    
    return null;
  }
  
  /// 解析Color值
  /// React端已统一转换格式，Flutter端直接解析
  static Color? parseColor(dynamic value) {
    if (value == null) return null;
    
    // React端已转换为标准格式：{value: int}
    if (value is Map<String, dynamic> && value.containsKey('value')) {
      final colorValue = value['value'];
      if (colorValue is int) {
        return Color(colorValue);
      }
    }
    
    return null;
  }
  
  /// 解析BorderRadius值
  /// React端已统一转换格式，Flutter端直接解析
  static BorderRadius? parseBorderRadius(dynamic value) {
    if (value == null) return null;
    
    // React端已转换为标准格式：{topLeft, topRight, bottomRight, bottomLeft}
    if (value is Map<String, dynamic>) {
      final topLeft = _parseNumber(value['topLeft'], 0.0);
      final topRight = _parseNumber(value['topRight'], 0.0);
      final bottomRight = _parseNumber(value['bottomRight'], 0.0);
      final bottomLeft = _parseNumber(value['bottomLeft'], 0.0);
      
      return BorderRadius.only(
        topLeft: Radius.circular(topLeft),
        topRight: Radius.circular(topRight),
        bottomRight: Radius.circular(bottomRight),
        bottomLeft: Radius.circular(bottomLeft),
      );
    }
    
    return null;
  }
  
  /// 解析Border值
  /// 支持完整Border对象格式和简化格式（向后兼容）
  static Border? parseBorder(dynamic value) {
    if (value == null) return null;
    
    // 完整Border对象格式：{top: {color, width, style}, right: {...}, ...}
    if (value is Map<String, dynamic> && value.containsKey('top')) {
      final topSide = parseBorderSide(value['top']);
      final rightSide = parseBorderSide(value['right']);
      final bottomSide = parseBorderSide(value['bottom']);
      final leftSide = parseBorderSide(value['left']);
      
      return Border(
        top: topSide ?? BorderSide.none,
        right: rightSide ?? BorderSide.none,
        bottom: bottomSide ?? BorderSide.none,
        left: leftSide ?? BorderSide.none,
      );
    }
    
    // 简化格式（向后兼容）：{width: 1, color: 'red'}
    if (value is Map<String, dynamic> && value.containsKey('width')) {
      final borderColor = parseColor(value['color']) ?? Colors.black;
      final borderWidth = _parseNumber(value['width'], 1.0);
      return Border.all(color: borderColor, width: borderWidth);
    }
    
    return null;
  }
  
  /// 解析单个BorderSide
  static BorderSide? parseBorderSide(dynamic value) {
    if (value == null) return null;
    
    if (value is Map<String, dynamic>) {
      final color = parseColor(value['color']) ?? Colors.black;
      final width = _parseNumber(value['width'], 1.0);
      final style = value['style'] ?? 'solid';
      
      if (style == 'none' || width == 0) {
        return BorderSide.none;
      }
      
      return BorderSide(
        color: color,
        width: width,
        style: style == 'solid' ? BorderStyle.solid : BorderStyle.none,
      );
    }
    
    return null;
  }
  
  /// 解析BoxShadow数组
  /// React端已统一转换格式，Flutter端直接解析
  static List<BoxShadow>? parseBoxShadow(dynamic value) {
    if (value == null) return null;
    
    if (value is List) {
      final shadows = <BoxShadow>[];
      for (final shadowData in value) {
        final shadow = parseSingleBoxShadow(shadowData);
        if (shadow != null) {
          shadows.add(shadow);
        }
      }
      return shadows.isNotEmpty ? shadows : null;
    }
    
    return null;
  }
  
  /// 解析单个BoxShadow
  /// 完全对齐Flutter BoxShadow API
  static BoxShadow? parseSingleBoxShadow(dynamic value) {
    if (value is! Map<String, dynamic>) return null;
    
    // 解析颜色 (默认: Colors.black)
    final color = parseColor(value['color']) ?? Colors.black;
    
    // 解析模糊半径 (默认: 0.0)
    final blurRadius = _parseNumber(value['blurRadius'], 0.0);
    
    // 解析扩散半径 (默认: 0.0)
    final spreadRadius = _parseNumber(value['spreadRadius'], 0.0);
    
    // 解析偏移 (默认: Offset.zero)
    Offset offset = Offset.zero;
    if (value['offset'] is Map<String, dynamic>) {
      final offsetMap = value['offset'] as Map<String, dynamic>;
      final dx = _parseNumber(offsetMap['dx'], 0.0);
      final dy = _parseNumber(offsetMap['dy'], 0.0);
      offset = Offset(dx, dy);
    }
    
    // 解析模糊样式 (默认: BlurStyle.normal)
    final blurStyle = parseBlurStyle(value['blurStyle']);
    
    return BoxShadow(
      color: color,
      offset: offset,
      blurRadius: blurRadius,
      spreadRadius: spreadRadius,
      blurStyle: blurStyle,
    );
  }
  
  /// 解析BlurStyle枚举
  /// 完全对齐Flutter BlurStyle API
  static BlurStyle parseBlurStyle(dynamic value) {
    if (value is! String) return BlurStyle.normal;
    
    switch (value) {
      case 'solid':
        return BlurStyle.solid;
      case 'outer':
        return BlurStyle.outer;
      case 'inner':
        return BlurStyle.inner;
      case 'normal':
      default:
        return BlurStyle.normal;
    }
  }
  
  /// 解析Gradient渐变
  /// 完全对齐Flutter Gradient API
  static Gradient? parseGradient(dynamic value) {
    if (value is! Map<String, dynamic>) return null;
    
    final type = value['type'] is String ? value['type'] : null;
    switch (type) {
      case 'linear':
        return parseLinearGradient(value);
      case 'radial':
        return parseRadialGradient(value);
      case 'sweep':
        return parseSweepGradient(value);
      default:
        return null;
    }
  }
  
  /// 解析LinearGradient线性渐变
  /// 完全对齐Flutter LinearGradient API
  static LinearGradient parseLinearGradient(Map<String, dynamic> gradientMap) {
    // 解析颜色列表 (必需)
    final colors = parseGradientColors(gradientMap['colors']);
    if (colors.isEmpty) {
      throw ArgumentError('LinearGradient colors cannot be empty');
    }
    
    // 解析开始位置 (默认: Alignment.centerLeft)
    final begin = parseAlignment(gradientMap['begin']) ?? Alignment.centerLeft;
    
    // 解析结束位置 (默认: Alignment.centerRight)
    final end = parseAlignment(gradientMap['end']) ?? Alignment.centerRight;
    
    // 解析颜色停止位置 (可选)
    final stops = parseGradientStops(gradientMap['stops']);
    
    // 解析平铺模式 (默认: TileMode.clamp)
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
  /// 完全对齐Flutter RadialGradient API
  static RadialGradient parseRadialGradient(Map<String, dynamic> gradientMap) {
    // 解析颜色列表 (必需)
    final colors = parseGradientColors(gradientMap['colors']);
    if (colors.isEmpty) {
      throw ArgumentError('RadialGradient colors cannot be empty');
    }
    
    // 解析中心位置 (默认: Alignment.center)
    final center = parseAlignment(gradientMap['center']) ?? Alignment.center;
    
    // 解析半径 (默认: 0.5)
    final radius = _parseNumber(gradientMap['radius'], 0.5);
    
    // 解析颜色停止位置 (可选)
    final stops = parseGradientStops(gradientMap['stops']);
    
    // 解析平铺模式 (默认: TileMode.clamp)
    final tileMode = parseTileMode(gradientMap['tileMode']);
    
    // 解析焦点位置 (可选)
    final focal = parseAlignment(gradientMap['focal']);
    
    // 解析焦点半径 (默认: 0.0)
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
  /// 完全对齐Flutter SweepGradient API
  static SweepGradient parseSweepGradient(Map<String, dynamic> gradientMap) {
    // 解析颜色列表 (必需)
    final colors = parseGradientColors(gradientMap['colors']);
    if (colors.isEmpty) {
      throw ArgumentError('SweepGradient colors cannot be empty');
    }
    
    // 解析中心位置 (默认: Alignment.center)
    final center = parseAlignment(gradientMap['center']) ?? Alignment.center;
    
    // 解析开始角度 (默认: 0.0弧度)
    final startAngle = _parseNumber(gradientMap['startAngle'], 0.0);
    
    // 解析结束角度 (默认: 2π弧度)
    final endAngle = _parseNumber(gradientMap['endAngle'], _twoPi);
    
    // 解析颜色停止位置 (可选)
    final stops = parseGradientStops(gradientMap['stops']);
    
    // 解析平铺模式 (默认: TileMode.clamp)
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
    if (value is! List) return [];
    
    final colors = <Color>[];
    for (final colorData in value) {
      final color = parseColor(colorData);
      if (color != null) {
        colors.add(color);
      }
    }
    return colors;
  }
  
  /// 解析渐变颜色停止位置
  static List<double>? parseGradientStops(dynamic value) {
    if (value is! List) return null;
    
    final stops = <double>[];
    for (final stopData in value) {
      if (stopData is num) {
        stops.add(stopData.toDouble());
      }
    }
    return stops.isNotEmpty ? stops : null;
  }
  
  /// 解析Alignment对齐方式
  /// 完全对齐Flutter Alignment API
  static Alignment? parseAlignment(dynamic value) {
    if (value is! String) return null;
    
    switch (value) {
      case 'topLeft':
        return Alignment.topLeft;
      case 'topCenter':
        return Alignment.topCenter;
      case 'topRight':
        return Alignment.topRight;
      case 'centerLeft':
        return Alignment.centerLeft;
      case 'center':
        return Alignment.center;
      case 'centerRight':
        return Alignment.centerRight;
      case 'bottomLeft':
        return Alignment.bottomLeft;
      case 'bottomCenter':
        return Alignment.bottomCenter;
      case 'bottomRight':
        return Alignment.bottomRight;
      default:
        return null;
    }
  }
  
  /// 解析TileMode平铺模式
  /// 完全对齐Flutter TileMode API
  static TileMode parseTileMode(dynamic value) {
    if (value is! String) return TileMode.clamp;
    
    switch (value) {
      case 'repeated':
        return TileMode.repeated;
      case 'mirror':
        return TileMode.mirror;
      case 'clamp':
      default:
        return TileMode.clamp;
    }
  }
  
  /// 解析DecorationImage背景图片
  /// 完全对齐Flutter DecorationImage API
  static DecorationImage? parseDecorationImage(dynamic value) {
    if (value is! Map<String, dynamic>) return null;
    
    final url = value['url'] is String ? value['url'] : null;
    if (url == null || url.isEmpty) return null;
    
    // 解析图片适配模式 (默认: BoxFit.scaleDown)
    final fit = parseBoxFit(value['fit']);
    
    // 解析重复模式 (默认: ImageRepeat.noRepeat)
    final repeat = parseImageRepeat(value['repeat']);
    
    // 创建NetworkImage或AssetImage
    ImageProvider imageProvider;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      imageProvider = NetworkImage(url);
    } else {
      imageProvider = AssetImage(url);
    }
    
    return DecorationImage(
      image: imageProvider,
      fit: fit,
      repeat: repeat,
    );
  }
  
  /// 解析BoxFit图片适配模式
  /// 完全对齐Flutter BoxFit API
  static BoxFit parseBoxFit(dynamic value) {
    if (value is! String) return BoxFit.scaleDown;
    
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
      default:
        return BoxFit.scaleDown;
    }
  }
  
  /// 解析ImageRepeat图片重复模式
  /// 完全对齐Flutter ImageRepeat API
  static ImageRepeat parseImageRepeat(dynamic value) {
    if (value is! String) return ImageRepeat.noRepeat;
    
    switch (value) {
      case 'repeat':
        return ImageRepeat.repeat;
      case 'repeatX':
        return ImageRepeat.repeatX;
      case 'repeatY':
        return ImageRepeat.repeatY;
      case 'noRepeat':
      default:
        return ImageRepeat.noRepeat;
    }
  }
  
  /// 解析BoxShape形状
  /// 完全对齐Flutter BoxShape API
  static BoxShape parseBoxShape(dynamic value) {
    if (value is! String) return BoxShape.rectangle;
    
    switch (value) {
      case 'circle':
        return BoxShape.circle;
      case 'rectangle':
      default:
        return BoxShape.rectangle;
    }
  }
  
  /// 解析BoxDecoration
  /// 完整的装饰对象解析
  static BoxDecoration parseDecoration(Map<String, dynamic> decorationMap) {
    Color? color;
    Border? border;
    BorderRadius? borderRadius;
    List<BoxShadow>? boxShadow;
    Gradient? gradient;
    DecorationImage? image;
    BoxShape? shape;
    
    // 解析颜色
    if (decorationMap['color'] != null) {
      color = parseColor(decorationMap['color']);
    }
    
    // 解析边框
    if (decorationMap['border'] != null) {
      border = parseBorder(decorationMap['border']);
    }
    
    // 解析圆角
    if (decorationMap['borderRadius'] != null) {
      borderRadius = parseBorderRadius(decorationMap['borderRadius']);
    }
    
    // 解析阴影
    if (decorationMap['boxShadow'] != null) {
      boxShadow = parseBoxShadow(decorationMap['boxShadow']);
    }
    
    // 解析渐变
    if (decorationMap['gradient'] != null) {
      gradient = parseGradient(decorationMap['gradient']);
    }
    
    // 解析背景图片
    if (decorationMap['image'] != null) {
      image = parseDecorationImage(decorationMap['image']);
    }
    
    // 解析形状
    if (decorationMap['shape'] != null) {
      shape = parseBoxShape(decorationMap['shape']);
    }
    
    return BoxDecoration(
      color: color,
      border: border,
      borderRadius: borderRadius,
      boxShadow: boxShadow,
      gradient: gradient,
      image: image,
      shape: shape ?? BoxShape.rectangle,
    );
  }
  
  /// 解析BoxConstraints值
  /// React端已统一转换格式，Flutter端直接解析
  static BoxConstraints? parseBoxConstraints(dynamic value) {
    if (value == null) return null;
    
    // React端已转换为标准格式：{minWidth, maxWidth, minHeight, maxHeight}
    if (value is Map<String, dynamic>) {
      final minWidth = _parseNumber(value['minWidth'], 0.0);
      final maxWidth = _parseNumber(value['maxWidth'], double.infinity);
      final minHeight = _parseNumber(value['minHeight'], 0.0);
      final maxHeight = _parseNumber(value['maxHeight'], double.infinity);
      
      // 确保约束值的合理性
      final finalMinWidth = minWidth >= 0 ? minWidth : 0.0;
      final finalMaxWidth = maxWidth >= finalMinWidth ? maxWidth : double.infinity;
      final finalMinHeight = minHeight >= 0 ? minHeight : 0.0;
      final finalMaxHeight = maxHeight >= finalMinHeight ? maxHeight : double.infinity;
      
      return BoxConstraints(
        minWidth: finalMinWidth,
        maxWidth: finalMaxWidth,
        minHeight: finalMinHeight,
        maxHeight: finalMaxHeight,
      );
    }
    
    return null;
  }
  
  /// 解析Clip枚举值
  /// 对齐Flutter Clip枚举
  static Clip parseClipBehavior(dynamic value) {
    if (value == null) return Clip.none;
    
    switch (value.toString()) {
      case 'hardEdge':
        return Clip.hardEdge;
      case 'antiAlias':
        return Clip.antiAlias;
      case 'antiAliasWithSaveLayer':
        return Clip.antiAliasWithSaveLayer;
      case 'none':
      default:
        return Clip.none;
    }
  }
  
  /// 解析Matrix4变换矩阵
  /// 对齐Flutter Matrix4.fromList API
  static Matrix4? parseTransform(dynamic value) {
    if (value == null) return null;
    
    if (value is List && value.length == 16) {
      try {
        final matrix = value.map((e) => _parseNumber(e, 0.0)).toList();
        return Matrix4.fromList(matrix);
      } catch (e) {
        return null;
      }
    }
    
    return null;
  }
  
  // 私有辅助方法
  
  /// 数字解析辅助方法，统一处理类型转换和默认值
  static double _parseNumber(dynamic value, double defaultValue) {
    if (value == null) return defaultValue;
    if (value is num) return value.toDouble();
    return defaultValue;
  }
  
  /// 2π常量
  static const double _twoPi = 3.141592653589793 * 2;
}
