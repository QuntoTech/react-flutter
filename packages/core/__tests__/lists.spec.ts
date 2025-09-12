/**
 * 条件渲染和列表渲染测试
 * 验证React常见渲染模式在自定义渲染器中的正确工作
 */

import * as React from 'react';
import { FlutterRenderer } from '../src/flutter-renderer';

describe('条件渲染和列表渲染', () => {
  beforeEach(() => {
    FlutterRenderer.initialize();
    FlutterRenderer.createRoot();
  });

  afterEach(() => {
    if (FlutterRenderer.hasRoot()) {
      FlutterRenderer.unmount();
    }
  });

  describe('条件渲染测试', () => {
    test('应该能够处理三元运算符条件渲染', () => {
      const ConditionalComponent = ({ showMessage }: { showMessage: boolean }) => {
        return React.createElement('Column', {}, [
          React.createElement('Text', { key: 'title', text: 'Title' }),
          showMessage 
            ? React.createElement('Text', { key: 'message', text: 'Hello World' })
            : React.createElement('Text', { key: 'empty', text: 'No message' })
        ]);
      };

      // 条件为true
      let element = React.createElement(ConditionalComponent, { showMessage: true });
      let widget = FlutterRenderer.render(element);
      expect(widget.children).toHaveLength(2);
      expect(widget.children[1].props.text).toBe('Hello World');

      // 条件为false
      element = React.createElement(ConditionalComponent, { showMessage: false });
      widget = FlutterRenderer.render(element);
      expect(widget.children).toHaveLength(2);
      expect(widget.children[1].props.text).toBe('No message');
    });

    test('应该能够处理逻辑与条件渲染', () => {
      const LogicalAndComponent = ({ count }: { count: number }) => {
        return React.createElement('Column', {}, [
          React.createElement('Text', { key: 'count', text: `Count: ${count}` }),
          count > 0 && React.createElement('Text', { key: 'positive', text: 'Positive number' }),
          count > 10 && React.createElement('Text', { key: 'large', text: 'Large number' })
        ].filter(Boolean));
      };

      // count = 0
      let element = React.createElement(LogicalAndComponent, { count: 0 });
      let widget = FlutterRenderer.render(element);
      expect(widget.children).toHaveLength(1);
      expect(widget.children[0].props.text).toBe('Count: 0');

      // count = 5
      element = React.createElement(LogicalAndComponent, { count: 5 });
      widget = FlutterRenderer.render(element);
      expect(widget.children).toHaveLength(2);
      expect(widget.children[1].props.text).toBe('Positive number');

      // count = 15
      element = React.createElement(LogicalAndComponent, { count: 15 });
      widget = FlutterRenderer.render(element);
      expect(widget.children).toHaveLength(3);
      expect(widget.children[1].props.text).toBe('Positive number');
      expect(widget.children[2].props.text).toBe('Large number');
    });
  });

  describe('列表渲染测试', () => {
    test('应该能够渲染基本列表', () => {
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

    test('应该能够处理带唯一key的列表', () => {
      interface Item {
        id: number;
        name: string;
      }
      
      const KeyedListComponent = ({ items }: { items: Item[] }) => {
        return React.createElement('Column', {},
          items.map(item => 
            React.createElement('Text', { 
              key: item.id, 
              text: `${item.id}: ${item.name}` 
            })
          )
        );
      };

      const items = [
        { id: 1, name: 'First' },
        { id: 2, name: 'Second' },
        { id: 3, name: 'Third' }
      ];

      const element = React.createElement(KeyedListComponent, { items });
      const widget = FlutterRenderer.render(element);
      
      expect(widget.children).toHaveLength(3);
      expect(widget.children[0].props.text).toBe('1: First');
      expect(widget.children[1].props.text).toBe('2: Second');
      expect(widget.children[2].props.text).toBe('3: Third');
    });

    test('应该能够处理空列表', () => {
      const EmptyListComponent = ({ items }: { items: string[] }) => {
        return React.createElement('Column', {},
          items.length > 0 
            ? items.map((item, index) => 
                React.createElement('Text', { key: index, text: item })
              )
            : [React.createElement('Text', { key: 'empty', text: 'No items' })]
        );
      };

      // 空列表
      let element = React.createElement(EmptyListComponent, { items: [] });
      let widget = FlutterRenderer.render(element);
      expect(widget.children).toHaveLength(1);
      expect(widget.children[0].props.text).toBe('No items');

      // 非空列表
      element = React.createElement(EmptyListComponent, { items: ['Item 1'] });
      widget = FlutterRenderer.render(element);
      expect(widget.children).toHaveLength(1);
      expect(widget.children[0].props.text).toBe('Item 1');
    });
  });

  describe('复杂嵌套渲染测试', () => {
    test('应该能够处理条件渲染和列表渲染的组合', () => {
      interface User {
        id: number;
        name: string;
        active: boolean;
      }
      
      const ComplexRenderingComponent = ({ 
        users, 
        showInactive 
      }: { 
        users: User[]; 
        showInactive: boolean;
      }) => {
        const filteredUsers = showInactive 
          ? users 
          : users.filter(user => user.active);
          
        return React.createElement('Column', {}, [
          React.createElement('Text', { 
            key: 'title', 
            text: `Users (${filteredUsers.length})` 
          }),
          ...filteredUsers.map(user => 
            React.createElement('Row', { key: user.id }, [
              React.createElement('Text', { 
                key: 'name', 
                text: user.name 
              }),
              React.createElement('Text', { 
                key: 'status', 
                text: user.active ? 'Active' : 'Inactive' 
              })
            ])
          ),
          filteredUsers.length === 0 && React.createElement('Text', { 
            key: 'empty', 
            text: 'No users to display' 
          })
        ].filter(Boolean));
      };

      const users = [
        { id: 1, name: 'John', active: true },
        { id: 2, name: 'Jane', active: false },
        { id: 3, name: 'Bob', active: true }
      ];

      // 显示所有用户
      let element = React.createElement(ComplexRenderingComponent, { 
        users, 
        showInactive: true 
      });
      let widget = FlutterRenderer.render(element);
      expect(widget.children).toHaveLength(4); // title + 3 users
      expect(widget.children[0].props.text).toBe('Users (3)');

      // 只显示活跃用户
      element = React.createElement(ComplexRenderingComponent, { 
        users, 
        showInactive: false 
      });
      widget = FlutterRenderer.render(element);
      expect(widget.children).toHaveLength(3); // title + 2 active users
      expect(widget.children[0].props.text).toBe('Users (2)');

      // 空用户列表
      element = React.createElement(ComplexRenderingComponent, { 
        users: [], 
        showInactive: true 
      });
      widget = FlutterRenderer.render(element);
      expect(widget.children).toHaveLength(2); // title + empty message
      expect(widget.children[1].props.text).toBe('No users to display');
    });

    test('应该能够处理嵌套列表渲染', () => {
      interface Category {
        id: number;
        name: string;
        items: string[];
      }
      
      const NestedListComponent = ({ categories }: { categories: Category[] }) => {
        return React.createElement('Column', {},
          categories.map(category => 
            React.createElement('Column', { key: category.id }, [
              React.createElement('Text', { 
                key: 'title', 
                text: category.name 
              }),
              ...category.items.map((item, index) => 
                React.createElement('Text', { 
                  key: index, 
                  text: `  - ${item}` 
                })
              )
            ])
          )
        );
      };

      const categories = [
        { id: 1, name: 'Fruits', items: ['Apple', 'Banana'] },
        { id: 2, name: 'Vegetables', items: ['Carrot', 'Broccoli', 'Spinach'] }
      ];

      const element = React.createElement(NestedListComponent, { categories });
      const widget = FlutterRenderer.render(element);
      
      expect(widget.children).toHaveLength(2); // 2 categories
      
      // 第一个分类
      expect(widget.children[0].children).toHaveLength(3); // title + 2 items
      expect(widget.children[0].children[0].props.text).toBe('Fruits');
      expect(widget.children[0].children[1].props.text).toBe('  - Apple');
      
      // 第二个分类
      expect(widget.children[1].children).toHaveLength(4); // title + 3 items
      expect(widget.children[1].children[0].props.text).toBe('Vegetables');
      expect(widget.children[1].children[2].props.text).toBe('  - Broccoli');
    });
  });
});
