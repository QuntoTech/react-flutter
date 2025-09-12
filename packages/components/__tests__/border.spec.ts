/**
 * Border和BorderSide类测试套件
 * 验证Border和BorderSide类与Flutter API的完全对齐
 * 
 * 测试目标：
 * 1. 验证BorderSide类的所有方法和属性
 * 2. 验证Border类的静态工厂方法
 * 3. 确保与Flutter Border API完全一致
 * 4. 测试边框样式的各种组合
 */

import { Border, BorderSide } from '../src/styles/border';
import { Color } from '../src/styles/color';

describe('BorderSide', () => {
  describe('构造函数', () => {
    /**
     * 测试目的：验证BorderSide构造函数
     * 验证路径：参数 → BorderSide实例
     * 重要性：对齐Flutter BorderSide构造函数
     */
    test('应该创建BorderSide实例', () => {
      const borderSide = new BorderSide(Color.blue, 2.0, 'solid');
      
      expect(borderSide.color.equals(Color.blue)).toBe(true);
      expect(borderSide.width).toBe(2.0);
      expect(borderSide.style).toBe('solid');
    });

    /**
     * 测试目的：验证默认参数
     * 验证路径：无参数构造 → 默认值
     * 重要性：确保默认值与Flutter一致
     */
    test('应该使用正确的默认值', () => {
      const borderSide = new BorderSide();
      
      expect(borderSide.color.equals(Color.black)).toBe(true);
      expect(borderSide.width).toBe(1.0);
      expect(borderSide.style).toBe('solid');
    });
  });

  describe('静态方法', () => {
    /**
     * 测试目的：验证BorderSide.none
     * 验证路径：BorderSide.none → 无边框
     * 重要性：对齐Flutter BorderSide.none
     */
    test('BorderSide.none应该创建无边框', () => {
      const none = BorderSide.none;
      
      expect(none.color.equals(Color.transparent)).toBe(true);
      expect(none.width).toBe(0.0);
      expect(none.style).toBe('none');
      expect(none.isNone).toBe(true);
    });
  });

  describe('工具方法', () => {
    /**
     * 测试目的：验证toFlutterMap()转换
     * 验证路径：BorderSide → Flutter兼容对象
     * 重要性：确保能正确传递给Flutter端
     */
    test('toFlutterMap()应该返回正确的Flutter格式', () => {
      const borderSide = new BorderSide(Color.red, 3.0, 'solid');
      const flutterMap = borderSide.toFlutterMap();
      
      expect(flutterMap).toEqual({
        color: { value: 0xFFF44336 }, // Color.red的value
        width: 3.0,
        style: 'solid'
      });
    });

    /**
     * 测试目的：验证toString()方法
     * 验证路径：BorderSide → 字符串表示
     * 重要性：方便调试和日志输出
     */
    test('toString()应该返回正确的字符串表示', () => {
      const borderSide = new BorderSide(Color.blue, 2.0, 'solid');
      const noBorder = BorderSide.none;
      
      expect(borderSide.toString()).toContain('BorderSide');
      expect(noBorder.toString()).toBe('BorderSide.none');
    });

    /**
     * 测试目的：验证equals()相等性比较
     * 验证路径：BorderSide对比 → 正确的相等性判断
     * 重要性：支持值比较而非引用比较
     */
    test('equals()应该正确比较BorderSide相等性', () => {
      const side1 = new BorderSide(Color.blue, 2.0, 'solid');
      const side2 = new BorderSide(Color.blue, 2.0, 'solid');
      const side3 = new BorderSide(Color.red, 2.0, 'solid');
      
      expect(side1.equals(side2)).toBe(true);
      expect(side1.equals(side3)).toBe(false);
    });

    /**
     * 测试目的：验证copyWith()方法
     * 验证路径：原BorderSide + 部分修改 → 新BorderSide
     * 重要性：支持不可变对象的部分修改
     */
    test('copyWith()应该创建修改后的新实例', () => {
      const original = new BorderSide(Color.blue, 2.0, 'solid');
      const modified = original.copyWith({ color: Color.red, width: 3.0 });
      
      expect(modified.color.equals(Color.red)).toBe(true);
      expect(modified.width).toBe(3.0);
      expect(modified.style).toBe('solid'); // 保持原值
      
      // 原对象不变
      expect(original.color.equals(Color.blue)).toBe(true);
      expect(original.width).toBe(2.0);
    });
  });

  describe('属性检查', () => {
    /**
     * 测试目的：验证isNone属性
     * 验证路径：BorderSide → 正确的无边框判断
     * 重要性：快速检查是否为无边框
     */
    test('isNone属性应该正确检查无边框', () => {
      const none1 = BorderSide.none;
      const none2 = new BorderSide(Color.blue, 0, 'solid'); // 宽度为0
      const normal = new BorderSide(Color.blue, 2.0, 'solid');
      
      expect(none1.isNone).toBe(true);
      expect(none2.isNone).toBe(true);
      expect(normal.isNone).toBe(false);
    });
  });
});

