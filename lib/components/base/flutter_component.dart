import 'package:flutter/material.dart';
import '../../core/virtual_dom_parser.dart';

/// Flutter组件基类
/// 所有React到Flutter的组件映射都需要继承此基类
abstract class FlutterComponent {
  /// 组件类型名称，对应React中的组件名
  String get componentType;
  
  /// 构建Flutter Widget
  Widget build(VirtualDOM vdom);
  
  /// 支持的属性列表
  Map<String, Type> get supportedProps => {};
  
  /// 支持的事件列表
  List<String> get supportedEvents => [];
  
  /// 是否支持子元素
  bool get supportsChildren => true;
  
  /// 组件描述（用于调试和文档）
  String get description => '${componentType}组件映射';
}
