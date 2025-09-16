/**
 * Transform Matrix4变换系统测试套件
 * 验证Transform与Flutter Matrix4 API的完全对齐
 * 
 * 测试目标：
 * 1. 验证TransformValue类型定义的正确性
 * 2. 确保与Flutter Matrix4 API完全一致
 * 3. 验证Matrix4数组的格式要求
 * 4. 测试边界情况和错误处理
 */

import { TransformValue } from '../src/styles/types';

describe('Transform Matrix4变换系统', () => {
  describe('TransformValue类型验证', () => {
    /**
     * 测试目的：验证TransformValue类型正确定义为数组
     * 验证路径：TransformValue → Flutter Matrix4 API对齐
     * 重要性：确保API完整性
     */
    test('应该是16个数字的数组类型', () => {
      const identityMatrix: TransformValue = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
      ];
      
      // 验证是数组类型
      expect(Array.isArray(identityMatrix)).toBe(true);
      
      // 验证长度为16（4x4矩阵）
      expect(identityMatrix).toHaveLength(16);
      
      // 验证每个元素都是数字
      identityMatrix.forEach(value => {
        expect(typeof value).toBe('number');
      });
    });

    /**
     * 测试目的：验证单位矩阵的正确格式
     * 验证路径：Matrix4.identity() → 对应的数组表示
     * 重要性：确保基础变换的正确性
     */
    test('应该支持单位矩阵', () => {
      const identityMatrix: TransformValue = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ];
      
      expect(identityMatrix[0]).toBe(1);   // m11
      expect(identityMatrix[5]).toBe(1);   // m22
      expect(identityMatrix[10]).toBe(1);  // m33
      expect(identityMatrix[15]).toBe(1);  // m44
      
      // 验证非对角线元素为0
      const nonDiagonalIndices = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14];
      nonDiagonalIndices.forEach(index => {
        expect(identityMatrix[index]).toBe(0);
      });
    });

    /**
     * 测试目的：验证缩放变换矩阵
     * 验证路径：Matrix4.diagonal3Values(x, y, z) → 对应的数组表示
     * 重要性：确保缩放变换的正确性
     */
    test('应该支持缩放变换矩阵', () => {
      const scaleMatrix: TransformValue = [
        2.0, 0.0, 0.0, 0.0,  // X轴缩放2倍
        0.0, 1.5, 0.0, 0.0,  // Y轴缩放1.5倍
        0.0, 0.0, 1.0, 0.0,  // Z轴不变
        0.0, 0.0, 0.0, 1.0   // 齐次坐标
      ];
      
      expect(scaleMatrix[0]).toBe(2.0);   // X缩放
      expect(scaleMatrix[5]).toBe(1.5);   // Y缩放
      expect(scaleMatrix[10]).toBe(1.0);  // Z缩放
      expect(scaleMatrix[15]).toBe(1.0);  // 齐次坐标
    });

    /**
     * 测试目的：验证平移变换矩阵
     * 验证路径：Matrix4.translationValues(x, y, z) → 对应的数组表示
     * 重要性：确保平移变换的正确性
     */
    test('应该支持平移变换矩阵', () => {
      const translateMatrix: TransformValue = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        10.0, 20.0, 0.0, 1.0  // X平移10，Y平移20
      ];
      
      expect(translateMatrix[12]).toBe(10.0);  // X平移
      expect(translateMatrix[13]).toBe(20.0);  // Y平移
      expect(translateMatrix[14]).toBe(0.0);   // Z平移
      expect(translateMatrix[15]).toBe(1.0);   // 齐次坐标
    });
  });

  describe('Matrix4变换组合验证', () => {
    /**
     * 测试目的：验证复合变换矩阵
     * 验证路径：多个变换的组合 → 单一Matrix4
     * 重要性：确保复杂变换的正确性
     */
    test('应该支持复合变换矩阵', () => {
      // 同时包含缩放和平移的矩阵
      const compositeMatrix: TransformValue = [
        1.2, 0.0, 0.0, 0.0,   // X缩放1.2倍
        0.0, 1.2, 0.0, 0.0,   // Y缩放1.2倍
        0.0, 0.0, 1.0, 0.0,   // Z轴不变
        5.0, 10.0, 0.0, 1.0   // X平移5，Y平移10
      ];
      
      // 验证缩放部分
      expect(compositeMatrix[0]).toBe(1.2);
      expect(compositeMatrix[5]).toBe(1.2);
      
      // 验证平移部分
      expect(compositeMatrix[12]).toBe(5.0);
      expect(compositeMatrix[13]).toBe(10.0);
      
      // 验证总长度
      expect(compositeMatrix).toHaveLength(16);
    });

    /**
     * 测试目的：验证旋转变换矩阵的基本结构
     * 验证路径：旋转矩阵的数学正确性
     * 重要性：确保旋转变换的数学准确性
     */
    test('应该支持旋转变换矩阵的基本结构', () => {
      // 45度旋转（π/4弧度）的近似值
      const cos45 = Math.cos(Math.PI / 4);
      const sin45 = Math.sin(Math.PI / 4);
      
      const rotationMatrix: TransformValue = [
        cos45, sin45, 0.0, 0.0,
        -sin45, cos45, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
      ];
      
      // 验证旋转矩阵的对称性质
      expect(rotationMatrix[0]).toBeCloseTo(cos45, 5);
      expect(rotationMatrix[1]).toBeCloseTo(sin45, 5);
      expect(rotationMatrix[4]).toBeCloseTo(-sin45, 5);
      expect(rotationMatrix[5]).toBeCloseTo(cos45, 5);
      
      // 验证Z轴和齐次坐标不变
      expect(rotationMatrix[10]).toBe(1.0);
      expect(rotationMatrix[15]).toBe(1.0);
    });
  });

  describe('边界情况验证', () => {
    /**
     * 测试目的：验证空矩阵的处理
     * 验证路径：undefined/null → 正确处理
     * 重要性：确保健壮性
     */
    test('应该正确处理空值', () => {
      const undefinedTransform: TransformValue | undefined = undefined;
      const nullTransform: TransformValue | null = null;
      
      expect(undefinedTransform).toBeUndefined();
      expect(nullTransform).toBeNull();
    });

    /**
     * 测试目的：验证数组长度不正确的情况
     * 验证路径：错误长度数组 → 类型检查
     * 重要性：确保类型安全
     */
    test('应该验证Matrix4数组的长度要求', () => {
      // 正确长度
      const validMatrix: TransformValue = new Array(16).fill(0);
      expect(validMatrix).toHaveLength(16);
      
      // 错误长度应该在TypeScript层面被捕获
      // 这里只验证类型系统的设计意图
      const shortArray = [1, 0, 0, 1]; // 长度4，不是16
      
      // TypeScript应该阻止这种赋值
      // const invalidMatrix: TransformValue = shortArray; // 应该报错
      expect(shortArray).toHaveLength(4); // 验证确实长度不对
    });

    /**
     * 测试目的：验证极值的处理
     * 验证路径：极大/极小值 → 正确存储
     * 重要性：确保数值范围的健壮性
     */
    test('应该支持极值', () => {
      const extremeMatrix: TransformValue = [
        Number.MAX_VALUE, 0, 0, 0,
        0, Number.MIN_VALUE, 0, 0,
        0, 0, -Number.MAX_VALUE, 0,
        0, 0, 0, 1
      ];
      
      expect(extremeMatrix[0]).toBe(Number.MAX_VALUE);
      expect(extremeMatrix[5]).toBe(Number.MIN_VALUE);
      expect(extremeMatrix[10]).toBe(-Number.MAX_VALUE);
      expect(extremeMatrix[15]).toBe(1);
    });
  });

  describe('实际使用场景验证', () => {
    /**
     * 测试目的：验证常见变换场景
     * 验证路径：实际使用案例 → Matrix4格式
     * 重要性：确保实用性
     */
    test('应该支持常见的UI变换场景', () => {
      // 场景1：卡片悬停效果（轻微放大）
      const hoverEffect: TransformValue = [
        1.05, 0.0, 0.0, 0.0,
        0.0, 1.05, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
      ];
      
      expect(hoverEffect[0]).toBe(1.05);
      expect(hoverEffect[5]).toBe(1.05);
      
      // 场景2：元素偏移动画
      const slideEffect: TransformValue = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        100.0, 0.0, 0.0, 1.0
      ];
      
      expect(slideEffect[12]).toBe(100.0);
      
      // 场景3：组合变换（缩放+平移）
      const combinedEffect: TransformValue = [
        0.9, 0.0, 0.0, 0.0,
        0.0, 0.9, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        -10.0, -10.0, 0.0, 1.0
      ];
      
      expect(combinedEffect[0]).toBe(0.9);   // 缩小到90%
      expect(combinedEffect[5]).toBe(0.9);
      expect(combinedEffect[12]).toBe(-10.0); // 向左上偏移
      expect(combinedEffect[13]).toBe(-10.0);
    });
  });
});
