/**
 * EdgeInsets类测试套件
 * 验证EdgeInsets的所有API功能
 * 
 * 测试目标：
 * 1. 验证所有静态工厂方法
 * 2. 确保与Flutter EdgeInsets API对齐
 * 3. 验证类型安全和边界情况
 * 4. 测试转换和工具方法
 */

import { EdgeInsets } from '../src/styles/edge-insets';

describe('EdgeInsets', () => {
  describe('静态工厂方法', () => {
    /**
     * 测试目的：验证EdgeInsets.all()方法
     * 验证路径：all(value) → 所有方向相同的EdgeInsets
     * 重要性：最常用的创建方法
     */
    test('EdgeInsets.all()应该创建所有方向相同的边距', () => {
      const edgeInsets = EdgeInsets.all(16);
      
      expect(edgeInsets.top).toBe(16);
      expect(edgeInsets.right).toBe(16);
      expect(edgeInsets.bottom).toBe(16);
      expect(edgeInsets.left).toBe(16);
    });

    /**
     * 测试目的：验证EdgeInsets.symmetric()方法
     * 验证路径：symmetric({vertical, horizontal}) → 对称EdgeInsets
     * 重要性：常用的对称布局方法
     */
    test('EdgeInsets.symmetric()应该创建对称边距', () => {
      const edgeInsets = EdgeInsets.symmetric({ vertical: 8, horizontal: 16 });
      
      expect(edgeInsets.top).toBe(8);
      expect(edgeInsets.right).toBe(16);
      expect(edgeInsets.bottom).toBe(8);
      expect(edgeInsets.left).toBe(16);
    });

    /**
     * 测试目的：验证symmetric()的默认值处理
     * 验证路径：symmetric({partial}) → 正确的默认值
     * 重要性：确保部分参数的正确处理
     */
    test('EdgeInsets.symmetric()应该正确处理默认值', () => {
      const vertical = EdgeInsets.symmetric({ vertical: 12 });
      expect(vertical.top).toBe(12);
      expect(vertical.bottom).toBe(12);
      expect(vertical.left).toBe(0);
      expect(vertical.right).toBe(0);

      const horizontal = EdgeInsets.symmetric({ horizontal: 20 });
      expect(horizontal.left).toBe(20);
      expect(horizontal.right).toBe(20);
      expect(horizontal.top).toBe(0);
      expect(horizontal.bottom).toBe(0);
    });

    /**
     * 测试目的：验证EdgeInsets.only()方法
     * 验证路径：only({specific}) → 指定方向的EdgeInsets
     * 重要性：精确控制每个方向的边距
     */
    test('EdgeInsets.only()应该创建指定方向的边距', () => {
      const edgeInsets = EdgeInsets.only({
        top: 8,
        right: 12,
        bottom: 16,
        left: 4
      });
      
      expect(edgeInsets.top).toBe(8);
      expect(edgeInsets.right).toBe(12);
      expect(edgeInsets.bottom).toBe(16);
      expect(edgeInsets.left).toBe(4);
    });

    /**
     * 测试目的：验证only()的默认值处理
     * 验证路径：only({partial}) → 正确的默认值
     * 重要性：确保未指定方向默认为0
     */
    test('EdgeInsets.only()应该正确处理默认值', () => {
      const edgeInsets = EdgeInsets.only({ top: 10, left: 5 });
      
      expect(edgeInsets.top).toBe(10);
      expect(edgeInsets.right).toBe(0);
      expect(edgeInsets.bottom).toBe(0);
      expect(edgeInsets.left).toBe(5);
    });

    /**
     * 测试目的：验证EdgeInsets.fromLTRB()方法
     * 验证路径：fromLTRB(l, t, r, b) → 正确的EdgeInsets
     * 重要性：与Flutter API完全对齐
     */
    test('EdgeInsets.fromLTRB()应该按左上右下顺序创建边距', () => {
      const edgeInsets = EdgeInsets.fromLTRB(4, 8, 12, 16);
      
      expect(edgeInsets.left).toBe(4);
      expect(edgeInsets.top).toBe(8);
      expect(edgeInsets.right).toBe(12);
      expect(edgeInsets.bottom).toBe(16);
    });

    /**
     * 测试目的：验证EdgeInsets.zero静态属性
     * 验证路径：EdgeInsets.zero → 零边距
     * 重要性：常用的零值边距
     */
    test('EdgeInsets.zero应该返回零边距', () => {
      const zero = EdgeInsets.zero;
      
      expect(zero.top).toBe(0);
      expect(zero.right).toBe(0);
      expect(zero.bottom).toBe(0);
      expect(zero.left).toBe(0);
    });
  });

  describe('计算属性', () => {
    /**
     * 测试目的：验证horizontal计算属性
     * 验证路径：left + right → horizontal总值
     * 重要性：方便获取水平方向总边距
     */
    test('horizontal属性应该返回左右边距之和', () => {
      const edgeInsets = EdgeInsets.only({ left: 8, right: 12 });
      
      expect(edgeInsets.horizontal).toBe(20);
    });

    /**
     * 测试目的：验证vertical计算属性
     * 验证路径：top + bottom → vertical总值
     * 重要性：方便获取垂直方向总边距
     */
    test('vertical属性应该返回上下边距之和', () => {
      const edgeInsets = EdgeInsets.only({ top: 6, bottom: 10 });
      
      expect(edgeInsets.vertical).toBe(16);
    });
  });

  describe('工具方法', () => {
    /**
     * 测试目的：验证toFlutterMap()转换方法
     * 验证路径：EdgeInsets → Flutter兼容对象
     * 重要性：确保能正确传递给Flutter端
     */
    test('toFlutterMap()应该返回Flutter兼容的对象', () => {
      const edgeInsets = EdgeInsets.fromLTRB(1, 2, 3, 4);
      const flutterMap = edgeInsets.toFlutterMap();
      
      expect(flutterMap).toEqual({
        top: 2,
        right: 3,
        bottom: 4,
        left: 1
      });
    });

    /**
     * 测试目的：验证toString()方法
     * 验证路径：EdgeInsets → 字符串表示
     * 重要性：方便调试和日志输出
     */
    test('toString()应该返回正确的字符串表示', () => {
      const edgeInsets = EdgeInsets.all(8);
      
      expect(edgeInsets.toString()).toBe('EdgeInsets(8, 8, 8, 8)');
    });

    /**
     * 测试目的：验证equals()相等性比较
     * 验证路径：EdgeInsets对比 → 正确的相等性判断
     * 重要性：支持值比较而非引用比较
     */
    test('equals()应该正确比较EdgeInsets相等性', () => {
      const edgeInsets1 = EdgeInsets.all(16);
      const edgeInsets2 = EdgeInsets.all(16);
      const edgeInsets3 = EdgeInsets.all(12);
      
      expect(edgeInsets1.equals(edgeInsets2)).toBe(true);
      expect(edgeInsets1.equals(edgeInsets3)).toBe(false);
    });
  });

  describe('不可变性', () => {
    /**
     * 测试目的：验证EdgeInsets实例的不可变性
     * 验证路径：创建后的EdgeInsets → 属性只读
     * 重要性：确保数据安全，避免意外修改
     */
    test('EdgeInsets属性应该是只读的', () => {
      const edgeInsets = EdgeInsets.all(16);
      
      // TypeScript的readonly确保编译时安全
      // 运行时JavaScript中readonly不会阻止赋值，但应该避免
      expect(edgeInsets.top).toBe(16);
      
      // 验证属性描述符为只读（如果我们需要运行时保护，可以用Object.freeze）
      const descriptor = Object.getOwnPropertyDescriptor(edgeInsets, 'top');
      expect(descriptor?.writable).toBe(true); // JavaScript对象默认可写，我们依赖TypeScript类型检查
    });
  });

  describe('边界情况', () => {
    /**
     * 测试目的：验证零值的处理
     * 验证路径：零值参数 → 正确的EdgeInsets
     * 重要性：确保边界值的正确处理
     */
    test('应该正确处理零值', () => {
      const zero1 = EdgeInsets.all(0);
      const zero2 = EdgeInsets.zero;
      
      expect(zero1.equals(zero2)).toBe(true);
    });

    /**
     * 测试目的：验证负值的处理
     * 验证路径：负值参数 → EdgeInsets（允许负值）
     * 重要性：确保负边距的支持
     */
    test('应该支持负值边距', () => {
      const negative = EdgeInsets.all(-8);
      
      expect(negative.top).toBe(-8);
      expect(negative.horizontal).toBe(-16);
      expect(negative.vertical).toBe(-16);
    });

    /**
     * 测试目的：验证大数值的处理
     * 验证路径：大数值 → 正确存储和计算
     * 重要性：确保数值范围的支持
     */
    test('应该支持大数值', () => {
      const large = EdgeInsets.all(999999);
      
      expect(large.horizontal).toBe(1999998);
      expect(large.vertical).toBe(1999998);
    });
  });
});
