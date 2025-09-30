import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/rendering.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';
import '../../utils/gesture_parsers.dart';
import '../../utils/style_parsers/foundation/geometry_parsers.dart';

/// Flutter GestureDetector组件映射
/// 
/// 完全对齐Flutter GestureDetector API
/// 支持所有手势类型和回调
class GestureDetectorComponent extends FlutterComponent {
  @override
  String get componentType => 'GestureDetector';

  @override
  String get description => 'Flutter GestureDetector组件映射';

  @override
  Map<String, Type> get supportedProps => {
    // Tap手势
    'onTap': String,
    'onTapDown': String,
    'onTapUp': String,
    'onTapCancel': String,
    
    // DoubleTap手势
    'onDoubleTap': String,
    'onDoubleTapDown': String,
    'onDoubleTapCancel': String,
    
    // LongPress手势
    'onLongPress': String,
    'onLongPressDown': String,
    'onLongPressStart': String,
    'onLongPressMoveUpdate': String,
    'onLongPressUp': String,
    'onLongPressEnd': String,
    'onLongPressCancel': String,
    
    // SecondaryTap手势
    'onSecondaryTap': String,
    'onSecondaryTapDown': String,
    'onSecondaryTapUp': String,
    'onSecondaryTapCancel': String,
    
    // TertiaryTap手势
    'onTertiaryTap': String,
    'onTertiaryTapDown': String,
    'onTertiaryTapUp': String,
    'onTertiaryTapCancel': String,
    
    // SecondaryLongPress手势
    'onSecondaryLongPress': String,
    'onSecondaryLongPressDown': String,
    'onSecondaryLongPressStart': String,
    'onSecondaryLongPressMoveUpdate': String,
    'onSecondaryLongPressUp': String,
    'onSecondaryLongPressEnd': String,
    
    // TertiaryLongPress手势
    'onTertiaryLongPress': String,
    'onTertiaryLongPressDown': String,
    'onTertiaryLongPressStart': String,
    'onTertiaryLongPressMoveUpdate': String,
    'onTertiaryLongPressUp': String,
    'onTertiaryLongPressEnd': String,
    
    // Pan手势
    'onPanDown': String,
    'onPanStart': String,
    'onPanUpdate': String,
    'onPanEnd': String,
    'onPanCancel': String,
    
    // HorizontalDrag手势
    'onHorizontalDragDown': String,
    'onHorizontalDragStart': String,
    'onHorizontalDragUpdate': String,
    'onHorizontalDragEnd': String,
    'onHorizontalDragCancel': String,
    
    // VerticalDrag手势
    'onVerticalDragDown': String,
    'onVerticalDragStart': String,
    'onVerticalDragUpdate': String,
    'onVerticalDragEnd': String,
    'onVerticalDragCancel': String,
    
    // Scale手势
    'onScaleStart': String,
    'onScaleUpdate': String,
    'onScaleEnd': String,
    
    // ForcePress手势
    'onForcePressStart': String,
    'onForcePressPeak': String,
    'onForcePressUpdate': String,
    'onForcePressEnd': String,
    
    // 行为控制
    'behavior': String,
    'excludeFromSemantics': bool,
    'dragStartBehavior': String,
    'trackpadScrollCausesScale': bool,
    'trackpadScrollToScaleFactor': num,
    
    'id': String,
  };

  @override
  List<String> get supportedEvents => [
    'onTap', 'onTapDown', 'onTapUp', 'onTapCancel',
    'onDoubleTap', 'onDoubleTapDown', 'onDoubleTapCancel',
    'onLongPress', 'onLongPressDown', 'onLongPressStart', 'onLongPressMoveUpdate', 'onLongPressUp', 'onLongPressEnd', 'onLongPressCancel',
    'onSecondaryTap', 'onSecondaryTapDown', 'onSecondaryTapUp', 'onSecondaryTapCancel',
    'onTertiaryTap', 'onTertiaryTapDown', 'onTertiaryTapUp', 'onTertiaryTapCancel',
    'onSecondaryLongPress', 'onSecondaryLongPressDown', 'onSecondaryLongPressStart', 'onSecondaryLongPressMoveUpdate', 'onSecondaryLongPressUp', 'onSecondaryLongPressEnd',
    'onTertiaryLongPress', 'onTertiaryLongPressDown', 'onTertiaryLongPressStart', 'onTertiaryLongPressMoveUpdate', 'onTertiaryLongPressUp', 'onTertiaryLongPressEnd',
    'onPanDown', 'onPanStart', 'onPanUpdate', 'onPanEnd', 'onPanCancel',
    'onHorizontalDragDown', 'onHorizontalDragStart', 'onHorizontalDragUpdate', 'onHorizontalDragEnd', 'onHorizontalDragCancel',
    'onVerticalDragDown', 'onVerticalDragStart', 'onVerticalDragUpdate', 'onVerticalDragEnd', 'onVerticalDragCancel',
    'onScaleStart', 'onScaleUpdate', 'onScaleEnd',
    'onForcePressStart', 'onForcePressPeak', 'onForcePressUpdate', 'onForcePressEnd',
  ];

