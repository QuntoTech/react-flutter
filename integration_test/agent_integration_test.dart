import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import '../lib/main.dart' as app;
import '../lib/core/react_engine.dart';
import '../lib/core/widget_manager.dart';

/// 范围匹配器
Matcher inRange(double min, double max) => _InRange(min, max);

class _InRange extends Matcher {
  final double min, max;
  _InRange(this.min, this.max);
  
  @override
  bool matches(item, Map matchState) => item is num && item >= min && item <= max;
  
  @override
  Description describe(Description description) => description.add('in range [$min, $max]');
}

/// 等待Widget出现
Future<void> pumpUntilFound(
  WidgetTester tester,
  Finder finder, {
  Duration timeout = const Duration(seconds: 20),
}) async {
  final stopwatch = Stopwatch()..start();
  while (stopwatch.elapsed < timeout) {
    await tester.pump();
    if (finder.evaluate().isNotEmpty) {
      print('✅ Found widget after ${stopwatch.elapsedMilliseconds}ms: $finder');
      return;
    }
    await Future.delayed(const Duration(milliseconds: 100));
  }
  throw StateError('Widget not found after ${timeout.inSeconds} seconds: $finder');
}

/// 启动应用并等待就绪
Future<void> launchAppAndWaitReady(WidgetTester tester) async {
  print('🧹 清理系统状态...');
  // 强制清理系统状态，确保测试间隔离
  ReactEngine.instance.dispose();
  WidgetManager.instance.clear();
  
  print('📱 启动React-Flutter应用...');
  app.main();
  await tester.pumpAndSettle();
  
  print('⏳ 等待Counter Agent加载...');
  await pumpUntilFound(tester, find.byKey(const Key('counter_agent_ready')));
  print('✅ Counter Agent就绪！');
}

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  group('Counter Agent集成测试', () {
    
    testWidgets('Agent初始化和加载测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      expect(find.byType(SingleChildScrollView), findsOneWidget);
      expect(find.byType(Container), findsAtLeastNWidgets(1));
      expect(find.byKey(const Key('basic-style-demo')), findsOneWidget);
      expect(find.byKey(const Key('linear-gradient-demo')), findsOneWidget);
      expect(find.byKey(const Key('radial-gradient-demo')), findsOneWidget);
      expect(find.byKey(const Key('circle-shape-demo')), findsOneWidget);
      expect(find.byKey(const Key('alignment-demo')), findsOneWidget);
      expect(find.byKey(const Key('constraints-demo')), findsOneWidget);
    });

    testWidgets('Container Constraints约束功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('constraints-demo'));
      expect(finder, findsOneWidget);
      
      final container = tester.widget<Container>(finder);
      final constraints = container.constraints!;
      final padding = container.padding as EdgeInsets?;
      final margin = container.margin as EdgeInsets?;
      
      // React代码中定义的原始约束
      const expectedMinWidth = 150.0;
      const expectedMaxWidth = 300.0;
      const expectedMinHeight = 80.0;
      const expectedMaxHeight = 120.0;
      
      // 计算padding的影响 (EdgeInsets.all(16) = 左右各16px)
      final paddingWidth = padding != null ? padding.left + padding.right : 0.0;
      final paddingHeight = padding != null ? padding.top + padding.bottom : 0.0;
      
      // 测试一个原生Flutter Container看看behavior
      final testContainer = Container(
        constraints: const BoxConstraints(
          minWidth: 150,
          maxWidth: 300,
          minHeight: 80,
          maxHeight: 120
        ),
        padding: const EdgeInsets.all(16),
        margin: const EdgeInsets.all(10),
        color: Colors.red,
      );
      
      print('🧪 原生Flutter Container constraints: ${testContainer.constraints}');
      
      // 基于正确的原始约束值验证
      expect(constraints.minWidth, equals(150.0));
      expect(constraints.maxWidth, equals(300.0));
      expect(constraints.minHeight, equals(80.0));
      expect(constraints.maxHeight, equals(120.0));
      
      // 验证实际渲染尺寸在约束范围内
      final size = tester.getSize(finder);
      expect(size.width, inRange(150.0, 300.0));
      expect(size.height, inRange(80.0, 120.0));
    });

    testWidgets('Container Alignment对齐功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('alignment-demo'));
      expect(finder, findsOneWidget);
      
      final container = tester.widget<Container>(finder);
      expect(container.alignment, equals(Alignment.bottomRight));
    });

    testWidgets('Container ForegroundDecoration前景装饰功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('foreground-decoration-demo'));
      expect(finder, findsOneWidget);
      
      final container = tester.widget<Container>(finder);
      final decoration = container.foregroundDecoration as BoxDecoration;
      final border = decoration.border as Border;
      
      expect(border.top.color.green, equals(193));
    });

    testWidgets('Container ClipBehavior裁剪行为功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('clip-behavior-demo'));
      expect(finder, findsOneWidget);
      
      final container = tester.widget<Container>(finder);
      expect(container.clipBehavior, equals(Clip.antiAlias));
    });

    testWidgets('Container TransformAlignment变换中心点功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('transform-alignment-demo'));
      expect(finder, findsOneWidget);
      
      final container = tester.widget<Container>(finder);
      expect(container.transformAlignment, equals(Alignment.topLeft));
    });

    testWidgets('Container Transform Matrix4变换功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('transform-demo'));
      expect(finder, findsOneWidget);
      
      final container = tester.widget<Container>(finder);
      final transform = container.transform!;
      
      expect(container.transformAlignment, equals(Alignment.center));
      expect(transform.entry(0, 0), closeTo(1.2, 0.01));
      expect(transform.entry(1, 1), closeTo(1.2, 0.01));
    });

    testWidgets('SingleChildScrollView滚动视图功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('main-scroll-view'));
      expect(finder, findsOneWidget);
      
      final scrollView = tester.widget<SingleChildScrollView>(finder);
      expect(scrollView.scrollDirection, equals(Axis.vertical));
      
      await tester.drag(finder, const Offset(0, -200));
      await tester.pumpAndSettle();
    });

    testWidgets('Column布局组件功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('demo-column'));
      expect(finder, findsOneWidget);
      
      final column = tester.widget<Column>(finder);
      expect(column.direction, equals(Axis.vertical));
      expect(column.mainAxisAlignment, equals(MainAxisAlignment.spaceEvenly));
      expect(column.crossAxisAlignment, equals(CrossAxisAlignment.center));
      expect(column.mainAxisSize, equals(MainAxisSize.max));
      expect(column.children.length, equals(4));
    });

    testWidgets('Row布局组件功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('demo-row'));
      expect(finder, findsOneWidget);
      
      final row = tester.widget<Row>(finder);
      expect(row.direction, equals(Axis.horizontal));
      expect(row.mainAxisAlignment, equals(MainAxisAlignment.spaceEvenly));
      expect(row.crossAxisAlignment, equals(CrossAxisAlignment.center));
      expect(row.mainAxisSize, equals(MainAxisSize.max));
      expect(row.children.length, equals(3));
    });

    testWidgets('Text文本组件功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      // 验证Text演示容器存在
      final textDemoContainer = find.byKey(const Key('text-demo'));
      expect(textDemoContainer, findsOneWidget);
      
      // 验证标题文本
      final titleText = tester.widget<Text>(find.byKey(const Key('title-text')));
      expect(titleText.data, equals('Text组件演示'));
      expect(titleText.style?.fontSize, equals(18.0));
      expect(titleText.style?.fontWeight, equals(FontWeight.bold));
      
      // 验证正文文本
      final bodyText = tester.widget<Text>(find.byKey(const Key('body-text')));
      expect(bodyText.data, contains('这是一段普通文本'));
      expect(bodyText.maxLines, equals(3));
      expect(bodyText.textAlign, equals(TextAlign.left));
      expect(bodyText.style?.height, equals(1.5));
      
      // 验证样式文本
      final styledText = tester.widget<Text>(find.byKey(const Key('styled-text')));
      expect(styledText.data, contains('样式文本'));
      expect(styledText.style?.fontWeight, equals(FontWeight.w600));
      expect(styledText.style?.decoration, equals(TextDecoration.underline));
      expect(styledText.style?.letterSpacing, equals(1.2));
      
      // 验证省略号文本
      final ellipsisText = tester.widget<Text>(find.byKey(const Key('ellipsis-text')));
      expect(ellipsisText.data, contains('溢出处理'));
      expect(ellipsisText.maxLines, equals(1));
      expect(ellipsisText.overflow, equals(TextOverflow.ellipsis));
      expect(ellipsisText.style?.fontStyle, equals(FontStyle.italic));
    });

    testWidgets('SizedBox尺寸控制组件功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      // 验证SizedBox演示容器存在
      final sizedBoxDemoContainer = find.byKey(const Key('sizedbox-demo'));
      expect(sizedBoxDemoContainer, findsOneWidget);
      
      // 验证固定尺寸SizedBox
      final fixedSizeBox = tester.widget<SizedBox>(find.byKey(const Key('fixed-size-box')));
      expect(fixedSizeBox.width, equals(50.0));
      expect(fixedSizeBox.height, equals(30.0));
      
      // 验证更大尺寸的SizedBox
      final largerSizeBox = tester.widget<SizedBox>(find.byKey(const Key('larger-size-box')));
      expect(largerSizeBox.width, equals(80.0));
      expect(largerSizeBox.height, equals(40.0));
      
      // 验证正方形SizedBox
      final squareSizeBox = tester.widget<SizedBox>(find.byKey(const Key('square-size-box')));
      expect(squareSizeBox.width, equals(60.0));
      expect(squareSizeBox.height, equals(60.0));
      expect(squareSizeBox.width, equals(squareSizeBox.height)); // 确保是正方形
      
      // 验证间距控制SizedBox
      final spacer20 = tester.widget<SizedBox>(find.byKey(const Key('spacer-20')));
      expect(spacer20.width, equals(20.0));
      expect(spacer20.height, isNull); // 间距控制通常只设置一个维度
      
      final spacer40 = tester.widget<SizedBox>(find.byKey(const Key('spacer-40')));
      expect(spacer40.width, equals(40.0));
      expect(spacer40.height, isNull);
      
      // 验证实际渲染尺寸
      final fixedBoxSize = tester.getSize(find.byKey(const Key('fixed-size-box')));
      expect(fixedBoxSize.width, equals(50.0));
      expect(fixedBoxSize.height, equals(30.0));
      
      final largerBoxSize = tester.getSize(find.byKey(const Key('larger-size-box')));
      expect(largerBoxSize.width, equals(80.0));
      expect(largerBoxSize.height, equals(40.0));
      
      final squareBoxSize = tester.getSize(find.byKey(const Key('square-size-box')));
      expect(squareBoxSize.width, equals(60.0));
      expect(squareBoxSize.height, equals(60.0));
    });

    /// Stack组件功能测试
    testWidgets('Stack多层叠层示例测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('layered-stack-demo'));
      expect(finder, findsOneWidget);
      
      final stack = tester.widget<Stack>(finder);
      
      // 验证Stack属性
      expect(stack.alignment, equals(Alignment.center));
      expect(stack.fit, equals(StackFit.loose));
      expect(stack.clipBehavior, equals(Clip.none));
      
      // 验证子组件数量（3层Container）
      expect(stack.children.length, equals(3));
      
      // 验证Stack的Key
      expect(stack.key, isA<Key>());
      expect((stack.key as Key).toString(), contains('layered-stack-demo'));
      
      // 验证三层Container都存在
      expect(stack.children[0], isA<Container>());
      expect(stack.children[1], isA<Container>());
      expect(stack.children[2], isA<Container>());
    });

    testWidgets('Positioned绝对定位功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('positioned-demo'));
      expect(finder, findsOneWidget);
      
      final positioned = tester.widget<Positioned>(finder);
      
      // 验证Positioned属性
      expect(positioned.left, equals(20.0));
      expect(positioned.top, equals(30.0));
      expect(positioned.width, equals(80.0));
      expect(positioned.height, equals(40.0));
      
      // 验证Positioned的Key
      expect(positioned.key, isA<Key>());
      expect((positioned.key as Key).toString(), contains('positioned-demo'));
    });

    testWidgets('Stack alignment属性功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      // 测试topLeft对齐
      final topLeftFinder = find.byKey(const Key('topleft-stack'));
      expect(topLeftFinder, findsOneWidget);
      final topLeftStack = tester.widget<Stack>(topLeftFinder);
      expect(topLeftStack.alignment, equals(Alignment.topLeft));
      
      // 测试center对齐
      final centerFinder = find.byKey(const Key('center-stack'));
      expect(centerFinder, findsOneWidget);
      final centerStack = tester.widget<Stack>(centerFinder);
      expect(centerStack.alignment, equals(Alignment.center));
    });

    testWidgets('Stack fit属性功能测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      // 测试loose fit
      final looseFinder = find.byKey(const Key('loose-stack'));
      expect(looseFinder, findsOneWidget);
      final looseStack = tester.widget<Stack>(looseFinder);
      expect(looseStack.fit, equals(StackFit.loose));
      
      // 测试expand fit
      final expandFinder = find.byKey(const Key('expand-stack'));
      expect(expandFinder, findsOneWidget);
      final expandStack = tester.widget<Stack>(expandFinder);
      expect(expandStack.fit, equals(StackFit.expand));
    });

    /// Expanded组件功能测试
    testWidgets('Expanded平分空间测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      // 查找第一个Expanded演示（1:1平分）
      final finder1 = find.byKey(const Key('expanded-equal-1'));
      final finder2 = find.byKey(const Key('expanded-equal-2'));
      
      expect(finder1, findsOneWidget);
      expect(finder2, findsOneWidget);
      
      final expanded1 = tester.widget<Expanded>(finder1);
      final expanded2 = tester.widget<Expanded>(finder2);
      
      // 验证flex值相等（平分空间）
      expect(expanded1.flex, equals(1));
      expect(expanded2.flex, equals(1));
      
      // 验证Key正确设置
      expect(expanded1.key, isA<Key>());
      expect((expanded1.key as Key).toString(), contains('expanded-equal-1'));
      expect(expanded2.key, isA<Key>());
      expect((expanded2.key as Key).toString(), contains('expanded-equal-2'));
    });

    testWidgets('Expanded flex比例测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      // 查找flex比例演示（2:1）
      final finder1 = find.byKey(const Key('expanded-flex-2'));
      final finder2 = find.byKey(const Key('expanded-flex-1'));
      
      expect(finder1, findsOneWidget);
      expect(finder2, findsOneWidget);
      
      final expanded1 = tester.widget<Expanded>(finder1);
      final expanded2 = tester.widget<Expanded>(finder2);
      
      // 验证flex比例为2:1
      expect(expanded1.flex, equals(2));
      expect(expanded2.flex, equals(1));
    });

    testWidgets('Expanded与固定尺寸混合测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      // 查找混合布局中的Expanded
      final finder = find.byKey(const Key('expanded-remaining'));
      expect(finder, findsOneWidget);
      
      final expanded = tester.widget<Expanded>(finder);
      
      // 验证Expanded属性
      expect(expanded.flex, equals(1));
      expect(expanded.key, isA<Key>());
      
      // 验证子组件存在
      expect(expanded.child, isA<Container>());
    });

    testWidgets('Column中的Expanded测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      // 查找Column中的Expanded
      final finder = find.byKey(const Key('expanded-column-top'));
      expect(finder, findsOneWidget);
      
      final expanded = tester.widget<Expanded>(finder);
      
      // 验证Expanded在Column中的表现
      expect(expanded.flex, equals(1));
      expect(expanded.child, isA<Container>());
      
      // 验证父组件是Column
      final columnFinder = find.ancestor(
        of: finder,
        matching: find.byType(Column),
      );
      expect(columnFinder, findsWidgets);
    });

    /// Center组件功能测试
    testWidgets('Center基础居中测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('center-basic'));
      expect(finder, findsOneWidget);
      
      final center = tester.widget<Center>(finder);
      
      // 验证Center属性（无因子时为null）
      expect(center.widthFactor, isNull);
      expect(center.heightFactor, isNull);
      
      // 验证Key正确设置
      expect(center.key, isA<Key>());
      expect((center.key as Key).toString(), contains('center-basic'));
      
      // 验证子组件存在
      expect(center.child, isA<Container>());
    });

    testWidgets('Center widthFactor测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('center-width-factor'));
      expect(finder, findsOneWidget);
      
      final center = tester.widget<Center>(finder);
      
      // 验证widthFactor为2.0
      expect(center.widthFactor, equals(2.0));
      expect(center.heightFactor, isNull);
      
      // 验证子组件存在
      expect(center.child, isA<Container>());
    });

    testWidgets('Center heightFactor测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('center-height-factor'));
      expect(finder, findsOneWidget);
      
      final center = tester.widget<Center>(finder);
      
      // 验证heightFactor为2.0
      expect(center.heightFactor, equals(2.0));
      expect(center.widthFactor, isNull);
      
      // 验证子组件存在
      expect(center.child, isA<Container>());
    });

    testWidgets('Center组合因子测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('center-both-factors'));
      expect(finder, findsOneWidget);
      
      final center = tester.widget<Center>(finder);
      
      // 验证widthFactor和heightFactor都为1.5
      expect(center.widthFactor, equals(1.5));
      expect(center.heightFactor, equals(1.5));
      
      // 验证Key正确设置
      expect(center.key, isA<Key>());
      expect((center.key as Key).toString(), contains('center-both-factors'));
      
      // 验证子组件存在
      expect(center.child, isA<Container>());
    });

    /// Padding组件功能测试
    testWidgets('Padding EdgeInsets.all测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('padding-all'));
      expect(finder, findsOneWidget);
      
      final padding = tester.widget<Padding>(finder);
      
      // 验证EdgeInsets.all(16)
      expect(padding.padding, isA<EdgeInsets>());
      final edgeInsets = padding.padding as EdgeInsets;
      expect(edgeInsets.left, equals(16.0));
      expect(edgeInsets.top, equals(16.0));
      expect(edgeInsets.right, equals(16.0));
      expect(edgeInsets.bottom, equals(16.0));
      
      // 验证Key正确设置
      expect(padding.key, isA<Key>());
      expect((padding.key as Key).toString(), contains('padding-all'));
      
      // 验证子组件存在
      expect(padding.child, isA<Container>());
    });

    testWidgets('Padding EdgeInsets.symmetric horizontal测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('padding-horizontal'));
      expect(finder, findsOneWidget);
      
      final padding = tester.widget<Padding>(finder);
      
      // 验证EdgeInsets.symmetric(horizontal: 24)
      expect(padding.padding, isA<EdgeInsets>());
      final edgeInsets = padding.padding as EdgeInsets;
      expect(edgeInsets.left, equals(24.0));
      expect(edgeInsets.right, equals(24.0));
      expect(edgeInsets.top, equals(0.0));
      expect(edgeInsets.bottom, equals(0.0));
      
      // 验证子组件存在
      expect(padding.child, isA<Container>());
    });

    testWidgets('Padding EdgeInsets.symmetric vertical测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('padding-vertical'));
      expect(finder, findsOneWidget);
      
      final padding = tester.widget<Padding>(finder);
      
      // 验证EdgeInsets.symmetric(vertical: 12)
      expect(padding.padding, isA<EdgeInsets>());
      final edgeInsets = padding.padding as EdgeInsets;
      expect(edgeInsets.top, equals(12.0));
      expect(edgeInsets.bottom, equals(12.0));
      expect(edgeInsets.left, equals(0.0));
      expect(edgeInsets.right, equals(0.0));
      
      // 验证子组件存在
      expect(padding.child, isA<Container>());
    });

    testWidgets('Padding EdgeInsets.only测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      final finder = find.byKey(const Key('padding-only'));
      expect(finder, findsOneWidget);
      
      final padding = tester.widget<Padding>(finder);
      
      // 验证EdgeInsets.only(left: 32, top: 8)
      expect(padding.padding, isA<EdgeInsets>());
      final edgeInsets = padding.padding as EdgeInsets;
      expect(edgeInsets.left, equals(32.0));
      expect(edgeInsets.top, equals(8.0));
      expect(edgeInsets.right, equals(0.0));
      expect(edgeInsets.bottom, equals(0.0));
      
      // 验证子组件存在
      expect(padding.child, isA<Container>());
    });

    testWidgets('Padding嵌套测试', (WidgetTester tester) async {
      await launchAppAndWaitReady(tester);
      
      // 验证外层Padding
      final outerFinder = find.byKey(const Key('padding-outer'));
      expect(outerFinder, findsOneWidget);
      
      final outerPadding = tester.widget<Padding>(outerFinder);
      
      // 验证外层padding为all(16)
      expect(outerPadding.padding, isA<EdgeInsets>());
      final outerEdgeInsets = outerPadding.padding as EdgeInsets;
      expect(outerEdgeInsets.left, equals(16.0));
      expect(outerEdgeInsets.top, equals(16.0));
      expect(outerEdgeInsets.right, equals(16.0));
      expect(outerEdgeInsets.bottom, equals(16.0));
      
      // 验证内层Padding
      final innerFinder = find.byKey(const Key('padding-inner'));
      expect(innerFinder, findsOneWidget);
      
      final innerPadding = tester.widget<Padding>(innerFinder);
      
      // 验证内层padding为all(8)
      expect(innerPadding.padding, isA<EdgeInsets>());
      final innerEdgeInsets = innerPadding.padding as EdgeInsets;
      expect(innerEdgeInsets.left, equals(8.0));
      expect(innerEdgeInsets.top, equals(8.0));
      expect(innerEdgeInsets.right, equals(8.0));
      expect(innerEdgeInsets.bottom, equals(8.0));
    });
  });
}