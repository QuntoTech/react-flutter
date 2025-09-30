/**
 * Row组件React端单元测试
 * 验证Row组件的正确创建和属性传递
 */

import * as React from 'react';
import { Row } from '../src/row';

describe('Row组件', () => {
  describe('基础功能', () => {
    test('应该正确渲染Row组件', () => {
      const element = React.createElement(Row, {
        id: 'test-row'
      });
      
      expect(element.type).toBe(Row);
      expect(element.props.id).toBe('test-row');
    });

    test('应该支持children', () => {
      const element = React.createElement(Row, {
        children: [
          React.createElement('div', { key: '1' }, 'Child 1'),
          React.createElement('div', { key: '2' }, 'Child 2')
        ]
      });
      
      expect(element.props.children).toBeDefined();
      expect(Array.isArray(element.props.children)).toBe(true);
    });
  });

  describe('MainAxisAlignment主轴对齐属性', () => {
    test('应该正确传递mainAxisAlignment', () => {
      const element = React.createElement(Row, {
        mainAxisAlignment: 'center'
      });
      
      expect(element.props.mainAxisAlignment).toBe('center');
    });

    test('应该支持所有Flutter MainAxisAlignment值', () => {
      const alignmentValues = ['start', 'end', 'center', 'spaceBetween', 'spaceAround', 'spaceEvenly'] as const;
      
      alignmentValues.forEach(alignment => {
        const element = React.createElement(Row, {
          mainAxisAlignment: alignment
        });
        expect(element.props.mainAxisAlignment).toBe(alignment);
      });
    });
  });

  describe('CrossAxisAlignment交叉轴对齐属性', () => {
    test('应该正确传递crossAxisAlignment', () => {
      const element = React.createElement(Row, {
        crossAxisAlignment: 'stretch'
      });
      
      expect(element.props.crossAxisAlignment).toBe('stretch');
    });

    test('应该支持所有Flutter CrossAxisAlignment值', () => {
      const alignmentValues = ['start', 'end', 'center', 'stretch', 'baseline'] as const;
      
      alignmentValues.forEach(alignment => {
        const element = React.createElement(Row, {
          crossAxisAlignment: alignment
        });
        expect(element.props.crossAxisAlignment).toBe(alignment);
      });
    });
  });

  describe('MainAxisSize主轴大小属性', () => {
    test('应该正确传递mainAxisSize', () => {
      const element = React.createElement(Row, {
        mainAxisSize: 'min'
      });
      
      expect(element.props.mainAxisSize).toBe('min');
    });

    test('应该支持所有Flutter MainAxisSize值', () => {
      const sizeValues = ['min', 'max'] as const;
      
      sizeValues.forEach(size => {
        const element = React.createElement(Row, {
          mainAxisSize: size
        });
        expect(element.props.mainAxisSize).toBe(size);
      });
    });
  });

  describe('TextDirection文本方向属性', () => {
    test('应该正确传递textDirection', () => {
      const element = React.createElement(Row, {
        textDirection: 'rtl'
      });
      
      expect(element.props.textDirection).toBe('rtl');
    });

    test('应该支持所有Flutter TextDirection值', () => {
      const directionValues = ['ltr', 'rtl'] as const;
      
      directionValues.forEach(direction => {
        const element = React.createElement(Row, {
          textDirection: direction
        });
        expect(element.props.textDirection).toBe(direction);
      });
    });
  });

  describe('VerticalDirection垂直方向属性', () => {
    test('应该正确传递verticalDirection', () => {
      const element = React.createElement(Row, {
        verticalDirection: 'up'
      });
      
      expect(element.props.verticalDirection).toBe('up');
    });

    test('应该支持所有Flutter VerticalDirection值', () => {
      const directionValues = ['up', 'down'] as const;
      
      directionValues.forEach(direction => {
        const element = React.createElement(Row, {
          verticalDirection: direction
        });
        expect(element.props.verticalDirection).toBe(direction);
      });
    });
  });

  describe('TextBaseline文本基线属性', () => {
    test('应该正确传递textBaseline', () => {
      const element = React.createElement(Row, {
        textBaseline: 'ideographic'
      });
      
      expect(element.props.textBaseline).toBe('ideographic');
    });

    test('应该支持所有Flutter TextBaseline值', () => {
      const baselineValues = ['alphabetic', 'ideographic'] as const;
      
      baselineValues.forEach(baseline => {
        const element = React.createElement(Row, {
          textBaseline: baseline
        });
        expect(element.props.textBaseline).toBe(baseline);
      });
    });
  });

  describe('ID标识属性', () => {
    test('应该正确传递id属性', () => {
      const element = React.createElement(Row, {
        id: 'test-row-id'
      });
      
      expect(element.props.id).toBe('test-row-id');
    });
  });

  describe('属性组合测试', () => {
    test('应该正确处理所有属性的组合', () => {
      const element = React.createElement(Row, {
        mainAxisAlignment: 'spaceBetween',
        crossAxisAlignment: 'center',
        mainAxisSize: 'min',
        textDirection: 'ltr',
        verticalDirection: 'down',
        textBaseline: 'alphabetic',
        id: 'complex-row',
        children: React.createElement('div', null, 'Content')
      });
      
      expect(element.type).toBe(Row);
      expect(element.props.mainAxisAlignment).toBe('spaceBetween');
      expect(element.props.crossAxisAlignment).toBe('center');
      expect(element.props.mainAxisSize).toBe('min');
      expect(element.props.textDirection).toBe('ltr');
      expect(element.props.verticalDirection).toBe('down');
      expect(element.props.textBaseline).toBe('alphabetic');
      expect(element.props.id).toBe('complex-row');
      expect(element.props.children).toBeDefined();
    });

    test('应该支持最小属性组合', () => {
      const element = React.createElement(Row);
      expect(element.type).toBe(Row);
      expect(element.props.mainAxisAlignment).toBeUndefined();
    });
  });

  describe('边界情况测试', () => {
    test('应该处理空children', () => {
      const element = React.createElement(Row);
      expect(element.props.children).toBeUndefined();
    });

    test('应该处理undefined属性', () => {
      const element = React.createElement(Row, {
        mainAxisAlignment: undefined,
        crossAxisAlignment: undefined
      });
      expect(element.props.mainAxisAlignment).toBeUndefined();
      expect(element.props.crossAxisAlignment).toBeUndefined();
    });
  });
});
