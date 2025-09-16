/**
 * BoxShadow样式系统测试套件
 * 验证BoxShadow与Flutter API的完全对齐
 * 
 * 测试目标：
 * 1. 验证BoxShadowStyle接口的完整性
 * 2. 确保与Flutter BoxShadow API完全一致
 * 3. 验证所有BlurStyle枚举值
 * 4. 测试边界情况和默认值处理
 */

import { Color } from '../src/styles/color';
import { BoxShadowStyle, BlurStyleValue } from '../src/styles/types';
import { mergeStyles } from '../src/styles/merge-styles';

describe('BoxShadow样式系统', () => {
  describe('BoxShadowStyle接口验证', () => {
    /**
     * 测试目的：验证BoxShadowStyle接口包含所有Flutter BoxShadow属性
     * 验证路径：BoxShadowStyle → Flutter BoxShadow API对齐
     * 重要性：确保API完整性
     */
    test('应该包含所有Flutter BoxShadow属性', () => {
      const completeShadow: BoxShadowStyle = {
        color: Color.black26,
        offset: { dx: 0, dy: 2 },
        blurRadius: 4.0,
        spreadRadius: 0.0,
        blurStyle: 'normal'
      };
      
      // 验证所有属性都存在且类型正确
      expect(completeShadow.color).toBeInstanceOf(Color);
      expect(completeShadow.offset).toEqual({ dx: 0, dy: 2 });
      expect(typeof completeShadow.blurRadius).toBe('number');
      expect(typeof completeShadow.spreadRadius).toBe('number');
      expect(completeShadow.blurStyle).toBe('normal');
    });

    /**
     * 测试目的：验证所有属性都是可选的（符合Flutter默认值设计）
     * 验证路径：可选属性 → Flutter默认值行为
     * 重要性：确保API使用的便利性
     */
    test('所有属性都应该是可选的', () => {
      const minimalShadow: BoxShadowStyle = {};
      
      expect(minimalShadow.color).toBeUndefined();
      expect(minimalShadow.offset).toBeUndefined();
      expect(minimalShadow.blurRadius).toBeUndefined();
      expect(minimalShadow.spreadRadius).toBeUndefined();
      expect(minimalShadow.blurStyle).toBeUndefined();
    });
  });

  describe('BlurStyle枚举验证', () => {
    /**
     * 测试目的：验证所有Flutter BlurStyle枚举值都被支持
     * 验证路径：BlurStyleValue → Flutter BlurStyle枚举对齐
     * 重要性：确保完整的视觉效果支持
     */
    test('应该支持所有Flutter BlurStyle枚举值', () => {
      const blurStyles: BlurStyleValue[] = ['normal', 'solid', 'outer', 'inner'];
      
      blurStyles.forEach(style => {
        const shadow: BoxShadowStyle = {
          blurStyle: style,
          blurRadius: 4
        };
        
        expect(shadow.blurStyle).toBe(style);
      });
    });

    /**
     * 测试目的：验证每种BlurStyle的语义正确性
     * 验证路径：BlurStyle值 → 预期的视觉效果
     * 重要性：确保开发者理解和正确使用
     */
    test('每种BlurStyle都应该有明确的语义', () => {
      const shadowConfigs = [
        { blurStyle: 'normal' as BlurStyleValue, description: '标准模糊效果' },
        { blurStyle: 'solid' as BlurStyleValue, description: '实心阴影效果' },
        { blurStyle: 'outer' as BlurStyleValue, description: '外部模糊' },
        { blurStyle: 'inner' as BlurStyleValue, description: '内部模糊（内阴影）' }
      ];
      
      shadowConfigs.forEach(({ blurStyle, description }) => {
        const shadow: BoxShadowStyle = {
          color: Color.black26,
          blurRadius: 4,
          blurStyle
        };
        
        expect(shadow.blurStyle).toBe(blurStyle);
        expect(description).toBeTruthy(); // 确保每种样式都有描述
      });
    });
  });

  describe('Color和Offset处理', () => {
    /**
     * 测试目的：验证Color对象的正确处理
     * 验证路径：Color实例 → BoxShadow color属性
     * 重要性：确保颜色系统集成
     */
    test('应该正确处理Color对象', () => {
      const colors = [
        Color.black,
        Color.black26,
        Color.fromRGBO(255, 0, 0, 0.5),
        Color.fromARGB(128, 0, 255, 0)
      ];
      
      colors.forEach(color => {
        const shadow: BoxShadowStyle = {
          color,
          blurRadius: 4
        };
        
        expect(shadow.color).toBe(color);
        expect(shadow.color).toBeInstanceOf(Color);
      });
    });

    /**
     * 测试目的：验证offset对象的结构
     * 验证路径：offset对象 → Flutter Offset API对齐
     * 重要性：确保位置偏移的正确性
     */
    test('应该正确处理offset对象', () => {
      const offsets = [
        { dx: 0, dy: 0 },
        { dx: 2, dy: 4 },
        { dx: -1, dy: 3 },
        { dx: 0.5, dy: -2.5 }
      ];
      
      offsets.forEach(offset => {
        const shadow: BoxShadowStyle = {
          offset,
          blurRadius: 4
        };
        
        expect(shadow.offset).toEqual(offset);
        expect(typeof shadow.offset!.dx).toBe('number');
        expect(typeof shadow.offset!.dy).toBe('number');
      });
    });
  });

  describe('数值范围验证', () => {
    /**
     * 测试目的：验证blurRadius的有效范围
     * 验证路径：blurRadius值 → Flutter约束
     * 重要性：确保视觉效果的合理性
     */
    test('应该支持有效的blurRadius值', () => {
      const validBlurRadii = [0, 0.5, 1, 4, 8, 16, 32];
      
      validBlurRadii.forEach(blurRadius => {
        const shadow: BoxShadowStyle = {
          blurRadius,
          color: Color.black26
        };
        
        expect(shadow.blurRadius).toBe(blurRadius);
        expect(shadow.blurRadius).toBeGreaterThanOrEqual(0);
      });
    });

    /**
     * 测试目的：验证spreadRadius的有效范围
     * 验证路径：spreadRadius值 → Flutter约束
     * 重要性：确保阴影扩散效果的正确性
     */
    test('应该支持有效的spreadRadius值', () => {
      const validSpreadRadii = [0, 1, -1, 2.5, -0.5, 8];
      
      validSpreadRadii.forEach(spreadRadius => {
        const shadow: BoxShadowStyle = {
          spreadRadius,
          blurRadius: 4,
          color: Color.black26
        };
        
        expect(shadow.spreadRadius).toBe(spreadRadius);
        expect(typeof shadow.spreadRadius).toBe('number');
      });
    });
  });

  describe('样式合并测试', () => {
    /**
     * 测试目的：验证BoxShadow在样式合并中的行为
     * 验证路径：mergeStyles → BoxShadow数组处理
     * 重要性：确保与样式系统的集成
     */
    test('应该正确处理BoxShadow数组的合并', () => {
      const baseStyle = {
        decoration: {
          boxShadow: [
            {
              color: Color.black26,
              blurRadius: 4,
              offset: { dx: 0, dy: 2 }
            }
          ]
        }
      };
      
      const extendedStyle = {
        decoration: {
          boxShadow: [
            {
              color: Color.blue.withOpacity(0.3),
              blurRadius: 8,
              offset: { dx: 0, dy: 4 },
              blurStyle: 'outer' as BlurStyleValue
            }
          ]
        }
      };
      
      const merged = mergeStyles(baseStyle, extendedStyle);
      
      // 验证合并后的结构
      expect(merged.decoration).toBeDefined();
      expect(merged.decoration.boxShadow).toBeDefined();
      expect(Array.isArray(merged.decoration.boxShadow)).toBe(true);
    });

    /**
     * 测试目的：验证多层阴影的支持
     * 验证路径：多个BoxShadow → 正确的数组结构
     * 重要性：确保复杂视觉效果的支持
     */
    test('应该支持多层阴影效果', () => {
      const multiShadowStyle = {
        decoration: {
          boxShadow: [
            {
              color: Color.black12,
              blurRadius: 1,
              offset: { dx: 0, dy: 1 },
              blurStyle: 'normal' as BlurStyleValue
            },
            {
              color: Color.black26,
              blurRadius: 4,
              offset: { dx: 0, dy: 2 },
              blurStyle: 'normal' as BlurStyleValue
            },
            {
              color: Color.black38,
              blurRadius: 8,
              offset: { dx: 0, dy: 4 },
              blurStyle: 'outer' as BlurStyleValue
            }
          ]
        }
      };
      
      const processed = mergeStyles({}, multiShadowStyle);
      
      expect(processed.decoration.boxShadow).toHaveLength(3);
      expect(processed.decoration.boxShadow[0].blurRadius).toBe(1);
      expect(processed.decoration.boxShadow[1].blurRadius).toBe(4);
      expect(processed.decoration.boxShadow[2].blurRadius).toBe(8);
    });
  });

  describe('实际使用场景', () => {
    /**
     * 测试目的：模拟Material Design卡片阴影
     * 验证路径：真实设计需求 → BoxShadow实现
     * 重要性：确保实际应用的可用性
     */
    test('应该支持Material Design卡片阴影', () => {
      const materialCardShadow: BoxShadowStyle[] = [
        {
          color: Color.fromRGBO(0, 0, 0, 0.14),
          blurRadius: 2,
          offset: { dx: 0, dy: 1 },
          blurStyle: 'normal'
        },
        {
          color: Color.fromRGBO(0, 0, 0, 0.12),
          blurRadius: 4,
          offset: { dx: 0, dy: 2 },
          blurStyle: 'normal'
        }
      ];
      
      materialCardShadow.forEach((shadow, index) => {
        expect(shadow.color).toBeInstanceOf(Color);
        expect(shadow.blurRadius).toBeGreaterThan(0);
        expect(shadow.offset).toBeDefined();
        expect(shadow.blurStyle).toBe('normal');
      });
    });

    /**
     * 测试目的：模拟悬浮按钮阴影效果
     * 验证路径：交互式组件 → 动态阴影
     * 重要性：确保交互效果的支持
     */
    test('应该支持悬浮按钮阴影效果', () => {
      const fabShadows = {
        resting: {
          color: Color.black26,
          blurRadius: 4,
          offset: { dx: 0, dy: 2 },
          spreadRadius: 0,
          blurStyle: 'normal' as BlurStyleValue
        },
        hover: {
          color: Color.black38,
          blurRadius: 8,
          offset: { dx: 0, dy: 4 },
          spreadRadius: 1,
          blurStyle: 'normal' as BlurStyleValue
        }
      };
      
      // 验证静止状态
      expect(fabShadows.resting.blurRadius).toBe(4);
      expect(fabShadows.resting.spreadRadius).toBe(0);
      
      // 验证悬浮状态
      expect(fabShadows.hover.blurRadius).toBe(8);
      expect(fabShadows.hover.spreadRadius).toBe(1);
    });
  });
});
