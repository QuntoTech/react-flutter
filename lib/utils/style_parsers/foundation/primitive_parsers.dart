import 'package:flutter/material.dart';

/// 基础数据类型解析器
/// 提供最基础的类型解析功能，被所有组件复用
class PrimitiveParsers {
  /// 解析EdgeInsets边距
  static EdgeInsets? parseEdgeInsets(dynamic value) {
    if (value == null) return null;
    
    if (value is num) {
      final double val = value.toDouble();
      return EdgeInsets.all(val);
    }
    
    if (value is Map<String, dynamic>) {
      final double? all = value['all']?.toDouble();
      if (all != null) {
        return EdgeInsets.all(all);
      }
      
      final double? horizontal = value['horizontal']?.toDouble();
      final double? vertical = value['vertical']?.toDouble();
      if (horizontal != null || vertical != null) {
        return EdgeInsets.symmetric(
          horizontal: horizontal ?? 0,
          vertical: vertical ?? 0,
        );
      }
      
      final double top = value['top']?.toDouble() ?? 0;
      final double right = value['right']?.toDouble() ?? 0;
      final double bottom = value['bottom']?.toDouble() ?? 0;
      final double left = value['left']?.toDouble() ?? 0;
      
      return EdgeInsets.fromLTRB(left, top, right, bottom);
    }
    
    return null;
  }

  /// 解析Color颜色
  static Color? parseColor(dynamic value) {
    if (value == null) return null;
    
    if (value is Color) return value;
    
    if (value is int) {
      return Color(value);
    }
    
    if (value is String) {
      final String colorStr = value.toLowerCase().replaceAll('#', '');
      if (colorStr.length == 6) {
        return Color(int.parse('ff$colorStr', radix: 16));
      } else if (colorStr.length == 8) {
        return Color(int.parse(colorStr, radix: 16));
      }
    }
    
    // 支持React端Color对象传递过来的{ value: number }格式
    if (value is Map<String, dynamic> && value.containsKey('value')) {
      final colorValue = value['value'];
      if (colorValue is int) {
        return Color(colorValue);
      }
    }
    
    return null;
  }

  /// 解析BorderRadius圆角
  static BorderRadius? parseBorderRadius(dynamic value) {
    if (value == null) return null;
    
    if (value is num) {
      final double radius = value.toDouble();
      return BorderRadius.circular(radius);
    }
    
    if (value is Map<String, dynamic>) {
      final double? all = value['all']?.toDouble();
      if (all != null) {
        return BorderRadius.circular(all);
      }
      
      final double topLeft = value['topLeft']?.toDouble() ?? 0;
      final double topRight = value['topRight']?.toDouble() ?? 0;
      final double bottomLeft = value['bottomLeft']?.toDouble() ?? 0;
      final double bottomRight = value['bottomRight']?.toDouble() ?? 0;
      
      return BorderRadius.only(
        topLeft: Radius.circular(topLeft),
        topRight: Radius.circular(topRight),
        bottomLeft: Radius.circular(bottomLeft),
        bottomRight: Radius.circular(bottomRight),
      );
    }
    
    return null;
  }

  /// 解析Border边框
  static Border? parseBorder(dynamic value) {
    if (value == null) return null;
    
    if (value is Map<String, dynamic>) {
      final BorderSide? top = parseBorderSide(value['top']);
      final BorderSide? right = parseBorderSide(value['right']);
      final BorderSide? bottom = parseBorderSide(value['bottom']);
      final BorderSide? left = parseBorderSide(value['left']);
      
      // 如果都为null，尝试解析通用边框
      if (top == null && right == null && bottom == null && left == null) {
        final BorderSide? all = parseBorderSide(value);
        if (all != null) {
          return Border.all(
            color: all.color,
            width: all.width,
            style: all.style,
          );
        }
      }
      
      return Border(
        top: top ?? BorderSide.none,
        right: right ?? BorderSide.none,
        bottom: bottom ?? BorderSide.none,
        left: left ?? BorderSide.none,
      );
    }
    
    return null;
  }

  /// 解析BorderSide边框边
  static BorderSide? parseBorderSide(dynamic value) {
    if (value == null) return null;
    
    if (value is Map<String, dynamic>) {
      final Color color = parseColor(value['color']) ?? Colors.black;
      final double width = value['width']?.toDouble() ?? 1.0;
      final BorderStyle style = _parseBorderStyle(value['style']);
      
      return BorderSide(
        color: color,
        width: width,
        style: style,
      );
    }
    
    return null;
  }

  /// 解析BoxShadow阴影列表
  static List<BoxShadow>? parseBoxShadow(dynamic value) {
    if (value == null) return null;
    
    if (value is List) {
      final List<BoxShadow> shadows = [];
      for (final shadowData in value) {
        final BoxShadow? shadow = parseSingleBoxShadow(shadowData);
        if (shadow != null) {
          shadows.add(shadow);
        }
      }
      return shadows.isNotEmpty ? shadows : null;
    }
    
    // 单个阴影转换为列表
    final BoxShadow? shadow = parseSingleBoxShadow(value);
    return shadow != null ? [shadow] : null;
  }

  /// 解析单个BoxShadow阴影
  static BoxShadow? parseSingleBoxShadow(dynamic value) {
    if (value == null) return null;
    
    if (value is Map<String, dynamic>) {
      final Color color = parseColor(value['color']) ?? Colors.black26;
      
      // 严格按照React端类型定义：offset: { dx: number; dy: number }
      double offsetX = 0.0;
      double offsetY = 0.0;
      
      if (value['offset'] != null && value['offset'] is Map<String, dynamic>) {
        final offsetMap = value['offset'] as Map<String, dynamic>;
        offsetX = offsetMap['dx']?.toDouble() ?? 0.0;
        offsetY = offsetMap['dy']?.toDouble() ?? 0.0;
      }
      
      final double blurRadius = value['blurRadius']?.toDouble() ?? 0.0;
      final double spreadRadius = value['spreadRadius']?.toDouble() ?? 0.0;
      final BlurStyle blurStyle = parseBlurStyle(value['blurStyle']);
      
      return BoxShadow(
        color: color,
        offset: Offset(offsetX, offsetY),
        blurRadius: blurRadius,
        spreadRadius: spreadRadius,
        blurStyle: blurStyle,
      );
    }
    
    return null;
  }

  /// 解析BlurStyle模糊样式
  static BlurStyle parseBlurStyle(dynamic value) {
    if (value == null) return BlurStyle.normal;
    
    switch (value.toString().toLowerCase()) {
      case 'normal': return BlurStyle.normal;
      case 'solid': return BlurStyle.solid;
      case 'outer': return BlurStyle.outer;
      case 'inner': return BlurStyle.inner;
      default: return BlurStyle.normal;
    }
  }

  /// 解析BorderStyle边框样式
  static BorderStyle _parseBorderStyle(dynamic value) {
    if (value == null) return BorderStyle.solid;
    
    switch (value.toString().toLowerCase()) {
      case 'solid': return BorderStyle.solid;
      case 'none': return BorderStyle.none;
      default: return BorderStyle.solid;
    }
  }

  /// 解析数值 - 公开方法，供其他解析器使用
  static double parseNumber(dynamic value, double defaultValue) {
    if (value == null) return defaultValue;
    if (value is num) return value.toDouble();
    if (value is String) return double.tryParse(value) ?? defaultValue;
    return defaultValue;
  }
}
