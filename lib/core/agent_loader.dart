import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'react_engine.dart';

// 开发模式调试输出控制
const bool _kDebugMode = false;

/// Agent包信息
class AgentManifest {
  final String name;
  final String version;
  final String description;
  final String author;
  final String main;
  final List<AgentComponent> components;
  final Map<String, dynamic> requirements;
  final List<String> permissions;
  
  AgentManifest({
    required this.name,
    required this.version,
    required this.description,
    required this.author,
    required this.main,
    required this.components,
    required this.requirements,
    required this.permissions,
  });
  
  factory AgentManifest.fromJson(Map<String, dynamic> json) {
    return AgentManifest(
      name: json['name'] ?? '',
      version: json['version'] ?? '1.0.0',
      description: json['description'] ?? '',
      author: json['author'] ?? '',
      main: json['main'] ?? 'index.js',
      components: (json['components'] as List?)?.map((c) => 
        AgentComponent.fromJson(c)).toList() ?? [],
      requirements: Map<String, dynamic>.from(json['requirements'] ?? {}),
      permissions: List<String>.from(json['permissions'] ?? []),
    );
  }
}

/// Agent组件信息
class AgentComponent {
  final String name;
  final String description;
  final Map<String, dynamic> props;
  final List<Map<String, dynamic>> events;
  
  AgentComponent({
    required this.name,
    required this.description,
    required this.props,
    required this.events,
  });
  
  factory AgentComponent.fromJson(Map<String, dynamic> json) {
    return AgentComponent(
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      props: Map<String, dynamic>.from(json['props'] ?? {}),
      events: List<Map<String, dynamic>>.from(json['events'] ?? []),
    );
  }
}

/// Agent加载器
/// 负责加载和管理独立的Agent包
class AgentLoader {
  static final AgentLoader _instance = AgentLoader._internal();
  factory AgentLoader() => _instance;
  AgentLoader._internal();
  
  static AgentLoader get instance => _instance;
  
  final Map<String, AgentManifest> _loadedAgents = {};
  String _lastError = '';
  
  /// 加载Agent包
  Future<bool> loadAgent(String agentPath) async {
    AgentManifest? manifest;
    
    try {
      if (_kDebugMode) debugPrint('🔍 开始加载Agent: $agentPath');
      
      // 1. 加载manifest.json
      final manifestPath = '$agentPath/manifest.json';
      if (_kDebugMode) debugPrint('📄 尝试加载manifest: $manifestPath');
      
      try {
        final manifestJson = await rootBundle.loadString(manifestPath);
        if (_kDebugMode) debugPrint('✅ manifest.json加载成功，内容长度: ${manifestJson.length}');
        
        manifest = AgentManifest.fromJson(jsonDecode(manifestJson));
        if (_kDebugMode) debugPrint('✅ manifest解析成功: ${manifest.name} v${manifest.version}');
        if (_kDebugMode) debugPrint('📝 主文件路径: ${manifest.main}');
      } catch (e) {
        if (_kDebugMode) debugPrint('❌ manifest.json加载失败: $e');
        _lastError = 'manifest.json加载失败: $e';
        return false;
      }
      
      // 2. 检查依赖要求
      if (!_checkRequirements(manifest.requirements)) {
        _lastError = '依赖检查失败';
        return false;
      }
      
      // 3. 加载主JS文件
      final jsPath = '$agentPath/${manifest.main}';
      if (_kDebugMode) debugPrint('📁 完整JS路径: $jsPath');
      
      String jsCode;
      try {
        if (_kDebugMode) debugPrint('🔄 开始加载JS文件...');
        jsCode = await rootBundle.loadString(jsPath);
        if (_kDebugMode) debugPrint('✅ JS文件加载成功！');
        if (_kDebugMode) debugPrint('📊 JS代码长度: ${jsCode.length} 字符');
        if (_kDebugMode) debugPrint('🔍 JS代码前100字符: ${jsCode.length > 100 ? jsCode.substring(0, 100) : jsCode}...');
        
        if (jsCode.isEmpty) {
          _lastError = 'JS文件为空';
          return false;
        }
      } catch (e) {
        if (_kDebugMode) debugPrint('❌ JS文件加载失败: $e');
        if (_kDebugMode) debugPrint('💡 可能原因:');
        if (_kDebugMode) debugPrint('   1. 文件路径不正确: $jsPath');
        if (_kDebugMode) debugPrint('   2. pubspec.yaml中未正确声明assets');
        if (_kDebugMode) debugPrint('   3. 文件不存在或权限问题');
        if (_kDebugMode) debugPrint('   4. Flutter缓存问题，尝试: flutter clean && flutter pub get');
        _lastError = 'JS文件加载失败: $e';
        return false;
      }
      
      // 4. 在React引擎中执行Agent代码
      if (!ReactEngine.instance.isInitialized) {
        await ReactEngine.instance.initialize();
      }
      
      await ReactEngine.instance.evaluate(jsCode);
      
      // 5. 等待Agent注册完成
      if (_kDebugMode) debugPrint('⏳ 等待Agent注册完成...');
      await Future.delayed(Duration(milliseconds: 100)); // 给Agent时间注册
      
      // 6. 验证Agent是否注册成功
      final verification = await ReactEngine.instance.evaluate('FlutterReactCore.checkAgent("CounterAgent")');
      if (_kDebugMode) debugPrint('🔍 Agent注册验证: $verification');
      
      // 7. 注册Agent到Dart端
      _loadedAgents[manifest.name] = manifest;
      
      if (_kDebugMode) debugPrint('Agent ${manifest.name} 加载成功');
      return true;
      
    } catch (e) {
      _lastError = '加载Agent失败: $e';
      if (_kDebugMode) debugPrint(_lastError);
      
      // 清理失败的Agent加载
      if (manifest != null) {
        await _cleanupFailedAgent(manifest.name);
      }
      
      return false;
    }
  }
  