  @override
  bool get supportsChildren => true;

  @override
  Widget build(VirtualDOM vdom) {
    final id = vdom.getProp<String>('id');
    
    // 解析行为控制属性
    final behavior = _parseHitTestBehavior(vdom.getProp<String>('behavior'));
    final excludeFromSemantics = vdom.getProp<bool>('excludeFromSemantics') ?? false;
    final dragStartBehavior = _parseDragStartBehavior(vdom.getProp<String>('dragStartBehavior')) ?? DragStartBehavior.start;
    
    // 获取所有事件ID
    final onTap = vdom.getProp<String>('onTap');
    final onTapDown = vdom.getProp<String>('onTapDown');
    final onTapUp = vdom.getProp<String>('onTapUp');
    final onTapCancel = vdom.getProp<String>('onTapCancel');
    
    final onDoubleTap = vdom.getProp<String>('onDoubleTap');
    final onDoubleTapDown = vdom.getProp<String>('onDoubleTapDown');
    final onDoubleTapCancel = vdom.getProp<String>('onDoubleTapCancel');
    
    final onLongPress = vdom.getProp<String>('onLongPress');
    final onLongPressDown = vdom.getProp<String>('onLongPressDown');
    final onLongPressStart = vdom.getProp<String>('onLongPressStart');
    final onLongPressMoveUpdate = vdom.getProp<String>('onLongPressMoveUpdate');
    final onLongPressUp = vdom.getProp<String>('onLongPressUp');
    final onLongPressEnd = vdom.getProp<String>('onLongPressEnd');
    final onLongPressCancel = vdom.getProp<String>('onLongPressCancel');
    
    final onSecondaryTap = vdom.getProp<String>('onSecondaryTap');
    final onSecondaryTapDown = vdom.getProp<String>('onSecondaryTapDown');
    final onSecondaryTapUp = vdom.getProp<String>('onSecondaryTapUp');
    final onSecondaryTapCancel = vdom.getProp<String>('onSecondaryTapCancel');
    
    final onTertiaryTapDown = vdom.getProp<String>('onTertiaryTapDown');
    final onTertiaryTapUp = vdom.getProp<String>('onTertiaryTapUp');
    final onTertiaryTapCancel = vdom.getProp<String>('onTertiaryTapCancel');
    
    final onSecondaryLongPress = vdom.getProp<String>('onSecondaryLongPress');
    final onSecondaryLongPressDown = vdom.getProp<String>('onSecondaryLongPressDown');
    final onSecondaryLongPressStart = vdom.getProp<String>('onSecondaryLongPressStart');
    final onSecondaryLongPressMoveUpdate = vdom.getProp<String>('onSecondaryLongPressMoveUpdate');
    final onSecondaryLongPressUp = vdom.getProp<String>('onSecondaryLongPressUp');
    final onSecondaryLongPressEnd = vdom.getProp<String>('onSecondaryLongPressEnd');
    
    final onTertiaryLongPress = vdom.getProp<String>('onTertiaryLongPress');
    final onTertiaryLongPressDown = vdom.getProp<String>('onTertiaryLongPressDown');
    final onTertiaryLongPressStart = vdom.getProp<String>('onTertiaryLongPressStart');
    final onTertiaryLongPressMoveUpdate = vdom.getProp<String>('onTertiaryLongPressMoveUpdate');
    final onTertiaryLongPressUp = vdom.getProp<String>('onTertiaryLongPressUp');
    final onTertiaryLongPressEnd = vdom.getProp<String>('onTertiaryLongPressEnd');
    
    final onPanDown = vdom.getProp<String>('onPanDown');
    final onPanStart = vdom.getProp<String>('onPanStart');
    final onPanUpdate = vdom.getProp<String>('onPanUpdate');
    final onPanEnd = vdom.getProp<String>('onPanEnd');
    final onPanCancel = vdom.getProp<String>('onPanCancel');
    
    final onHorizontalDragDown = vdom.getProp<String>('onHorizontalDragDown');
    final onHorizontalDragStart = vdom.getProp<String>('onHorizontalDragStart');
    final onHorizontalDragUpdate = vdom.getProp<String>('onHorizontalDragUpdate');
    final onHorizontalDragEnd = vdom.getProp<String>('onHorizontalDragEnd');
    final onHorizontalDragCancel = vdom.getProp<String>('onHorizontalDragCancel');
    
    final onVerticalDragDown = vdom.getProp<String>('onVerticalDragDown');
    final onVerticalDragStart = vdom.getProp<String>('onVerticalDragStart');
    final onVerticalDragUpdate = vdom.getProp<String>('onVerticalDragUpdate');
    final onVerticalDragEnd = vdom.getProp<String>('onVerticalDragEnd');
    final onVerticalDragCancel = vdom.getProp<String>('onVerticalDragCancel');
    
    final onScaleStart = vdom.getProp<String>('onScaleStart');
    final onScaleUpdate = vdom.getProp<String>('onScaleUpdate');
    final onScaleEnd = vdom.getProp<String>('onScaleEnd');
    
    final onForcePressStart = vdom.getProp<String>('onForcePressStart');
    final onForcePressPeak = vdom.getProp<String>('onForcePressPeak');
    final onForcePressUpdate = vdom.getProp<String>('onForcePressUpdate');
    final onForcePressEnd = vdom.getProp<String>('onForcePressEnd');
    
    // 获取子组件
    final childVdomList = vdom.getChildrenList();
    Widget? child;
    if (childVdomList.isNotEmpty) {
      child = ComponentRegistry.instance.buildComponent(childVdomList.first);
    }
    
    return GestureDetector(
      key: id != null ? Key(id) : null,
      
      // Tap手势
      onTap: onTap != null ? () => ComponentRegistry.instance.triggerEvent(onTap, null) : null,
      onTapDown: onTapDown != null ? (details) => ComponentRegistry.instance.triggerEvent(onTapDown, GestureParsers.tapDownDetailsToJson(details)) : null,
      onTapUp: onTapUp != null ? (details) => ComponentRegistry.instance.triggerEvent(onTapUp, GestureParsers.tapUpDetailsToJson(details)) : null,
      onTapCancel: onTapCancel != null ? () => ComponentRegistry.instance.triggerEvent(onTapCancel, null) : null,
      
      // DoubleTap手势
      onDoubleTap: onDoubleTap != null ? () => ComponentRegistry.instance.triggerEvent(onDoubleTap, null) : null,
      onDoubleTapDown: onDoubleTapDown != null ? (details) => ComponentRegistry.instance.triggerEvent(onDoubleTapDown, GestureParsers.tapDownDetailsToJson(details)) : null,
      onDoubleTapCancel: onDoubleTapCancel != null ? () => ComponentRegistry.instance.triggerEvent(onDoubleTapCancel, null) : null,
      
      // LongPress手势
      onLongPress: onLongPress != null ? () => ComponentRegistry.instance.triggerEvent(onLongPress, null) : null,
      onLongPressDown: onLongPressDown != null ? (details) => ComponentRegistry.instance.triggerEvent(onLongPressDown, GestureParsers.longPressDownDetailsToJson(details)) : null,
      onLongPressStart: onLongPressStart != null ? (details) => ComponentRegistry.instance.triggerEvent(onLongPressStart, GestureParsers.longPressStartDetailsToJson(details)) : null,
      onLongPressMoveUpdate: onLongPressMoveUpdate != null ? (details) => ComponentRegistry.instance.triggerEvent(onLongPressMoveUpdate, GestureParsers.longPressMoveUpdateDetailsToJson(details)) : null,
      onLongPressUp: onLongPressUp != null ? () => ComponentRegistry.instance.triggerEvent(onLongPressUp, null) : null,
      onLongPressEnd: onLongPressEnd != null ? (details) => ComponentRegistry.instance.triggerEvent(onLongPressEnd, GestureParsers.longPressEndDetailsToJson(details)) : null,
      onLongPressCancel: onLongPressCancel != null ? () => ComponentRegistry.instance.triggerEvent(onLongPressCancel, null) : null,
      
      // SecondaryTap手势
      onSecondaryTap: onSecondaryTap != null ? () => ComponentRegistry.instance.triggerEvent(onSecondaryTap, null) : null,
      onSecondaryTapDown: onSecondaryTapDown != null ? (details) => ComponentRegistry.instance.triggerEvent(onSecondaryTapDown, GestureParsers.tapDownDetailsToJson(details)) : null,
      onSecondaryTapUp: onSecondaryTapUp != null ? (details) => ComponentRegistry.instance.triggerEvent(onSecondaryTapUp, GestureParsers.tapUpDetailsToJson(details)) : null,
      onSecondaryTapCancel: onSecondaryTapCancel != null ? () => ComponentRegistry.instance.triggerEvent(onSecondaryTapCancel, null) : null,
      
      // TertiaryTap手势
      onTertiaryTapDown: onTertiaryTapDown != null ? (details) => ComponentRegistry.instance.triggerEvent(onTertiaryTapDown, GestureParsers.tapDownDetailsToJson(details)) : null,
      onTertiaryTapUp: onTertiaryTapUp != null ? (details) => ComponentRegistry.instance.triggerEvent(onTertiaryTapUp, GestureParsers.tapUpDetailsToJson(details)) : null,
      onTertiaryTapCancel: onTertiaryTapCancel != null ? () => ComponentRegistry.instance.triggerEvent(onTertiaryTapCancel, null) : null,
      
      // SecondaryLongPress手势
      onSecondaryLongPress: onSecondaryLongPress != null ? () => ComponentRegistry.instance.triggerEvent(onSecondaryLongPress, null) : null,
      onSecondaryLongPressDown: onSecondaryLongPressDown != null ? (details) => ComponentRegistry.instance.triggerEvent(onSecondaryLongPressDown, GestureParsers.longPressDownDetailsToJson(details)) : null,
      onSecondaryLongPressStart: onSecondaryLongPressStart != null ? (details) => ComponentRegistry.instance.triggerEvent(onSecondaryLongPressStart, GestureParsers.longPressStartDetailsToJson(details)) : null,
      onSecondaryLongPressMoveUpdate: onSecondaryLongPressMoveUpdate != null ? (details) => ComponentRegistry.instance.triggerEvent(onSecondaryLongPressMoveUpdate, GestureParsers.longPressMoveUpdateDetailsToJson(details)) : null,
      onSecondaryLongPressUp: onSecondaryLongPressUp != null ? () => ComponentRegistry.instance.triggerEvent(onSecondaryLongPressUp, null) : null,
      onSecondaryLongPressEnd: onSecondaryLongPressEnd != null ? (details) => ComponentRegistry.instance.triggerEvent(onSecondaryLongPressEnd, GestureParsers.longPressEndDetailsToJson(details)) : null,
      
      // TertiaryLongPress手势
      onTertiaryLongPress: onTertiaryLongPress != null ? () => ComponentRegistry.instance.triggerEvent(onTertiaryLongPress, null) : null,
      onTertiaryLongPressDown: onTertiaryLongPressDown != null ? (details) => ComponentRegistry.instance.triggerEvent(onTertiaryLongPressDown, GestureParsers.longPressDownDetailsToJson(details)) : null,
      onTertiaryLongPressStart: onTertiaryLongPressStart != null ? (details) => ComponentRegistry.instance.triggerEvent(onTertiaryLongPressStart, GestureParsers.longPressStartDetailsToJson(details)) : null,
      onTertiaryLongPressMoveUpdate: onTertiaryLongPressMoveUpdate != null ? (details) => ComponentRegistry.instance.triggerEvent(onTertiaryLongPressMoveUpdate, GestureParsers.longPressMoveUpdateDetailsToJson(details)) : null,
      onTertiaryLongPressUp: onTertiaryLongPressUp != null ? () => ComponentRegistry.instance.triggerEvent(onTertiaryLongPressUp, null) : null,
      onTertiaryLongPressEnd: onTertiaryLongPressEnd != null ? (details) => ComponentRegistry.instance.triggerEvent(onTertiaryLongPressEnd, GestureParsers.longPressEndDetailsToJson(details)) : null,
      
      // Pan手势
      onPanDown: onPanDown != null ? (details) => ComponentRegistry.instance.triggerEvent(onPanDown, GestureParsers.dragDownDetailsToJson(details)) : null,
      onPanStart: onPanStart != null ? (details) => ComponentRegistry.instance.triggerEvent(onPanStart, GestureParsers.dragStartDetailsToJson(details)) : null,
      onPanUpdate: onPanUpdate != null ? (details) => ComponentRegistry.instance.triggerEvent(onPanUpdate, GestureParsers.dragUpdateDetailsToJson(details)) : null,
      onPanEnd: onPanEnd != null ? (details) => ComponentRegistry.instance.triggerEvent(onPanEnd, GestureParsers.dragEndDetailsToJson(details)) : null,
      onPanCancel: onPanCancel != null ? () => ComponentRegistry.instance.triggerEvent(onPanCancel, null) : null,
      
      // HorizontalDrag手势
      onHorizontalDragDown: onHorizontalDragDown != null ? (details) => ComponentRegistry.instance.triggerEvent(onHorizontalDragDown, GestureParsers.dragDownDetailsToJson(details)) : null,
      onHorizontalDragStart: onHorizontalDragStart != null ? (details) => ComponentRegistry.instance.triggerEvent(onHorizontalDragStart, GestureParsers.dragStartDetailsToJson(details)) : null,
      onHorizontalDragUpdate: onHorizontalDragUpdate != null ? (details) => ComponentRegistry.instance.triggerEvent(onHorizontalDragUpdate, GestureParsers.dragUpdateDetailsToJson(details)) : null,
      onHorizontalDragEnd: onHorizontalDragEnd != null ? (details) => ComponentRegistry.instance.triggerEvent(onHorizontalDragEnd, GestureParsers.dragEndDetailsToJson(details)) : null,
      onHorizontalDragCancel: onHorizontalDragCancel != null ? () => ComponentRegistry.instance.triggerEvent(onHorizontalDragCancel, null) : null,
      
      // VerticalDrag手势
      onVerticalDragDown: onVerticalDragDown != null ? (details) => ComponentRegistry.instance.triggerEvent(onVerticalDragDown, GestureParsers.dragDownDetailsToJson(details)) : null,
      onVerticalDragStart: onVerticalDragStart != null ? (details) => ComponentRegistry.instance.triggerEvent(onVerticalDragStart, GestureParsers.dragStartDetailsToJson(details)) : null,
      onVerticalDragUpdate: onVerticalDragUpdate != null ? (details) => ComponentRegistry.instance.triggerEvent(onVerticalDragUpdate, GestureParsers.dragUpdateDetailsToJson(details)) : null,
      onVerticalDragEnd: onVerticalDragEnd != null ? (details) => ComponentRegistry.instance.triggerEvent(onVerticalDragEnd, GestureParsers.dragEndDetailsToJson(details)) : null,
      onVerticalDragCancel: onVerticalDragCancel != null ? () => ComponentRegistry.instance.triggerEvent(onVerticalDragCancel, null) : null,
      
      // Scale手势
      onScaleStart: onScaleStart != null ? (details) => ComponentRegistry.instance.triggerEvent(onScaleStart, GestureParsers.scaleStartDetailsToJson(details)) : null,
      onScaleUpdate: onScaleUpdate != null ? (details) => ComponentRegistry.instance.triggerEvent(onScaleUpdate, GestureParsers.scaleUpdateDetailsToJson(details)) : null,
      onScaleEnd: onScaleEnd != null ? (details) => ComponentRegistry.instance.triggerEvent(onScaleEnd, GestureParsers.scaleEndDetailsToJson(details)) : null,
      
      // ForcePress手势
      onForcePressStart: onForcePressStart != null ? (details) => ComponentRegistry.instance.triggerEvent(onForcePressStart, GestureParsers.forcePressDetailsToJson(details)) : null,
      onForcePressPeak: onForcePressPeak != null ? (details) => ComponentRegistry.instance.triggerEvent(onForcePressPeak, GestureParsers.forcePressDetailsToJson(details)) : null,
      onForcePressUpdate: onForcePressUpdate != null ? (details) => ComponentRegistry.instance.triggerEvent(onForcePressUpdate, GestureParsers.forcePressDetailsToJson(details)) : null,
      onForcePressEnd: onForcePressEnd != null ? (details) => ComponentRegistry.instance.triggerEvent(onForcePressEnd, GestureParsers.forcePressDetailsToJson(details)) : null,
      
      // 行为控制
      behavior: behavior,
      excludeFromSemantics: excludeFromSemantics,
      dragStartBehavior: dragStartBehavior,
      
      child: child,
    );
  }

  /// 解析HitTestBehavior
  static HitTestBehavior? _parseHitTestBehavior(String? value) {
    if (value == null) return null;
    switch (value) {
      case 'deferToChild':
        return HitTestBehavior.deferToChild;
      case 'opaque':
        return HitTestBehavior.opaque;
      case 'translucent':
        return HitTestBehavior.translucent;
      default:
        return null;
    }
  }

  /// 解析DragStartBehavior
  static DragStartBehavior? _parseDragStartBehavior(String? value) {
    if (value == null) return null;
    switch (value) {
      case 'down':
        return DragStartBehavior.down;
      case 'start':
        return DragStartBehavior.start;
      default:
        return null;
    }
  }
}