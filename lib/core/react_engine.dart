import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:flutter_js/flutter_js.dart';
import 'virtual_dom_parser.dart';
import 'component_registry.dart';

// 开发模式调试输出控制
const bool _kDebugMode = false;

/// 简化的React引擎
/// 专注于基本的JavaScript执行和渲染
class ReactEngine {
  static final ReactEngine _instance = ReactEngine._internal();
  factory ReactEngine() => _instance;
  ReactEngine._internal();
  
  static ReactEngine get instance => _instance;
  
  JavascriptRuntime? _jsRuntime;
  bool _initialized = false;
  String _lastError = '';
  
  /// 初始化React引擎
  Future<bool> initialize() async {
    if (_initialized) return true;
    
    try {
      if (_kDebugMode) debugPrint('🚀 Initializing React Engine');
      
      _jsRuntime = getJavascriptRuntime();
      
      // 加载js-core包
      await _loadJSCore();
      
      _initialized = true;
      if (_kDebugMode) debugPrint('✅ React Engine initialized');
      return true;
      
    } catch (e) {
      _lastError = '初始化失败: $e';
      if (_kDebugMode) debugPrint('❌ $_lastError');
      return false;
    }
  }
  
  /// 渲染React组件
  Future<Widget?> renderComponent(String componentName, {
    Map<String, dynamic>? props,
    Function(String)? onEvent,
  }) async {
    // Rendering component: $componentName
    
    if (!_initialized) {
      await initialize();
    }
    
    if (_jsRuntime == null) {
      if (_kDebugMode) debugPrint('❌ JS运行时未初始化');
      return null;
    }
    
    try {
      // 构建props
      final propsJson = props != null ? _mapToJsObject(props) : '{}';
      
      // 调用渲染方法
      final result = _jsRuntime!.evaluate('FlutterReactCore.renderAgentComponent("CounterAgent", $propsJson)');
      
      final jsonString = result.rawResult.toString();
      if (_kDebugMode) debugPrint('📥 渲染结果: $jsonString');
      
      // 解析JSON
      final json = VirtualDOMParser.parseFromJson(jsonString);
      
      // 设置事件回调
      if (onEvent != null) {
        ComponentRegistry.instance.setEventCallback(onEvent);
      }
      
      // 构建Widget
      return ComponentRegistry.instance.buildComponent(json);
      
    } catch (e) {
      _lastError = '渲染失败: $e';
      if (_kDebugMode) debugPrint('❌ $_lastError');
      return _buildErrorWidget(_lastError);
    }
  }
  
  /// 加载js-core包
  Future<void> _loadJSCore() async {
    try {
      if (_kDebugMode) debugPrint('📦 Loading js-core package');

      // 加载core包
      final coreJS = await rootBundle.loadString('packages/core/dist/index.js');
      if (_kDebugMode) debugPrint('📄 Core package loaded, size: ${coreJS.length} characters');
      
      try {
        final result = _jsRuntime!.evaluate(coreJS);
        if (_kDebugMode) debugPrint('📋 Core execution result: ${result.rawResult}');
      } catch (e) {
        if (_kDebugMode) debugPrint('❌ Core execution error: $e');
        throw Exception('js-core代码执行失败: $e');
      }
      
      // 检查FlutterReactCore是否成功
      final coreExists = _jsRuntime!.evaluate('typeof FlutterReactCore');
      if (_kDebugMode) debugPrint('🔍 FlutterReactCore type: ${coreExists.rawResult}');
      
      // 加载components包
      final componentsJS = await rootBundle.loadString('packages/components/dist/index.js');
      if (_kDebugMode) debugPrint('📄 Components package loaded, size: ${componentsJS.length} characters');
      
      try {
        final result = _jsRuntime!.evaluate(componentsJS);
        if (_kDebugMode) debugPrint('📋 Components execution result: ${result.rawResult}');
      } catch (e) {
        if (_kDebugMode) debugPrint('❌ Components execution error: $e');
        throw Exception('components代码执行失败: $e');
      }
      
      // 检查ReactFlutterComponents是否成功
      final componentsExists = _jsRuntime!.evaluate('typeof ReactFlutterComponents');
      if (_kDebugMode) debugPrint('🔍 ReactFlutterComponents type: ${componentsExists.rawResult}');
      
    } catch (e) {
      throw Exception('加载js-core失败: $e');
    }
  }
  
  /// 将Map转换为JavaScript对象字符串
  String _mapToJsObject(Map<String, dynamic> map) {
    final buffer = StringBuffer('{');
    final entries = <String>[];
    
    map.forEach((key, value) {
      String jsValue;
      if (value is String) {
        jsValue = "'${value.replaceAll("'", "\\'")}'";
      } else if (value is bool || value is num) {
        jsValue = value.toString();
      } else {
        jsValue = "'$value'";
      }
      entries.add("'$key': $jsValue");
    });
    
    buffer.write(entries.join(', '));
    buffer.write('}');
    return buffer.toString();
  }
  
  /// 构建错误Widget
  Widget _buildErrorWidget(String error) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.red),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.error, color: Colors.red),
          const SizedBox(height: 8),
          const Text(
            'React渲染错误',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: Colors.red,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            error,
            style: const TextStyle(fontSize: 12),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
  
  /// 处理事件（不重新渲染，React会自动处理）
  Future<void> handleEvent(String eventName, {Map<String, dynamic>? eventData}) async {
    if (_kDebugMode) debugPrint('🎯 Handling event: $eventName');
    
    if (_jsRuntime == null) {
      if (_kDebugMode) debugPrint('❌ JS运行时未初始化');
      return;
    }
    
    try {
      // 只调用事件处理，不重新渲染（React持续根容器会自动处理状态更新）
      final eventDataJson = eventData != null ? _mapToJsObject(eventData) : '{}';
      _jsRuntime!.evaluate('FlutterReactCore.handleEvent("$eventName", $eventDataJson)');
      
      if (_kDebugMode) debugPrint('✅ 事件处理完成，等待React自动更新');
      
    } catch (e) {
      if (_kDebugMode) debugPrint('❌ 事件处理失败: $e');
    }
  }
  
  /// 执行JavaScript代码
  dynamic evaluate(String code) {
    if (_jsRuntime == null) {
      if (_kDebugMode) debugPrint('❌ JS运行时未初始化');
      return null;
    }
    
    try {
      return _jsRuntime!.evaluate(code);
    } catch (e) {
      if (_kDebugMode) debugPrint('❌ JavaScript执行失败: $e');
      return null;
    }
  }
  
  /// 获取最后的错误信息
  String get lastError => _lastError;
  
  /// 检查是否已初始化
  bool get isInitialized => _initialized;
  
  /// 释放资源
  void dispose() {
    _jsRuntime?.dispose();
    _jsRuntime = null;
    _initialized = false;
  }
}
