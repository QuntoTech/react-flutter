import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';
import '../../utils/type_converters.dart';
import '../../utils/style_parsers/index.dart';

// 开发模式调试输出控制
const bool _kDebugMode = false;

/// Container组件映射
class ContainerComponent extends FlutterComponent {
  @override
  String get componentType => 'Container';
  
  @override
  String get description => 'Flutter Container组件映射';
  
  @override
  Map<String, Type> get supportedProps => {
    'style': Map,  // 统一style属性，包含所有样式配置
    'id': String,  // 通用id属性，用于测试和查找
  };
  
  @override
  bool get supportsChildren => true;
  
  @override
  Widget build(VirtualDOM vdom) {
    // 只从style属性中解析所有样式
    final styleMap = vdom.props['style'] as Map<String, dynamic>?;
    
    // 解析样式属性
    final width = styleMap?['width'] != null ? (styleMap!['width'] as num).toDouble() : null;
    final height = styleMap?['height'] != null ? (styleMap!['height'] as num).toDouble() : null;
    
    final padding = PrimitiveParsers.parseEdgeInsets(styleMap?['padding']);
    final margin = PrimitiveParsers.parseEdgeInsets(styleMap?['margin']);
    final color = PrimitiveParsers.parseColor(styleMap?['color']);
    final alignment = GeometryParsers.parseAlignment(styleMap?['alignment']);
    final constraints = GeometryParsers.parseBoxConstraints(styleMap?['constraints']);
    
    final clipBehavior = GeometryParsers.parseClipBehavior(styleMap?['clipBehavior']);
    final transformAlignment = GeometryParsers.parseAlignment(styleMap?['transformAlignment']);
    final transform = GeometryParsers.parseTransform(styleMap?['transform']);
    
    // 获取id属性（用于测试和调试）
    final id = vdom.getProp<String>('id');
    
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
    
    final decorationMap = styleMap?['decoration'] as Map<String, dynamic>?;
    
    if (decorationMap != null) {
      // 如果有decoration，使用decoration（可能包含color、border等）
      decoration = GeometryParsers.parseDecoration(decorationMap);
    } else if (color != null) {
      // 如果没有decoration但有color，直接使用Container.color
      containerColor = color;
    }
    
    // 解析foregroundDecoration（前景装饰，在子组件之上绘制）
    final foregroundDecorationMap = styleMap?['foregroundDecoration'] as Map<String, dynamic>?;
    Decoration? foregroundDecoration;
    if (foregroundDecorationMap != null) {
      foregroundDecoration = GeometryParsers.parseDecoration(foregroundDecorationMap);
    }
    
    // 如果没有child但有width/height，添加一个空的SizedBox确保Container有尺寸
    Widget? finalChild = child;
    if (child == null && (width != null || height != null)) {
      finalChild = const SizedBox.expand();
    }
    
    return Container(
      key: id != null ? Key(id) : null,  // 使用id作为key
      width: width,
      height: height,
      padding: padding,
      margin: margin,
      color: containerColor,
      decoration: decoration,
      foregroundDecoration: foregroundDecoration,  // 新增前景装饰
      alignment: alignment,
      constraints: constraints,
      clipBehavior: clipBehavior,  // 新增裁剪行为
      transformAlignment: transformAlignment,  // 新增变换中心点
      transform: transform,  // 新增Matrix4变换
      child: finalChild,
    );
  }
  
}
