import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../core/react_engine.dart';
import '../core/component_registry.dart';
import '../core/agent_loader.dart';
import '../components/widgets/text.dart';
import '../components/widgets/column.dart';
import '../components/widgets/row.dart';
import '../components/widgets/elevated_button.dart';
import '../components/widgets/sized_box.dart';
import '../components/widgets/container.dart';
import '../components/widgets/single_child_scroll_view.dart';

/// 演示应用
/// 展示新架构的React+Flutter渲染功能
class DemoApp extends StatefulWidget {
  const DemoApp({Key? key}) : super(key: key);

  @override
  State<DemoApp> createState() => _DemoAppState();
}

class _DemoAppState extends State<DemoApp> {
  Widget? _reactWidget;
  String _status = '正在初始化...';
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _initializeReactSystem();
  }

  Future<void> _initializeReactSystem() async {
    try {
      setState(() {
        _status = '注册Flutter组件...';
      });

      // 注册所有Flutter组件
      ComponentRegistry.instance.registerAll([
        TextComponent(),
        ColumnComponent(),
        RowComponent(),
        ElevatedButtonComponent(),
        SizedBoxComponent(),
        ContainerComponent(),
        SingleChildScrollViewComponent(),
      ]);

      setState(() {
        _status = '初始化React引擎...';
      });

      // 初始化React引擎
      final success = await ReactEngine.instance.initialize();
      if (!success) {
        setState(() {
          _status = '初始化失败: ${ReactEngine.instance.lastError}';
          _isLoading = false;
        });
        return;
      }

      setState(() {
        _status = '加载Counter Agent...';
      });

      // 加载独立的Agent包
      await _loadCounterAgent();

      setState(() {
        _status = '渲染Agent组件...';
      });

      // 渲染Agent组件
      await _renderAgentComponent();

      setState(() {
        _status = '✅ React+Flutter系统就绪!';
        _isLoading = false;
      });

    } catch (e) {
      setState(() {
        _status = '系统初始化错误: $e';
        _isLoading = false;
      });
    }
  }

  Future<void> _loadCounterAgent() async {
    try {
      // 加载独立的Counter Agent包
      final success = await AgentLoader.instance.loadAgent('agent/counter');
      
      if (!success) {
        throw Exception('加载Agent失败: ${AgentLoader.instance.lastError}');
      }
      
      // 显示加载的Agent信息
      final agents = AgentLoader.instance.getLoadedAgents();
      for (final agent in agents) {
        // debugPrint('已加载Agent: ${agent.name} v${agent.version} by ${agent.author}');
      }
      
    } catch (e) {
      throw Exception('加载Counter Agent失败: $e');
    }
  }

  Future<void> _renderAgentComponent() async {
    // 使用AgentLoader渲染Counter Agent
    final widget = await AgentLoader.instance.renderAgent(
      'Counter Agent',
      onEvent: _handleAgentEvent,
    );

    setState(() {
      _reactWidget = widget;
    });
  }

  void _handleAgentEvent(String eventName) async {
    // debugPrint('处理Agent事件: $eventName');
    
    // 只处理事件，不重新渲染（React会自动处理状态更新）
    await ReactEngine.instance.handleEvent(eventName);
    
    // 注意：不再重新创建Agent实例，React的持续根容器会自动处理状态更新
    // 但我们仍然需要获取更新后的Widget树来更新Flutter UI
    final updatedWidget = await AgentLoader.instance.renderAgent(
      'Counter Agent',
      onEvent: _handleAgentEvent,
    );
    
    if (updatedWidget != null) {
      setState(() {
        _reactWidget = updatedWidget;
      });
    }
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _isLoading
          ? Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const CircularProgressIndicator(),
                const SizedBox(height: 16),
                Text(_status),
              ],
            )
          : _reactWidget != null
            ? Container(
                key: const Key('counter_agent_ready'),
                child: _reactWidget,
              )
            : Text(_status),
      ),
    );
  }


  @override
  void dispose() {
    ReactEngine.instance.dispose();
    super.dispose();
  }
}
