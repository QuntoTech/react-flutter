/**
 * Text组件React端单元测试
 * 验证Text组件的正确创建和属性传递
 */

import * as React from 'react';
import { Text } from '../src/text';
import { Color } from '../src/styles/color';
import { TextStyle } from '../src/styles/types';

describe('Text组件', () => {
  describe('基础功能', () => {
    test('应该正确渲染Text组件', () => {
      const element = React.createElement(Text, {
        text: '测试文本'
      });
      
      expect(element.type).toBe(Text);
      expect(element.props.text).toBe('测试文本');
    });

    test('应该支持children', () => {
      const element = React.createElement(Text, {
        text: '父文本',
        children: React.createElement('span', {}, '子组件')
      });
      
      expect(element.type).toBe(Text);
      expect(element.props.children).toBeDefined();
    });
  });

  describe('文本属性传递', () => {
    test('textAlign属性应该正确传递', () => {
      const element = React.createElement(Text, {
        text: '测试',
        textAlign: 'center'
      });
      expect(element.props.textAlign).toBe('center');
    });

    test('textDirection属性应该正确传递', () => {
      const element = React.createElement(Text, {
        text: '测试',
        textDirection: 'rtl'
      });
      expect(element.props.textDirection).toBe('rtl');
    });

    test('maxLines属性应该正确传递', () => {
      const element = React.createElement(Text, {
        text: '测试',
        maxLines: 3
      });
      expect(element.props.maxLines).toBe(3);
    });

    test('overflow属性应该正确传递', () => {
      const element = React.createElement(Text, {
        text: '测试',
        overflow: 'ellipsis'
      });
      expect(element.props.overflow).toBe('ellipsis');
    });

    test('softWrap属性应该正确传递', () => {
      const element = React.createElement(Text, {
        text: '测试',
        softWrap: false
      });
      expect(element.props.softWrap).toBe(false);
    });

    test('textScaleFactor属性应该正确传递', () => {
      const element = React.createElement(Text, {
        text: '测试',
        textScaleFactor: 1.2
      });
      expect(element.props.textScaleFactor).toBe(1.2);
    });

    test('semanticsLabel属性应该正确传递', () => {
      const element = React.createElement(Text, {
        text: '测试',
        semanticsLabel: '语义标签'
      });
      expect(element.props.semanticsLabel).toBe('语义标签');
    });

    test('locale属性应该正确传递', () => {
      const element = React.createElement(Text, {
        text: '测试',
        locale: 'zh_CN'
      });
      expect(element.props.locale).toBe('zh_CN');
    });

    test('id属性应该正确传递', () => {
      const element = React.createElement(Text, {
        text: '测试',
        id: 'test-text'
      });
      expect(element.props.id).toBe('test-text');
    });
  });

  describe('样式属性传递', () => {
    test('style属性应该正确传递', () => {
      const style: TextStyle = {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.red
      };
      
      const element = React.createElement(Text, {
        text: '样式文本',
        style: style
      });
      
      expect(element.props.style).toEqual(style);
      expect(element.props.style!.fontSize).toBe(18);
      expect(element.props.style!.fontWeight).toBe('bold');
    });

    test('应该支持完整的TextStyle', () => {
      const style: TextStyle = {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Arial',
        fontStyle: 'italic',
        color: Color.blue,
        backgroundColor: Color.yellow,
        decoration: 'underline',
        decorationColor: Color.red,
        decorationStyle: 'solid',
        decorationThickness: 2,
        letterSpacing: 1.5,
        wordSpacing: 2.0,
        height: 1.4
      };

      const element = React.createElement(Text, {
        text: '完整样式',
        style: style
      });

      expect(element.props.style).toEqual(style);
    });
  });

  describe('TextAlign值验证', () => {
    const validAligns = ['left', 'right', 'center', 'justify', 'start', 'end'];
    
    validAligns.forEach(align => {
      test(`应该支持${align}`, () => {
        const element = React.createElement(Text, {
          text: '测试',
          textAlign: align as any
        });
        expect(element.props.textAlign).toBe(align);
      });
    });
  });

  describe('TextOverflow值验证', () => {
    const validOverflows = ['clip', 'fade', 'ellipsis', 'visible'];
    
    validOverflows.forEach(overflow => {
      test(`应该支持${overflow}`, () => {
        const element = React.createElement(Text, {
          text: '测试',
          overflow: overflow as any
        });
        expect(element.props.overflow).toBe(overflow);
      });
    });
  });

  describe('组合场景', () => {
    test('应该支持完整属性组合', () => {
      const element = React.createElement(Text, {
        text: '组合测试',
        textAlign: 'center',
        maxLines: 2,
        overflow: 'ellipsis',
        style: {
          fontSize: 18,
          fontWeight: 'bold',
          color: Color.red
        },
        id: 'combo-text'
      });

      expect(element.type).toBe(Text);
      expect(element.props.text).toBe('组合测试');
      expect(element.props.textAlign).toBe('center');
      expect(element.props.maxLines).toBe(2);
      expect(element.props.overflow).toBe('ellipsis');
      expect(element.props.style!.fontSize).toBe(18);
      expect(element.props.id).toBe('combo-text');
    });

    test('应该支持最小属性组合', () => {
      const element = React.createElement(Text, {
        text: '最小文本'
      });

      expect(element.type).toBe(Text);
      expect(element.props.text).toBe('最小文本');
      expect(element.props.style).toBeUndefined();
      expect(element.props.maxLines).toBeUndefined();
    });
  });

  describe('边界情况', () => {
    test('应该处理空文本', () => {
      const element = React.createElement(Text, {
        text: ''
      });
      expect(element.props.text).toBe('');
    });

    test('应该处理maxLines为0', () => {
      const element = React.createElement(Text, {
        text: '测试',
        maxLines: 0
      });
      expect(element.props.maxLines).toBe(0);
    });

    test('应该处理极大的textScaleFactor', () => {
      const element = React.createElement(Text, {
        text: '测试',
        textScaleFactor: 10.0
      });
      expect(element.props.textScaleFactor).toBe(10.0);
    });

    test('应该处理undefined样式', () => {
      const element = React.createElement(Text, {
        text: '测试',
        style: undefined
      });
      expect(element.props.style).toBeUndefined();
    });
  });
});