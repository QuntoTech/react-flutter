/**
 * ForegroundDecoration前景装饰功能测试
 * 验证foregroundDecoration属性的完整功能
 */

import { ContainerStyle } from '../src/styles/types';
import { Color } from '../src/styles/color';
import { Border } from '../src/styles/border';
import { BorderRadius } from '../src/styles/border-radius';
import { EdgeInsets } from '../src/styles/edge-insets';
import { mergeStyles } from '../src/styles/merge-styles';

describe('ForegroundDecoration前景装饰系统', () => {
  describe('基础功能测试', () => {
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

    test('应该支持前景颜色', () => {
      const style: ContainerStyle = {
        foregroundDecoration: {
          color: Color.fromRGBO(255, 0, 0, 0.5)
        }
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.foregroundDecoration?.color).toEqual({ value: Color.fromRGBO(255, 0, 0, 0.5).value });
    });

    test('应该支持前景边框', () => {
      const style: ContainerStyle = {
        foregroundDecoration: {
          border: Border.all({ color: Color.white, width: 3 })
        }
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.foregroundDecoration?.border).toBeDefined();
    });

    test('应该支持前景圆角', () => {
      const style: ContainerStyle = {
        foregroundDecoration: {
          borderRadius: BorderRadius.circular(10)
        }
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.foregroundDecoration?.borderRadius).toBeDefined();
    });
  });

  describe('高级功能测试', () => {
    test('应该支持前景阴影', () => {
      const style: ContainerStyle = {
        foregroundDecoration: {
          boxShadow: [{
            color: Color.black,
            blurRadius: 5,
            offset: { dx: 2, dy: 2 },
            spreadRadius: 1,
            blurStyle: 'normal'
          }]
        }
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.foregroundDecoration?.boxShadow).toBeDefined();
      expect(mergedStyle.foregroundDecoration?.boxShadow).toHaveLength(1);
    });

    test('应该支持前景渐变', () => {
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
      expect(gradient?.begin).toBe('topCenter');
      expect(gradient?.end).toBe('bottomCenter');
    });

    test('应该支持前景图片', () => {
      const style: ContainerStyle = {
        foregroundDecoration: {
          image: {
            url: 'watermark.png',
            fit: 'contain',
            repeat: 'noRepeat'
          }
        }
      };

      const mergedStyle = mergeStyles({}, style);
      const image = mergedStyle.foregroundDecoration?.image;
      expect(image?.url).toBe('watermark.png');
      expect(image?.fit).toBe('contain');
      expect(image?.repeat).toBe('noRepeat');
    });

    test('应该支持前景形状', () => {
      const style: ContainerStyle = {
        foregroundDecoration: {
          shape: 'circle',
          color: Color.fromRGBO(255, 255, 255, 0.3)
        }
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.foregroundDecoration?.shape).toBe('circle');
      expect(mergedStyle.foregroundDecoration?.color).toEqual({ value: Color.fromRGBO(255, 255, 255, 0.3).value });
    });
  });

  describe('组合使用测试', () => {
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
      
      // 验证背景装饰
      expect(mergedStyle.decoration?.color).toEqual({ value: Color.blue.value });
      expect(mergedStyle.decoration?.borderRadius).toBeDefined();
      
      // 验证前景装饰
      expect(mergedStyle.foregroundDecoration?.border).toBeDefined();
      expect(mergedStyle.foregroundDecoration?.borderRadius).toBeDefined();
      
      // 验证其他属性
      expect(mergedStyle.width).toBe(250);
      expect(mergedStyle.height).toBe(80);
      expect(mergedStyle.alignment).toBe('center');
    });

    test('应该支持复杂的前景装饰组合', () => {
      const style: ContainerStyle = {
        foregroundDecoration: {
          color: Color.fromRGBO(255, 0, 0, 0.2),
          borderRadius: BorderRadius.circular(10),
          border: Border.all({ color: Color.white, width: 2 }),
          boxShadow: [{
            color: Color.black,
            blurRadius: 8,
            offset: { dx: 0, dy: 4 },
            spreadRadius: 2,
            blurStyle: 'normal'
          }],
          gradient: {
            type: 'radial',
            colors: [Color.transparent, Color.fromRGBO(0, 0, 0, 0.5)],
            center: 'center',
            radius: 0.8
          }
        }
      };

      const mergedStyle = mergeStyles({}, style);
      const fg = mergedStyle.foregroundDecoration;
      
      expect(fg?.color).toEqual({ value: Color.fromRGBO(255, 0, 0, 0.2).value });
      expect(fg?.borderRadius).toBeDefined();
      expect(fg?.border).toBeDefined();
      expect(fg?.boxShadow).toHaveLength(1);
      expect(fg?.gradient?.type).toBe('radial');
    });
  });

  describe('样式合并测试', () => {
    test('应该正确合并多个foregroundDecoration样式', () => {
      const baseStyle: ContainerStyle = {
        width: 200,
        foregroundDecoration: {
          color: Color.red,
          borderRadius: BorderRadius.circular(5)
        }
      };

      const extendStyle: ContainerStyle = {
        height: 100,
        foregroundDecoration: {
          border: Border.all({ color: Color.blue, width: 2 })
        }
      };

      const mergedStyle = mergeStyles(baseStyle, extendStyle);
      
      // 验证非嵌套属性正确合并
      expect(mergedStyle.width).toBe(200);  // 保留基础宽度
      expect(mergedStyle.height).toBe(100);  // 添加扩展高度
      
      // 验证foregroundDecoration被完全覆盖（这是预期行为）
      const fg = mergedStyle.foregroundDecoration;
      expect(fg?.color).toBeUndefined();  // 基础颜色被覆盖
      expect(fg?.borderRadius).toBeUndefined();  // 基础圆角被覆盖
      expect(fg?.border).toBeDefined();  // 只保留扩展边框
    });

    test('应该支持foregroundDecoration的覆盖', () => {
      const baseStyle: ContainerStyle = {
        foregroundDecoration: {
          color: Color.red
        }
      };

      const overrideStyle: ContainerStyle = {
        foregroundDecoration: {
          color: Color.blue
        }
      };

      const mergedStyle = mergeStyles(baseStyle, overrideStyle);
      expect(mergedStyle.foregroundDecoration?.color).toEqual({ value: Color.blue.value });  // 应该被覆盖为蓝色
    });
  });

  describe('边界情况测试', () => {
    test('应该处理undefined的foregroundDecoration', () => {
      const style: ContainerStyle = {
        width: 100,
        foregroundDecoration: undefined
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.foregroundDecoration).toBeUndefined();
    });

    test('应该处理空的foregroundDecoration对象', () => {
      const style: ContainerStyle = {
        foregroundDecoration: {}
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.foregroundDecoration).toEqual({});
    });

    test('应该处理null值', () => {
      const style: ContainerStyle = {
        foregroundDecoration: {
          color: null as any,
          border: null as any
        }
      };

      const mergedStyle = mergeStyles({}, style);
      expect(mergedStyle.foregroundDecoration?.color).toBeNull();
      expect(mergedStyle.foregroundDecoration?.border).toBeNull();
    });
  });
});
