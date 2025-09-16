import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import '../foundation/primitive_parsers.dart';
import '../foundation/geometry_parsers.dart';

/// 布局组件样式解析器
/// 处理所有布局相关组件的样式解析，复用Foundation层
class LayoutParsers {
  /// 解析Container的BoxDecoration
  static BoxDecoration? parseContainerDecoration(Map<String, dynamic>? decorationMap) {
    if (decorationMap == null) return null;
    
    return GeometryParsers.parseDecoration(decorationMap);
  }

  /// 解析Container的完整样式（包含constraints等）
  static Map<String, dynamic> parseContainerStyle(Map<String, dynamic>? styleMap) {
    if (styleMap == null) return {};
    
    return {
      'decoration': parseContainerDecoration(styleMap['decoration']),
      'foregroundDecoration': parseContainerDecoration(styleMap['foregroundDecoration']),
      'constraints': GeometryParsers.parseBoxConstraints(styleMap['constraints']),
      'margin': PrimitiveParsers.parseEdgeInsets(styleMap['margin']),
      'padding': PrimitiveParsers.parseEdgeInsets(styleMap['padding']),
      'transform': GeometryParsers.parseTransform(styleMap['transform']),
      'transformAlignment': GeometryParsers.parseAlignment(styleMap['transformAlignment']),
      'clipBehavior': GeometryParsers.parseClipBehavior(styleMap['clipBehavior']),
      'alignment': GeometryParsers.parseAlignment(styleMap['alignment']),
      'width': styleMap['width']?.toDouble(),
      'height': styleMap['height']?.toDouble(),
    };
  }

  /// 解析MainAxisAlignment主轴对齐
  static MainAxisAlignment parseMainAxisAlignment(dynamic value) {
    if (value == null) return MainAxisAlignment.start;
    
    switch (value.toString()) {
      case 'start': return MainAxisAlignment.start;
      case 'end': return MainAxisAlignment.end;
      case 'center': return MainAxisAlignment.center;
      case 'spaceBetween': return MainAxisAlignment.spaceBetween;
      case 'spaceAround': return MainAxisAlignment.spaceAround;
      case 'spaceEvenly': return MainAxisAlignment.spaceEvenly;
      default: return MainAxisAlignment.start;
    }
  }

  /// 解析CrossAxisAlignment交叉轴对齐
  static CrossAxisAlignment parseCrossAxisAlignment(dynamic value) {
    if (value == null) return CrossAxisAlignment.center;
    
    switch (value.toString().toLowerCase()) {
      case 'start': return CrossAxisAlignment.start;
      case 'end': return CrossAxisAlignment.end;
      case 'center': return CrossAxisAlignment.center;
      case 'stretch': return CrossAxisAlignment.stretch;
      case 'baseline': return CrossAxisAlignment.baseline;
      default: return CrossAxisAlignment.center;
    }
  }

  /// 解析MainAxisSize主轴大小
  static MainAxisSize parseMainAxisSize(dynamic value) {
    if (value == null) return MainAxisSize.max;
    
    switch (value.toString().toLowerCase()) {
      case 'min': return MainAxisSize.min;
      case 'max': return MainAxisSize.max;
      default: return MainAxisSize.max;
    }
  }

  /// 解析Axis滚动方向
  static Axis parseScrollDirection(dynamic value) {
    if (value == null) return Axis.vertical;
    
    switch (value.toString().toLowerCase()) {
      case 'horizontal': return Axis.horizontal;
      case 'vertical': return Axis.vertical;
      default: return Axis.vertical;
    }
  }

  /// 解析ScrollPhysics滚动物理 - 严格对齐React端类型定义
  static ScrollPhysics? parseScrollPhysics(dynamic value) {
    if (value == null) return null;
    
    switch (value.toString().toLowerCase()) {
      case 'bouncing': return const BouncingScrollPhysics();
      case 'clamping': return const ClampingScrollPhysics();
      case 'never': return const NeverScrollableScrollPhysics();
      default: return null;
    }
  }

  /// 解析ScrollViewKeyboardDismissBehavior键盘消失行为
  static ScrollViewKeyboardDismissBehavior parseKeyboardDismissBehavior(dynamic value) {
    if (value == null) return ScrollViewKeyboardDismissBehavior.manual;
    
    switch (value.toString().toLowerCase()) {
      case 'manual': return ScrollViewKeyboardDismissBehavior.manual;
      case 'ondrag': return ScrollViewKeyboardDismissBehavior.onDrag;
      default: return ScrollViewKeyboardDismissBehavior.manual;
    }
  }

  /// 解析ScrollBehavior滚动行为
  static ScrollBehavior? parseScrollBehavior(dynamic value) {
    if (value == null) return null;
    
    // 这里可以根据需要扩展自定义ScrollBehavior
    // 暂时返回null，使用系统默认
    return null;
  }

  /// 解析DragStartBehavior拖拽开始行为
  static DragStartBehavior parseDragStartBehavior(dynamic value) {
    if (value == null) return DragStartBehavior.start;
    
    switch (value.toString().toLowerCase()) {
      case 'start': return DragStartBehavior.start;
      case 'down': return DragStartBehavior.down;
      default: return DragStartBehavior.start;
    }
  }

  /// 解析SingleChildScrollView的完整样式
  static Map<String, dynamic> parseScrollViewStyle(Map<String, dynamic>? styleMap) {
    if (styleMap == null) return {};
    
    return {
      'scrollDirection': parseScrollDirection(styleMap['scrollDirection']),
      'reverse': styleMap['reverse'] as bool?,
      'padding': PrimitiveParsers.parseEdgeInsets(styleMap['padding']),
      'primary': styleMap['primary'] as bool?,
      'physics': parseScrollPhysics(styleMap['physics']),
      'dragStartBehavior': parseDragStartBehavior(styleMap['dragStartBehavior']),
      'clipBehavior': GeometryParsers.parseClipBehavior(styleMap['clipBehavior']),
      'keyboardDismissBehavior': parseKeyboardDismissBehavior(styleMap['keyboardDismissBehavior']),
    };
  }
}
