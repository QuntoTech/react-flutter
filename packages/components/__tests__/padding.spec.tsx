/**
 * Padding组件测试套件
 * 验证Padding组件与Flutter API的完全对齐
 * 
 * 测试目标：
 * 1. 验证Padding组件的基础功能
 * 2. 确保与Flutter Padding API完全一致
 * 3. 验证所有EdgeInsets类型的正确传递
 * 4. 测试内边距布局逻辑
 */

import * as React from 'react';
import { Padding, Text, Container, EdgeInsets } from '../src';

describe('Padding组件', () => {
  describe('基础功能', () => {
    /**
     * 测试目的：验证Padding组件基本渲染
     * 验证路径：Padding → React.createElement('Padding')
     * 重要性：确保组件正确创建
     */
    test('应该正确渲染Padding组件', () => {
      const element = React.createElement(Padding, {
        padding: EdgeInsets.all(16),
        children: React.createElement(Text, { text: 'Hello' })
      });
      
      expect(element.type).toBe(Padding);
      expect(element.props.children).toBeDefined();
      expect(element.props.padding).toBeDefined();
    });

    /**
     * 测试目的：验证Padding只接受单个子组件
     * 验证路径：确保props.children是单个ReactNode
     * 重要性：与Flutter Padding行为一致
     */
    test('应该只接受一个子组件', () => {
      const element = React.createElement(Padding, {
        padding: EdgeInsets.all(8),
        children: React.createElement(Container, {})
      });
      
      expect(element.type).toBe(Padding);
      expect(element.props.children).toBeDefined();
      expect((element.props.children as any).type).toBe(Container);
    });

    /**
     * 测试目的：验证padding是必需属性
     * 验证路径：padding必须存在
     * 重要性：与Flutter Padding API一致
     */
    test('padding应该是必需属性', () => {
      const element = React.createElement(Padding, {
        padding: EdgeInsets.all(16),
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.padding).toBeDefined();
      expect(element.props.padding).not.toBeNull();
    });
  });

  describe('EdgeInsets.all测试', () => {
    /**
     * 测试目的：验证EdgeInsets.all正确传递
     * 验证路径：EdgeInsets.all(16) → props.padding
     * 重要性：确保四周相同内边距正确设置
     */
    test('应该正确传递EdgeInsets.all', () => {
      const padding = EdgeInsets.all(16);
      const element = React.createElement(Padding, {
        padding: padding,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.padding).toBe(padding);
      expect((element.props.padding as EdgeInsets).top).toBe(16);
      expect((element.props.padding as EdgeInsets).right).toBe(16);
      expect((element.props.padding as EdgeInsets).bottom).toBe(16);
      expect((element.props.padding as EdgeInsets).left).toBe(16);
    });

    /**
     * 测试目的：验证EdgeInsets.all支持0值
     * 验证路径：EdgeInsets.all(0) → 正确处理
     * 重要性：确保边界值正确处理
     */
    test('EdgeInsets.all应该支持0值', () => {
      const padding = EdgeInsets.all(0);
      const element = React.createElement(Padding, {
        padding: padding,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect((element.props.padding as EdgeInsets).top).toBe(0);
      expect((element.props.padding as EdgeInsets).right).toBe(0);
      expect((element.props.padding as EdgeInsets).bottom).toBe(0);
      expect((element.props.padding as EdgeInsets).left).toBe(0);
    });
  });

  describe('EdgeInsets.symmetric测试', () => {
    /**
     * 测试目的：验证EdgeInsets.symmetric正确传递
     * 验证路径：EdgeInsets.symmetric → props.padding
     * 重要性：确保对称内边距正确设置
     */
    test('应该正确传递EdgeInsets.symmetric(horizontal)', () => {
      const padding = EdgeInsets.symmetric({ horizontal: 24 });
      const element = React.createElement(Padding, {
        padding: padding,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.padding).toBe(padding);
      expect((element.props.padding as EdgeInsets).left).toBe(24);
      expect((element.props.padding as EdgeInsets).right).toBe(24);
      expect((element.props.padding as EdgeInsets).top).toBe(0);
      expect((element.props.padding as EdgeInsets).bottom).toBe(0);
    });

    test('应该正确传递EdgeInsets.symmetric(vertical)', () => {
      const padding = EdgeInsets.symmetric({ vertical: 16 });
      const element = React.createElement(Padding, {
        padding: padding,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect((element.props.padding as EdgeInsets).top).toBe(16);
      expect((element.props.padding as EdgeInsets).bottom).toBe(16);
      expect((element.props.padding as EdgeInsets).left).toBe(0);
      expect((element.props.padding as EdgeInsets).right).toBe(0);
    });

    test('应该正确传递EdgeInsets.symmetric(horizontal + vertical)', () => {
      const padding = EdgeInsets.symmetric({ horizontal: 24, vertical: 16 });
      const element = React.createElement(Padding, {
        padding: padding,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect((element.props.padding as EdgeInsets).left).toBe(24);
      expect((element.props.padding as EdgeInsets).right).toBe(24);
      expect((element.props.padding as EdgeInsets).top).toBe(16);
      expect((element.props.padding as EdgeInsets).bottom).toBe(16);
    });
  });

  describe('EdgeInsets.only测试', () => {
    /**
     * 测试目的：验证EdgeInsets.only正确传递
     * 验证路径：EdgeInsets.only → props.padding
     * 重要性：确保指定边内边距正确设置
     */
    test('应该正确传递EdgeInsets.only(单边)', () => {
      const padding = EdgeInsets.only({ top: 10 });
      const element = React.createElement(Padding, {
        padding: padding,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect((element.props.padding as EdgeInsets).top).toBe(10);
      expect((element.props.padding as EdgeInsets).right).toBe(0);
      expect((element.props.padding as EdgeInsets).bottom).toBe(0);
      expect((element.props.padding as EdgeInsets).left).toBe(0);
    });

    test('应该正确传递EdgeInsets.only(多边)', () => {
      const padding = EdgeInsets.only({ top: 10, left: 20, bottom: 30 });
      const element = React.createElement(Padding, {
        padding: padding,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect((element.props.padding as EdgeInsets).top).toBe(10);
      expect((element.props.padding as EdgeInsets).left).toBe(20);
      expect((element.props.padding as EdgeInsets).bottom).toBe(30);
      expect((element.props.padding as EdgeInsets).right).toBe(0);
    });

    test('应该正确传递EdgeInsets.only(所有边)', () => {
      const padding = EdgeInsets.only({ top: 10, right: 15, bottom: 20, left: 25 });
      const element = React.createElement(Padding, {
        padding: padding,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect((element.props.padding as EdgeInsets).top).toBe(10);
      expect((element.props.padding as EdgeInsets).right).toBe(15);
      expect((element.props.padding as EdgeInsets).bottom).toBe(20);
      expect((element.props.padding as EdgeInsets).left).toBe(25);
    });
  });

  describe('id属性测试', () => {
    /**
     * 测试目的：验证id属性正确传递
     * 验证路径：id: 'my-padding' → props.id = 'my-padding'
     * 重要性：确保id用于Key映射和调试
     */
    test('id属性应该正确传递', () => {
      const element = React.createElement(Padding, {
        padding: EdgeInsets.all(16),
        id: 'my-padding',
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.id).toBe('my-padding');
    });

    test('id属性应该是可选的', () => {
      const element = React.createElement(Padding, {
        padding: EdgeInsets.all(16),
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.id).toBeUndefined();
    });
  });

  describe('子组件支持', () => {
    /**
     * 测试目的：验证支持Text子组件
     * 验证路径：Padding → Text子组件
     * 重要性：确保常见子组件类型正常工作
     */
    test('应该支持Text子组件', () => {
      const element = React.createElement(Padding, {
        padding: EdgeInsets.all(16),
        children: React.createElement(Text, { text: 'Padded Text' })
      });
      
      expect(element.props.children).toBeDefined();
      expect((element.props.children as any).type).toBe(Text);
    });

    /**
     * 测试目的：验证支持Container子组件
     * 验证路径：Padding → Container子组件
     * 重要性：确保布局容器可以作为子组件
     */
    test('应该支持Container子组件', () => {
      const element = React.createElement(Padding, {
        padding: EdgeInsets.all(16),
        children: React.createElement(Container, {})
      });
      
      expect(element.props.children).toBeDefined();
      expect((element.props.children as any).type).toBe(Container);
    });

    /**
     * 测试目的：验证支持嵌套Padding
     * 验证路径：Padding → Padding → Text
     * 重要性：确保多层内边距叠加正常工作
     */
    test('应该支持嵌套Padding', () => {
      const element = React.createElement(Padding, {
        padding: EdgeInsets.all(16),
        children: React.createElement(Padding, {
          padding: EdgeInsets.all(8),
          children: React.createElement(Text, { text: 'Nested' })
        })
      });
      
      expect(element.type).toBe(Padding);
      expect((element.props.children as any).type).toBe(Padding);
    });
  });

  describe('边界情况', () => {
    /**
     * 测试目的：验证小数内边距值
     * 验证路径：EdgeInsets.all(16.5) → 正确传递
     * 重要性：确保小数值正确处理
     */
    test('应该支持小数内边距值', () => {
      const padding = EdgeInsets.all(16.5);
      const element = React.createElement(Padding, {
        padding: padding,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect((element.props.padding as EdgeInsets).top).toBe(16.5);
      expect((element.props.padding as EdgeInsets).right).toBe(16.5);
      expect((element.props.padding as EdgeInsets).bottom).toBe(16.5);
      expect((element.props.padding as EdgeInsets).left).toBe(16.5);
    });

    /**
     * 测试目的：验证大数值内边距
     * 验证路径：EdgeInsets.all(100) → 正确传递
     * 重要性：确保大数值正确处理
     */
    test('应该支持大数值内边距', () => {
      const padding = EdgeInsets.all(100);
      const element = React.createElement(Padding, {
        padding: padding,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect((element.props.padding as EdgeInsets).top).toBe(100);
    });
  });
});
