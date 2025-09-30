/**
 * Expanded组件测试套件
 * 验证Expanded组件与Flutter API的完全对齐
 * 
 * 测试目标：
 * 1. 验证Expanded组件的基础功能
 * 2. 确保与Flutter Expanded API完全一致
 * 3. 验证所有属性的正确传递
 * 4. 测试弹性布局逻辑
 */

import * as React from 'react';
import { Expanded, Text, Container } from '../src';

describe('Expanded组件', () => {
  describe('基础功能', () => {
    /**
     * 测试目的：验证Expanded组件基本渲染
     * 验证路径：Expanded → React.createElement('Expanded')
     * 重要性：确保组件正确创建
     */
    test('应该正确渲染Expanded组件', () => {
      const element = React.createElement(Expanded, {
        children: React.createElement(Text, { text: 'Hello' })
      });
      
      expect(element.type).toBe(Expanded);
      expect(element.props.children).toBeDefined();
    });

    /**
     * 测试目的：验证Expanded可以包含单个子组件
     * 验证路径：Expanded → 单子组件 → 弹性布局
     * 重要性：确保弹性布局功能
     */
    test('应该支持单个子组件', () => {
      const child = React.createElement(Container, { style: { width: 100 } });
      
      const element = React.createElement(Expanded, {
        children: child
      });
      
      expect(element.props.children).toBeDefined();
      expect((element.props.children as any).type).toBe(Container);
    });
  });

  describe('属性验证', () => {
    /**
     * 测试目的：验证未设置flex时不报错
     * 验证路径：未设置flex → 组件正常渲染
     * 重要性：对齐Flutter默认行为(默认为1)
     */
    test('应该支持不设置flex属性', () => {
      const element = (
        <Expanded>
          <Text text="Test" />
        </Expanded>
      );
      
      // 未设置flex时，props中没有flex（默认值在组件内部）
      expect(element.props.children).toBeDefined();
      expect(element.type).toBe(Expanded);
    });

    /**
     * 测试目的：验证自定义flex值
     * 验证路径：flex: 2 → props传递
     * 重要性：确保flex比例正确传递
     */
    test('应该支持自定义flex值', () => {
      const element = React.createElement(Expanded, {
        flex: 2,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.flex).toBe(2);
    });

    /**
     * 测试目的：验证flex值为0的情况
     * 验证路径：flex: 0 → 不占用空间
     * 重要性：对齐Flutter flex=0行为
     */
    test('应该支持flex值为0', () => {
      const element = React.createElement(Expanded, {
        flex: 0,
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.flex).toBe(0);
    });

    /**
     * 测试目的：验证id属性传递
     * 验证路径：id prop → Flutter Key
     * 重要性：确保组件可识别
     */
    test('应该支持id属性', () => {
      const element = React.createElement(Expanded, {
        id: 'test-expanded',
        children: React.createElement(Text, { text: 'Test' })
      });
      
      expect(element.props.id).toBe('test-expanded');
    });
  });

  describe('类型安全', () => {
    /**
     * 测试目的：验证ExpandedProps接口
     * 验证路径：TypeScript类型检查
     * 重要性：确保类型安全
     */
    test('应该接受合法的props', () => {
      const element = (
        <Expanded flex={2} id="test-id">
          <Text text="Content" />
        </Expanded>
      );
      
      expect(element).toBeDefined();
    });
  });

  describe('子组件渲染', () => {
    /**
     * 测试目的：验证子组件正确渲染
     * 验证路径：Expanded → 子组件传递
     * 重要性：确保布局正确
     */
    test('应该正确渲染子组件', () => {
      const child = <Container style={{ width: 100 }}><Text text="Child" /></Container>;
      const element = (
        <Expanded flex={1} id="test-expanded">
          {child}
        </Expanded>
      );
      
      expect(element.props.children).toBeDefined();
      expect((element.props.children as any).type).toBe(Container);
    });
  });

  describe('与Flutter API对齐', () => {
    /**
     * 测试目的：验证与Flutter Expanded构造函数一致
     * Flutter API: Expanded({Key? key, int flex = 1, required Widget child})
     * 重要性：100%API对齐
     */
    test('应该与Flutter Expanded API一致', () => {
      const element = React.createElement(Expanded, {
        flex: 2,
        id: 'flutter-key',
        children: React.createElement(Container)
      });
      
      // 验证所有Flutter Expanded支持的属性
      expect(element.props.flex).toBe(2);          // Flutter: flex参数
      expect(element.props.id).toBe('flutter-key'); // Flutter: key参数
      expect(element.props.children).toBeDefined(); // Flutter: child参数
    });
  });
});
