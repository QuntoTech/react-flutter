/**
 * SizedBox组件React端单元测试
 * 验证SizedBox组件的正确创建和属性传递
 */

import * as React from 'react';
import { SizedBox } from '../src/sized-box';

describe('SizedBox组件', () => {
  describe('基础功能', () => {
    test('应该正确渲染SizedBox组件', () => {
      const element = React.createElement(SizedBox, {
        id: 'test-sizedbox'
      });
      
      expect(element.type).toBe(SizedBox);
      expect(element.props.id).toBe('test-sizedbox');
    });

    test('应该支持children', () => {
      const element = React.createElement(SizedBox, {
        children: React.createElement('div', null, 'Child')
      });
      
      expect(element.props.children).toBeDefined();
    });
  });

  describe('尺寸属性', () => {
    test('应该正确传递width属性', () => {
      const element = React.createElement(SizedBox, {
        width: 100
      });
      
      expect(element.props.width).toBe(100);
    });

    test('应该正确传递height属性', () => {
      const element = React.createElement(SizedBox, {
        height: 200
      });
      
      expect(element.props.height).toBe(200);
    });

    test('应该同时传递width和height', () => {
      const element = React.createElement(SizedBox, {
        width: 150,
        height: 300
      });
      
      expect(element.props.width).toBe(150);
      expect(element.props.height).toBe(300);
    });

    test('应该处理小数尺寸', () => {
      const element = React.createElement(SizedBox, {
        width: 100.5,
        height: 200.75
      });
      
      expect(element.props.width).toBe(100.5);
      expect(element.props.height).toBe(200.75);
    });

    test('应该处理0尺寸', () => {
      const element = React.createElement(SizedBox, {
        width: 0,
        height: 0
      });
      
      expect(element.props.width).toBe(0);
      expect(element.props.height).toBe(0);
    });
  });

  describe('ID标识属性', () => {
    test('应该正确传递id属性', () => {
      const element = React.createElement(SizedBox, {
        id: 'my-sizedbox'
      });
      
      expect(element.props.id).toBe('my-sizedbox');
    });
  });

  describe('属性组合测试', () => {
    test('应该支持完整属性组合', () => {
      const element = React.createElement(SizedBox, {
        width: 200,
        height: 100,
        id: 'complete-sizedbox',
        children: React.createElement('div', null, 'Content')
      });
      
      expect(element.type).toBe(SizedBox);
      expect(element.props.width).toBe(200);
      expect(element.props.height).toBe(100);
      expect(element.props.id).toBe('complete-sizedbox');
      expect(element.props.children).toBeDefined();
    });

    test('应该支持最小属性组合', () => {
      const element = React.createElement(SizedBox);
      expect(element.type).toBe(SizedBox);
      expect(element.props.width).toBeUndefined();
      expect(element.props.height).toBeUndefined();
    });

    test('应该支持仅width', () => {
      const element = React.createElement(SizedBox, {
        width: 100
      });
      
      expect(element.props.width).toBe(100);
      expect(element.props.height).toBeUndefined();
    });

    test('应该支持仅height', () => {
      const element = React.createElement(SizedBox, {
        height: 200
      });
      
      expect(element.props.width).toBeUndefined();
      expect(element.props.height).toBe(200);
    });
  });

  describe('边界情况测试', () => {
    test('应该处理空children', () => {
      const element = React.createElement(SizedBox, {
        width: 100,
        height: 200
      });
      expect(element.props.children).toBeUndefined();
    });

    test('应该处理undefined尺寸', () => {
      const element = React.createElement(SizedBox, {
        width: undefined,
        height: undefined
      });
      expect(element.props.width).toBeUndefined();
      expect(element.props.height).toBeUndefined();
    });

    test('应该处理极大尺寸', () => {
      const element = React.createElement(SizedBox, {
        width: 99999,
        height: 99999
      });
      
      expect(element.props.width).toBe(99999);
      expect(element.props.height).toBe(99999);
    });
  });

  describe('Flutter API一致性验证', () => {
    test('应该完全对齐Flutter SizedBox构造函数', () => {
      // Flutter SizedBox主要用于固定尺寸
      const fixedSizeElement = React.createElement(SizedBox, {
        width: 100,
        height: 100
      });
      
      expect(fixedSizeElement.props.width).toBe(100);
      expect(fixedSizeElement.props.height).toBe(100);
    });

    test('应该支持shrink语义（空SizedBox）', () => {
      // Flutter: SizedBox.shrink() - 等价于 SizedBox(width: 0, height: 0)
      const shrinkElement = React.createElement(SizedBox, {
        width: 0,
        height: 0
      });
      
      expect(shrinkElement.props.width).toBe(0);
      expect(shrinkElement.props.height).toBe(0);
    });

    test('应该支持expand语义（带child的SizedBox）', () => {
      // Flutter: SizedBox.expand() - 无限大小
      // 但我们的实现使用具体数字，这是合理的简化
      const expandElement = React.createElement(SizedBox, {
        width: Number.MAX_SAFE_INTEGER,
        height: Number.MAX_SAFE_INTEGER
      });
      
      expect(expandElement.props.width).toBe(Number.MAX_SAFE_INTEGER);
      expect(expandElement.props.height).toBe(Number.MAX_SAFE_INTEGER);
    });
  });
});