  /// 清理失败的Agent加载
  Future<void> _cleanupFailedAgent(String agentName) async {
    try {
      // 清理JS环境中可能残留的Agent
      await ReactEngine.instance.evaluate('''
        if (typeof globalThis.${agentName}Agent !== "undefined") {
          delete globalThis.${agentName}Agent;
        }
      ''');
      
      // 清理Dart端可能的部分状态
      _loadedAgents.remove(agentName);
      
      if (_kDebugMode) debugPrint('🧹 已清理失败的Agent: $agentName');
    } catch (e) {
      if (_kDebugMode) debugPrint('⚠️ 清理失败Agent时出错: $e');
    }
  }
  
  /// 获取已加载的Agent列表
  List<AgentManifest> getLoadedAgents() {
    return _loadedAgents.values.toList();
  }
  
  /// 检查Agent是否已加载
  bool isAgentLoaded(String agentName) {
    return _loadedAgents.containsKey(agentName);
  }
  
  /// 获取Agent信息
  AgentManifest? getAgent(String agentName) {
    return _loadedAgents[agentName];
  }
  
  /// 卸载Agent
  Future<void> unloadAgent(String agentName) async {
    if (_loadedAgents.containsKey(agentName)) {
      // 执行清理代码
      await ReactEngine.instance.evaluate('''
        if (typeof callLifecycleHooks === 'function') {
          callLifecycleHooks('beforeDestroy', {agentName: '$agentName'});
        }
      ''');
      
      _loadedAgents.remove(agentName);
      if (_kDebugMode) debugPrint('Agent $agentName 已卸载');
    }
  }
  
  /// 检查依赖要求
  bool _checkRequirements(Map<String, dynamic> requirements) {
    // 检查React版本
    final reactVersion = requirements['react'];
    if (reactVersion != null) {
      // 这里应该检查实际的React版本
      if (_kDebugMode) debugPrint('要求React版本: $reactVersion');
    }
    
    // 检查Flutter Widget要求
    final flutterWidgets = requirements['flutter_widgets'];
    if (flutterWidgets != null && flutterWidgets is List) {
      for (final widget in flutterWidgets) {
        // 这里应该检查Widget是否已注册
        if (_kDebugMode) debugPrint('要求Flutter Widget: $widget');
      }
    }
    
    return true; // 暂时总是返回true
  }
  
  /// 渲染Agent组件
  Future<Widget?> renderAgent(String agentName, {
    Map<String, dynamic>? props,
    Function(String)? onEvent,
  }) async {
    if (_kDebugMode) debugPrint('🎯 renderAgent调用: $agentName');
    
    final agent = _loadedAgents[agentName];
    if (agent == null) {
      _lastError = 'Agent未找到: $agentName';
      if (_kDebugMode) debugPrint('❌ Agent未找到: $agentName');
      return null;
    }
    
    if (_kDebugMode) debugPrint('✅ 找到Agent: ${agent.name}');
    if (_kDebugMode) debugPrint('📝 组件列表: ${agent.components.map((c) => c.name).toList()}');
    
    // 渲染Agent的主组件
    final mainComponent = agent.components.isNotEmpty ? 
      agent.components.first.name : 'Counter';
    
    if (_kDebugMode) debugPrint('🎨 准备渲染组件: "$mainComponent"');
    if (_kDebugMode) debugPrint('📊 传入props: $props');
    
    return await ReactEngine.instance.renderComponent(
      mainComponent,
      props: props,
      onEvent: onEvent,
    );
  }
  
  /// 获取错误信息
  String get lastError => _lastError;
  
  /// 清除所有Agent
  void clearAll() {
    _loadedAgents.clear();
  }
}
