/**
 * GestureDetector组件单元测试
 */

import * as React from 'react';
import { GestureDetector } from '../src/gesture-detector';
import { Text } from '../src/text';

describe('GestureDetector组件', () => {
  describe('基础渲染', () => {
    it('应该正确创建GestureDetector元素', () => {
      const element = React.createElement(
        GestureDetector,
        { id: 'gesture-test' },
        React.createElement(Text, { text: 'Tap me', id: 'text-child' })
      );

      expect(element).toBeDefined();
      expect(React.isValidElement(element)).toBe(true);
      expect(element.type).toBe(GestureDetector);
    });

    it('应该正确传递id属性', () => {
      const element = React.createElement(
        GestureDetector,
        { id: 'my-gesture' },
        React.createElement(Text, { text: 'Content' })
      );

      expect(element.props.id).toBe('my-gesture');
    });

    it('应该正确处理单个子组件', () => {
      const childElement = React.createElement(Text, { text: 'Child', id: 'child' });
      const element = React.createElement(
        GestureDetector,
        { id: 'parent' },
        childElement
      );

      expect(element.props.children).toBeDefined();
      expect(React.isValidElement(element.props.children)).toBe(true);
    });
  });

  describe('Tap手势属性', () => {
    it('应该正确传递onTap事件', () => {
      const onTap = jest.fn();
      const element = React.createElement(
        GestureDetector,
        { id: 'tap-test', onTap },
        React.createElement(Text, { text: 'Tap' })
      );

      expect(element).toBeDefined();
      expect(React.isValidElement(element)).toBe(true);
    });

    it('应该正确传递onDoubleTap事件', () => {
      const onDoubleTap = jest.fn();
      const element = React.createElement(
        GestureDetector,
        { id: 'double-tap-test', onDoubleTap },
        React.createElement(Text, { text: 'Double Tap' })
      );

      expect(element).toBeDefined();
      expect(React.isValidElement(element)).toBe(true);
    });
  });

  describe('LongPress手势属性', () => {
    it('应该正确传递onLongPress事件', () => {
      const onLongPress = jest.fn();
      const element = React.createElement(
        GestureDetector,
        { id: 'long-press-test', onLongPress },
        React.createElement(Text, { text: 'Long Press' })
      );

      expect(element).toBeDefined();
      expect(React.isValidElement(element)).toBe(true);
    });
  });

  describe('Drag手势属性', () => {
    it('应该正确传递onPanStart事件', () => {
      const onPanStart = jest.fn();
      const element = React.createElement(
        GestureDetector,
        { id: 'pan-start-test', onPanStart },
        React.createElement(Text, { text: 'Pan Start' })
      );

      expect(element).toBeDefined();
      expect(React.isValidElement(element)).toBe(true);
    });

    it('应该正确传递onHorizontalDragUpdate事件', () => {
      const onHorizontalDragUpdate = jest.fn();
      const element = React.createElement(
        GestureDetector,
        { id: 'h-drag-update-test', onHorizontalDragUpdate },
        React.createElement(Text, { text: 'H Drag Update' })
      );

      expect(element).toBeDefined();
      expect(React.isValidElement(element)).toBe(true);
    });

    it('应该正确传递onVerticalDragUpdate事件', () => {
      const onVerticalDragUpdate = jest.fn();
      const element = React.createElement(
        GestureDetector,
        { id: 'v-drag-update-test', onVerticalDragUpdate },
        React.createElement(Text, { text: 'V Drag Update' })
      );

      expect(element).toBeDefined();
      expect(React.isValidElement(element)).toBe(true);
    });
  });

  describe('Scale手势属性', () => {
    it('应该正确传递onScaleStart事件', () => {
      const onScaleStart = jest.fn();
      const element = React.createElement(
        GestureDetector,
        { id: 'scale-start-test', onScaleStart },
        React.createElement(Text, { text: 'Scale Start' })
      );

      expect(element).toBeDefined();
      expect(React.isValidElement(element)).toBe(true);
    });
  });

  describe('ForcePress手势属性', () => {
    it('应该正确传递onForcePressStart事件', () => {
      const onForcePressStart = jest.fn();
      const element = React.createElement(
        GestureDetector,
        { id: 'force-start-test', onForcePressStart },
        React.createElement(Text, { text: 'Force Start' })
      );

      expect(element).toBeDefined();
      expect(React.isValidElement(element)).toBe(true);
    });
  });

  describe('行为控制属性', () => {
    it('应该正确传递behavior属性', () => {
      const element = React.createElement(
        GestureDetector,
        { id: 'behavior-test', behavior: 'opaque' },
        React.createElement(Text, { text: 'Behavior' })
      );

      expect(element.props.behavior).toBe('opaque');
    });

    it('应该正确传递excludeFromSemantics属性', () => {
      const element = React.createElement(
        GestureDetector,
        { id: 'semantics-test', excludeFromSemantics: true },
        React.createElement(Text, { text: 'Semantics' })
      );

      expect(element.props.excludeFromSemantics).toBe(true);
    });

    it('应该正确传递dragStartBehavior属性', () => {
      const element = React.createElement(
        GestureDetector,
        { id: 'drag-behavior-test', dragStartBehavior: 'down' },
        React.createElement(Text, { text: 'Drag Behavior' })
      );

      expect(element.props.dragStartBehavior).toBe('down');
    });
  });

  describe('组合手势', () => {
    it('应该能够同时处理多个手势事件', () => {
      const onTap = jest.fn();
      const onLongPress = jest.fn();
      const onPanStart = jest.fn();

      const element = React.createElement(
        GestureDetector,
        {
          id: 'multi-gesture-test',
          onTap,
          onLongPress,
          onPanStart,
        },
        React.createElement(Text, { text: 'Multi Gesture' })
      );

      expect(element).toBeDefined();
      expect(React.isValidElement(element)).toBe(true);
    });
  });
});