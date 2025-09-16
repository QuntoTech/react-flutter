import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';
import '../../utils/style_parsers/index.dart';

/// SingleChildScrollView组件映射
class SingleChildScrollViewComponent extends FlutterComponent {
  @override
  String get componentType => 'SingleChildScrollView';
  
  @override
  String get description => 'Flutter SingleChildScrollView组件映射';
  
  @override
  Map<String, Type> get supportedProps => {
    'scrollDirection': String,  // 独立属性 - 功能配置
    'reverse': bool,           // 独立属性 - 功能配置
    'style': Map,              // style属性 - 视觉样式
    'id': String,              // 独立属性 - 标识
  };
  
  @override
  bool get supportsChildren => true;
  
  @override
  Widget build(VirtualDOM vdom) {
    // 解析独立属性（功能配置）
    final scrollDirection = LayoutParsers.parseScrollDirection(
      vdom.getProp<String>('scrollDirection')
    );
    final reverse = vdom.getProp<bool>('reverse') ?? false;
    final id = vdom.getProp<String>('id');
    
    // 解析style属性（视觉样式）
    final styleMap = vdom.props['style'] as Map<String, dynamic>?;
    final padding = PrimitiveParsers.parseEdgeInsets(styleMap?['padding']);
    final physics = LayoutParsers.parseScrollPhysics(styleMap?['physics']);
    
    // 解析裁剪行为（SingleChildScrollView默认为hardEdge）
    final clipBehaviorValue = styleMap?['clipBehavior'];
    final clipBehavior = clipBehaviorValue != null 
        ? GeometryParsers.parseClipBehavior(clipBehaviorValue) 
        : Clip.hardEdge;
    
    // 构建子组件（SingleChildScrollView只有一个子组件）
    final List<Widget> childrenWidgets = vdom.getChildrenList()
        .map((childVdom) => ComponentRegistry.instance.buildComponent(childVdom))
        .where((widget) => widget != null)
        .cast<Widget>()
        .toList();
    
    final Widget? child = childrenWidgets.isNotEmpty ? childrenWidgets.first : null;
    
    return SingleChildScrollView(
      key: id != null ? Key(id) : null,  // 使用id作为key
      scrollDirection: scrollDirection,
      reverse: reverse,
      padding: padding,
      physics: physics,
      clipBehavior: clipBehavior,
      child: child,
    );
  }
}
