/**
 * Icon组件React端单元测试
 * 验证Icon组件的正确创建和属性传递
 */

import * as React from 'react';
import { Icon } from '../src/icon';
import { Color } from '../src/styles/color';

describe('Icon组件', () => {
  describe('基础功能', () => {
    test('应该正确渲染Icon.Favorite组件', () => {
      const element = Icon.Favorite({});
      expect(element).toBeDefined();
    });

    test('应该正确渲染Icon.Home组件', () => {
      const element = Icon.Home({});
      expect(element).toBeDefined();
    });

    test('应该正确渲染Icon.Settings组件', () => {
      const element = Icon.Settings({});
      expect(element).toBeDefined();
    });
  });

  describe('属性传递', () => {
    test('size属性应该正确传递', () => {
      const element = Icon.Favorite({ size: 32 });
      expect(element.props.size).toBe(32);
    });

    test('color属性应该正确传递', () => {
      const element = Icon.Home({ color: Color.blue });
      expect(element.props.color).toEqual(Color.blue);
    });

    test('semanticLabel属性应该正确传递', () => {
      const element = Icon.Search({ semanticLabel: '搜索图标' });
      expect(element.props.semanticLabel).toBe('搜索图标');
    });

    test('textDirection属性应该正确传递', () => {
      const element = Icon.Settings({ textDirection: 'rtl' });
      expect(element.props.textDirection).toBe('rtl');
    });

    test('id属性应该正确传递', () => {
      const element = Icon.Add({ id: 'add-icon' });
      expect(element.props.id).toBe('add-icon');
    });
  });

  describe('Icon命名空间', () => {
    test('应该包含常用Material Icons', () => {
      expect(Icon.Favorite).toBeDefined();
      expect(Icon.Home).toBeDefined();
      expect(Icon.Settings).toBeDefined();
      expect(Icon.Search).toBeDefined();
      expect(Icon.Add).toBeDefined();
      expect(Icon.Delete).toBeDefined();
      expect(Icon.Edit).toBeDefined();
      expect(Icon.Check).toBeDefined();
      expect(Icon.Close).toBeDefined();
    });

    test('Icon组件应该是函数', () => {
      expect(typeof Icon.Favorite).toBe('function');
      expect(typeof Icon.Home).toBe('function');
      expect(typeof Icon.Settings).toBe('function');
    });
  });

  describe('Icon组件创建', () => {
    test('Icon.Favorite应该创建有效element', () => {
      const element = Icon.Favorite({});
      expect(element).toBeDefined();
      expect(React.isValidElement(element)).toBe(true);
    });
  });

  describe('组合场景', () => {
    test('应该支持完整属性组合', () => {
      const element = Icon.Delete({
        size: 48,
        color: Color.red,
        semanticLabel: '删除按钮',
        textDirection: 'ltr',
        id: 'delete-btn'
      });

      expect(element.props.size).toBe(48);
      expect(element.props.color).toEqual(Color.red);
      expect(element.props.semanticLabel).toBe('删除按钮');
      expect(element.props.textDirection).toBe('ltr');
      expect(element.props.id).toBe('delete-btn');
    });

    test('应该支持最小属性组合', () => {
      const element = Icon.Check({});
      expect(element).toBeDefined();
    });
  });

  describe('边界情况', () => {
    test('应该处理size为0', () => {
      const element = Icon.Home({ size: 0 });
      expect(element.props.size).toBe(0);
    });

    test('应该处理极大的size', () => {
      const element = Icon.Favorite({ size: 999 });
      expect(element.props.size).toBe(999);
    });

    test('应该处理空字符串semanticLabel', () => {
      const element = Icon.Search({ semanticLabel: '' });
      expect(element.props.semanticLabel).toBe('');
    });
  });

  describe('代码生成验证', () => {
    test('Icon组件数量应该大于1000', () => {
      const iconNames = Object.keys(Icon);
      expect(iconNames.length).toBeGreaterThan(1000);
    });

    test('应该包含常见的Icon', () => {
      const iconNames = Object.keys(Icon);
      
      expect(iconNames).toContain('Favorite');
      expect(iconNames).toContain('Home');
      expect(iconNames).toContain('Settings');
      expect(iconNames).toContain('Search');
      expect(iconNames).toContain('Add');
      expect(iconNames).toContain('Delete');
      expect(iconNames).toContain('Edit');
      expect(iconNames).toContain('Check');
      expect(iconNames).toContain('Close');
    });
  });
});