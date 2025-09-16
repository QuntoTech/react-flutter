import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import '../lib/main.dart' as app;
import '../lib/core/agent_loader.dart';

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
      
      // 验证基本UI组件存在
      expect(find.byType(Column), findsOneWidget,
        reason: '应该有一个Column布局组件');
      
      expect(find.byType(Container), findsAtLeastNWidgets(1),
        reason: '应该有至少1个Container组件');
      
      // 验证基本文本内容存在
      expect(find.text('基础样式：颜色+圆角+阴影+边框'), findsOneWidget,
        reason: '应该显示基础样式Container的文本');
      
      expect(find.text('线性渐变：橙色到黄色'), findsOneWidget,
        reason: '应该显示线性渐变Container的文本');
      
      expect(find.text('径向渐变：紫色到蓝紫色'), findsOneWidget,
        reason: '应该显示径向渐变Container的文本');
      
      expect(find.text('圆形'), findsOneWidget,
        reason: '应该显示圆形Container的文本');
      
      expect(find.text('右下角对齐文本'), findsOneWidget,
        reason: '应该显示alignment演示Container的文本');
      
      expect(find.text('约束: 150-300x80-120'), findsOneWidget,
        reason: '应该显示constraints演示Container的文本');
      
      print('✅ Agent初始化和加载测试通过');
    });

    testWidgets('Container Constraints约束功能测试', (WidgetTester tester) async {
      print('🎯 测试Container Constraints约束功能...');
      
      await launchAppAndWaitReady(tester);
      
      // 1. 首先确认constraints演示文本存在
      expect(find.text('约束: 150-300x80-120'), findsOneWidget,
        reason: '应该显示constraints演示文本');
      
      // 2. 通过id查找constraints演示Container
      final constraintsDemoFinder = find.byKey(const Key('constraints-demo'));
      expect(constraintsDemoFinder, findsOneWidget,
        reason: '应该找到constraints演示Container');
      
      // 3. 获取Container widget
      final constraintsDemoContainer = tester.widget<Container>(constraintsDemoFinder);
      
      // 4. 验证该Container的constraints属性符合预期
      expect(constraintsDemoContainer.constraints, isNotNull,
        reason: 'constraints演示Container应该有constraints属性');
      
      final constraints = constraintsDemoContainer.constraints!;
      expect(constraints.minWidth, equals(150.0),
        reason: '最小宽度应该为150');
      expect(constraints.maxWidth, equals(300.0),
        reason: '最大宽度应该为300');
      expect(constraints.minHeight, equals(80.0),
        reason: '最小高度应该为80');
      expect(constraints.maxHeight, equals(120.0),
        reason: '最大高度应该为120');
      
      // 5. 验证该Container的alignment属性也正确设置
      expect(constraintsDemoContainer.alignment, equals(Alignment.center),
        reason: 'constraints演示Container应该设置为center对齐');
      
      print('✅ 找到constraints演示Container，constraints = ${constraintsDemoContainer.constraints}');
      print('✅ Container Constraints约束功能测试通过');
    });

    testWidgets('Container Alignment对齐功能测试', (WidgetTester tester) async {
      print('🎯 测试Container Alignment对齐功能...');
      
      await launchAppAndWaitReady(tester);
      
      // 1. 首先确认alignment演示文本存在
      expect(find.text('右下角对齐文本'), findsOneWidget,
        reason: '应该显示alignment演示文本');
      
      // 2. 通过id查找alignment演示Container
      final alignmentDemoFinder = find.byKey(const Key('alignment-demo'));
      expect(alignmentDemoFinder, findsOneWidget,
        reason: '应该找到alignment演示Container');
      
      // 3. 获取Container widget
      final alignmentDemoContainer = tester.widget<Container>(alignmentDemoFinder);
      
      // 4. 验证该Container的alignment属性符合预期
      expect(alignmentDemoContainer.alignment, equals(Alignment.bottomRight),
        reason: 'alignment演示Container应该设置为bottomRight对齐');
      
      print('✅ 找到alignment演示Container，alignment = ${alignmentDemoContainer.alignment}');
      print('✅ Container Alignment对齐功能测试通过');
    });

    testWidgets('Container ForegroundDecoration前景装饰功能测试', (WidgetTester tester) async {
      print('🎨 测试Container ForegroundDecoration前景装饰功能...');
      
      await launchAppAndWaitReady(tester);
      
      // 1. 首先确认前景装饰演示文本存在
      expect(find.text('前景装饰：金色边框覆盖层'), findsOneWidget,
        reason: '应该显示前景装饰演示文本');
      
      // 2. 通过id查找前景装饰演示Container
      final foregroundDemoFinder = find.byKey(const Key('foreground-decoration-demo'));
      expect(foregroundDemoFinder, findsOneWidget,
        reason: '应该找到前景装饰演示Container');
      
      // 3. 获取Container widget
      final foregroundDemoContainer = tester.widget<Container>(foregroundDemoFinder);
      
      // 4. 验证该Container的foregroundDecoration属性存在
      expect(foregroundDemoContainer.foregroundDecoration, isNotNull,
        reason: '前景装饰演示Container应该有foregroundDecoration');
      expect(foregroundDemoContainer.foregroundDecoration, isA<BoxDecoration>(),
        reason: 'foregroundDecoration应该是BoxDecoration类型');
      
      // 5. 验证前景装饰的边框属性
      final foregroundDecoration = foregroundDemoContainer.foregroundDecoration as BoxDecoration;
      expect(foregroundDecoration.border, isNotNull,
        reason: '前景装饰应该有边框');
      expect(foregroundDecoration.border, isA<Border>(),
        reason: '前景装饰边框应该是Border类型');
      
      // 6. 验证边框颜色（金色 RGB(255, 193, 7)）
      final border = foregroundDecoration.border as Border;
      final borderColor = border.top.color;
      expect(borderColor.red, equals(255),
        reason: '前景边框红色分量应该是255');
      expect(borderColor.green, equals(193),
        reason: '前景边框绿色分量应该是193');
      expect(borderColor.blue, equals(7),
        reason: '前景边框蓝色分量应该是7');
      expect(border.top.width, equals(3.0),
        reason: '前景边框宽度应该是3.0');
      
      print('✅ 找到前景装饰演示Container，foregroundDecoration边框颜色 = RGB(${borderColor.red}, ${borderColor.green}, ${borderColor.blue})');
      print('✅ Container ForegroundDecoration前景装饰功能测试通过');
    });

    testWidgets('Container ClipBehavior裁剪行为功能测试', (WidgetTester tester) async {
      print('✂️ 测试Container ClipBehavior裁剪行为功能...');
      
      await launchAppAndWaitReady(tester);
      
      // 1. 首先确认裁剪演示文本存在
      expect(find.text('裁剪演示：超出部分被裁剪'), findsOneWidget,
        reason: '应该显示裁剪演示文本');
      
      // 2. 通过id查找裁剪演示Container
      final clipDemoFinder = find.byKey(const Key('clip-behavior-demo'));
      expect(clipDemoFinder, findsOneWidget,
        reason: '应该找到裁剪演示Container');
      
      // 3. 获取Container widget
      final clipDemoContainer = tester.widget<Container>(clipDemoFinder);
      
      // 4. 验证该Container的clipBehavior属性
      expect(clipDemoContainer.clipBehavior, equals(Clip.antiAlias),
        reason: '裁剪演示Container应该设置为antiAlias裁剪');
      
      print('✅ 找到裁剪演示Container，clipBehavior = ${clipDemoContainer.clipBehavior}');
      print('✅ Container ClipBehavior裁剪行为功能测试通过');
    });

    testWidgets('Container TransformAlignment变换中心点功能测试', (WidgetTester tester) async {
      print('🎯 测试Container TransformAlignment变换中心点功能...');
      
      await launchAppAndWaitReady(tester);
      
      // 1. 首先确认变换中心点演示文本存在
      expect(find.text('变换中心点：左上角对齐'), findsOneWidget,
        reason: '应该显示变换中心点演示文本');
      
      // 2. 通过id查找变换中心点演示Container
      final transformAlignmentDemoFinder = find.byKey(const Key('transform-alignment-demo'));
      expect(transformAlignmentDemoFinder, findsOneWidget,
        reason: '应该找到变换中心点演示Container');
      
      // 3. 获取Container widget
      final transformAlignmentDemoContainer = tester.widget<Container>(transformAlignmentDemoFinder);
      
      // 4. 验证该Container的transformAlignment属性
      expect(transformAlignmentDemoContainer.transformAlignment, equals(Alignment.topLeft),
        reason: '变换中心点演示Container应该设置为topLeft对齐');
      
      print('✅ 找到变换中心点演示Container，transformAlignment = ${transformAlignmentDemoContainer.transformAlignment}');
      print('✅ Container TransformAlignment变换中心点功能测试通过');
    });

    testWidgets('Container Transform Matrix4变换功能测试', (WidgetTester tester) async {
      print('🔄 测试Container Transform Matrix4变换功能...');
      
      await launchAppAndWaitReady(tester);
      
      // 1. 首先确认变换演示文本存在
      expect(find.text('Matrix4变换：缩放1.2倍'), findsOneWidget,
        reason: '应该显示Matrix4变换演示文本');
      
      // 2. 通过id查找变换演示Container
      final transformDemoFinder = find.byKey(const Key('transform-demo'));
      expect(transformDemoFinder, findsOneWidget,
        reason: '应该找到变换演示Container');
      
      // 3. 获取Container widget
      final transformDemoContainer = tester.widget<Container>(transformDemoFinder);
      
      // 4. 验证该Container的transform属性
      expect(transformDemoContainer.transform, isNotNull,
        reason: '变换演示Container应该有transform属性');
      expect(transformDemoContainer.transform, isA<Matrix4>(),
        reason: 'transform应该是Matrix4类型');
      
      print('✅ 找到变换演示Container，transform = ${transformDemoContainer.transform}');
      print('✅ Container Transform Matrix4变换功能测试通过');
    });
  });
}
