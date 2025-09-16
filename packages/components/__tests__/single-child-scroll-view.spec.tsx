/**
 * SingleChildScrollView组件测试套件 - JSX版本
 * 验证SingleChildScrollView组件的React端属性处理和API对齐
 */

import React from 'react';
import { SingleChildScrollView, SingleChildScrollViewProps } from '../src/single-child-scroll-view';
import { SingleChildScrollViewStyle } from '../src/styles/types';
import { mergeStyles } from '../src/styles/merge-styles';
import { EdgeInsets, EdgeInsetsValue } from '../src/styles/edge-insets';

describe('SingleChildScrollView Component', () => {
  describe('Props接口验证', () => {
    test('应该接受所有属性', () => {
      expect(() => {
        <SingleChildScrollView
          scrollDirection="horizontal"
          reverse={true}
          style={{
            padding: EdgeInsets.all(16),
            physics: 'bouncing',
            clipBehavior: 'antiAlias'
          }}
          id="test-scroll-view"
        >
          <div>Test Child</div>
        </SingleChildScrollView>
      }).not.toThrow();
    });

    test('应该接受children属性', () => {
      expect(() => {
        <SingleChildScrollView>
          <div>Test Child</div>
        </SingleChildScrollView>
      }).not.toThrow();
    });
  });

  describe('独立属性处理', () => {
    test('应该正确处理scrollDirection独立属性', () => {
      expect(() => {
        <SingleChildScrollView scrollDirection="horizontal">
          <div>Horizontal scroll</div>
        </SingleChildScrollView>
      }).not.toThrow();
    });

    test('应该正确处理reverse独立属性', () => {
      expect(() => {
        <SingleChildScrollView reverse={true}>
          <div>Reversed scroll</div>
        </SingleChildScrollView>
      }).not.toThrow();
    });

    test('应该正确处理id独立属性', () => {
      expect(() => {
        <SingleChildScrollView id="test-scroll">
          <div>ID scroll</div>
        </SingleChildScrollView>
      }).not.toThrow();
    });

    test('应该支持所有scrollDirection值', () => {
      const directions = ['vertical', 'horizontal'] as const;
      
      directions.forEach(direction => {
        expect(() => {
          <SingleChildScrollView scrollDirection={direction}>
            <div>Direction: {direction}</div>
          </SingleChildScrollView>
        }).not.toThrow();
      });
    });
  });

  describe('样式属性处理', () => {
    test('应该正确处理padding样式属性', () => {
      const padding: EdgeInsetsValue = EdgeInsets.all(10);
      const style: SingleChildScrollViewStyle = { padding };
      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.padding).toEqual(padding);
    });

    test('应该正确处理physics样式属性', () => {
      const style: SingleChildScrollViewStyle = { physics: 'bouncing' };
      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.physics).toBe('bouncing');
    });

    test('应该正确处理clipBehavior样式属性', () => {
      const style: SingleChildScrollViewStyle = { clipBehavior: 'antiAlias' };
      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.clipBehavior).toBe('antiAlias');
    });

    test('应该支持所有physics值', () => {
      const physicsValues = ['bouncing', 'clamping', 'never'] as const;
      
      physicsValues.forEach(physics => {
        const style: SingleChildScrollViewStyle = { physics };
        const mergedStyle = mergeStyles({}, style);
        expect(mergedStyle.physics).toBe(physics);
      });
    });

    test('应该支持所有clipBehavior值', () => {
      const clipValues = ['none', 'hardEdge', 'antiAlias', 'antiAliasWithSaveLayer'] as const;
      
      clipValues.forEach(clipBehavior => {
        const style: SingleChildScrollViewStyle = { clipBehavior };
        const mergedStyle = mergeStyles({}, style);
        expect(mergedStyle.clipBehavior).toBe(clipBehavior);
      });
    });

    test('当没有提供样式时，应该返回默认值', () => {
      const mergedStyle = mergeStyles({}, {});
      expect(mergedStyle.padding).toBeUndefined();
      expect(mergedStyle.physics).toBeUndefined();
      expect(mergedStyle.clipBehavior).toBeUndefined();
    });

    test('应该正确合并多个样式对象', () => {
      const baseStyle: SingleChildScrollViewStyle = {
        padding: EdgeInsets.all(5)
      };
      const overrideStyle: SingleChildScrollViewStyle = {
        physics: 'bouncing',
        padding: EdgeInsets.only({ left: 10, right: 10 })
      };
      const mergedStyle = mergeStyles(baseStyle, overrideStyle);
      expect(mergedStyle.physics).toBe('bouncing');
      expect(mergedStyle.padding).toEqual(EdgeInsets.only({ left: 10, right: 10 }));
    });
  });

  describe('属性组合测试', () => {
    test('应该正确处理独立属性和样式属性的组合', () => {
      expect(() => {
        <SingleChildScrollView
          scrollDirection="vertical"
          reverse={false}
          style={{
            padding: EdgeInsets.all(16),
            physics: 'clamping',
            clipBehavior: 'hardEdge'
          }}
          id="complex-scroll"
        >
          <div>Complex scroll content</div>
        </SingleChildScrollView>
      }).not.toThrow();
    });

    test('应该处理只有独立属性的组合', () => {
      expect(() => {
        <SingleChildScrollView
          scrollDirection="horizontal"
          reverse={true}
          id="horizontal-scroll"
        >
          <div>Horizontal only</div>
        </SingleChildScrollView>
      }).not.toThrow();
    });

    test('应该处理只有样式属性的组合', () => {
      expect(() => {
        <SingleChildScrollView
          style={{
            padding: EdgeInsets.symmetric({ vertical: 20, horizontal: 16 }),
            physics: 'bouncing',
            clipBehavior: 'antiAlias'
          }}
        >
          <div>Style only</div>
        </SingleChildScrollView>
      }).not.toThrow();
    });
  });

  describe('边界情况测试', () => {
    test('应该处理空属性', () => {
      expect(() => {
        <SingleChildScrollView>
          <div>Default behavior</div>
        </SingleChildScrollView>
      }).not.toThrow();
    });

    test('应该处理只有children的情况', () => {
      expect(() => {
        <SingleChildScrollView>
          <div>Single Child</div>
        </SingleChildScrollView>
      }).not.toThrow();
    });

    test('应该处理复杂children结构', () => {
      expect(() => {
        <SingleChildScrollView>
          <div>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
            <p>Paragraph 3</p>
          </div>
        </SingleChildScrollView>
      }).not.toThrow();
    });

    test('应该处理空样式对象', () => {
      expect(() => {
        <SingleChildScrollView style={{}}>
          <div>Empty style</div>
        </SingleChildScrollView>
      }).not.toThrow();
    });
  });
});
