/**
 * 事件处理工具函数测试
 * 只测试processEventProps和executeFlutterEvent工具函数
 * 不涉及React组件和渲染
 */

import { processEventProps, executeFlutterEvent } from '../src/event-handler';

describe('事件处理工具函数', () => {
  describe('processEventProps', () => {
    test('应该将事件函数转换为唯一的事件名', () => {
      const handler = jest.fn();
      const result = processEventProps({ onPressed: handler });

      expect(typeof result.onPressed).toBe('string');
      // 事件名格式：functionName_timestamp_randomString
      expect(result.onPressed).toMatch(/^.+_\d+_.+$/);
      expect(result.onPressed).not.toBe(handler);
    });

    test('应该为不同的事件生成不同的事件名', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      
      const result = processEventProps({
        onPressed: handler1,
        onLongPress: handler2
      });

      // 事件名格式：functionName_timestamp_randomString
      expect(result.onPressed).toMatch(/^.+_\d+_.+$/);
      expect(result.onLongPress).toMatch(/^.+_\d+_.+$/);
      expect(result.onPressed).not.toBe(result.onLongPress);
    });

    test('应该保留非事件props不变', () => {
      const result = processEventProps({
        onPressed: jest.fn(),
        id: 'test-id',
        text: 'Click me',
        count: 42
      });

      expect(result.id).toBe('test-id');
      expect(result.text).toBe('Click me');
      expect(result.count).toBe(42);
    });

    test('应该为每次调用生成唯一的事件名', () => {
      const handler = jest.fn();
      
      const result1 = processEventProps({ onPressed: handler });
      const result2 = processEventProps({ onPressed: handler });

      expect(result1.onPressed).not.toBe(result2.onPressed);
    });
  });

  describe('executeFlutterEvent', () => {
    test('应该执行已注册的事件处理函数', () => {
      const handler = jest.fn();
      const { onPressed } = processEventProps({ onPressed: handler });

      executeFlutterEvent(onPressed);

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('应该传递事件数据给处理函数', () => {
      const handler = jest.fn();
      const { onTap } = processEventProps({ onTap: handler });

      const eventData = { x: 100, y: 200 };
      executeFlutterEvent(onTap, eventData);

      expect(handler).toHaveBeenCalledWith(eventData);
    });

    test('对未注册的事件应该不抛出错误', () => {
      expect(() => {
        executeFlutterEvent('nonexistent_event_123');
      }).not.toThrow();
    });

    test('应该正确处理多个注册的事件', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();
      
      const { onPressed, onLongPress } = processEventProps({
        onPressed: handler1,
        onLongPress: handler2
      });

      executeFlutterEvent(onPressed);
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).not.toHaveBeenCalled();

      executeFlutterEvent(onLongPress);
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
    });
  });
});
