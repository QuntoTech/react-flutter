import 'package:flutter/material.dart';
import '../foundation/primitive_parsers.dart';
import '../foundation/geometry_parsers.dart';
import '../foundation/material_state_parsers.dart';

/// 按钮组件样式解析器
/// 处理所有按钮类组件的样式解析，复用Foundation层
class ButtonParsers {
  /// 解析ElevatedButton样式 - 完全对齐Flutter ButtonStyle API
  static ButtonStyle? parseElevatedButtonStyle(Map<String, dynamic>? styleMap) {
    if (styleMap == null) return null;
    
    return ButtonStyle(
      // 颜色属性 - 支持Material状态
      backgroundColor: MaterialStateParsers.parseColor(styleMap['backgroundColor']),
      foregroundColor: MaterialStateParsers.parseColor(styleMap['foregroundColor']),
      overlayColor: MaterialStateParsers.parseColor(styleMap['overlayColor']),
      shadowColor: MaterialStateParsers.parseColor(styleMap['shadowColor']),
      surfaceTintColor: MaterialStateParsers.parseColor(styleMap['surfaceTintColor']),
      
      // 尺寸和间距 - 支持Material状态
      elevation: MaterialStateParsers.parseDouble(styleMap['elevation']),
      padding: MaterialStateParsers.parseEdgeInsets(styleMap['padding']),
      minimumSize: MaterialStateParsers.parseSize(styleMap['minimumSize']),
      fixedSize: MaterialStateParsers.parseSize(styleMap['fixedSize']),
      maximumSize: MaterialStateParsers.parseSize(styleMap['maximumSize']),
      
      // 形状和边框 - 支持Material状态
      side: MaterialStateParsers.parseBorderSide(styleMap['side']),
      shape: MaterialStateParsers.parseShape(styleMap['shape']),
      
      // 鼠标和交互
      mouseCursor: MaterialStateParsers.parseMouseCursor(styleMap['mouseCursor']),
      visualDensity: _parseVisualDensity(styleMap['visualDensity']),
      tapTargetSize: _parseMaterialTapTargetSize(styleMap['tapTargetSize']),
      animationDuration: _parseButtonDuration(styleMap['animationDuration']),
      enableFeedback: styleMap['enableFeedback'] as bool?,
      alignment: GeometryParsers.parseAlignment(styleMap['alignment']),
      splashFactory: _parseInteractiveInkFeatureFactory(styleMap['splashFactory']),
    );
  }

  /// 解析TextButton样式
  static ButtonStyle? parseTextButtonStyle(Map<String, dynamic>? styleMap) {
    if (styleMap == null) return null;
    
    return ButtonStyle(
      // TextButton通常没有背景色和阴影，但保持API一致性
      backgroundColor: MaterialStateParsers.parseColor(styleMap['backgroundColor']),
      foregroundColor: MaterialStateParsers.parseColor(styleMap['foregroundColor']),
      overlayColor: MaterialStateParsers.parseColor(styleMap['overlayColor']),
      shadowColor: MaterialStateParsers.parseColor(styleMap['shadowColor']),
      surfaceTintColor: MaterialStateParsers.parseColor(styleMap['surfaceTintColor']),
      
      elevation: MaterialStateParsers.parseDouble(styleMap['elevation']),
      padding: MaterialStateParsers.parseEdgeInsets(styleMap['padding']),
      minimumSize: MaterialStateParsers.parseSize(styleMap['minimumSize']),
      fixedSize: MaterialStateParsers.parseSize(styleMap['fixedSize']),
      maximumSize: MaterialStateParsers.parseSize(styleMap['maximumSize']),
      
      side: MaterialStateParsers.parseBorderSide(styleMap['side']),
      shape: MaterialStateParsers.parseShape(styleMap['shape']),
      
      mouseCursor: MaterialStateParsers.parseMouseCursor(styleMap['mouseCursor']),
      visualDensity: _parseVisualDensity(styleMap['visualDensity']),
      tapTargetSize: _parseMaterialTapTargetSize(styleMap['tapTargetSize']),
      animationDuration: _parseButtonDuration(styleMap['animationDuration']),
      enableFeedback: styleMap['enableFeedback'] as bool?,
      alignment: GeometryParsers.parseAlignment(styleMap['alignment']),
      splashFactory: _parseInteractiveInkFeatureFactory(styleMap['splashFactory']),
    );
  }

