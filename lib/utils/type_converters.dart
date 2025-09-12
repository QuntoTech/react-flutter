import 'package:flutter/material.dart';

/// 类型转换工具类
/// 将React属性值转换为Flutter对应的类型
class TypeConverters {
  
  /// 解析颜色
  static Color? parseColor(String? colorString) {
    if (colorString == null || colorString.isEmpty) return null;
    
    // 预定义颜色
    final predefinedColors = {
      'red': Colors.red,
      'blue': Colors.blue,
      'green': Colors.green,
      'yellow': Colors.yellow,
      'orange': Colors.orange,
      'purple': Colors.purple,
      'pink': Colors.pink,
      'cyan': Colors.cyan,
      'teal': Colors.teal,
      'indigo': Colors.indigo,
      'amber': Colors.amber,
      'lime': Colors.lime,
      'brown': Colors.brown,
      'grey': Colors.grey,
      'gray': Colors.grey,
      'black': Colors.black,
      'white': Colors.white,
      'transparent': Colors.transparent,
    };
    
    final lowerColor = colorString.toLowerCase();
    if (predefinedColors.containsKey(lowerColor)) {
      return predefinedColors[lowerColor];
    }
    
    // 尝试解析十六进制颜色 (#RRGGBB or #AARRGGBB)
    if (colorString.startsWith('#')) {
      try {
        final hexString = colorString.substring(1);
        if (hexString.length == 6) {
          // #RRGGBB
          final value = int.parse(hexString, radix: 16);
          return Color(0xFF000000 | value);
        } else if (hexString.length == 8) {
          // #AARRGGBB
          final value = int.parse(hexString, radix: 16);
          return Color(value);
        }
      } catch (e) {
        debugPrint('解析颜色失败: $colorString');
      }
    }
    
    return null;
  }
  
  /// 解析字体粗细
  static FontWeight? parseFontWeight(String? weightString) {
    if (weightString == null || weightString.isEmpty) return null;
    
    final weightMap = {
      'thin': FontWeight.w100,
      'extralight': FontWeight.w200,
      'light': FontWeight.w300,
      'normal': FontWeight.w400,
      'medium': FontWeight.w500,
      'semibold': FontWeight.w600,
      'bold': FontWeight.w700,
      'extrabold': FontWeight.w800,
      'black': FontWeight.w900,
      'w100': FontWeight.w100,
      'w200': FontWeight.w200,
      'w300': FontWeight.w300,
      'w400': FontWeight.w400,
      'w500': FontWeight.w500,
      'w600': FontWeight.w600,
      'w700': FontWeight.w700,
      'w800': FontWeight.w800,
      'w900': FontWeight.w900,
    };
    
    return weightMap[weightString.toLowerCase()];
  }
  
  /// 解析文本对齐
  static TextAlign? parseTextAlign(String? alignString) {
    if (alignString == null || alignString.isEmpty) return null;
    
    final alignMap = {
      'left': TextAlign.left,
      'right': TextAlign.right,
      'center': TextAlign.center,
      'justify': TextAlign.justify,
      'start': TextAlign.start,
      'end': TextAlign.end,
    };
    
    return alignMap[alignString.toLowerCase()];
  }
  
  /// 解析文本溢出处理
  static TextOverflow? parseTextOverflow(String? overflowString) {
    if (overflowString == null || overflowString.isEmpty) return null;
    
    final overflowMap = {
      'clip': TextOverflow.clip,
      'fade': TextOverflow.fade,
      'ellipsis': TextOverflow.ellipsis,
      'visible': TextOverflow.visible,
    };
    
    return overflowMap[overflowString.toLowerCase()];
  }
  
  /// 解析主轴对齐
  static MainAxisAlignment parseMainAxisAlignment(String? alignString) {
    if (alignString == null || alignString.isEmpty) return MainAxisAlignment.start;
    
    final alignMap = {
      'start': MainAxisAlignment.start,
      'end': MainAxisAlignment.end,
      'center': MainAxisAlignment.center,
      'spaceBetween': MainAxisAlignment.spaceBetween,
      'spaceAround': MainAxisAlignment.spaceAround,
      'spaceEvenly': MainAxisAlignment.spaceEvenly,
    };
    
    return alignMap[alignString] ?? MainAxisAlignment.start;
  }
  
  /// 解析交叉轴对齐
  static CrossAxisAlignment parseCrossAxisAlignment(String? alignString) {
    if (alignString == null || alignString.isEmpty) return CrossAxisAlignment.center;
    
    final alignMap = {
      'start': CrossAxisAlignment.start,
      'end': CrossAxisAlignment.end,
      'center': CrossAxisAlignment.center,
      'stretch': CrossAxisAlignment.stretch,
      'baseline': CrossAxisAlignment.baseline,
    };
    
    return alignMap[alignString] ?? CrossAxisAlignment.center;
  }
  
  /// 解析EdgeInsets
  static EdgeInsets? parseEdgeInsets(dynamic value) {
    if (value == null) return null;
    
    if (value is num) {
      // 单个数值，应用到所有边
      return EdgeInsets.all(value.toDouble());
    }
    
    if (value is String) {
      // 尝试解析字符串格式 "8" 或 "8,16" 或 "8,16,8,16"
      final parts = value.split(',').map((s) => s.trim()).toList();
      try {
        if (parts.length == 1) {
          final all = double.parse(parts[0]);
          return EdgeInsets.all(all);
        } else if (parts.length == 2) {
          final vertical = double.parse(parts[0]);
          final horizontal = double.parse(parts[1]);
          return EdgeInsets.symmetric(
            vertical: vertical,
            horizontal: horizontal,
          );
        } else if (parts.length == 4) {
          final top = double.parse(parts[0]);
          final right = double.parse(parts[1]);
          final bottom = double.parse(parts[2]);
          final left = double.parse(parts[3]);
          return EdgeInsets.fromLTRB(left, top, right, bottom);
        }
      } catch (e) {
        debugPrint('解析EdgeInsets失败: $value');
      }
    }
    
    if (value is Map) {
      // Map格式 {"top": 8, "left": 16, ...}
      try {
        final top = (value['top'] ?? 0).toDouble();
        final right = (value['right'] ?? 0).toDouble();
        final bottom = (value['bottom'] ?? 0).toDouble();
        final left = (value['left'] ?? 0).toDouble();
        return EdgeInsets.fromLTRB(left, top, right, bottom);
      } catch (e) {
        debugPrint('解析EdgeInsets Map失败: $value');
      }
    }
    
    return null;
  }
}
