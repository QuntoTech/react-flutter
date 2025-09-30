import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';
import '../../utils/style_parsers/foundation/primitive_parsers.dart';

class PaddingComponent extends FlutterComponent {
  @override
  String get componentType => 'Padding';

  @override
  String get description => 'Flutter Padding组件映射';

  @override
  Map<String, Type> get supportedProps => {
    'padding': Map,
    'id': String,
  };

  @override
  bool get supportsChildren => true;

  @override
  Widget build(VirtualDOM vdom) {
    final paddingMap = vdom.getProp<Map<String, dynamic>>('padding');
    final id = vdom.getProp<String>('id');

    if (paddingMap == null) {
      throw FlutterError('Padding组件必须设置padding属性');
    }

    final padding = PrimitiveParsers.parseEdgeInsets(paddingMap);
    if (padding == null) {
      throw FlutterError('无法解析padding属性: $paddingMap');
    }

    final childVdomList = vdom.getChildrenList();
    Widget? child;
    if (childVdomList.isNotEmpty) {
      child = ComponentRegistry.instance.buildComponent(childVdomList.first);
    }

    if (child == null) {
      return const SizedBox.shrink();
    }

    return Padding(
      key: id != null ? Key(id) : null,
      padding: padding,
      child: child,
    );
  }
}
