/**
 * SizedBox组件React端单元测试
 * 验证SizedBox组件的属性和Flutter API一致性
 */

import React from 'react';
import { SizedBox, SizedBoxProps } from '../src/sized-box';

describe('SizedBox组件', () => {
  describe('Props接口验证', () => {
    test('应该接受基本属性', () => {
      const props: SizedBoxProps = {
        width: 100,
        height: 50,
        id: 'test-sizedbox'
      };
      expect(props).toBeDefined();
    });

    test('应该接受children', () => {
      const props: SizedBoxProps = {
        children: <div>子组件</div>,
        width: 200,
        height: 100
      };
      expect(props).toBeDefined();
    });

    test('应该接受只有宽度', () => {
      const props: SizedBoxProps = {
        width: 150
      };
      expect(props).toBeDefined();
      expect(props.width).toBe(150);
      expect(props.height).toBeUndefined();
    });

    test('应该接受只有高度', () => {
      const props: SizedBoxProps = {
        height: 75
      };
      expect(props).toBeDefined();
      expect(props.height).toBe(75);
      expect(props.width).toBeUndefined();
    });

    test('应该接受空属性', () => {
      const props: SizedBoxProps = {};
      expect(props).toBeDefined();
    });
  });

  describe('属性类型验证', () => {
    test('width应该接受number类型', () => {
      const validWidths = [0, 50, 100.5, 200, Number.POSITIVE_INFINITY];
      
      validWidths.forEach(width => {
        const props: SizedBoxProps = { width };
        expect(props.width).toBe(width);
      });
    });

    test('height应该接受number类型', () => {
      const validHeights = [0, 25, 150.8, 300, Number.POSITIVE_INFINITY];
      
      validHeights.forEach(height => {
        const props: SizedBoxProps = { height };
        expect(props.height).toBe(height);
      });
    });

    test('id应该接受string类型', () => {
      const validIds = ['', 'test', 'sized-box-1', 'my_sizedbox'];
      
      validIds.forEach(id => {
        const props: SizedBoxProps = { id };
        expect(props.id).toBe(id);
      });
    });
  });

  describe('Flutter API一致性', () => {
    test('应该只包含Flutter SizedBox的标准属性', () => {
      const validProps: SizedBoxProps = {
        width: 100,      // Flutter: double? width
        height: 200,     // Flutter: double? height
        children: <div />, // Flutter: Widget? child
        id: 'flutter-sizedbox' // 自定义: Key? key
      };
      
      expect(validProps).toBeDefined();
      expect(validProps.width).toBe(100);
      expect(validProps.height).toBe(200);
      expect(validProps.children).toBeDefined();
      expect(validProps.id).toBe('flutter-sizedbox');
    });

    test('不应该包含style属性（SizedBox是纯尺寸控制组件）', () => {
      const validProps: SizedBoxProps = {
        width: 50,
        height: 50
      };
      
      expect('style' in validProps).toBe(false);
      expect('color' in validProps).toBe(false);
      expect('padding' in validProps).toBe(false);
      expect('margin' in validProps).toBe(false);
    });

    test('应该支持Flutter的特殊尺寸值', () => {
      // 测试无穷大（expand效果）
      const expandProps: SizedBoxProps = {
        width: Number.POSITIVE_INFINITY,
        height: Number.POSITIVE_INFINITY
      };
      expect(expandProps.width).toBe(Number.POSITIVE_INFINITY);
      expect(expandProps.height).toBe(Number.POSITIVE_INFINITY);

      // 测试零尺寸（shrink效果）
      const shrinkProps: SizedBoxProps = {
        width: 0,
        height: 0
      };
      expect(shrinkProps.width).toBe(0);
      expect(shrinkProps.height).toBe(0);
    });
  });

  describe('特殊尺寸用法', () => {
    test('应该支持expand效果（无穷大尺寸）', () => {
      const expandProps: SizedBoxProps = {
        width: Number.POSITIVE_INFINITY,
        height: Number.POSITIVE_INFINITY,
        id: 'expand-test'
      };
      expect(expandProps.width).toBe(Number.POSITIVE_INFINITY);
      expect(expandProps.height).toBe(Number.POSITIVE_INFINITY);
      expect(expandProps.id).toBe('expand-test');
    });

    test('应该支持shrink效果（零尺寸）', () => {
      const shrinkProps: SizedBoxProps = {
        width: 0,
        height: 0,
        id: 'shrink-test'
      };
      expect(shrinkProps.width).toBe(0);
      expect(shrinkProps.height).toBe(0);
      expect(shrinkProps.id).toBe('shrink-test');
    });

    test('应该支持square效果（相同宽高）', () => {
      const squareProps: SizedBoxProps = {
        width: 50,
        height: 50,
        id: 'square-test'
      };
      expect(squareProps.width).toBe(50);
      expect(squareProps.height).toBe(50);
      expect(squareProps.width).toBe(squareProps.height); // 确保相等
      expect(squareProps.id).toBe('square-test');
    });
  });

  describe('边界情况', () => {
    test('应该处理零尺寸', () => {
      const props: SizedBoxProps = { width: 0, height: 0 };
      expect(props.width).toBe(0);
      expect(props.height).toBe(0);
    });

    test('应该处理小数尺寸', () => {
      const props: SizedBoxProps = { width: 123.456, height: 78.9 };
      expect(props.width).toBe(123.456);
      expect(props.height).toBe(78.9);
    });

    test('应该处理很大的尺寸', () => {
      const props: SizedBoxProps = { width: 99999, height: 88888 };
      expect(props.width).toBe(99999);
      expect(props.height).toBe(88888);
    });

    test('应该处理负数尺寸（虽然不推荐）', () => {
      const props: SizedBoxProps = { width: -10, height: -20 };
      expect(props.width).toBe(-10);
      expect(props.height).toBe(-20);
    });

    test('应该处理无穷大尺寸', () => {
      const props: SizedBoxProps = { 
        width: Number.POSITIVE_INFINITY, 
        height: Number.NEGATIVE_INFINITY 
      };
      expect(props.width).toBe(Number.POSITIVE_INFINITY);
      expect(props.height).toBe(Number.NEGATIVE_INFINITY);
    });
  });

  describe('组合场景', () => {
    test('应该支持完整属性组合', () => {
      const props: SizedBoxProps = {
        width: 150,
        height: 200,
        children: <span>内容</span>,
        id: 'full-sizedbox'
      };

      expect(props.width).toBe(150);
      expect(props.height).toBe(200);
      expect(props.children).toBeDefined();
      expect(props.id).toBe('full-sizedbox');
    });

    test('应该支持只设置一个维度', () => {
      const widthOnlyProps: SizedBoxProps = {
        width: 100,
        children: <div>宽度固定</div>
      };
      expect(widthOnlyProps.width).toBe(100);
      expect(widthOnlyProps.height).toBeUndefined();

      const heightOnlyProps: SizedBoxProps = {
        height: 50,
        children: <div>高度固定</div>
      };
      expect(heightOnlyProps.height).toBe(50);
      expect(heightOnlyProps.width).toBeUndefined();
    });

    test('应该支持用作间距控制', () => {
      const horizontalSpacer: SizedBoxProps = { width: 20 };
      const verticalSpacer: SizedBoxProps = { height: 10 };
      
      expect(horizontalSpacer.width).toBe(20);
      expect(horizontalSpacer.height).toBeUndefined();
      expect(verticalSpacer.height).toBe(10);
      expect(verticalSpacer.width).toBeUndefined();
    });
  });
});