  /// 解析OutlinedButton样式
  static ButtonStyle? parseOutlinedButtonStyle(Map<String, dynamic>? styleMap) {
    if (styleMap == null) return null;
    
    return ButtonStyle(
      // OutlinedButton通常没有背景色但有边框
      backgroundColor: MaterialStateParsers.parseColor(styleMap['backgroundColor']),
      foregroundColor: MaterialStateParsers.parseColor(styleMap['foregroundColor']),
      overlayColor: MaterialStateParsers.parseColor(styleMap['overlayColor']),
      shadowColor: MaterialStateParsers.parseColor(styleMap['shadowColor']),
      surfaceTintColor: MaterialStateParsers.parseColor(styleMap['surfaceTintColor']),
      
      elevation: MaterialStateParsers.parseDouble(styleMap['elevation']),
      padding: MaterialStateParsers.parseEdgeInsets(styleMap['padding']),
      minimumSize: MaterialStateParsers.parseSize(styleMap['minimumSize']),
      fixedSize: MaterialStateParsers.parseSize(styleMap['fixedSize']),
      maximumSize: MaterialStateParsers.parseSize(styleMap['maximumSize']),
      
      side: MaterialStateParsers.parseBorderSide(styleMap['side']),
      shape: MaterialStateParsers.parseShape(styleMap['shape']),
      
      mouseCursor: MaterialStateParsers.parseMouseCursor(styleMap['mouseCursor']),
      visualDensity: _parseVisualDensity(styleMap['visualDensity']),
      tapTargetSize: _parseMaterialTapTargetSize(styleMap['tapTargetSize']),
      animationDuration: _parseButtonDuration(styleMap['animationDuration']),
      enableFeedback: styleMap['enableFeedback'] as bool?,
      alignment: GeometryParsers.parseAlignment(styleMap['alignment']),
      splashFactory: _parseInteractiveInkFeatureFactory(styleMap['splashFactory']),
    );
  }

  /// 解析FloatingActionButton样式
  static ButtonStyle? parseFloatingActionButtonStyle(Map<String, dynamic>? styleMap) {
    if (styleMap == null) return null;
    
    return ButtonStyle(
      // FloatingActionButton有特殊的默认样式
      backgroundColor: MaterialStateParsers.parseColor(styleMap['backgroundColor']),
      foregroundColor: MaterialStateParsers.parseColor(styleMap['foregroundColor']),
      overlayColor: MaterialStateParsers.parseColor(styleMap['overlayColor']),
      shadowColor: MaterialStateParsers.parseColor(styleMap['shadowColor']),
      surfaceTintColor: MaterialStateParsers.parseColor(styleMap['surfaceTintColor']),
      
      elevation: MaterialStateParsers.parseDouble(styleMap['elevation']),
      padding: MaterialStateParsers.parseEdgeInsets(styleMap['padding']),
      minimumSize: MaterialStateParsers.parseSize(styleMap['minimumSize']),
      fixedSize: MaterialStateParsers.parseSize(styleMap['fixedSize']),
      maximumSize: MaterialStateParsers.parseSize(styleMap['maximumSize']),
      
      side: MaterialStateParsers.parseBorderSide(styleMap['side']),
      shape: MaterialStateParsers.parseShape(styleMap['shape']),
      
      mouseCursor: MaterialStateParsers.parseMouseCursor(styleMap['mouseCursor']),
      visualDensity: _parseVisualDensity(styleMap['visualDensity']),
      tapTargetSize: _parseMaterialTapTargetSize(styleMap['tapTargetSize']),
      animationDuration: _parseButtonDuration(styleMap['animationDuration']),
      enableFeedback: styleMap['enableFeedback'] as bool?,
      alignment: GeometryParsers.parseAlignment(styleMap['alignment']),
      splashFactory: _parseInteractiveInkFeatureFactory(styleMap['splashFactory']),
    );
  }

  // ==== 私有辅助方法 ====

  /// 解析VisualDensity
  static VisualDensity? _parseVisualDensity(dynamic value) {
    if (value == null) return null;
    switch (value.toString()) {
      case 'standard': return VisualDensity.standard;
      case 'compact': return VisualDensity.compact;
      case 'comfortable': return VisualDensity.comfortable;
      case 'adaptivePlatformDensity': return VisualDensity.adaptivePlatformDensity;
      default: return null;
    }
  }

  /// 解析MaterialTapTargetSize
  static MaterialTapTargetSize? _parseMaterialTapTargetSize(dynamic value) {
    if (value == null) return null;
    switch (value.toString()) {
      case 'padded': return MaterialTapTargetSize.padded;
      case 'shrinkWrap': return MaterialTapTargetSize.shrinkWrap;
      default: return null;
    }
  }

  /// 解析InteractiveInkFeatureFactory
  static InteractiveInkFeatureFactory? _parseInteractiveInkFeatureFactory(dynamic value) {
    if (value == null) return null;
    switch (value.toString()) {
      case 'splash': return InkSplash.splashFactory;
      case 'ripple': return InkRipple.splashFactory;
      case 'noSplash': return NoSplash.splashFactory;
      default: return null;
    }
  }

  /// 解析动画时长
  static Duration? _parseButtonDuration(dynamic value) {
    if (value == null) return null;
    final milliseconds = PrimitiveParsers.parseNumber(value, 200.0);
    return Duration(milliseconds: milliseconds.toInt());
  }
}
