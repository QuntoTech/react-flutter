import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';

/// Flutter Expanded组件映射
/// 
/// Expanded组件使子组件在主轴方向上扩展以填充可用空间
/// 必须用作Row、Column或Flex的直接子组件
class ExpandedComponent extends FlutterComponent {
  @override
  String get componentType => 'Expanded';

  @override
  String get description => 'Flutter Expanded组件映射';

  @override
  Map<String, Type> get supportedProps => {
    'flex': int,
    'id': String,
  };

  @override
  bool get supportsChildren => true;

  @override
  Widget build(VirtualDOM vdom) {
    // 解析Expanded属性
    final flex = vdom.getProp<num>('flex')?.toInt() ?? 1;
    final id = vdom.getProp<String>('id');
    
    // Expanded只支持单个子组件
    final childVdomList = vdom.getChildrenList();
    if (childVdomList.isEmpty) {
      debugPrint('⚠️ Expanded组件缺少子组件');
      return const SizedBox.shrink();
    }
    
    final child = ComponentRegistry.instance.buildComponent(childVdomList.first);
    if (child == null) {
      debugPrint('⚠️ Expanded组件无法构建子组件');
      return const SizedBox.shrink();
    }
    
    // 构建Expanded组件
    return Expanded(
      key: id != null ? Key(id) : null,
      flex: flex,
      child: child,
    );
  }
}
