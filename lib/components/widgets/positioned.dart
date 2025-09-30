import 'package:flutter/material.dart';
import '../base/flutter_component.dart';
import '../../core/virtual_dom_parser.dart';
import '../../core/component_registry.dart';
import '../../utils/type_converters.dart';


/// Positioned组件映射
class PositionedComponent extends FlutterComponent {
  @override
  String get componentType => 'Positioned';
  
  @override
  String get description => 'Flutter Positioned组件映射 - 绝对定位';
  
  @override
  Map<String, Type> get supportedProps => {
    'left': num,                  // 距离左边距离
    'top': num,                   // 距离顶部距离  
    'right': num,                 // 距离右边距离
    'bottom': num,                // 距离底部距离
    'width': num,                 // 指定宽度
    'height': num,                // 指定高度
    'id': String,                 // 标识属性
  };
  
  @override
  bool get supportsChildren => true;
  
  @override
  Widget build(VirtualDOM vdom) {
    // 解析Positioned属性
    final left = vdom.getProp<num>('left')?.toDouble();
    final top = vdom.getProp<num>('top')?.toDouble();
    final right = vdom.getProp<num>('right')?.toDouble();
    final bottom = vdom.getProp<num>('bottom')?.toDouble();
    final width = vdom.getProp<num>('width')?.toDouble();
    final height = vdom.getProp<num>('height')?.toDouble();
    
    // 获取id属性（用于测试和调试）
    final id = vdom.getProp<String>('id');
    
    // Positioned应该只有一个子组件
    final childVdomList = vdom.getChildrenList();
    Widget? child;
    if (childVdomList.isNotEmpty) {
      child = ComponentRegistry.instance.buildComponent(childVdomList.first);
    }
    
    if (child == null) {
      debugPrint('⚠️ Positioned组件缺少子组件');
      return const SizedBox.shrink();
    }
    
    
    // 构建Positioned组件
    return Positioned(
      key: id != null ? Key(id) : null,
      left: left,
      top: top,
      right: right,
      bottom: bottom,
      width: width,
      height: height,
      child: child,
    );
  }
}
