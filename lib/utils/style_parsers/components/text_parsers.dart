import 'package:flutter/material.dart';
import '../foundation/primitive_parsers.dart';

/// 文本组件样式解析器
/// 处理所有文本相关组件的样式解析，复用Foundation层
class TextParsers {
  /// 解析TextStyle样式
  static TextStyle? parseTextStyle(Map<String, dynamic>? styleMap) {
    if (styleMap == null) return null;
    
    return TextStyle(
      // 字体属性
      fontSize: _parseNumber(styleMap['fontSize'], 16.0),
      fontWeight: _parseFontWeight(styleMap['fontWeight']),
      fontFamily: styleMap['fontFamily'] as String?,
      fontStyle: _parseFontStyle(styleMap['fontStyle']),
      
      // 颜色和装饰
      color: PrimitiveParsers.parseColor(styleMap['color']),
      backgroundColor: PrimitiveParsers.parseColor(styleMap['backgroundColor']),
      decoration: _parseTextDecoration(styleMap['decoration']),
      decorationColor: PrimitiveParsers.parseColor(styleMap['decorationColor']),
      decorationStyle: _parseTextDecorationStyle(styleMap['decorationStyle']),
      decorationThickness: _parseNumber(styleMap['decorationThickness'], 1.0),
      
      // 间距属性
      letterSpacing: styleMap['letterSpacing']?.toDouble(),
      wordSpacing: styleMap['wordSpacing']?.toDouble(),
      height: styleMap['height']?.toDouble(),
      
      // 阴影（暂时简化处理）
      shadows: _parseTextShadows(styleMap['shadows']),
    );
  }

  /// 解析TextAlign文本对齐
  static TextAlign? parseTextAlign(dynamic value) {
    if (value == null) return null;
    
    switch (value.toString().toLowerCase()) {
      case 'left': return TextAlign.left;
      case 'right': return TextAlign.right;
      case 'center': return TextAlign.center;
      case 'justify': return TextAlign.justify;
      case 'start': return TextAlign.start;
      case 'end': return TextAlign.end;
      default: return null;
    }
  }

  /// 解析TextDirection文本方向
  static TextDirection? parseTextDirection(dynamic value) {
    if (value == null) return null;
    
    switch (value.toString().toLowerCase()) {
      case 'ltr': return TextDirection.ltr;
      case 'rtl': return TextDirection.rtl;
      default: return null;
    }
  }

  /// 解析TextOverflow文本溢出
  static TextOverflow? parseTextOverflow(dynamic value) {
    if (value == null) return null;
    
    switch (value.toString().toLowerCase()) {
      case 'clip': return TextOverflow.clip;
      case 'fade': return TextOverflow.fade;
      case 'ellipsis': return TextOverflow.ellipsis;
      case 'visible': return TextOverflow.visible;
      default: return null;
    }
  }

  /// 解析VerticalDirection垂直方向
  static VerticalDirection parseVerticalDirection(dynamic value) {
    if (value == null) return VerticalDirection.down;
    
    switch (value.toString().toLowerCase()) {
      case 'up': return VerticalDirection.up;
      case 'down': return VerticalDirection.down;
      default: return VerticalDirection.down;
    }
  }

  /// 解析TextBaseline文本基线
  static TextBaseline? parseTextBaseline(dynamic value) {
    if (value == null) return null;
    
    switch (value.toString().toLowerCase()) {
      case 'alphabetic': return TextBaseline.alphabetic;
      case 'ideographic': return TextBaseline.ideographic;
      default: return null;
    }
  }

  // ==== 私有辅助方法 ====

  /// 解析数值 - 委托给PrimitiveParsers
  static double _parseNumber(dynamic value, double defaultValue) {
    return PrimitiveParsers.parseNumber(value, defaultValue);
  }

  /// 解析FontWeight
  static FontWeight? _parseFontWeight(dynamic value) {
    if (value == null) return null;
    if (value is String) {
      switch (value.toLowerCase()) {
        case 'w100': case '100': return FontWeight.w100;
        case 'w200': case '200': return FontWeight.w200;
        case 'w300': case '300': return FontWeight.w300;
        case 'w400': case '400': case 'normal': return FontWeight.w400;
        case 'w500': case '500': return FontWeight.w500;
        case 'w600': case '600': return FontWeight.w600;
        case 'w700': case '700': case 'bold': return FontWeight.w700;
        case 'w800': case '800': return FontWeight.w800;
        case 'w900': case '900': return FontWeight.w900;
        default: return null;
      }
    }
    if (value is int) {
      switch (value) {
        case 100: return FontWeight.w100;
        case 200: return FontWeight.w200;
        case 300: return FontWeight.w300;
        case 400: return FontWeight.w400;
        case 500: return FontWeight.w500;
        case 600: return FontWeight.w600;
        case 700: return FontWeight.w700;
        case 800: return FontWeight.w800;
        case 900: return FontWeight.w900;
        default: return null;
      }
    }
    return null;
  }

  /// 解析FontStyle
  static FontStyle? _parseFontStyle(dynamic value) {
    if (value == null) return null;
    switch (value.toString().toLowerCase()) {
      case 'italic': return FontStyle.italic;
      case 'normal': return FontStyle.normal;
      default: return null;
    }
  }

  /// 解析TextDecoration
  static TextDecoration? _parseTextDecoration(dynamic value) {
    if (value == null) return null;
    if (value is! String) return null;  // 只处理字符串
    
    switch (value) {
      case 'none': return TextDecoration.none;
      case 'underline': return TextDecoration.underline;
      case 'overline': return TextDecoration.overline;
      case 'lineThrough': return TextDecoration.lineThrough;
      default: return null;
    }
  }

  /// 解析TextDecorationStyle
  static TextDecorationStyle? _parseTextDecorationStyle(dynamic value) {
    if (value == null) return null;
    switch (value.toString().toLowerCase()) {
      case 'solid': return TextDecorationStyle.solid;
      case 'double': return TextDecorationStyle.double;
      case 'dotted': return TextDecorationStyle.dotted;
      case 'dashed': return TextDecorationStyle.dashed;
      case 'wavy': return TextDecorationStyle.wavy;
      default: return null;
    }
  }

  /// 解析文本阴影（简化处理）
  static List<Shadow>? _parseTextShadows(dynamic value) {
    if (value == null) return null;
    // 暂时简化处理，返回null
    // 可以后续根据需要实现完整的阴影解析
    return null;
  }
}
