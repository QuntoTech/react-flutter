/**
 * Counter Agent集成测试
 * 测试React-Flutter-Agent架构的完整功能
 */

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:react_flutter/main.dart' as app;

/// 自定义等待函数 - 等待特定Widget出现
Future<void> pumpUntilFound(
  WidgetTester tester,
  Finder finder, {
  Duration timeout = const Duration(seconds: 20),
}) async {
  bool found = false;
  final stopwatch = Stopwatch()..start();

  while (stopwatch.elapsed < timeout) {
    await tester.pump();
    if (finder.evaluate().isNotEmpty) {
      found = true;
      break;
    }
    await Future.delayed(const Duration(milliseconds: 100));
  }

  stopwatch.stop();
  if (!found) {
    throw StateError('Widget not found after ${timeout.inSeconds} seconds: $finder');
  }
  print('✅ Found widget after ${stopwatch.elapsedMilliseconds}ms: $finder');
}

/// 启动应用并等待Counter Agent就绪
Future<void> launchAppAndWaitReady(WidgetTester tester) async {
  print('📱 启动React-Flutter应用...');
  app.main();
  await tester.pumpAndSettle();
  
  print('⏳ 等待Counter Agent加载...');
  // 直接等待Counter Agent就绪的明确信号，不再固定等待时间
  await pumpUntilFound(tester, find.byKey(const Key('counter_agent_ready')));
  
  print('✅ Counter Agent就绪！');
}

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  group('Counter Agent集成测试', () {
    
    testWidgets('Agent初始化和加载测试', (WidgetTester tester) async {
      print('🚀 测试Agent初始化和加载...');
      
      await launchAppAndWaitReady(tester);
      
      // 验证基本UI元素存在
      expect(find.text('当前计数: 0'), findsOneWidget, 
        reason: '应该显示初始计数');
      
      expect(find.text('增加 (+1)'), findsOneWidget,
        reason: '应该显示增加按钮');
      
      expect(find.text('减少 (-1)'), findsOneWidget,
        reason: '应该显示减少按钮');
      
      expect(find.text('Flutter原生API演示: Color + EdgeInsets + BorderRadius + Border'), findsOneWidget,
        reason: '应该显示样式演示文本');
      
      print('✅ Agent初始化和加载测试通过');
    });

    testWidgets('样式系统渲染测试', (WidgetTester tester) async {
      print('🎨 测试样式系统渲染...');
      
      await launchAppAndWaitReady(tester);
      
      // 查找Container组件
      final containers = find.byType(Container);
      expect(containers, findsAtLeastNWidgets(1),
        reason: '应该找到至少一个Container组件');
      
      // 检查样式属性
      final containerWidgets = tester.widgetList<Container>(containers).toList();
      print('📊 找到${containerWidgets.length}个Container组件');
      
      int styledContainers = 0;
      for (int i = 0; i < containerWidgets.length; i++) {
        final container = containerWidgets[i];
        
        if (container.padding != null) {
          print('  ✅ Container $i Padding: ${container.padding}');
          styledContainers++;
        }
        
        if (container.margin != null) {
          print('  ✅ Container $i Margin: ${container.margin}');
          styledContainers++;
        }
        
        if (container.color != null) {
          print('  ✅ Container $i Color: ${container.color}');
          styledContainers++;
        }
        
        if (container.decoration is BoxDecoration) {
          final decoration = container.decoration as BoxDecoration;
          if (decoration.color != null) {
            print('  ✅ Container $i Decoration Color: ${decoration.color}');
            styledContainers++;
          }
          if (decoration.borderRadius != null) {
            print('  ✅ Container $i BorderRadius: ${decoration.borderRadius}');
            styledContainers++;
          }
          if (decoration.border != null) {
            print('  ✅ Container $i Border: ${decoration.border}');
            styledContainers++;
          }
        }
      }
      
      expect(styledContainers, greaterThan(0),
        reason: '应该至少有一些Container使用了样式系统');
      
      print('✅ 样式系统渲染测试通过 - 发现$styledContainers个样式化属性');
    });

    testWidgets('Counter基础交互测试', (WidgetTester tester) async {
      print('🔢 测试Counter基础交互...');
      
      await launchAppAndWaitReady(tester);
      
      // 验证初始状态
      expect(find.text('当前计数: 0'), findsOneWidget);
      
      // 查找按钮
      final increaseButton = find.text('增加 (+1)');
      final decreaseButton = find.text('减少 (-1)');
      
      // 测试+1按钮
      await tester.tap(increaseButton);
      await tester.pumpAndSettle();
      expect(find.text('当前计数: 1'), findsOneWidget, 
        reason: '点击+1后计数应该变为1');
      
      // 再次点击+1
      await tester.tap(increaseButton);
      await tester.pumpAndSettle();
      expect(find.text('当前计数: 2'), findsOneWidget,
        reason: '再次点击+1后计数应该变为2');
      
      // 测试-1按钮
      await tester.tap(decreaseButton);
      await tester.pumpAndSettle();
      expect(find.text('当前计数: 1'), findsOneWidget,
        reason: '点击-1后计数应该变为1');
      
      print('✅ Counter基础交互测试通过');
    });

    testWidgets('数据同步压力测试', (WidgetTester tester) async {
      print('⚡ 测试数据同步压力...');
      
      await launchAppAndWaitReady(tester);
      
      final increaseButton = find.text('增加 (+1)');
      final decreaseButton = find.text('减少 (-1)');
      
      // 快速连续点击5次+1
      print('🔄 快速增加测试...');
      for (int i = 1; i <= 5; i++) {
        await tester.tap(increaseButton);
        await tester.pumpAndSettle();
        expect(find.text('当前计数: $i'), findsOneWidget,
          reason: '快速点击第$i次后计数应该正确显示');
      }
      
      // 快速连续点击3次-1
      print('🔄 快速减少测试...');
      for (int i = 4; i >= 2; i--) {
        await tester.tap(decreaseButton);
        await tester.pumpAndSettle();
        expect(find.text('当前计数: $i'), findsOneWidget,
          reason: '快速减少操作后计数应该正确显示为$i');
      }
      
      print('✅ 数据同步压力测试通过');
    });

    testWidgets('UI状态持久性测试', (WidgetTester tester) async {
      print('🏁 测试UI状态持久性...');
      
      await launchAppAndWaitReady(tester);
      
      final increaseButton = find.text('增加 (+1)');
      
      // 进行一些操作
      await tester.tap(increaseButton);
      await tester.pumpAndSettle();
      await tester.tap(increaseButton);
      await tester.pumpAndSettle();
      
      // 验证状态持久性
      expect(find.text('当前计数: 2'), findsOneWidget,
        reason: '计数状态应该持久保持');
      
      // 验证UI元素仍然存在且功能正常
      expect(find.text('增加 (+1)'), findsOneWidget,
        reason: '增加按钮应该仍然存在');
      
      expect(find.text('减少 (-1)'), findsOneWidget,
        reason: '减少按钮应该仍然存在');
      
      expect(find.text('Flutter原生API演示: Color + EdgeInsets + BorderRadius + Border'), findsOneWidget,
        reason: '样式演示文本应该仍然存在');
      
      // 验证按钮仍然可用
      final decreaseButton = find.text('减少 (-1)');
      await tester.tap(decreaseButton);
      await tester.pumpAndSettle();
      expect(find.text('当前计数: 1'), findsOneWidget,
        reason: '按钮应该仍然可以正常工作');
      
      print('✅ UI状态持久性测试通过');
    });
    
  });
}