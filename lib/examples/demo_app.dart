import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../core/react_engine.dart';
import '../core/component_registry.dart';
import '../core/agent_loader.dart';
import '../core/widget_manager.dart';
import '../core/virtual_dom_parser.dart';
import '../components/widgets/text.dart';
import '../components/widgets/column.dart';
import '../components/widgets/row.dart';
import '../components/widgets/elevated_button.dart';
import '../components/widgets/sized_box.dart';
import '../components/widgets/container.dart';
import '../components/widgets/single_child_scroll_view.dart';
import '../components/widgets/stack.dart';
import '../components/widgets/positioned.dart';
import '../components/widgets/expanded.dart';
import '../components/widgets/center.dart';
import '../components/widgets/padding.dart';
import '../components/widgets/icon.dart';
import '../components/widgets/image.dart';

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
      StackComponent(),
      PositionedComponent(),
      ExpandedComponent(),
      CenterComponent(),
      PaddingComponent(),
      IconComponent(),
      ImageComponent(),
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
      
      // 设置bridge监听，接收React的更新指令
      ReactEngine.instance.setBridgeMessageListener('updateInstructions', _handleUpdateInstructions);

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
    try {
      
      // 设置事件回调
      ComponentRegistry.instance.setEventCallback(_handleAgentEvent);
      
      // React会通过bridge发送所有Widget，这里不需要手动创建容器
      
      // Agent的index.js已经调用了render，这里什么都不需要做
      
      
    } catch (e) {
      debugPrint('启动React应用错误: $e');
      setState(() {
        _status = '启动错误: $e';
        _isLoading = false;
      });
    }
  }
  

  void _handleAgentEvent(String eventName) async {
    // debugPrint('处理Agent事件: $eventName');
    
    // 只处理事件，让React自己处理状态更新和通知
    await ReactEngine.instance.handleEvent(eventName);
  }
  
  void _handleUpdateInstructions(dynamic args) {
    // React通过bridge发送的更新指令
    try {
      
      List<dynamic> instructions;
      
      // 处理不同的数据类型
      if (args is String) {
        instructions = VirtualDOMParser.parseInstructionsFromJson(args);
      } else if (args is List<dynamic>) {
        instructions = args;
      } else {
        return;
      }
      
      if (instructions.isNotEmpty) {
        
        // 使用WidgetManager应用更新指令
        final updatedWidget = WidgetManager.instance.applyInstructions(instructions);
        
        if (updatedWidget != null) {
          setState(() {
            _reactWidget = updatedWidget;
          });
        }
      }
    } catch (e) {
      debugPrint('处理bridge更新指令错误: $e');
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
