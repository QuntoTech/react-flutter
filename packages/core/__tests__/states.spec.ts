/**
 * React状态更新和重新渲染测试 (修复版)
 * 验证React状态管理在自定义渲染器中的正确工作
 */

import * as React from 'react';
import { FlutterRenderer } from '../src/flutter-renderer';

describe('React状态更新和重新渲染', () => {
  beforeEach(() => {
    FlutterRenderer.initialize();
    FlutterRenderer.createRoot();
  });

  afterEach(() => {
    if (FlutterRenderer.hasRoot()) {
      FlutterRenderer.unmount();
    }
  });

  describe('useState Hook测试', () => {
    test('应该能够处理useState状态更新', () => {
      let capturedSetCount: ((n: number) => void) | null = null;
      
      const TestComponent = () => {
        const [count, setCount] = React.useState(0);
        capturedSetCount = setCount;
        return React.createElement('Text', { text: `Count: ${count}` });
      };

      const element = React.createElement(TestComponent);
      
      // 初始渲染
      let widget = FlutterRenderer.render(element);
      expect(widget.props.text).toBe('Count: 0');
      expect(capturedSetCount).not.toBeNull();

      // 调用setState
      capturedSetCount!(5);
      
      // 手动重新渲染来获取更新后的状态
      widget = FlutterRenderer.render(element);
      
      expect(widget.props.text).toBe('Count: 5');
    });

    test('应该能够处理函数式状态更新', () => {
      const TestComponent = ({ onUpdate }: { onUpdate: (fn: () => void) => void }) => {
        const [count, setCount] = React.useState(0);
        
        React.useEffect(() => {
          onUpdate(() => setCount(prev => prev + 1));
        }, [onUpdate]);
        
        return React.createElement('Text', { text: `Count: ${count}` });
      };

      let increment: () => void = () => {};
      const element = React.createElement(TestComponent, { 
        onUpdate: (fn) => { increment = fn; }
      });
      
      // 初始渲染
      let widget = FlutterRenderer.render(element);
      expect(widget.props.text).toBe('Count: 0');

      // 多次增加
      increment();
      widget = FlutterRenderer.render(element);
      expect(widget.props.text).toBe('Count: 1');

      increment();
      widget = FlutterRenderer.render(element);
      expect(widget.props.text).toBe('Count: 2');
    });

    test('应该能够处理多个独立的状态变量', () => {
      const TestComponent = ({ 
        onNameUpdate, 
        onAgeUpdate 
      }: { 
        onNameUpdate: (fn: (name: string) => void) => void;
        onAgeUpdate: (fn: (age: number) => void) => void;
      }) => {
        const [name, setName] = React.useState('John');
        const [age, setAge] = React.useState(25);
        
        React.useEffect(() => {
          onNameUpdate(setName);
          onAgeUpdate(setAge);
        }, [onNameUpdate, onAgeUpdate]);
        
        return React.createElement('Column', {}, [
          React.createElement('Text', { key: 'name', text: `Name: ${name}` }),
          React.createElement('Text', { key: 'age', text: `Age: ${age}` })
        ]);
      };

      let updateName: (name: string) => void = () => {};
      let updateAge: (age: number) => void = () => {};
      
      const element = React.createElement(TestComponent, { 
        onNameUpdate: (fn) => { updateName = fn; },
        onAgeUpdate: (fn) => { updateAge = fn; }
      });
      
      // 初始渲染
      let widget = FlutterRenderer.render(element);
      expect(widget.children[0].props.text).toBe('Name: John');
      expect(widget.children[1].props.text).toBe('Age: 25');

      // 只更新名字
      updateName('Jane');
      widget = FlutterRenderer.render(element);
      expect(widget.children[0].props.text).toBe('Name: Jane');
      expect(widget.children[1].props.text).toBe('Age: 25');

      // 只更新年龄
      updateAge(30);
      widget = FlutterRenderer.render(element);
      expect(widget.children[0].props.text).toBe('Name: Jane');
      expect(widget.children[1].props.text).toBe('Age: 30');
    });
  });

  describe('useEffect Hook测试', () => {
    test('应该在组件挂载时执行useEffect', () => {
      let effectCallCount = 0;
      
      const EffectComponent = () => {
        React.useEffect(() => {
          effectCallCount++;
        }, []);
        
        return React.createElement('Text', { text: 'Effect Component' });
      };

      const element = React.createElement(EffectComponent);
      FlutterRenderer.render(element);
      
      expect(effectCallCount).toBe(1);
    });

    test('应该根据依赖数组正确执行useEffect', () => {
      let effectCallCount = 0;
      
      const DependentEffectComponent = ({ count, name }: { count: number; name: string }) => {
        React.useEffect(() => {
          effectCallCount++;
        }, [count]); // 只依赖count
        
        return React.createElement('Text', { text: `${name}: ${count}` });
      };

      // 初始渲染
      let element = React.createElement(DependentEffectComponent, { count: 0, name: 'John' });
      FlutterRenderer.render(element);
      expect(effectCallCount).toBe(1);

      // 更新count，应该触发effect
      element = React.createElement(DependentEffectComponent, { count: 1, name: 'John' });
      FlutterRenderer.render(element);
      expect(effectCallCount).toBe(2);

      // 更新name，不应该触发effect
      element = React.createElement(DependentEffectComponent, { count: 1, name: 'Jane' });
      FlutterRenderer.render(element);
      expect(effectCallCount).toBe(2); // 保持不变
    });

    test('应该在组件卸载时执行清理函数', () => {
      let cleanupCallCount = 0;
      let setupCallCount = 0;
      
      const CleanupComponent = () => {
        React.useEffect(() => {
          setupCallCount++;
          return () => {
            cleanupCallCount++;
          };
        }, []);
        
        return React.createElement('Text', { text: 'Cleanup Component' });
      };

      const element = React.createElement(CleanupComponent);
      
      // 挂载组件
      FlutterRenderer.render(element);
      expect(setupCallCount).toBe(1);
      expect(cleanupCallCount).toBe(0);

      // 卸载组件
      FlutterRenderer.unmount();
      expect(cleanupCallCount).toBe(1);
    });
  });

  describe('条件渲染测试', () => {
    test('应该能够处理条件渲染', () => {
      const ConditionalComponent = ({ showMessage }: { showMessage: boolean }) => {
        return React.createElement('Column', {}, [
          React.createElement('Text', { key: 'title', text: 'Always visible' }),
          showMessage ? React.createElement('Text', { key: 'message', text: 'Conditional message' }) : null
        ].filter(Boolean));
      };

      // 条件为true
      let element = React.createElement(ConditionalComponent, { showMessage: true });
      let widget = FlutterRenderer.render(element);
      expect(widget.children).toHaveLength(2);
      expect(widget.children[1].props.text).toBe('Conditional message');

      // 条件为false
      element = React.createElement(ConditionalComponent, { showMessage: false });
      widget = FlutterRenderer.render(element);
      expect(widget.children).toHaveLength(1);
    });

    test('应该能够处理列表渲染', () => {
      const ListComponent = ({ items }: { items: string[] }) => {
        return React.createElement('Column', {},
          items.map((item, index) => 
            React.createElement('Text', { 
              key: index, 
              text: item 
            })
          )
        );
      };

      const items = ['Item 1', 'Item 2', 'Item 3'];
      const element = React.createElement(ListComponent, { items });
      const widget = FlutterRenderer.render(element);
      
      expect(widget.children).toHaveLength(3);
      expect(widget.children[0].props.text).toBe('Item 1');
      expect(widget.children[1].props.text).toBe('Item 2');
      expect(widget.children[2].props.text).toBe('Item 3');
    });
  });
});
