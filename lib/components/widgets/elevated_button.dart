import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';
import '../../utils/style_parsers/index.dart';
import '../../utils/type_converters.dart';

/// ElevatedButton组件映射
class ElevatedButtonComponent extends FlutterComponent {
  
  @override
  String get componentType => 'ElevatedButton';
  
  @override
  String get description => 'Flutter ElevatedButton组件映射';
  
  @override
  Map<String, Type> get supportedProps => {
    'style': Map,                   // 统一style属性，包含所有视觉样式
    'onPressed': String,            // 点击事件 - 独立属性
    'onLongPress': String,          // 长按事件 - 独立属性
    'onHover': String,              // 悬停事件 - 独立属性
    'onFocusChange': String,        // 焦点事件 - 独立属性
    'autofocus': bool,              // 自动焦点 - 独立属性
    'clipBehavior': String,         // 裁剪行为 - 独立属性
    'id': String,                   // 标识属性
  };
  
  @override
  List<String> get supportedEvents => ['onPressed', 'onLongPress', 'onHover', 'onFocusChange'];
  
  @override
  bool get supportsChildren => true;
  
  @override
  Widget build(VirtualDOM vdom) {
    // 解析style属性（视觉样式）
    final styleMap = vdom.props['style'] as Map<String, dynamic>?;
    final buttonStyle = ButtonParsers.parseElevatedButtonStyle(styleMap);
    
    // 解析独立属性（行为、事件）
    final onPressedEvent = vdom.getProp<String>('onPressed');
    final onLongPressEvent = vdom.getProp<String>('onLongPress');
    final onHoverEvent = vdom.getProp<String>('onHover');
    final onFocusChangeEvent = vdom.getProp<String>('onFocusChange');
    final autofocus = vdom.getPropOrDefault<bool>('autofocus', false);
    final clipBehavior = GeometryParsers.parseClipBehavior(vdom.getProp<String>('clipBehavior'));
    final id = vdom.getProp<String>('id');
    
    // 处理事件回调
    VoidCallback? onPressed;
    if (onPressedEvent != null) {
      onPressed = () => ComponentRegistry.instance.triggerEvent(onPressedEvent);
    }
    
    VoidCallback? onLongPress;
    if (onLongPressEvent != null) {
      onLongPress = () => ComponentRegistry.instance.triggerEvent(onLongPressEvent);
    }
    
    ValueChanged<bool>? onHover;
    if (onHoverEvent != null) {
      onHover = (hovering) => ComponentRegistry.instance.triggerEvent(onHoverEvent);
    }
    
    ValueChanged<bool>? onFocusChange;
    if (onFocusChangeEvent != null) {
      onFocusChange = (focused) => ComponentRegistry.instance.triggerEvent(onFocusChangeEvent);
    }
    
    // 构建子元素
    final List<Widget> childrenWidgets = vdom.getChildrenList()
        .map((childVdom) => ComponentRegistry.instance.buildComponent(childVdom))
        .where((widget) => widget != null)
        .cast<Widget>()
        .toList();
    
    final Widget? child = childrenWidgets.isNotEmpty ? childrenWidgets.first : null;
    
    return ElevatedButton(
      key: id != null ? Key(id) : null,
      onPressed: onPressed,
      onLongPress: onLongPress,
      onHover: onHover,
      onFocusChange: onFocusChange,
      style: buttonStyle,
      autofocus: autofocus,
      clipBehavior: clipBehavior ?? Clip.none,
      child: child,
    );
  }
}
