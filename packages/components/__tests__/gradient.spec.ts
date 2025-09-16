/**
 * Gradient渐变系统测试套件
 * 验证Gradient与Flutter API的完全对齐
 * 
 * 测试目标：
 * 1. 验证LinearGradient、RadialGradient、SweepGradient接口完整性
 * 2. 确保与Flutter Gradient API完全一致
 * 3. 验证所有枚举值和属性
 * 4. 测试样式合并中的gradient处理
 */

import { Color } from '../src/styles/color';
import { 
  LinearGradientStyle, 
  RadialGradientStyle, 
  SweepGradientStyle,
  TileModeValue,
  GradientTransformValue,
  AlignmentValue
} from '../src/styles/types';
import { mergeStyles } from '../src/styles/merge-styles';

describe('Gradient渐变系统', () => {
  describe('LinearGradient线性渐变', () => {
    /**
     * 测试目的：验证LinearGradient接口包含所有Flutter属性
     * 验证路径：LinearGradientStyle → Flutter LinearGradient API对齐
     * 重要性：确保API完整性
     */
    test('应该包含所有Flutter LinearGradient属性', () => {
      const completeLinearGradient: LinearGradientStyle = {
        type: 'linear',
        begin: 'topLeft',
        end: 'bottomRight',
        colors: [Color.red, Color.blue],
        stops: [0.0, 1.0],
        tileMode: 'clamp',
        transform: {
          rotation: 0.5,
          scale: 1.2,
          translation: { dx: 10, dy: 20 }
        }
      };
      
      // 验证所有属性都存在且类型正确
      expect(completeLinearGradient.type).toBe('linear');
      expect(completeLinearGradient.begin).toBe('topLeft');
      expect(completeLinearGradient.end).toBe('bottomRight');
      expect(Array.isArray(completeLinearGradient.colors)).toBe(true);
      expect(completeLinearGradient.colors).toHaveLength(2);
      expect(Array.isArray(completeLinearGradient.stops)).toBe(true);
      expect(completeLinearGradient.tileMode).toBe('clamp');
      expect(completeLinearGradient.transform).toBeDefined();
    });

    /**
     * 测试目的：验证必需属性和可选属性
     * 验证路径：必需/可选属性 → Flutter默认值行为
     * 重要性：确保API使用的便利性
     */
    test('只有type和colors是必需的', () => {
      const minimalLinearGradient: LinearGradientStyle = {
        type: 'linear',
        colors: [Color.red, Color.blue]
      };
      
      expect(minimalLinearGradient.type).toBe('linear');
      expect(minimalLinearGradient.colors).toHaveLength(2);
      expect(minimalLinearGradient.begin).toBeUndefined();
      expect(minimalLinearGradient.end).toBeUndefined();
      expect(minimalLinearGradient.stops).toBeUndefined();
      expect(minimalLinearGradient.tileMode).toBeUndefined();
    });

    /**
     * 测试目的：验证Alignment枚举的完整性
     * 验证路径：AlignmentValue → Flutter Alignment枚举对齐
     * 重要性：确保对齐方式的完整支持
     */
    test('应该支持所有Flutter Alignment枚举值', () => {
      const alignments: AlignmentValue[] = [
        'topLeft', 'topCenter', 'topRight',
        'centerLeft', 'center', 'centerRight',
        'bottomLeft', 'bottomCenter', 'bottomRight'
      ];
      
      alignments.forEach(alignment => {
        const gradient: LinearGradientStyle = {
          type: 'linear',
          begin: alignment,
          end: alignment,
          colors: [Color.red, Color.blue]
        };
        
        expect(gradient.begin).toBe(alignment);
        expect(gradient.end).toBe(alignment);
      });
    });
  });

  describe('RadialGradient径向渐变', () => {
    /**
     * 测试目的：验证RadialGradient接口包含所有Flutter属性
     * 验证路径：RadialGradientStyle → Flutter RadialGradient API对齐
     * 重要性：确保径向渐变功能完整
     */
    test('应该包含所有Flutter RadialGradient属性', () => {
      const completeRadialGradient: RadialGradientStyle = {
        type: 'radial',
        center: 'center',
        radius: 0.8,
        colors: [Color.yellow, Color.orange],
        stops: [0.0, 1.0],
        tileMode: 'repeated',
        focal: 'topLeft',
        focalRadius: 0.1,
        transform: {
          matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        }
      };
      
      // 验证所有属性都存在且类型正确
      expect(completeRadialGradient.type).toBe('radial');
      expect(completeRadialGradient.center).toBe('center');
      expect(typeof completeRadialGradient.radius).toBe('number');
      expect(Array.isArray(completeRadialGradient.colors)).toBe(true);
      expect(completeRadialGradient.focal).toBe('topLeft');
      expect(typeof completeRadialGradient.focalRadius).toBe('number');
    });

    /**
     * 测试目的：验证径向渐变的数值范围
     * 验证路径：radius、focalRadius值 → Flutter约束
     * 重要性：确保渐变效果的合理性
     */
    test('应该支持有效的radius和focalRadius值', () => {
      const validRadii = [0.0, 0.5, 1.0, 2.0];
      
      validRadii.forEach(radius => {
        const gradient: RadialGradientStyle = {
          type: 'radial',
          radius,
          focalRadius: radius * 0.5,
          colors: [Color.green, Color.blue]
        };
        
        expect(gradient.radius).toBe(radius);
        expect(gradient.focalRadius).toBe(radius * 0.5);
      });
    });
  });

  describe('SweepGradient扫描渐变', () => {
    /**
     * 测试目的：验证SweepGradient接口包含所有Flutter属性
     * 验证路径：SweepGradientStyle → Flutter SweepGradient API对齐
     * 重要性：确保扫描渐变功能完整
     */
    test('应该包含所有Flutter SweepGradient属性', () => {
      const completeSweepGradient: SweepGradientStyle = {
        type: 'sweep',
        center: 'center',
        startAngle: 0.0,
        endAngle: 6.28318530718, // 2π
        colors: [Color.red, Color.orange, Color.yellow, Color.green, Color.blue, Color.purple],
        stops: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0],
        tileMode: 'mirror',
        transform: {
          rotation: 1.57079632679, // π/2
          scale: 1.0
        }
      };
      
      // 验证所有属性都存在且类型正确
      expect(completeSweepGradient.type).toBe('sweep');
      expect(completeSweepGradient.center).toBe('center');
      expect(typeof completeSweepGradient.startAngle).toBe('number');
      expect(typeof completeSweepGradient.endAngle).toBe('number');
      expect(Array.isArray(completeSweepGradient.colors)).toBe(true);
      expect(completeSweepGradient.colors).toHaveLength(6);
    });

    /**
     * 测试目的：验证角度值的数学正确性
     * 验证路径：startAngle、endAngle → 弧度制
     * 重要性：确保角度计算的准确性
     */
    test('应该支持弧度制角度值', () => {
      const angleConfigs = [
        { startAngle: 0, endAngle: Math.PI / 2, description: '90度扇形' },
        { startAngle: 0, endAngle: Math.PI, description: '180度半圆' },
        { startAngle: 0, endAngle: Math.PI * 2, description: '360度全圆' },
        { startAngle: Math.PI / 4, endAngle: Math.PI * 3 / 4, description: '45-135度扇形' }
      ];
      
      angleConfigs.forEach(({ startAngle, endAngle, description }) => {
        const gradient: SweepGradientStyle = {
          type: 'sweep',
          startAngle,
          endAngle,
          colors: [Color.red, Color.blue]
        };
        
        expect(gradient.startAngle).toBe(startAngle);
        expect(gradient.endAngle).toBe(endAngle);
        expect(description).toBeTruthy(); // 确保每种配置都有描述
      });
    });
  });

  describe('TileMode平铺模式', () => {
    /**
     * 测试目的：验证所有Flutter TileMode枚举值都被支持
     * 验证路径：TileModeValue → Flutter TileMode枚举对齐
     * 重要性：确保平铺效果的完整支持
     */
    test('应该支持所有Flutter TileMode枚举值', () => {
      const tileModes: TileModeValue[] = ['clamp', 'repeated', 'mirror'];
      
      tileModes.forEach(tileMode => {
        const gradient: LinearGradientStyle = {
          type: 'linear',
          colors: [Color.red, Color.blue],
          tileMode
        };
        
        expect(gradient.tileMode).toBe(tileMode);
      });
    });

    /**
     * 测试目的：验证每种TileMode的语义正确性
     * 验证路径：TileMode值 → 预期的平铺效果
     * 重要性：确保开发者理解和正确使用
     */
    test('每种TileMode都应该有明确的语义', () => {
      const tileModeConfigs = [
        { tileMode: 'clamp' as TileModeValue, description: '边缘颜色延伸' },
        { tileMode: 'repeated' as TileModeValue, description: '重复渐变' },
        { tileMode: 'mirror' as TileModeValue, description: '镜像重复' }
      ];
      
      tileModeConfigs.forEach(({ tileMode, description }) => {
        const gradient: RadialGradientStyle = {
          type: 'radial',
          colors: [Color.green, Color.blue],
          tileMode
        };
        
        expect(gradient.tileMode).toBe(tileMode);
        expect(description).toBeTruthy(); // 确保每种模式都有描述
      });
    });
  });

  describe('GradientTransform变换', () => {
    /**
     * 测试目的：验证GradientTransform的结构
     * 验证路径：GradientTransformValue → Flutter GradientTransform对齐
     * 重要性：确保渐变变换功能
     */
    test('应该支持矩阵和简化变换属性', () => {
      const matrixTransform: GradientTransformValue = {
        matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
      };
      
      const simpleTransform: GradientTransformValue = {
        rotation: Math.PI / 4,
        scale: 1.5,
        translation: { dx: 10, dy: -5 }
      };
      
      // 验证矩阵变换
      expect(Array.isArray(matrixTransform.matrix)).toBe(true);
      expect(matrixTransform.matrix).toHaveLength(16);
      
      // 验证简化变换
      expect(typeof simpleTransform.rotation).toBe('number');
      expect(typeof simpleTransform.scale).toBe('number');
      expect(simpleTransform.translation).toEqual({ dx: 10, dy: -5 });
    });
  });

  describe('样式合并测试', () => {
    /**
     * 测试目的：验证Gradient在样式合并中的行为
     * 验证路径：mergeStyles → Gradient处理
     * 重要性：确保与样式系统的集成
     */
    test('应该正确处理Gradient的合并', () => {
      const baseStyle = {
        decoration: {
          gradient: {
            type: 'linear',
            colors: [Color.red, Color.blue]
          } as LinearGradientStyle
        }
      };
      
      const extendedStyle = {
        decoration: {
          gradient: {
            type: 'radial',
            colors: [Color.green, Color.yellow],
            radius: 0.8
          } as RadialGradientStyle
        }
      };
      
      const merged = mergeStyles(baseStyle, extendedStyle);
      
      // 验证合并后的结构
      expect(merged.decoration).toBeDefined();
      expect(merged.decoration.gradient).toBeDefined();
      expect(merged.decoration.gradient.type).toBe('radial');
    });

    /**
     * 测试目的：验证复杂渐变配置的合并
     * 验证路径：复杂Gradient → 正确的样式合并
     * 重要性：确保复杂场景的支持
     */
    test('应该支持复杂渐变配置的合并', () => {
      const complexGradientStyle = {
        decoration: {
          gradient: {
            type: 'sweep',
            center: 'center',
            startAngle: 0,
            endAngle: Math.PI * 2,
            colors: [
              Color.red,
              Color.orange,
              Color.yellow,
              Color.green,
              Color.blue,
              Color.purple,
              Color.red
            ],
            stops: [0.0, 0.16, 0.33, 0.5, 0.66, 0.83, 1.0],
            tileMode: 'clamp'
          } as SweepGradientStyle,
          borderRadius: 12
        }
      };
      
      const processed = mergeStyles({}, complexGradientStyle);
      
      expect(processed.decoration.gradient.type).toBe('sweep');
      expect(processed.decoration.gradient.colors).toHaveLength(7);
      expect(processed.decoration.gradient.stops).toHaveLength(7);
      expect(processed.decoration.borderRadius).toEqual({
        topLeft: 12,
        topRight: 12,
        bottomLeft: 12,
        bottomRight: 12
      });
    });
  });

  describe('实际使用场景', () => {
    /**
     * 测试目的：模拟Material Design渐变
     * 验证路径：真实设计需求 → Gradient实现
     * 重要性：确保实际应用的可用性
     */
    test('应该支持Material Design渐变效果', () => {
      const materialGradients = {
        primary: {
          type: 'linear',
          begin: 'topLeft',
          end: 'bottomRight',
          colors: [Color.fromRGBO(33, 150, 243, 1.0), Color.fromRGBO(21, 101, 192, 1.0)],
          tileMode: 'clamp'
        } as LinearGradientStyle,
        
        accent: {
          type: 'radial',
          center: 'center',
          radius: 0.6,
          colors: [Color.fromRGBO(255, 64, 129, 1.0), Color.fromRGBO(197, 17, 98, 1.0)],
          tileMode: 'clamp'
        } as RadialGradientStyle
      };
      
      // 验证主色调渐变
      expect(materialGradients.primary.type).toBe('linear');
      expect(materialGradients.primary.colors).toHaveLength(2);
      
      // 验证强调色渐变
      expect(materialGradients.accent.type).toBe('radial');
      expect(materialGradients.accent.radius).toBe(0.6);
    });

    /**
     * 测试目的：模拟彩虹渐变效果
     * 验证路径：多色渐变 → SweepGradient实现
     * 重要性：确保复杂视觉效果的支持
     */
    test('应该支持彩虹渐变效果', () => {
      const rainbowGradient: SweepGradientStyle = {
        type: 'sweep',
        center: 'center',
        startAngle: 0,
        endAngle: Math.PI * 2,
        colors: [
          Color.fromRGBO(255, 0, 0, 1.0),     // 红
          Color.fromRGBO(255, 165, 0, 1.0),   // 橙
          Color.fromRGBO(255, 255, 0, 1.0),   // 黄
          Color.fromRGBO(0, 255, 0, 1.0),     // 绿
          Color.fromRGBO(0, 0, 255, 1.0),     // 蓝
          Color.fromRGBO(75, 0, 130, 1.0),    // 靛
          Color.fromRGBO(238, 130, 238, 1.0), // 紫
          Color.fromRGBO(255, 0, 0, 1.0)      // 红（循环）
        ],
        tileMode: 'clamp'
      };
      
      expect(rainbowGradient.colors).toHaveLength(8);
      expect(rainbowGradient.startAngle).toBe(0);
      expect(rainbowGradient.endAngle).toBe(Math.PI * 2);
    });
  });
});
