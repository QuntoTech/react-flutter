/**
 * BorderRadius类测试套件
 * 验证BorderRadius类与Flutter BorderRadius API的完全对齐
 * 
 * 测试目标：
 * 1. 验证所有静态工厂方法
 * 2. 确保与Flutter BorderRadius API完全一致
 * 3. 验证圆角值的正确设置
 * 4. 测试工具方法和属性
 */

import { BorderRadius } from '../src/styles/border-radius';

describe('BorderRadius', () => {
  describe('静态工厂方法', () => {
    /**
     * 测试目的：验证BorderRadius.circular()方法
     * 验证路径：circular(radius) → 所有圆角相同的BorderRadius
     * 重要性：对齐Flutter BorderRadius.circular()
     */
    test('BorderRadius.circular()应该创建所有圆角相同的边框', () => {
      const borderRadius = BorderRadius.circular(8);
      
      expect(borderRadius.topLeft).toBe(8);
      expect(borderRadius.topRight).toBe(8);
      expect(borderRadius.bottomRight).toBe(8);
      expect(borderRadius.bottomLeft).toBe(8);
    });

    /**
     * 测试目的：验证BorderRadius.all()方法
     * 验证路径：all(radius) → 等同于circular的BorderRadius
     * 重要性：对齐Flutter BorderRadius.all()
     */
    test('BorderRadius.all()应该等同于circular()', () => {
      const circular = BorderRadius.circular(12);
      const all = BorderRadius.all(12);
      
      expect(all.equals(circular)).toBe(true);
      expect(all.topLeft).toBe(12);
      expect(all.topRight).toBe(12);
      expect(all.bottomRight).toBe(12);
      expect(all.bottomLeft).toBe(12);
    });

    /**
     * 测试目的：验证BorderRadius.only()方法
     * 验证路径：only({specific}) → 指定圆角的BorderRadius
     * 重要性：对齐Flutter BorderRadius.only()
     */
    test('BorderRadius.only()应该创建指定圆角的边框', () => {
      const borderRadius = BorderRadius.only({
        topLeft: 4,
        topRight: 8,
        bottomRight: 12,
        bottomLeft: 16
      });
      
      expect(borderRadius.topLeft).toBe(4);
      expect(borderRadius.topRight).toBe(8);
      expect(borderRadius.bottomRight).toBe(12);
      expect(borderRadius.bottomLeft).toBe(16);
    });

    /**
     * 测试目的：验证only()的默认值处理
     * 验证路径：only({partial}) → 正确的默认值
     * 重要性：确保未指定圆角默认为0
     */
    test('BorderRadius.only()应该正确处理默认值', () => {
      const borderRadius = BorderRadius.only({ topLeft: 8, bottomRight: 12 });
      
      expect(borderRadius.topLeft).toBe(8);
      expect(borderRadius.topRight).toBe(0);
      expect(borderRadius.bottomRight).toBe(12);
      expect(borderRadius.bottomLeft).toBe(0);
    });

    /**
     * 测试目的：验证BorderRadius.zero静态属性
     * 验证路径：BorderRadius.zero → 零圆角
     * 重要性：对齐Flutter BorderRadius.zero
     */
    test('BorderRadius.zero应该返回零圆角', () => {
      const zero = BorderRadius.zero;
      
      expect(zero.topLeft).toBe(0);
      expect(zero.topRight).toBe(0);
      expect(zero.bottomRight).toBe(0);
      expect(zero.bottomLeft).toBe(0);
      expect(zero.isZero).toBe(true);
    });

    /**
     * 测试目的：验证BorderRadius.symmetric()扩展方法
     * 验证路径：symmetric({horizontal, vertical}) → 对称BorderRadius
     * 重要性：提供便利的对称圆角设置
     */
    test('BorderRadius.symmetric()应该创建对称圆角', () => {
      const borderRadius = BorderRadius.symmetric({ 
        horizontal: 8, 
        vertical: 12 
      });
      
      expect(borderRadius.topLeft).toBe(12);   // vertical
      expect(borderRadius.topRight).toBe(8);   // horizontal
      expect(borderRadius.bottomRight).toBe(12); // vertical
      expect(borderRadius.bottomLeft).toBe(8);  // horizontal
    });

    /**
     * 测试目的：验证symmetric()的默认值处理
     * 验证路径：symmetric({partial}) → 正确的默认值
     * 重要性：确保未指定方向默认为0
     */
    test('BorderRadius.symmetric()应该正确处理默认值', () => {
      const horizontalOnly = BorderRadius.symmetric({ horizontal: 6 });
      expect(horizontalOnly.topLeft).toBe(0);
      expect(horizontalOnly.topRight).toBe(6);
      expect(horizontalOnly.bottomRight).toBe(0);
      expect(horizontalOnly.bottomLeft).toBe(6);

      const verticalOnly = BorderRadius.symmetric({ vertical: 10 });
      expect(verticalOnly.topLeft).toBe(10);
      expect(verticalOnly.topRight).toBe(0);
      expect(verticalOnly.bottomRight).toBe(10);
      expect(verticalOnly.bottomLeft).toBe(0);
    });
  });

  describe('工具方法', () => {
    /**
     * 测试目的：验证toFlutterMap()转换方法
     * 验证路径：BorderRadius → Flutter兼容对象
     * 重要性：确保能正确传递给Flutter端
     */
    test('toFlutterMap()应该返回Flutter兼容的对象', () => {
      const borderRadius = BorderRadius.only({
        topLeft: 1,
        topRight: 2,
        bottomRight: 3,
        bottomLeft: 4
      });
      const flutterMap = borderRadius.toFlutterMap();
      
      expect(flutterMap).toEqual({
        topLeft: 1,
        topRight: 2,
        bottomRight: 3,
        bottomLeft: 4
      });
    });

    /**
     * 测试目的：验证toString()方法
     * 验证路径：BorderRadius → 字符串表示
     * 重要性：方便调试和日志输出
     */
    test('toString()应该返回正确的字符串表示', () => {
      const circular = BorderRadius.circular(8);
      expect(circular.toString()).toBe('BorderRadius.circular(8)');

      const complex = BorderRadius.only({ topLeft: 1, topRight: 2, bottomRight: 3, bottomLeft: 4 });
      expect(complex.toString()).toBe('BorderRadius.only(topLeft: 1, topRight: 2, bottomRight: 3, bottomLeft: 4)');
    });

    /**
     * 测试目的：验证equals()相等性比较
     * 验证路径：BorderRadius对比 → 正确的相等性判断
     * 重要性：支持值比较而非引用比较
     */
    test('equals()应该正确比较BorderRadius相等性', () => {
      const borderRadius1 = BorderRadius.circular(8);
      const borderRadius2 = BorderRadius.circular(8);
      const borderRadius3 = BorderRadius.circular(12);
      
      expect(borderRadius1.equals(borderRadius2)).toBe(true);
      expect(borderRadius1.equals(borderRadius3)).toBe(false);
    });
  });

  describe('属性检查', () => {
    /**
     * 测试目的：验证isZero属性
     * 验证路径：BorderRadius → 正确的零值判断
     * 重要性：快速检查是否为零圆角
     */
    test('isZero属性应该正确检查零圆角', () => {
      const zero = BorderRadius.zero;
      const nonZero = BorderRadius.circular(8);
      const partialZero = BorderRadius.only({ topLeft: 8 });
      
      expect(zero.isZero).toBe(true);
      expect(nonZero.isZero).toBe(false);
      expect(partialZero.isZero).toBe(false);
    });

    /**
     * 测试目的：验证isUniform属性
     * 验证路径：BorderRadius → 正确的统一性判断
     * 重要性：检查是否为统一圆角
     */
    test('isUniform属性应该正确检查统一圆角', () => {
      const uniform = BorderRadius.circular(8);
      const nonUniform = BorderRadius.only({ topLeft: 8, topRight: 12 });
      const zero = BorderRadius.zero;
      
      expect(uniform.isUniform).toBe(true);
      expect(nonUniform.isUniform).toBe(false);
      expect(zero.isUniform).toBe(true); // 零也是统一的
    });

    /**
     * 测试目的：验证uniformRadius属性
     * 验证路径：BorderRadius → 统一圆角值或null
     * 重要性：获取统一圆角的数值
     */
    test('uniformRadius属性应该返回正确的统一圆角值', () => {
      const uniform = BorderRadius.circular(8);
      const nonUniform = BorderRadius.only({ topLeft: 8, topRight: 12 });
      const zero = BorderRadius.zero;
      
      expect(uniform.uniformRadius).toBe(8);
      expect(nonUniform.uniformRadius).toBeNull();
      expect(zero.uniformRadius).toBe(0);
    });
  });

  describe('边界情况', () => {
    /**
     * 测试目的：验证负值的处理
     * 验证路径：负值参数 → BorderRadius（允许负值）
     * 重要性：确保负圆角的支持（虽然不常用）
     */
    test('应该支持负值圆角', () => {
      const negative = BorderRadius.circular(-4);
      
      expect(negative.topLeft).toBe(-4);
      expect(negative.isUniform).toBe(true);
      expect(negative.uniformRadius).toBe(-4);
    });

    /**
     * 测试目的：验证大数值的处理
     * 验证路径：大数值 → 正确存储和计算
     * 重要性：确保数值范围的支持
     */
    test('应该支持大数值', () => {
      const large = BorderRadius.circular(999999);
      
      expect(large.topLeft).toBe(999999);
      expect(large.isUniform).toBe(true);
      expect(large.uniformRadius).toBe(999999);
    });

    /**
     * 测试目的：验证小数的处理
     * 验证路径：小数值 → 正确存储
     * 重要性：支持精确的圆角设置
     */
    test('应该支持小数值', () => {
      const decimal = BorderRadius.circular(8.5);
      
      expect(decimal.topLeft).toBe(8.5);
      expect(decimal.isUniform).toBe(true);
      expect(decimal.uniformRadius).toBe(8.5);
    });
  });
});
