import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';
import '../../utils/type_converters.dart';

/// Container组件映射
class ContainerComponent extends FlutterComponent {
  @override
  String get componentType => 'Container';
  
  @override
  String get description => 'Flutter Container组件映射';
  
  @override
  Map<String, Type> get supportedProps => {
    'style': Map,  // 新的统一style属性
    // 保留旧属性以向后兼容
    'padding': dynamic,
    'margin': dynamic,
    'width': double,
    'height': double,
    'color': String,
    'decoration': Map,
  };
  
  @override
  bool get supportsChildren => true;
  
  @override
  Widget build(VirtualDOM vdom) {
    // 首先尝试从style属性中解析，如果没有则回退到旧的独立属性
    final styleMap = vdom.props['style'] as Map<String, dynamic>?;
    
    // 解析样式属性（优先从style中获取，否则从独立属性获取）
    final width = _getStyleProperty<double>(styleMap, vdom, 'width');
    final height = _getStyleProperty<double>(styleMap, vdom, 'height');
    
    final padding = _parseEdgeInsets(
      _getStyleProperty(styleMap, vdom, 'padding')
    );
    final margin = _parseEdgeInsets(
      _getStyleProperty(styleMap, vdom, 'margin')
    );
    
    final color = _parseColor(
      _getStyleProperty(styleMap, vdom, 'color')
    );
    
    // 统一、递归地构建所有子元素
    final List<Widget> childrenWidgets = vdom.getChildrenList()
        .map((childVdom) => ComponentRegistry.instance.buildComponent(childVdom))
        .where((widget) => widget != null)
        .cast<Widget>()
        .toList();
    
    // Container通常只有一个子元素
    final Widget? child = childrenWidgets.isNotEmpty ? childrenWidgets.first : null;
    
    // 解析decoration和color（遵循Flutter Container的互斥原则）
    Decoration? decoration;
    Color? containerColor;
    
    final decorationMap = _getStyleProperty<Map<String, dynamic>>(styleMap, vdom, 'decoration');
    if (decorationMap != null) {
      // 如果有decoration，使用decoration（可能包含color、border等）
      decoration = _parseDecoration(decorationMap);
    } else if (color != null) {
      // 如果没有decoration但有color，直接使用Container.color
      containerColor = color;
    }
    
    return Container(
      width: width,
      height: height,
      padding: padding,
      margin: margin,
      color: containerColor,
      decoration: decoration,
      child: child,
    );
  }
  
  /// 获取样式属性的辅助方法
  /// 优先从style对象中获取，否则从独立属性中获取
  T? _getStyleProperty<T>(Map<String, dynamic>? styleMap, VirtualDOM vdom, String propertyName) {
    // 首先尝试从style对象中获取
    if (styleMap != null && styleMap.containsKey(propertyName)) {
      final value = styleMap[propertyName];
      if (value is T) return value;
      // 尝试类型转换
      if (T == double && value is num) return value.toDouble() as T;
      if (T == int && value is num) return value.toInt() as T;
      return value as T?;
    }
    
    // 回退到独立属性
    return vdom.getProp<T>(propertyName);
  }
  
  /// 解析EdgeInsets值
  /// React端已统一转换格式，Flutter端直接解析
  EdgeInsets? _parseEdgeInsets(dynamic value) {
    if (value == null) return null;
    
    // React端已转换为标准格式：{top, right, bottom, left}
    if (value is Map<String, dynamic>) {
      final top = (value['top'] ?? 0).toDouble();
      final right = (value['right'] ?? 0).toDouble();
      final bottom = (value['bottom'] ?? 0).toDouble();
      final left = (value['left'] ?? 0).toDouble();
      
      return EdgeInsets.fromLTRB(left, top, right, bottom);
    }
    
    return null;
  }
  
  /// 解析Color值
  /// React端已统一转换格式，Flutter端直接解析
  Color? _parseColor(dynamic value) {
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
  BorderRadius? _parseBorderRadius(dynamic value) {
    if (value == null) return null;
    
    // React端已转换为标准格式：{topLeft, topRight, bottomRight, bottomLeft}
    if (value is Map<String, dynamic>) {
      final topLeft = (value['topLeft'] ?? 0).toDouble();
      final topRight = (value['topRight'] ?? 0).toDouble(); 
      final bottomRight = (value['bottomRight'] ?? 0).toDouble();
      final bottomLeft = (value['bottomLeft'] ?? 0).toDouble();
      
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
  Border? _parseBorder(dynamic value) {
    if (value == null) return null;
    
    // 完整Border对象格式：{top: {color, width, style}, right: {...}, ...}
    if (value is Map<String, dynamic> && value.containsKey('top')) {
      final topSide = _parseBorderSide(value['top']);
      final rightSide = _parseBorderSide(value['right']);
      final bottomSide = _parseBorderSide(value['bottom']);
      final leftSide = _parseBorderSide(value['left']);
      
      return Border(
        top: topSide ?? BorderSide.none,
        right: rightSide ?? BorderSide.none,
        bottom: bottomSide ?? BorderSide.none,
        left: leftSide ?? BorderSide.none,
      );
    }
    
    // 简化格式（向后兼容）：{width: 1, color: 'red'}
    if (value is Map<String, dynamic> && value.containsKey('width')) {
      final borderColor = _parseColor(value['color']) ?? Colors.black;
      final borderWidth = (value['width'] ?? 1.0).toDouble();
      return Border.all(color: borderColor, width: borderWidth);
    }
    
    return null;
  }
  
  /// 解析单个BorderSide
  BorderSide? _parseBorderSide(dynamic value) {
    if (value == null) return null;
    
    if (value is Map<String, dynamic>) {
      final color = _parseColor(value['color']) ?? Colors.black;
      final width = (value['width'] ?? 1.0).toDouble();
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
  
  /// 解析BoxDecoration
  BoxDecoration _parseDecoration(Map<String, dynamic> decorationMap) {
    Color? color;
    Border? border;
    BorderRadius? borderRadius;
    List<BoxShadow>? boxShadow;
    
    // 解析颜色
    if (decorationMap['color'] != null) {
      color = _parseColor(decorationMap['color']);
    }
    
    // 解析边框
    if (decorationMap['border'] != null) {
      border = _parseBorder(decorationMap['border']);
    }
    
    // 解析圆角
    if (decorationMap['borderRadius'] != null) {
      borderRadius = _parseBorderRadius(decorationMap['borderRadius']);
    }
    
    return BoxDecoration(
      color: color,
      border: border,
      borderRadius: borderRadius,
      boxShadow: boxShadow,
    );
  }
}
