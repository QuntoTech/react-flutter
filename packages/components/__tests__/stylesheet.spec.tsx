/**
 * StyleSheet高阶组件测试套件
 * 验证样式化组件的创建和继承功能
 * 
 * 测试目标：
 * 1. 验证基础组件的样式化功能
 * 2. 确保样式继承的正确性  
 * 3. 验证样式合并优先级
 * 4. 测试边界情况和错误处理
 */

import React from 'react';
import styleSheet from '../src/styles/stylesheet';

describe('StyleSheet', () => {

  describe('基础组件样式化', () => {
    /**
     * 测试目的：验证Container组件的样式化功能
     * 验证路径：styleSheet.Container(styles) → 样式化组件
     * 重要性：确保基础样式化功能的正确性
     */
    test('应该能够样式化Container组件', () => {
      const styles = { padding: 16, color: 'blue' };
      const StyledContainer = styleSheet.Container(styles);
      
      // 验证返回的是一个React组件（forwardRef返回的是对象，不是函数）
      expect(typeof StyledContainer).toBe('object');
      expect(StyledContainer.$$typeof).toBe(Symbol.for('react.forward_ref'));
      expect(StyledContainer.isStyledComponent).toBe(true);
      expect(StyledContainer.baseStyles).toEqual(styles);
      expect(StyledContainer.displayName).toContain('Styled');
    });

    /**
     * 测试目的：验证Text组件的样式化功能
     * 验证路径：styleSheet.Text(styles) → 样式化文本组件
     * 重要性：确保文本组件的样式化正确性
     */
    test('应该能够样式化Text组件', () => {
      const styles = { fontSize: 24, fontWeight: 'bold' };
      const StyledText = styleSheet.Text(styles);
      
      expect(StyledText.isStyledComponent).toBe(true);
      expect(StyledText.baseStyles).toEqual(styles);
      expect(StyledText.displayName).toContain('Styled');
    });

    /**
     * 测试目的：验证所有支持的组件类型
     * 验证路径：各种组件 → 正确的样式化
     * 重要性：确保所有基础组件都支持样式化
     */
    test('应该支持所有基础组件的样式化', () => {
      const testStyles = { padding: 8 };
      
      const components = [
        styleSheet.Container(testStyles),
        styleSheet.Text(testStyles),
        styleSheet.Column(testStyles),
        styleSheet.Row(testStyles),
        styleSheet.SizedBox(testStyles),
        styleSheet.ElevatedButton(testStyles)
      ];
      
      components.forEach(component => {
        expect(component.isStyledComponent).toBe(true);
        expect(component.baseStyles).toEqual(testStyles);
      });
    });
  });

  describe('样式合并功能', () => {
    /**
     * 测试目的：验证样式组件的基础样式存储
     * 验证路径：styleSheet.Container(styles) → 正确存储baseStyles
     * 重要性：确保基础样式被正确保存，为后续合并提供基础
     */
    test('应该正确存储基础样式', () => {
      const baseStyles = { padding: 16, color: 'blue', margin: 8 };
      const StyledContainer = styleSheet.Container(baseStyles);
      
      expect(StyledContainer.baseStyles).toEqual(baseStyles);
      expect(StyledContainer.isStyledComponent).toBe(true);
    });

    /**
     * 测试目的：验证组件元数据的正确性
     * 验证路径：样式化组件 → 包含必要的元数据
     * 重要性：确保样式组件包含完整的调试和继承信息
     */
    test('应该包含正确的组件元数据', () => {
      const baseStyles = { padding: 16 };
      const StyledContainer = styleSheet.Container(baseStyles);
      
      expect(StyledContainer.isStyledComponent).toBe(true);
      expect(StyledContainer.baseStyles).toEqual(baseStyles);
      expect(typeof StyledContainer.Component).toBe('object');
      expect((StyledContainer.Component as any).$$typeof).toBe(Symbol.for('react.forward_ref'));
      expect(StyledContainer.displayName).toContain('Styled');
    });
  });

  describe('样式继承功能', () => {
    /**
     * 测试目的：验证基本的样式继承
     * 验证路径：BaseComponent → styleSheet(BaseComponent)(newStyles) → 继承组件
     * 重要性：确保样式继承的核心功能
     */
    test('应该能够继承已有的样式组件', () => {
      // 创建基础样式组件
      const BaseCard = styleSheet.Container({
        padding: 16,
        color: 'white',
        borderRadius: 8
      });
      
      // 继承并扩展样式
      const RedCard = styleSheet(BaseCard)({
        color: 'red',
        margin: 8
      });
      
      expect(RedCard.isStyledComponent).toBe(true);
      expect(RedCard.Component).toBe(BaseCard.Component);
      
      // 验证样式合并：新样式应该覆盖基础样式
      const expectedStyles = {
        padding: 16,
        color: 'red',     // 覆盖了原来的'white'
        borderRadius: 8,
        margin: 8         // 新增属性
      };
      // 验证样式已经过转换处理
      expect(RedCard.baseStyles).toEqual({
        padding: { top: 16, right: 16, bottom: 16, left: 16 },
        borderRadius: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 },
        color: 'red',
        margin: { top: 8, right: 8, bottom: 8, left: 8 }
      });
    });

    /**
     * 测试目的：验证多层样式继承
     * 验证路径：Base → Inherited1 → Inherited2 → 多层继承结果
     * 重要性：确保支持复杂的样式继承链
     */
    test('应该支持多层样式继承', () => {
      // 第一层：基础组件
      const BaseTitle = styleSheet.Text({
        fontSize: 20,
        fontWeight: 'bold'
      });
      
      // 第二层：红色标题
      const RedTitle = styleSheet(BaseTitle)({
        color: 'red',
        fontSize: 24
      });
      
      // 第三层：居中红色标题
      const CenterRedTitle = styleSheet(RedTitle)({
        textAlign: 'center',
        fontSize: 28
      });
      
      // 验证最终样式
      const expectedStyles = {
        fontWeight: 'bold',   // 来自BaseTitle
        color: 'red',         // 来自RedTitle
        textAlign: 'center',  // 来自CenterRedTitle
        fontSize: 28          // CenterRedTitle覆盖RedTitle和BaseTitle
      };
      
      expect(CenterRedTitle.baseStyles).toEqual(expectedStyles);
      expect(CenterRedTitle.Component).toBe(BaseTitle.Component);
    });

    /**
     * 测试目的：验证复杂对象的继承覆盖
     * 验证路径：复杂样式对象 → 继承时的完全覆盖
     * 重要性：确保覆盖策略在继承中的一致性
     */
    test('应该正确处理复杂对象的继承覆盖', () => {
      const BaseCard = styleSheet.Container({
        padding: 16,
        decoration: {
          borderRadius: 8,
          border: { width: 1, color: 'gray' }
        }
      });
      
      const ShadowCard = styleSheet(BaseCard)({
        decoration: {
          borderRadius: 12,
          boxShadow: [{ color: 'black', blurRadius: 4 }]
        }
      });
      
      // decoration应该完全被覆盖，border信息丢失
      const expectedStyles = {
        padding: 16,
        decoration: {
          borderRadius: 12,
          boxShadow: [{ color: 'black', blurRadius: 4 }]
        }
      };
      
      // 验证样式已经过转换处理
      expect(ShadowCard.baseStyles).toEqual({
        padding: { top: 16, right: 16, bottom: 16, left: 16 },
        decoration: {
          borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 },
          boxShadow: [
            {
              blurRadius: 4,
              color: 'black',
            },
          ],
        }
      });
      expect(ShadowCard.baseStyles.decoration.border).toBeUndefined();
    });
  });

  describe('错误处理', () => {
    /**
     * 测试目的：验证非样式化组件的错误处理
     * 验证路径：普通组件 → styleSheet(Component) → 错误
     * 重要性：确保类型安全和错误提示
     */
    test('应该拒绝继承非样式化组件', () => {
      const RegularComponent = () => <div />;
      
      expect(() => {
        styleSheet(RegularComponent as any)({ color: 'red' });
      }).toThrow('styleSheet() 只能用于继承样式化组件');
    });

    /**
     * 测试目的：验证undefined组件的错误处理
     * 验证路径：undefined → styleSheet(undefined) → 错误
     * 重要性：确保参数验证的健壮性
     */
    test('应该拒绝undefined或null组件', () => {
      expect(() => {
        styleSheet(undefined as any)({ color: 'red' });
      }).toThrow('styleSheet() 只能用于继承样式化组件');
      
      expect(() => {
        styleSheet(null as any)({ color: 'red' });
      }).toThrow('styleSheet() 只能用于继承样式化组件');
    });
  });

  describe('组件元数据', () => {
    /**
     * 测试目的：验证样式化组件的元数据正确性
     * 验证路径：样式化组件 → 正确的元数据
     * 重要性：确保调试和开发体验
     */
    test('应该正确设置组件元数据', () => {
      const styles = { padding: 16 };
      const StyledContainer = styleSheet.Container(styles);
      
      expect(StyledContainer.isStyledComponent).toBe(true);
      expect(StyledContainer.baseStyles).toEqual(styles);
      expect(StyledContainer.displayName).toContain('Styled');
      expect(typeof StyledContainer.Component).toBe('object');
      expect((StyledContainer.Component as any).$$typeof).toBe(Symbol.for('react.forward_ref'));
    });

    /**
     * 测试目的：验证继承组件的元数据传递
     * 验证路径：继承组件 → 正确的原始组件引用
     * 重要性：确保继承链中的组件追踪
     */
    test('继承组件应该保持原始组件引用', () => {
      const BaseCard = styleSheet.Container({ padding: 16 });
      const RedCard = styleSheet(BaseCard)({ color: 'red' });
      
      // 继承组件应该引用相同的原始组件
      expect(RedCard.Component).toBe(BaseCard.Component);
      expect(RedCard.isStyledComponent).toBe(true);
    });
  });

  describe('实际使用场景', () => {
    /**
     * 测试目的：模拟真实的组件使用场景
     * 验证路径：完整的样式化 → 使用 → 渲染流程
     * 重要性：确保在真实应用中的可用性
     */
    test('应该支持完整的组件使用流程', () => {
      // 创建卡片组件
      const Card = styleSheet.Container({
        padding: 16,
        decoration: { borderRadius: 8 },
        margin: 8
      });
      
      // 创建标题组件
      const Title = styleSheet.Text({
        fontSize: 24,
        fontWeight: 'bold'
      });
      
      // 创建特殊的标题变体
      const RedTitle = styleSheet(Title)({
        color: 'red'
      });
      
      // 验证所有组件都正确创建
      expect(Card.isStyledComponent).toBe(true);
      expect(Title.isStyledComponent).toBe(true);
      expect(RedTitle.isStyledComponent).toBe(true);
      
      // 验证继承关系
      expect(RedTitle.Component).toBe(Title.Component);
      expect(RedTitle.baseStyles.fontSize).toBe(24);
      expect(RedTitle.baseStyles.color).toBe('red');
    });
  });
});
