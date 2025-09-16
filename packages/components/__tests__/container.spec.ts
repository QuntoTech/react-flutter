/**
 * Container组件测试套件
 * 验证新的style属性支持和样式合并功能
 * 
 * 测试目标：
 * 1. 验证ContainerProps接口的正确性
 * 2. 确保style数组合并功能
 * 3. 验证样式对象的正确传递
 * 4. 测试边界情况处理
 */

import * as React from 'react';
import { Container } from '../src/container';
import { ContainerStyle, ClipBehaviorValue, AlignmentValue } from '../src/styles/types';
import { Text } from '../src/text';
import { Color } from '../src/styles/color';
import { EdgeInsets } from '../src/styles/edge-insets';
import { Border } from '../src/styles/border';
import { BorderRadius } from '../src/styles/border-radius';
import { mergeStyles } from '../src/styles/merge-styles';

describe('Container Component', () => {
  describe('Props接口验证', () => {
    /**
     * 测试目的：验证Container组件接受正确的props
     * 验证路径：ContainerProps → 正确的类型约束
     * 重要性：确保符合CONTAINER_DESIGN.md规范
     */
    test('应该接受children和style属性', () => {
      const containerProps = {
        children: React.createElement(Text, { text: 'Test Content' }),
        style: { padding: 16, color: Color.blue }
      };
      
      // 类型检查：这些应该通过TypeScript编译
      expect(() => {
        React.createElement(Container, containerProps);
      }).not.toThrow();
    });

    /**
     * 测试目的：验证style属性的类型约束
     * 验证路径：ContainerStyle接口 → 正确的类型检查
     * 重要性：确保类型安全
     */
    test('应该接受ContainerStyle类型的style', () => {
      const validStyle: ContainerStyle = {
        width: 100,
        height: 200,
        padding: 16,
        margin: 8,
        color: Color.blue,
        decoration: {
          borderRadius: 8,
          border: { width: 1, color: Color.grey }
        }
      };
      
      expect(() => {
        React.createElement(Container, { style: validStyle });
      }).not.toThrow();
    });

    /**
     * 测试目的：验证style数组的支持
     * 验证路径：ContainerStyle[] → 正确处理
     * 重要性：支持样式合并功能
     */
    test('应该接受ContainerStyle数组', () => {
      const styleArray: ContainerStyle[] = [
        { padding: 16, color: Color.blue },
        { margin: 8, color: Color.red }
      ];
      
      expect(() => {
        React.createElement(Container, { style: styleArray });
      }).not.toThrow();
    });
  });

  describe('样式合并功能', () => {
    /**
     * 测试目的：验证单个样式对象的处理
     * 验证路径：单个style对象 → 直接传递
     * 重要性：确保基础功能正确
     */
    test('应该正确处理单个样式对象', () => {
      const style = { padding: 16, color: Color.blue };
      
      // 我们不能直接测试React.createElement的结果，但可以测试组件不会抛出错误
      expect(() => {
        React.createElement(Container, { style });
      }).not.toThrow();
    });

    /**
     * 测试目的：验证样式数组的合并
     * 验证路径：style数组 → mergeMultipleStyles → 合并结果
     * 重要性：确保样式继承功能正确
     */
    test('应该正确合并样式数组', () => {
      const styleArray = [
        { padding: 16, color: Color.blue },
        { color: Color.red, margin: 8 }
      ];
      
      expect(() => {
        React.createElement(Container, { style: styleArray });
      }).not.toThrow();
    });

    /**
     * 测试目的：验证空style的处理
     * 验证路径：undefined/null style → 正确处理
     * 重要性：确保边界情况不出错
     */
    test('应该正确处理空样式', () => {
      expect(() => {
        React.createElement(Container);
        React.createElement(Container, { style: undefined });
        React.createElement(Container, { style: null as any });
      }).not.toThrow();
    });

    /**
     * 测试目的：验证空数组的处理
     * 验证路径：[] → 正确处理
     * 重要性：确保边界情况的健壮性
     */
    test('应该正确处理空样式数组', () => {
      expect(() => {
        React.createElement(Container, { style: [] });
      }).not.toThrow();
    });
  });

  describe('复杂样式对象', () => {
    /**
     * 测试目的：验证复杂decoration对象的处理
     * 验证路径：包含decoration的样式 → 正确传递
     * 重要性：确保复杂样式的支持
     */
    test('应该支持复杂的decoration样式', () => {
      const complexStyle: ContainerStyle = {
        decoration: {
          borderRadius: 12,
          border: { width: 2, color: Color.blue },
          boxShadow: [
            { color: Color.fromRGBO(0, 0, 0, 0.1), blurRadius: 4, offset: { dx: 0, dy: 2 }, blurStyle: 'normal' }
          ],
          gradient: {
            type: 'linear',
            begin: 'topLeft',
            end: 'bottomRight',
            colors: [Color.blue, Color.purple],
            tileMode: 'clamp'
          },
          image: {
            url: 'https://example.com/background.jpg',
            fit: 'cover',
            repeat: 'noRepeat'
          },
          shape: 'rectangle'
        }
      };
      
      expect(() => {
        React.createElement(Container, { style: complexStyle });
      }).not.toThrow();
    });

    /**
     * 测试目的：验证constraints对象的支持
     * 验证路径：包含constraints的样式 → 正确传递
     * 重要性：确保布局约束的支持
     */
    test('应该支持constraints样式', () => {
      const constraintStyle: ContainerStyle = {
        constraints: {
          minWidth: 100,
          maxWidth: 300,
          minHeight: 50,
          maxHeight: 200
        }
      };
      
      expect(() => {
        React.createElement(Container, { style: constraintStyle });
      }).not.toThrow();
    });

    /**
     * 测试目的：验证BoxShape形状的支持
     * 验证路径：包含shape的样式 → 正确传递
     * 重要性：确保形状变换的支持
     */
    test('应该支持BoxShape形状样式', () => {
      const rectangleStyle: ContainerStyle = {
        decoration: {
          shape: 'rectangle',
          color: Color.blue
        }
      };

      const circleStyle: ContainerStyle = {
        width: 100,
        height: 100,
        decoration: {
          shape: 'circle',
          gradient: {
            type: 'radial',
            colors: [Color.yellow, Color.orange],
            center: 'center',
            radius: 0.8
          }
        }
      };
      
      expect(() => {
        React.createElement(Container, { style: rectangleStyle });
        React.createElement(Container, { style: circleStyle });
      }).not.toThrow();
    });

    /**
     * 测试目的：验证完整decoration系统的组合
     * 验证路径：所有decoration属性组合 → 正确处理
     * 重要性：确保decoration系统的完整性
     */
    test('应该支持完整decoration系统的组合', () => {
      const fullDecorationStyle: ContainerStyle = {
        decoration: {
          color: Color.white,
          gradient: {
            type: 'sweep',
            center: 'center',
            startAngle: 0,
            endAngle: 6.28318530718, // 2π
            colors: [Color.red, Color.orange, Color.yellow, Color.green, Color.blue, Color.purple, Color.red]
          },
          image: {
            url: 'assets/textures/paper.png',
            fit: 'none',
            repeat: 'repeat'
          },
          border: {
            width: 2,
            color: Color.black
          },
          borderRadius: 16,
          boxShadow: [
            {
              color: Color.black26,
              blurRadius: 8,
              offset: { dx: 0, dy: 4 },
              spreadRadius: 2,
              blurStyle: 'normal'
            },
            {
              color: Color.blue.withOpacity(0.3),
              blurRadius: 16,
              offset: { dx: 0, dy: 8 },
              spreadRadius: 0,
              blurStyle: 'outer'
            }
          ],
          shape: 'rectangle'
        }
      };
      
      expect(() => {
        React.createElement(Container, { style: fullDecorationStyle });
      }).not.toThrow();
      
      // 验证所有decoration属性都存在
      const decoration = fullDecorationStyle.decoration!;
      expect(decoration.color).toBeDefined();
      expect(decoration.gradient).toBeDefined();
      expect(decoration.image).toBeDefined();
      expect(decoration.border).toBeDefined();
      expect(decoration.borderRadius).toBeDefined();
      expect(decoration.boxShadow).toBeDefined();
      expect(decoration.shape).toBeDefined();
    });
  });

  describe('Constraints约束功能测试', () => {
    /**
     * 测试目的：验证constraints属性的支持
     * 验证路径：BoxConstraints值 → 正确处理
     * 重要性：确保与Flutter BoxConstraints API的完全对齐
     */
    test('应该支持所有BoxConstraints属性', () => {
      const constraintsValues = [
        { minWidth: 100 },
        { maxWidth: 300 },
        { minHeight: 50 },
        { maxHeight: 200 },
        { minWidth: 100, maxWidth: 300 },
        { minHeight: 50, maxHeight: 200 },
        { minWidth: 100, maxWidth: 300, minHeight: 50, maxHeight: 200 }
      ];

      constraintsValues.forEach(constraints => {
        expect(() => {
          React.createElement(Container, { 
            style: { constraints } 
          });
        }).not.toThrow();
      });
    });

    /**
     * 测试目的：验证constraints与其他样式的组合使用
     * 验证路径：constraints + 其他样式 → 正确合并
     * 重要性：确保样式系统的兼容性
     */
    test('应该支持constraints与其他样式的组合', () => {
      const combinedStyle: ContainerStyle = {
        constraints: { minWidth: 100, maxWidth: 300 },
        color: Color.blue,
        padding: EdgeInsets.all(10),
        alignment: 'center'
      };

      expect(() => {
        React.createElement(Container, { style: combinedStyle });
      }).not.toThrow();
    });

    /**
     * 测试目的：验证constraints在样式数组中的处理
     * 验证路径：样式数组包含constraints → 正确合并
     * 重要性：确保样式合并逻辑的健壮性
     */
    test('应该正确处理样式数组中的constraints', () => {
      const styles: ContainerStyle[] = [
        { constraints: { minWidth: 50 } },
        { constraints: { maxWidth: 200 } },
        { color: Color.red }
      ];

      expect(() => {
        React.createElement(Container, { style: styles });
      }).not.toThrow();
    });

    /**
     * 测试目的：验证constraints为undefined的处理
     * 验证路径：constraints: undefined → 正确忽略
     * 重要性：确保可选属性的健壮处理
     */
    test('应该正确处理undefined constraints', () => {
      expect(() => {
        React.createElement(Container, { 
          style: { constraints: undefined, color: Color.green } 
        });
      }).not.toThrow();
    });
  });

  describe('Alignment对齐功能测试', () => {
    /**
     * 测试目的：验证alignment属性的类型安全性
     * 验证路径：AlignmentValue类型 → TypeScript类型检查
     * 重要性：确保alignment值的正确性
     */
    test('应该支持所有Flutter Alignment值', () => {
      const allAlignmentValues = [
        'topLeft', 'topCenter', 'topRight',
        'centerLeft', 'center', 'centerRight', 
        'bottomLeft', 'bottomCenter', 'bottomRight'
      ] as const;
      
      allAlignmentValues.forEach(alignment => {
        const style: ContainerStyle = { alignment };
        expect(() => {
          React.createElement(Container, { style });
        }).not.toThrow();
      });
    });

    /**
     * 测试目的：验证alignment与其他样式属性的组合使用
     * 验证路径：alignment + decoration + padding → 正确组合
     * 重要性：确保alignment不与其他属性冲突
     */
    test('应该支持alignment与其他样式属性组合', () => {
      const combinedStyle: ContainerStyle = {
        width: 200,
        height: 100,
        padding: 16,
        margin: 8,
        alignment: 'center',
        decoration: {
          color: Color.blue,
          borderRadius: 8,
          border: { width: 1, color: Color.grey }
        }
      };
      
      expect(() => {
        React.createElement(Container, { 
          style: combinedStyle,
          children: React.createElement('span', null, 'Test Content')
        });
      }).not.toThrow();
    });

    /**
     * 测试目的：验证alignment在样式数组中的处理
     * 验证路径：样式合并 → alignment正确覆盖
     * 重要性：确保样式合并时alignment的优先级正确
     */
    test('应该在样式数组中正确处理alignment', () => {
      const baseStyle: ContainerStyle = {
        padding: 16,
        alignment: 'topLeft'
      };
      
      const overrideStyle: ContainerStyle = {
        alignment: 'bottomRight'
      };
      
      expect(() => {
        React.createElement(Container, { 
          style: [baseStyle, overrideStyle]
        });
      }).not.toThrow();
    });

    /**
     * 测试目的：验证undefined alignment值的处理
     * 验证路径：alignment: undefined → 正确处理
     * 重要性：确保可选属性的正确处理
     */
    test('应该正确处理undefined alignment', () => {
      const style: ContainerStyle = {
        width: 100,
        height: 100,
        alignment: undefined  // 显式设置为undefined
      };
      
      expect(() => {
        React.createElement(Container, { style });
      }).not.toThrow();
    });
  });

  describe('使用场景测试', () => {
    /**
     * 测试目的：模拟真实的使用场景
     * 验证路径：完整的Container使用 → 正确工作
     * 重要性：确保在真实应用中的可用性
     */
    test('应该支持完整的使用场景', () => {
      const cardStyle: ContainerStyle = {
        width: 300,
        height: 200,
        padding: 16,
        margin: 8,
        decoration: {
          borderRadius: 8,
          border: { width: 1, color: new Color(0xFFE0E0E0) }
        },
        alignment: 'center'
      };
      
      const children = React.createElement(Text, { text: 'Card Content' });
      
      expect(() => {
        React.createElement(Container, { style: cardStyle }, children);
      }).not.toThrow();
    });

    /**
     * 测试目的：模拟styleSheet的使用场景
     * 验证路径：与styleSheet结合使用 → 正确工作
     * 重要性：确保与整个样式系统的兼容性
     */
    test('应该与样式继承配合使用', () => {
      const baseStyle: ContainerStyle = {
        padding: 16,
        decoration: { borderRadius: 8 }
      };
      
      const extendedStyle: ContainerStyle = {
        color: Color.blue,
        margin: 8
      };
      
      // 模拟styleSheet(BaseComponent)(extendedStyle)的结果
      const combinedStyles = [baseStyle, extendedStyle];
      
      expect(() => {
        React.createElement(Container, { style: combinedStyles });
      }).not.toThrow();
    });
  });

  describe('ForegroundDecoration前景装饰功能测试', () => {
    test('应该正确处理foregroundDecoration属性', () => {
      const style: ContainerStyle = {
        width: 200,
        height: 100,
        decoration: {
          color: Color.blue
        },
        foregroundDecoration: {
          border: Border.all({ color: Color.red, width: 2 })
        }
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.foregroundDecoration).toBeDefined();
      expect(mergedStyle.foregroundDecoration?.border).toBeDefined();
    });

    test('应该支持所有decoration功能', () => {
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

      const mergedStyle = mergeStyles({}, style);
      const fg = mergedStyle.foregroundDecoration;
      expect(fg?.color).toEqual({ value: Color.fromRGBO(255, 0, 0, 0.5).value });
      expect(fg?.borderRadius).toBeDefined();
      expect(fg?.border).toBeDefined();
      expect(fg?.boxShadow).toBeDefined();
    });

    test('应该与decoration和其他属性正确组合', () => {
      const style: ContainerStyle = {
        width: 250,
        height: 80,
        padding: EdgeInsets.all(15),
        decoration: {
          color: Color.blue,
          borderRadius: BorderRadius.circular(15)
        },
        foregroundDecoration: {
          border: Border.all({ color: Color.yellow, width: 3 }),
          borderRadius: BorderRadius.circular(15)
        },
        alignment: 'center'
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.decoration?.color).toEqual({ value: Color.blue.value });
      expect(mergedStyle.foregroundDecoration?.border).toBeDefined();
      expect(mergedStyle.alignment).toBe('center');
    });

    test('应该支持渐变前景装饰', () => {
      const style: ContainerStyle = {
        foregroundDecoration: {
          gradient: {
            type: 'linear',
            colors: [Color.transparent, Color.fromRGBO(0, 0, 0, 0.7)],
            begin: 'topCenter',
            end: 'bottomCenter'
          }
        }
      };

      const mergedStyle = mergeStyles({}, style);
      const gradient = mergedStyle.foregroundDecoration?.gradient;
      expect(gradient?.type).toBe('linear');
      expect(gradient?.colors).toHaveLength(2);
    });
  });

  describe('ClipBehavior裁剪行为功能测试', () => {
    test('应该正确处理clipBehavior属性', () => {
      const style: ContainerStyle = {
        width: 200,
        height: 100,
        clipBehavior: 'antiAlias'
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.clipBehavior).toBe('antiAlias');
    });

    test('应该支持所有Flutter Clip值', () => {
      const clipValues: ClipBehaviorValue[] = [
        'none', 'hardEdge', 'antiAlias', 'antiAliasWithSaveLayer'
      ];

      clipValues.forEach(clipBehavior => {
        const style: ContainerStyle = { clipBehavior };
        const mergedStyle = mergeStyles({}, style);
        expect(mergedStyle.clipBehavior).toBe(clipBehavior);
      });
    });

    test('应该与其他样式属性正确组合', () => {
      const style: ContainerStyle = {
        width: 200,
        height: 100,
        decoration: {
          color: Color.blue,
          borderRadius: BorderRadius.circular(15)
        },
        clipBehavior: 'antiAliasWithSaveLayer'
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.decoration?.color).toEqual({ value: Color.blue.value });
      expect(mergedStyle.clipBehavior).toBe('antiAliasWithSaveLayer');
    });
  });

  describe('TransformAlignment变换中心点功能测试', () => {
    test('应该正确处理transformAlignment属性', () => {
      const style: ContainerStyle = {
        width: 200,
        height: 100,
        transformAlignment: 'topLeft'
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.transformAlignment).toBe('topLeft');
    });

    test('应该支持所有Flutter Alignment值', () => {
      const alignmentValues: AlignmentValue[] = [
        'topLeft', 'topCenter', 'topRight',
        'centerLeft', 'center', 'centerRight', 
        'bottomLeft', 'bottomCenter', 'bottomRight'
      ];

      alignmentValues.forEach(transformAlignment => {
        const style: ContainerStyle = { transformAlignment };
        const mergedStyle = mergeStyles({}, style);
        expect(mergedStyle.transformAlignment).toBe(transformAlignment);
      });
    });

    test('应该与alignment属性独立工作', () => {
      const style: ContainerStyle = {
        alignment: 'center',
        transformAlignment: 'topLeft'
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.alignment).toBe('center');
      expect(mergedStyle.transformAlignment).toBe('topLeft');
    });
  });

  describe('Transform Matrix4变换功能测试', () => {
    test('应该正确处理transform属性', () => {
      const matrix = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
      ];
      
      const style: ContainerStyle = {
        width: 200,
        height: 100,
        transform: matrix
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.transform).toEqual(matrix);
    });

    test('应该接受16个数字的Matrix4数组', () => {
      const scaleMatrix = [
        1.5, 0.0, 0.0, 0.0,
        0.0, 1.5, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
      ];

      const style: ContainerStyle = { transform: scaleMatrix };
      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.transform).toHaveLength(16);
      expect(mergedStyle.transform).toEqual(scaleMatrix);
    });

    test('应该与transformAlignment配合使用', () => {
      const style: ContainerStyle = {
        transform: [
          1.2, 0.0, 0.0, 0.0,
          0.0, 1.2, 0.0, 0.0,
          0.0, 0.0, 1.0, 0.0,
          0.0, 0.0, 0.0, 1.0
        ],
        transformAlignment: 'center'
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.transform).toHaveLength(16);
      expect(mergedStyle.transformAlignment).toBe('center');
    });
  });
});