describe('Border', () => {
  describe('静态工厂方法', () => {
    /**
     * 测试目的：验证Border.all()方法
     * 验证路径：统一参数 → 四边相同的Border
     * 重要性：对齐Flutter Border.all()
     */
    test('Border.all()应该创建四边相同的边框', () => {
      const border = Border.all({ color: Color.red, width: 2.0, style: 'solid' });
      
      expect(border.top.color.equals(Color.red)).toBe(true);
      expect(border.right.color.equals(Color.red)).toBe(true);
      expect(border.bottom.color.equals(Color.red)).toBe(true);
      expect(border.left.color.equals(Color.red)).toBe(true);
      
      expect(border.top.width).toBe(2.0);
      expect(border.right.width).toBe(2.0);
      expect(border.bottom.width).toBe(2.0);
      expect(border.left.width).toBe(2.0);
      
      expect(border.isUniform).toBe(true);
    });

    /**
     * 测试目的：验证Border.all()默认值
     * 验证路径：无参数 → 默认边框
     * 重要性：确保默认值正确
     */
    test('Border.all()应该使用正确的默认值', () => {
      const border = Border.all();
      
      expect(border.top.color.equals(Color.black)).toBe(true);
      expect(border.top.width).toBe(1.0);
      expect(border.top.style).toBe('solid');
      expect(border.isUniform).toBe(true);
    });

    /**
     * 测试目的：验证Border.symmetric()方法
     * 验证路径：对称参数 → 对称Border
     * 重要性：对齐Flutter Border.symmetric()
     */
    test('Border.symmetric()应该创建对称边框', () => {
      const verticalSide = new BorderSide(Color.red, 2.0, 'solid');
      const horizontalSide = new BorderSide(Color.blue, 1.0, 'solid');
      
      const border = Border.symmetric({
        vertical: verticalSide,
        horizontal: horizontalSide
      });
      
      expect(border.top.equals(verticalSide)).toBe(true);
      expect(border.bottom.equals(verticalSide)).toBe(true);
      expect(border.left.equals(horizontalSide)).toBe(true);
      expect(border.right.equals(horizontalSide)).toBe(true);
      expect(border.isSymmetric).toBe(true);
    });

    /**
     * 测试目的：验证Border.only()方法
     * 验证路径：指定边 → 只有指定边的Border
     * 重要性：对齐Flutter Border() constructor
     */
    test('Border.only()应该创建指定边的边框', () => {
      const topSide = new BorderSide(Color.red, 2.0, 'solid');
      const rightSide = new BorderSide(Color.blue, 1.0, 'solid');
      
      const border = Border.only({
        top: topSide,
        right: rightSide
      });
      
      expect(border.top.equals(topSide)).toBe(true);
      expect(border.right.equals(rightSide)).toBe(true);
      expect(border.bottom.isNone).toBe(true);
      expect(border.left.isNone).toBe(true);
    });

    /**
     * 测试目的：验证Border.fromBorderSide()方法
     * 验证路径：单个BorderSide → 四边相同的Border
     * 重要性：对齐Flutter Border.fromBorderSide()
     */
    test('Border.fromBorderSide()应该创建四边相同的边框', () => {
      const side = new BorderSide(Color.green, 3.0, 'solid');
      const border = Border.fromBorderSide(side);
      
      expect(border.top.equals(side)).toBe(true);
      expect(border.right.equals(side)).toBe(true);
      expect(border.bottom.equals(side)).toBe(true);
      expect(border.left.equals(side)).toBe(true);
      expect(border.isUniform).toBe(true);
    });
  });

  describe('工具方法', () => {
    /**
     * 测试目的：验证toFlutterMap()转换
     * 验证路径：Border → Flutter兼容对象
     * 重要性：确保能正确传递给Flutter端
     */
    test('toFlutterMap()应该返回Flutter兼容的对象', () => {
      const border = Border.all({ color: Color.blue, width: 2.0 });
      const flutterMap = border.toFlutterMap();
      
      expect(flutterMap).toEqual({
        top: { color: { value: 0xFF2196F3 }, width: 2.0, style: 'solid' },
        right: { color: { value: 0xFF2196F3 }, width: 2.0, style: 'solid' },
        bottom: { color: { value: 0xFF2196F3 }, width: 2.0, style: 'solid' },
        left: { color: { value: 0xFF2196F3 }, width: 2.0, style: 'solid' }
      });
    });

    /**
     * 测试目的：验证toString()方法
     * 验证路径：Border → 字符串表示
     * 重要性：方便调试和日志输出
     */
    test('toString()应该返回正确的字符串表示', () => {
      const uniformBorder = Border.all({ color: Color.red });
      const symmetricBorder = Border.symmetric({
        vertical: new BorderSide(Color.red),
        horizontal: new BorderSide(Color.blue)
      });
      
      expect(uniformBorder.toString()).toContain('Border.all');
      expect(symmetricBorder.toString()).toContain('Border.symmetric');
    });

    /**
     * 测试目的：验证equals()相等性比较
     * 验证路径：Border对比 → 正确的相等性判断
     * 重要性：支持值比较而非引用比较
     */
    test('equals()应该正确比较Border相等性', () => {
      const border1 = Border.all({ color: Color.red, width: 2.0 });
      const border2 = Border.all({ color: Color.red, width: 2.0 });
      const border3 = Border.all({ color: Color.blue, width: 2.0 });
      
      expect(border1.equals(border2)).toBe(true);
      expect(border1.equals(border3)).toBe(false);
    });
  });

  describe('属性检查', () => {
    /**
     * 测试目的：验证isUniform属性
     * 验证路径：Border → 正确的统一性判断
     * 重要性：检查是否为四边相同边框
     */
    test('isUniform属性应该正确检查统一边框', () => {
      const uniform = Border.all({ color: Color.red });
      const nonUniform = Border.only({ top: new BorderSide(Color.red), bottom: new BorderSide(Color.blue) });
      
      expect(uniform.isUniform).toBe(true);
      expect(nonUniform.isUniform).toBe(false);
    });

    /**
     * 测试目的：验证isSymmetric属性
     * 验证路径：Border → 正确的对称性判断
     * 重要性：检查是否为对称边框
     */
    test('isSymmetric属性应该正确检查对称边框', () => {
      const symmetric = Border.symmetric({
        vertical: new BorderSide(Color.red),
        horizontal: new BorderSide(Color.blue)
      });
      const asymmetric = Border.only({ 
        top: new BorderSide(Color.red), 
        right: new BorderSide(Color.blue),
        bottom: new BorderSide(Color.green)
      });
      
      expect(symmetric.isSymmetric).toBe(true);
      expect(asymmetric.isSymmetric).toBe(false);
    });

    /**
     * 测试目的：验证isNone属性
     * 验证路径：Border → 正确的无边框判断
     * 重要性：检查是否为无边框
     */
    test('isNone属性应该正确检查无边框', () => {
      const none = new Border(); // 默认都是BorderSide.none
      const hasBorder = Border.all({ color: Color.red });
      
      expect(none.isNone).toBe(true);
      expect(hasBorder.isNone).toBe(false);
    });

    /**
     * 测试目的：验证uniformSide属性
     * 验证路径：Border → 统一边框的BorderSide或null
     * 重要性：获取统一边框的样式
     */
    test('uniformSide属性应该返回正确的统一边框样式', () => {
      const uniform = Border.all({ color: Color.red, width: 2.0 });
      const nonUniform = Border.only({ top: new BorderSide(Color.red) });
      
      expect(uniform.uniformSide?.color.equals(Color.red)).toBe(true);
      expect(uniform.uniformSide?.width).toBe(2.0);
      expect(nonUniform.uniformSide).toBeNull();
    });
  });

  describe('复杂场景', () => {
    /**
     * 测试目的：验证复杂边框组合
     * 验证路径：多种BorderSide组合 → 正确的Border
     * 重要性：确保复杂场景的正确处理
     */
    test('应该支持复杂的边框组合', () => {
      const border = Border.only({
        top: new BorderSide(Color.red, 3.0, 'solid'),
        right: new BorderSide(Color.blue, 2.0, 'solid'),
        bottom: new BorderSide(Color.green, 1.0, 'solid'),
        left: BorderSide.none
      });
      
      expect(border.top.color.equals(Color.red)).toBe(true);
      expect(border.top.width).toBe(3.0);
      expect(border.right.color.equals(Color.blue)).toBe(true);
      expect(border.right.width).toBe(2.0);
      expect(border.bottom.color.equals(Color.green)).toBe(true);
      expect(border.bottom.width).toBe(1.0);
      expect(border.left.isNone).toBe(true);
      
      expect(border.isUniform).toBe(false);
      expect(border.isSymmetric).toBe(false);
      expect(border.isNone).toBe(false);
    });
  });
});
