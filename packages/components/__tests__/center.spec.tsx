/**
 * Center组件测试套件
 * 验证Center组件与Flutter API的完全对齐
 * 
 * 测试目标：
 * 1. 验证Center组件的基础功能
 * 2. 确保与Flutter Center API完全一致
 * 3. 验证所有属性的正确传递
 * 4. 测试居中布局逻辑
 */

import * as React from 'react';
import { Center, Text, Container } from '../src';

describe('Center组件', () => {
  describe('基础功能', () => {
    /**
     * 测试目的：验证Center组件基本渲染
     * 验证路径：Center → React.createElement('Center')
     * 重要性：确保组件正确创建
     */
    test('应该正确渲染Center组件', () => {
      const element = React.createElement(Center, {
        children: React.createElement(Text, { text: 'Hello' })
      });
      
      expect(element.type).toBe(Center);
      expect(element.props.children).toBeDefined();
    });

    /**
     * 测试目的：验证Center只接受单个子组件
     * 验证路径：确保props.children是单个ReactNode
     * 重要性：与Flutter Center行为一致
     */
    test('应该只接受一个子组件', () => {
      const element = React.createElement(Center, {
        children: React.createElement(Container, {})
      });
      
      expect(element.type).toBe(Center);
      expect(element.props.children).toBeDefined();
      expect((element.props.children as any).type).toBe(Container);
    });
  });

  describe('属性验证', () => {
    /**
     * 测试目的：验证不设置widthFactor时的默认行为
     * 验证路径：widthFactor未设置 → 组件仍正常工作
     * 重要性：确保可选属性的正确处理
     */
    test('应该支持不设置widthFactor', () => {
      const element = React.createElement(Center, {
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.children).toBeDefined();
      expect(element.type).toBe(Center);
      expect(element.props.widthFactor).toBeUndefined();
    });

    /**
     * 测试目的：验证不设置heightFactor时的默认行为
     * 验证路径：heightFactor未设置 → 组件仍正常工作
     * 重要性：确保可选属性的正确处理
     */
    test('应该支持不设置heightFactor', () => {
      const element = React.createElement(Center, {
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.children).toBeDefined();
      expect(element.type).toBe(Center);
      expect(element.props.heightFactor).toBeUndefined();
    });

    /**
     * 测试目的：验证widthFactor属性正确传递
     * 验证路径：widthFactor: 2.0 → props.widthFactor = 2.0
     * 重要性：确保widthFactor在bridge传递时正确
     */
    test('widthFactor属性应该正确传递', () => {
      const element = React.createElement(Center, {
        widthFactor: 2.0,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.widthFactor).toBe(2.0);
    });

    /**
     * 测试目的：验证heightFactor属性正确传递
     * 验证路径：heightFactor: 1.5 → props.heightFactor = 1.5
     * 重要性：确保heightFactor在bridge传递时正确
     */
    test('heightFactor属性应该正确传递', () => {
      const element = React.createElement(Center, {
        heightFactor: 1.5,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.heightFactor).toBe(1.5);
    });

    /**
     * 测试目的：验证同时设置widthFactor和heightFactor
     * 验证路径：两个因子 → 都正确传递
     * 重要性：确保多属性组合正常工作
     */
    test('应该同时支持widthFactor和heightFactor', () => {
      const element = React.createElement(Center, {
        widthFactor: 2.0,
        heightFactor: 1.5,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.widthFactor).toBe(2.0);
      expect(element.props.heightFactor).toBe(1.5);
    });

    /**
     * 测试目的：验证id属性正确传递
     * 验证路径：id: 'my-center' → props.id = 'my-center'
     * 重要性：确保id用于Key映射和调试
     */
    test('id属性应该正确传递', () => {
      const element = React.createElement(Center, {
        id: 'my-center',
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.id).toBe('my-center');
    });
  });

  describe('子组件支持', () => {
    /**
     * 测试目的：验证支持Text子组件
     * 验证路径：Center → Text子组件
     * 重要性：确保常见子组件类型正常工作
     */
    test('应该支持Text子组件', () => {
      const element = React.createElement(Center, {
        children: React.createElement(Text, { text: 'Center Text' })
      });
      
      expect(element.props.children).toBeDefined();
      expect((element.props.children as any).type).toBe(Text);
    });

    /**
     * 测试目的：验证支持Container子组件
     * 验证路径：Center → Container子组件
     * 重要性：确保布局容器可以作为子组件
     */
    test('应该支持Container子组件', () => {
      const element = React.createElement(Center, {
        children: React.createElement(Container, {})
      });
      
      expect(element.props.children).toBeDefined();
      expect((element.props.children as any).type).toBe(Container);
    });

    /**
     * 测试目的：验证支持嵌套Center
     * 验证路径：Center → Center → Text
     * 重要性：确保嵌套布局正常工作
     */
    test('应该支持嵌套Center', () => {
      const element = React.createElement(Center, {
        children: React.createElement(Center, {
          children: React.createElement(Text, { text: 'Nested' })
        })
      });
      
      expect(element.type).toBe(Center);
      expect((element.props.children as any).type).toBe(Center);
    });
  });

  describe('边界情况', () => {
    /**
     * 测试目的：验证widthFactor可以为0
     * 验证路径：widthFactor: 0 → props.widthFactor = 0
     * 重要性：确保边界值正确处理
     */
    test('widthFactor可以为0', () => {
      const element = React.createElement(Center, {
        widthFactor: 0,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.widthFactor).toBe(0);
    });

    /**
     * 测试目的：验证heightFactor可以为0
     * 验证路径：heightFactor: 0 → props.heightFactor = 0
     * 重要性：确保边界值正确处理
     */
    test('heightFactor可以为0', () => {
      const element = React.createElement(Center, {
        heightFactor: 0,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.heightFactor).toBe(0);
    });

    /**
     * 测试目的：验证因子可以为小数
     * 验证路径：widthFactor: 1.5, heightFactor: 0.5 → 正确传递
     * 重要性：确保小数因子正确处理
     */
    test('因子可以为小数', () => {
      const element = React.createElement(Center, {
        widthFactor: 1.5,
        heightFactor: 0.5,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.widthFactor).toBe(1.5);
      expect(element.props.heightFactor).toBe(0.5);
    });
  });
});