import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';

class CenterComponent extends FlutterComponent {
  @override
  String get componentType => 'Center';

  @override
  String get description => 'Flutter Center组件映射';

  @override
  Map<String, Type> get supportedProps => {
    'widthFactor': num,
    'heightFactor': num,
    'id': String,
  };

  @override
  bool get supportsChildren => true;

  @override
  Widget build(VirtualDOM vdom) {
    final widthFactor = vdom.getProp<num>('widthFactor')?.toDouble();
    final heightFactor = vdom.getProp<num>('heightFactor')?.toDouble();
    final id = vdom.getProp<String>('id');

    final childVdomList = vdom.getChildrenList();
    Widget? child;
    if (childVdomList.isNotEmpty) {
      child = ComponentRegistry.instance.buildComponent(childVdomList.first);
    }

    if (child == null) {
      return const SizedBox.shrink();
    }

    return Center(
      key: id != null ? Key(id) : null,
      widthFactor: widthFactor,
      heightFactor: heightFactor,
      child: child,
    );
  }
}
