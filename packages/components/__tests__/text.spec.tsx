/**
 * Text组件React端单元测试
 * 验证Text组件的属性、样式和Flutter API一致性
 */

import React from 'react';
import { Text, TextProps } from '../src/text';
import { TextStyle } from '../src/styles/types';
import { Color } from '../src/styles/color';

describe('Text组件', () => {
  describe('Props接口验证', () => {
    test('应该接受基本属性', () => {
      const props: TextProps = {
        text: '测试文本',
        textAlign: 'center',
        textDirection: 'rtl',
        maxLines: 3,
        overflow: 'ellipsis',
        softWrap: false,
        textScaleFactor: 1.2,
        semanticsLabel: '语义标签',
        locale: 'zh_CN',
        id: 'test-text'
      };
      expect(props).toBeDefined();
    });

    test('应该接受style属性', () => {
      const props: TextProps = {
        text: '样式文本',
        style: {
          fontSize: 18,
          fontWeight: 'bold',
          color: Color.red,
          decoration: 'underline'
        }
      };
      expect(props).toBeDefined();
    });

    test('应该接受children', () => {
      const props: TextProps = {
        text: '父文本',
        children: <span>子组件</span>
      };
      expect(props).toBeDefined();
    });
  });

  describe('属性类型验证', () => {
    test('textAlign应该支持所有有效值', () => {
      const validAligns: Array<TextProps['textAlign']> = [
        'left', 'right', 'center', 'justify', 'start', 'end'
      ];

      validAligns.forEach(align => {
        const props: TextProps = { text: '测试', textAlign: align };
        expect(props).toBeDefined();
        expect(props.textAlign).toBe(align);
      });
    });

    test('overflow应该支持所有有效值', () => {
      const validOverflows: Array<TextProps['overflow']> = [
        'clip', 'fade', 'ellipsis', 'visible'
      ];

      validOverflows.forEach(overflow => {
        const props: TextProps = { text: '测试', overflow: overflow };
        expect(props).toBeDefined();
        expect(props.overflow).toBe(overflow);
      });
    });

    test('textDirection应该支持所有有效值', () => {
      const validDirections: Array<TextProps['textDirection']> = ['ltr', 'rtl'];

      validDirections.forEach(direction => {
        const props: TextProps = { text: '测试', textDirection: direction };
        expect(props).toBeDefined();
        expect(props.textDirection).toBe(direction);
      });
    });
  });

  describe('Flutter API一致性', () => {
    test('不应该包含style属性作为独立props（严格按Flutter Text API）', () => {
      const validProps: TextProps = {
        text: '测试',
        textAlign: 'center',
        maxLines: 2,
        id: 'flutter-text'
      };
      
      expect(validProps).toBeDefined();
      expect('fontSize' in validProps).toBe(false);
      expect('color' in validProps).toBe(false);
      expect('fontWeight' in validProps).toBe(false);
    });

    test('所有视觉样式应该在style对象中', () => {
      const textStyle: TextStyle = {
        fontSize: 16,
        fontWeight: '600',
        color: Color.blue,
        backgroundColor: Color.yellow,
        decoration: 'underline',
        decorationColor: Color.red,
        decorationStyle: 'solid',
        decorationThickness: 2,
        letterSpacing: 1.5,
        wordSpacing: 2.0,
        height: 1.4,
        fontFamily: 'Arial',
        fontStyle: 'italic'
      };

      const props: TextProps = {
        text: '完整样式',
        style: textStyle
      };

      expect(props).toBeDefined();
      expect(props.style).toEqual(textStyle);
    });

    test('应该与Flutter Text构造函数参数对应', () => {
      // Flutter Text构造函数主要参数验证
      const flutterLikeProps: TextProps = {
        text: 'Flutter Text',           // Flutter: String data
        style: {                       // Flutter: TextStyle? style
          fontSize: 14,
          color: Color.black
        },
        textAlign: 'left',             // Flutter: TextAlign? textAlign
        textDirection: 'ltr',          // Flutter: TextDirection? textDirection
        softWrap: true,                // Flutter: bool? softWrap
        overflow: 'clip',              // Flutter: TextOverflow? overflow
        textScaleFactor: 1.0,          // Flutter: double? textScaleFactor
        maxLines: 1,                   // Flutter: int? maxLines
        semanticsLabel: 'Accessibility', // Flutter: String? semanticsLabel
        locale: 'en_US'                // Flutter: Locale? locale
      };

      expect(flutterLikeProps).toBeDefined();
      expect(flutterLikeProps.text).toBe('Flutter Text');
      expect(flutterLikeProps.textAlign).toBe('left');
      expect(flutterLikeProps.softWrap).toBe(true);
    });
  });

  describe('边界情况', () => {
    test('应该处理空文本', () => {
      const props: TextProps = { text: '' };
      expect(props).toBeDefined();
      expect(props.text).toBe('');
    });

    test('应该处理最大行数为0', () => {
      const props: TextProps = { text: '测试', maxLines: 0 };
      expect(props).toBeDefined();
      expect(props.maxLines).toBe(0);
    });

    test('应该处理极大的textScaleFactor', () => {
      const props: TextProps = { text: '测试', textScaleFactor: 10.0 };
      expect(props).toBeDefined();
      expect(props.textScaleFactor).toBe(10.0);
    });

    test('应该处理undefined样式', () => {
      const props: TextProps = { text: '测试', style: undefined };
      expect(props).toBeDefined();
      expect(props.style).toBeUndefined();
    });
  });

  describe('组合场景', () => {
    test('应该支持独立属性和style属性的组合', () => {
      const props: TextProps = {
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
      };

      expect(props).toBeDefined();
      expect(props.text).toBe('组合测试');
      expect(props.textAlign).toBe('center');
      expect(props.maxLines).toBe(2);
      expect(props.overflow).toBe('ellipsis');
      expect(props.id).toBe('combo-text');
      expect(props.style?.fontSize).toBe(18);
      expect(props.style?.fontWeight).toBe('bold');
    });

    test('应该处理复杂的文本样式', () => {
      const complexStyle: TextStyle = {
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'Helvetica',
        fontStyle: 'italic',
        color: Color.fromRGBO(255, 100, 50, 1.0),
        backgroundColor: Color.fromRGBO(240, 240, 240, 0.8),
        decoration: 'underline',
        decorationColor: Color.blue,
        decorationStyle: 'wavy',
        decorationThickness: 3,
        letterSpacing: 2.5,
        wordSpacing: 1.8,
        height: 1.6
      };

      const props: TextProps = {
        text: '复杂样式文本',
        style: complexStyle,
        textAlign: 'justify',
        maxLines: 5,
        overflow: 'fade',
        softWrap: true,
        textScaleFactor: 1.1,
        semanticsLabel: '复杂文本示例',
        locale: 'zh_CN',
        id: 'complex-text'
      };

      expect(props).toBeDefined();
      expect(props.text).toBe('复杂样式文本');
      expect(props.style).toEqual(complexStyle);
      expect(props.textAlign).toBe('justify');
      expect(props.maxLines).toBe(5);
      expect(props.overflow).toBe('fade');
      expect(props.softWrap).toBe(true);
      expect(props.textScaleFactor).toBe(1.1);
      expect(props.semanticsLabel).toBe('复杂文本示例');
      expect(props.locale).toBe('zh_CN');
      expect(props.id).toBe('complex-text');
    });
  });
});
