/**
 * Container组件React端单元测试
 * 验证Container组件的正确创建和属性传递
 */

import * as React from 'react';
import { Container } from '../src/container';
import { ContainerStyle } from '../src/styles/types';
import { Color } from '../src/styles/color';
import { EdgeInsets } from '../src/styles/edge-insets';
import { BorderRadius } from '../src/styles/border-radius';
import { Border } from '../src/styles/border';

describe('Container组件', () => {
  describe('基础功能', () => {
    test('应该正确渲染Container组件', () => {
      const element = React.createElement(Container, {
        id: 'test-container'
      });
      
      expect(element.type).toBe(Container);
      expect(element.props.id).toBe('test-container');
    });

    test('应该支持children', () => {
      const element = React.createElement(Container, {
        children: React.createElement('div', null, 'Test Child')
      });
      
      expect(element.props.children).toBeDefined();
    });
  });

  describe('样式属性传递', () => {
    test('style属性应该正确传递', () => {
      const style: ContainerStyle = {
        width: 100,
        height: 200,
        padding: EdgeInsets.all(16),
        color: Color.blue
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      expect(element.props.style).toBeDefined();
    });

    test('应该支持复杂decoration样式', () => {
      const style: ContainerStyle = {
        decoration: {
          color: Color.blue,
          borderRadius: BorderRadius.circular(12),
          border: Border.all({ width: 2, color: Color.red })
        }
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      expect(element.props.style).toBeDefined();
      expect(element.props.style!.decoration).toBeDefined();
    });

    test('id属性应该正确传递', () => {
      const element = React.createElement(Container, {
        id: 'my-container',
        style: { width: 100 }
      });
      
      expect(element.props.id).toBe('my-container');
    });
  });

  describe('尺寸属性', () => {
    test('应该正确传递width和height', () => {
      const style: ContainerStyle = {
        width: 300,
        height: 200
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      expect(element.props.style!.width).toBe(300);
      expect(element.props.style!.height).toBe(200);
    });

    test('应该支持constraints约束', () => {
      const style: ContainerStyle = {
        constraints: {
          minWidth: 100,
          maxWidth: 300,
          minHeight: 50,
          maxHeight: 200
        }
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      expect(element.props.style!.constraints).toBeDefined();
      expect(element.props.style!.constraints!.minWidth).toBe(100);
      expect(element.props.style!.constraints!.maxWidth).toBe(300);
    });
  });

  describe('间距属性', () => {
    test('应该正确传递padding', () => {
      const style: ContainerStyle = {
        padding: EdgeInsets.all(20)
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      expect(element.props.style!.padding).toBeDefined();
    });

    test('应该正确传递margin', () => {
      const style: ContainerStyle = {
        margin: EdgeInsets.symmetric({ horizontal: 10, vertical: 20 })
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      expect(element.props.style!.margin).toBeDefined();
    });
  });

  describe('对齐和变换', () => {
    test('应该正确传递alignment', () => {
      const style: ContainerStyle = {
        alignment: 'center'
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      expect(element.props.style!.alignment).toBe('center');
    });

    test('应该正确传递transform', () => {
      const transform = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
      ];
      
      const style: ContainerStyle = {
        transform: transform
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      expect(element.props.style!.transform).toEqual(transform);
    });

    test('应该正确传递transformAlignment', () => {
      const style: ContainerStyle = {
        transformAlignment: 'topLeft'
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      expect(element.props.style!.transformAlignment).toBe('topLeft');
    });
  });

  describe('裁剪行为', () => {
    test('应该正确传递clipBehavior', () => {
      const style: ContainerStyle = {
        clipBehavior: 'antiAlias'
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      expect(element.props.style!.clipBehavior).toBe('antiAlias');
    });

    test('应该支持所有ClipBehavior值', () => {
      const clipValues = ['none', 'hardEdge', 'antiAlias', 'antiAliasWithSaveLayer'] as const;
      
      clipValues.forEach(clipBehavior => {
        const style: ContainerStyle = { clipBehavior };
        const element = React.createElement(Container, { style });
        expect(element.props.style!.clipBehavior).toBe(clipBehavior);
      });
    });
  });

  describe('前景装饰', () => {
    test('应该正确传递foregroundDecoration', () => {
      const style: ContainerStyle = {
        foregroundDecoration: {
          border: Border.all({ color: Color.red, width: 2 })
        }
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      expect(element.props.style!.foregroundDecoration).toBeDefined();
    });

    test('应该支持foregroundDecoration所有属性', () => {
      const style: ContainerStyle = {
        foregroundDecoration: {
          color: Color.fromRGBO(255, 0, 0, 0.5),
          borderRadius: BorderRadius.circular(10),
          border: Border.all({ color: Color.white, width: 3 }),
          boxShadow: [{
            color: Color.black,
            blurRadius: 5,
            offset: { dx: 2, dy: 2 }
          }]
        }
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      const fg = element.props.style!.foregroundDecoration;
      expect(fg).toBeDefined();
      expect(fg!.color).toBeDefined();
      expect(fg!.borderRadius).toBeDefined();
      expect(fg!.border).toBeDefined();
      expect(fg!.boxShadow).toBeDefined();
    });
  });

  describe('组合场景', () => {
    test('应该支持完整属性组合', () => {
      const style: ContainerStyle = {
        width: 300,
        height: 200,
        padding: EdgeInsets.all(16),
        margin: EdgeInsets.all(8),
        decoration: {
          color: Color.white,
          borderRadius: BorderRadius.circular(8),
          border: Border.all({ width: 1, color: Color.grey }),
          boxShadow: [{
            color: Color.black26,
            blurRadius: 4,
            offset: { dx: 0, dy: 2 }
          }]
        },
        alignment: 'center'
      };
      
      const element = React.createElement(Container, {
        style: style,
        id: 'card-container',
        children: React.createElement('div', null, 'Content')
      });
      
      expect(element.type).toBe(Container);
      expect(element.props.id).toBe('card-container');
      expect(element.props.style).toBeDefined();
      expect(element.props.children).toBeDefined();
    });

    test('应该支持最小属性组合', () => {
      const element = React.createElement(Container);
      expect(element.type).toBe(Container);
      expect(element.props.style).toBeUndefined();
    });
  });

  describe('边界情况', () => {
    test('应该处理undefined style', () => {
      const element = React.createElement(Container, {
        style: undefined
      });
      expect(element.props.style).toBeUndefined();
    });

    test('应该处理空children', () => {
      const element = React.createElement(Container);
      expect(element.props.children).toBeUndefined();
    });

    test('应该处理空decoration对象', () => {
      const style: ContainerStyle = {
        decoration: {}
      };
      
      const element = React.createElement(Container, {
        style: style
      });
      
      expect(element.props.style!.decoration).toBeDefined();
    });
  });
});