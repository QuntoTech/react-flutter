/**
 * Color类测试套件
 * 验证Color类与Flutter Color API的完全对齐
 * 
 * 测试目标：
 * 1. 验证Color构造函数和静态工厂方法
 * 2. 确保与Flutter Color API完全一致
 * 3. 验证颜色分量的正确解析
 * 4. 测试Colors预定义颜色常量
 */

import { Color } from '../src/styles/color';

describe('Color', () => {
  describe('构造函数', () => {
    /**
     * 测试目的：验证Color(value)构造函数
     * 验证路径：ARGB值 → Color实例
     * 重要性：对齐Flutter Color(0xFF2196F3)语法
     */
    test('应该从ARGB值创建颜色', () => {
      const color = new Color(0xFF2196F3);
      
      expect(color.value).toBe(0xFF2196F3);
      expect(color.alpha).toBe(255);
      expect(color.red).toBe(33);
      expect(color.green).toBe(150);
      expect(color.blue).toBe(243);
    });

    /**
     * 测试目的：验证透明度处理
     * 验证路径：带透明度的ARGB值 → 正确的分量
     * 重要性：确保透明度正确处理
     */
    test('应该正确处理透明度', () => {
      const color = new Color(0x802196F3); // 50%透明度
      
      expect(color.alpha).toBe(128);
      expect(color.opacity).toBeCloseTo(0.502, 2);
      expect(color.red).toBe(33);
      expect(color.green).toBe(150);
      expect(color.blue).toBe(243);
    });
  });

  describe('静态工厂方法', () => {
    /**
     * 测试目的：验证Color.fromARGB()方法
     * 验证路径：ARGB分量 → Color实例
     * 重要性：对齐Flutter Color.fromARGB()
     */
    test('Color.fromARGB()应该正确创建颜色', () => {
      const color = Color.fromARGB(255, 33, 150, 243);
      
      expect(color.alpha).toBe(255);
      expect(color.red).toBe(33);
      expect(color.green).toBe(150);
      expect(color.blue).toBe(243);
      expect(color.value).toBe(0xFF2196F3);
    });

    /**
     * 测试目的：验证Color.fromRGBO()方法
     * 验证路径：RGBO分量 → Color实例
     * 重要性：对齐Flutter Color.fromRGBO()
     */
    test('Color.fromRGBO()应该正确创建颜色', () => {
      const color = Color.fromRGBO(33, 150, 243, 1.0);
      
      expect(color.red).toBe(33);
      expect(color.green).toBe(150);
      expect(color.blue).toBe(243);
      expect(color.opacity).toBe(1.0);
      expect(color.alpha).toBe(255);
    });

    /**
     * 测试目的：验证fromRGBO()的透明度处理
     * 验证路径：opacity参数 → alpha分量
     * 重要性：确保opacity到alpha的正确转换
     */
    test('Color.fromRGBO()应该正确处理透明度', () => {
      const color = Color.fromRGBO(255, 0, 0, 0.5);
      
      expect(color.red).toBe(255);
      expect(color.green).toBe(0);
      expect(color.blue).toBe(0);
      expect(color.alpha).toBe(128); // 0.5 * 255 ≈ 128
      expect(color.opacity).toBeCloseTo(0.502, 2);
    });

    /**
     * 测试目的：验证边界值处理
     * 验证路径：边界值 → 正确的分量
     * 重要性：确保边界情况的正确处理
     */
    test('应该正确处理边界值', () => {
      const blackColor = Color.fromARGB(0, 0, 0, 0);
      expect(blackColor.value).toBe(0x00000000);
      
      const whiteColor = Color.fromARGB(255, 255, 255, 255);
      expect(whiteColor.value).toBe(0xFFFFFFFF);
    });
  });

  describe('颜色操作方法', () => {
    /**
     * 测试目的：验证withOpacity()方法
     * 验证路径：原色 + opacity → 新的透明颜色
     * 重要性：对齐Flutter color.withOpacity()
     */
    test('withOpacity()应该创建具有新透明度的颜色', () => {
      const originalColor = Color.fromRGBO(255, 0, 0, 1.0);
      const transparentColor = originalColor.withOpacity(0.5);
      
      expect(transparentColor.red).toBe(255);
      expect(transparentColor.green).toBe(0);
      expect(transparentColor.blue).toBe(0);
      expect(transparentColor.opacity).toBeCloseTo(0.5, 2);
      expect(transparentColor.alpha).toBe(128);
      
      // 原色不应该被修改
      expect(originalColor.opacity).toBe(1.0);
    });

    /**
     * 测试目的：验证withAlpha()方法
     * 验证路径：原色 + alpha → 新的透明颜色
     * 重要性：对齐Flutter color.withAlpha()
     */
    test('withAlpha()应该创建具有新alpha的颜色', () => {
      const originalColor = Color.fromARGB(255, 0, 255, 0);
      const alphaColor = originalColor.withAlpha(128);
      
      expect(alphaColor.red).toBe(0);
      expect(alphaColor.green).toBe(255);
      expect(alphaColor.blue).toBe(0);
      expect(alphaColor.alpha).toBe(128);
      
      // 原色不应该被修改
      expect(originalColor.alpha).toBe(255);
    });
  });

  describe('工具方法', () => {
    /**
     * 测试目的：验证toFlutterMap()转换方法
     * 验证路径：Color → Flutter兼容对象
     * 重要性：确保能正确传递给Flutter端
     */
    test('toFlutterMap()应该返回Flutter兼容的对象', () => {
      const color = new Color(0xFF2196F3);
      const flutterMap = color.toFlutterMap();
      
      expect(flutterMap).toEqual({
        value: 0xFF2196F3
      });
    });

    /**
     * 测试目的：验证toString()方法
     * 验证路径：Color → 字符串表示
     * 重要性：方便调试和日志输出
     */
    test('toString()应该返回正确的字符串表示', () => {
      const color = new Color(0xFF2196F3);
      
      expect(color.toString()).toBe('Color(0xFF2196F3)');
    });

    /**
     * 测试目的：验证equals()相等性比较
     * 验证路径：Color对比 → 正确的相等性判断
     * 重要性：支持值比较而非引用比较
     */
    test('equals()应该正确比较Color相等性', () => {
      const color1 = new Color(0xFF2196F3);
      const color2 = new Color(0xFF2196F3);
      const color3 = new Color(0xFF4CAF50);
      
      expect(color1.equals(color2)).toBe(true);
      expect(color1.equals(color3)).toBe(false);
    });
  });

  describe('预定义颜色', () => {
    /**
     * 测试目的：验证透明色
     * 验证路径：Color.transparent → 正确的透明颜色
     * 重要性：对齐Flutter Colors.transparent
     */
    test('Color.transparent应该是完全透明的', () => {
      const transparent = Color.transparent;
      
      expect(transparent.value).toBe(0x00000000);
      expect(transparent.alpha).toBe(0);
      expect(transparent.opacity).toBe(0);
    });

    /**
     * 测试目的：验证黑白色系列
     * 验证路径：Color.black/white系列 → 正确的颜色值
     * 重要性：对齐Flutter的黑白色常量
     */
    test('Color.black和Color.white应该是正确的值', () => {
      expect(Color.black.value).toBe(0xFF000000);
      expect(Color.white.value).toBe(0xFFFFFFFF);
      
      // 测试不同透明度的黑色
      expect(Color.black87.alpha).toBe(221); // 0xDD
      expect(Color.black54.alpha).toBe(138); // 0x8A
      expect(Color.black12.alpha).toBe(31);  // 0x1F
      
      // 测试不同透明度的白色
      expect(Color.white70.alpha).toBe(179); // 0xB3
      expect(Color.white38.alpha).toBe(98);  // 0x62
      expect(Color.white10.alpha).toBe(26);  // 0x1A
    });

    /**
     * 测试目的：验证主要Material颜色
     * 验证路径：Color.主色 → 正确的Material Design颜色值
     * 重要性：对齐Flutter的Material颜色常量
     */
    test('应该提供正确的Material Design主色', () => {
      expect(Color.red.value).toBe(0xFFF44336);
      expect(Color.blue.value).toBe(0xFF2196F3);
      expect(Color.green.value).toBe(0xFF4CAF50);
      expect(Color.purple.value).toBe(0xFF9C27B0);
      expect(Color.orange.value).toBe(0xFFFF9800);
    });

    /**
     * 测试目的：验证扩展Material颜色
     * 验证路径：Color.扩展色 → 正确的颜色值
     * 重要性：确保完整的Material色板支持
     */
    test('应该提供完整的Material颜色系列', () => {
      expect(Color.deepPurple.value).toBe(0xFF673AB7);
      expect(Color.lightBlue.value).toBe(0xFF03A9F4);
      expect(Color.lightGreen.value).toBe(0xFF8BC34A);
      expect(Color.deepOrange.value).toBe(0xFFFF5722);
      expect(Color.blueGrey.value).toBe(0xFF607D8B);
    });

    /**
     * 测试目的：验证预定义颜色的不可变性
     * 验证路径：Color常量 → 每次访问返回相同值
     * 重要性：确保常量的一致性
     */
    test('预定义颜色应该返回一致的值', () => {
      const blue1 = Color.blue;
      const blue2 = Color.blue;
      
      expect(blue1.equals(blue2)).toBe(true);
      expect(blue1.value).toBe(blue2.value);
    });
  });
});
