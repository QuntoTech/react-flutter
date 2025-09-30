/**
 * Image组件React端单元测试
 * 验证Image组件的正确创建和属性传递
 */

import * as React from 'react';
import { Image, Container, Text } from '../src';
import { Color } from '../src/styles/color';

describe('Image组件', () => {
  describe('基础功能', () => {
    test('应该正确渲染Image组件', () => {
      const element = React.createElement(Image, {
        src: 'https://example.com/image.png'
      });
      
      expect(element.type).toBe(Image);
      expect(element.props.src).toBe('https://example.com/image.png');
    });

    test('应该渲染网络图片', () => {
      const element = React.createElement(Image, {
        src: 'https://example.com/image.png',
        srcType: 'network'
      });
      
      expect(element.type).toBe(Image);
      expect(element.props.src).toBe('https://example.com/image.png');
      expect(element.props.srcType).toBe('network');
    });

    test('应该渲染资源图片', () => {
      const element = React.createElement(Image, {
        src: 'assets/logo.png',
        srcType: 'asset'
      });
      
      expect(element.type).toBe(Image);
      expect(element.props.src).toBe('assets/logo.png');
      expect(element.props.srcType).toBe('asset');
    });
  });

  describe('属性传递', () => {
    test('width属性应该正确传递', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        width: 300
      });
      expect(element.props.width).toBe(300);
    });

    test('height属性应该正确传递', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        height: 200
      });
      expect(element.props.height).toBe(200);
    });

    test('fit属性应该正确传递', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        fit: 'cover'
      });
      expect(element.props.fit).toBe('cover');
    });

    test('alignment属性应该正确传递', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        alignment: 'center'
      });
      expect(element.props.alignment).toBe('center');
    });

    test('repeat属性应该正确传递', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        repeat: 'noRepeat'
      });
      expect(element.props.repeat).toBe('noRepeat');
    });

    test('color属性应该正确传递', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        color: Color.red
      });
      expect(element.props.color).toEqual(Color.red);
    });

    test('colorBlendMode属性应该正确传递', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        colorBlendMode: 'multiply'
      });
      expect(element.props.colorBlendMode).toBe('multiply');
    });

    test('cacheWidth属性应该正确传递', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        cacheWidth: 200
      });
      expect(element.props.cacheWidth).toBe(200);
    });

    test('cacheHeight属性应该正确传递', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        cacheHeight: 150
      });
      expect(element.props.cacheHeight).toBe(150);
    });

    test('semanticLabel属性应该正确传递', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        semanticLabel: '产品图片'
      });
      expect(element.props.semanticLabel).toBe('产品图片');
    });

    test('id属性应该正确传递', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        id: 'my-image'
      });
      expect(element.props.id).toBe('my-image');
    });
  });

  describe('BoxFit值验证', () => {
    test('应该支持fill', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        fit: 'fill'
      });
      expect(element.props.fit).toBe('fill');
    });

    test('应该支持contain', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        fit: 'contain'
      });
      expect(element.props.fit).toBe('contain');
    });

    test('应该支持cover', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        fit: 'cover'
      });
      expect(element.props.fit).toBe('cover');
    });

    test('应该支持fitWidth', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        fit: 'fitWidth'
      });
      expect(element.props.fit).toBe('fitWidth');
    });

    test('应该支持fitHeight', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        fit: 'fitHeight'
      });
      expect(element.props.fit).toBe('fitHeight');
    });

    test('应该支持none', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        fit: 'none'
      });
      expect(element.props.fit).toBe('none');
    });

    test('应该支持scaleDown', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        fit: 'scaleDown'
      });
      expect(element.props.fit).toBe('scaleDown');
    });
  });

  describe('ImageRepeat值验证', () => {
    test('应该支持repeat', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        repeat: 'repeat'
      });
      expect(element.props.repeat).toBe('repeat');
    });

    test('应该支持repeatX', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        repeat: 'repeatX'
      });
      expect(element.props.repeat).toBe('repeatX');
    });

    test('应该支持repeatY', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        repeat: 'repeatY'
      });
      expect(element.props.repeat).toBe('repeatY');
    });

    test('应该支持noRepeat', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        repeat: 'noRepeat'
      });
      expect(element.props.repeat).toBe('noRepeat');
    });
  });

  describe('BlendMode值验证', () => {
    test('应该支持multiply', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        colorBlendMode: 'multiply'
      });
      expect(element.props.colorBlendMode).toBe('multiply');
    });

    test('应该支持screen', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        colorBlendMode: 'screen'
      });
      expect(element.props.colorBlendMode).toBe('screen');
    });

    test('应该支持overlay', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        colorBlendMode: 'overlay'
      });
      expect(element.props.colorBlendMode).toBe('overlay');
    });

    test('应该支持darken', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        colorBlendMode: 'darken'
      });
      expect(element.props.colorBlendMode).toBe('darken');
    });

    test('应该支持lighten', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        colorBlendMode: 'lighten'
      });
      expect(element.props.colorBlendMode).toBe('lighten');
    });
  });

  describe('组合场景', () => {
    test('应该支持完整属性组合', () => {
      const element = React.createElement(Image, {
        src: 'https://example.com/image.png',
        srcType: 'network',
        width: 400,
        height: 300,
        fit: 'cover',
        alignment: 'center',
        repeat: 'noRepeat',
        color: Color.fromRGBO(0, 0, 255, 0.3),
        colorBlendMode: 'overlay',
        cacheWidth: 400,
        cacheHeight: 300,
        semanticLabel: '示例图片',
        id: 'example-image'
      });

      expect(element.type).toBe(Image);
      expect(element.props.src).toBe('https://example.com/image.png');
      expect(element.props.width).toBe(400);
      expect(element.props.height).toBe(300);
      expect(element.props.fit).toBe('cover');
      expect(element.props.colorBlendMode).toBe('overlay');
      expect(element.props.id).toBe('example-image');
    });

    test('应该支持最小属性组合', () => {
      const element = React.createElement(Image, {
        src: 'assets/logo.png'
      });

      expect(element.type).toBe(Image);
      expect(element.props.src).toBe('assets/logo.png');
      expect(element.props.srcType).toBeUndefined();
      expect(element.props.width).toBeUndefined();
      expect(element.props.height).toBeUndefined();
    });
  });

  describe('边界情况', () => {
    test('应该处理空src字符串', () => {
      const element = React.createElement(Image, {
        src: ''
      });
      expect(element.props.src).toBe('');
    });

    test('应该处理极大尺寸', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        width: 9999,
        height: 9999
      });
      expect(element.props.width).toBe(9999);
      expect(element.props.height).toBe(9999);
    });

    test('应该处理零尺寸', () => {
      const element = React.createElement(Image, {
        src: 'test.png',
        width: 0,
        height: 0
      });
      expect(element.props.width).toBe(0);
      expect(element.props.height).toBe(0);
    });

    test('应该处理未设置可选属性', () => {
      const element = React.createElement(Image, {
        src: 'test.png'
      });
      
      expect(element.type).toBe(Image);
      expect(element.props.src).toBe('test.png');
      expect(element.props.fit).toBeUndefined();
      expect(element.props.color).toBeUndefined();
      expect(element.props.semanticLabel).toBeUndefined();
    });
  });
});