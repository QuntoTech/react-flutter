/**
 * 样式合并功能测试套件
 * 验证mergeStyles和mergeMultipleStyles函数的正确性
 * 
 * 测试目标：
 * 1. 验证基础样式合并逻辑
 * 2. 确保数组样式正确处理
 * 3. 验证覆盖策略的实现
 * 4. 测试多样式继承功能
 * 5. 验证EdgeInsets、BorderRadius、Color的自动转换
 */

import { mergeStyles, mergeMultipleStyles } from '../src/styles/merge-styles';

describe('mergeStyles', () => {
  describe('基础样式合并', () => {
    /**
     * 测试目的：验证基础样式合并功能
     * 验证路径：baseStyles + propStyles → 合并结果
     * 重要性：核心功能，必须正确工作
     * 注意：数字padding/margin自动转换为EdgeInsets格式
     */
    test('应该能够合并两个样式对象', () => {
      const baseStyles = { padding: 16, color: 'blue' };
      const propStyles = { color: 'red', margin: 8 };
      const result = mergeStyles(baseStyles, propStyles);
      
      expect(result).toEqual({
        padding: { top: 16, right: 16, bottom: 16, left: 16 },  // 自动转换为EdgeInsets格式
        color: 'red', // propStyles覆盖baseStyles
        margin: { top: 8, right: 8, bottom: 8, left: 8 }     // 自动转换为EdgeInsets格式
      });
    });

    /**
     * 测试目的：验证propStyles优先级高于baseStyles
     * 验证路径：相同属性 → propStyles覆盖baseStyles
     * 重要性：确保覆盖策略正确实现
     */
    test('propStyles应该覆盖baseStyles中的相同属性', () => {
      const baseStyles = { fontSize: 16, color: 'blue', padding: 16 };
      const propStyles = { fontSize: 24, color: 'red' };
      const result = mergeStyles(baseStyles, propStyles);
      
      expect(result).toEqual({
        fontSize: 24,  // 被覆盖
        color: 'red',  // 被覆盖
        padding: { top: 16, right: 16, bottom: 16, left: 16 }    // 保留并转换为EdgeInsets格式
      });
    });

    /**
     * 测试目的：验证空propStyles的处理
     * 验证路径：baseStyles + null/undefined → baseStyles
     * 重要性：确保边界情况不会导致错误
     */
    test('当propStyles为空时应该返回baseStyles', () => {
      const baseStyles = { padding: 16, color: 'blue' };
      const expectedResult = { 
        padding: { top: 16, right: 16, bottom: 16, left: 16 }, 
        color: 'blue' 
      };
      
      expect(mergeStyles(baseStyles, null)).toEqual(expectedResult);
      expect(mergeStyles(baseStyles, undefined)).toEqual(expectedResult);
      expect(mergeStyles(baseStyles, {})).toEqual(expectedResult);
    });
  });

  describe('数组样式处理', () => {
    /**
     * 测试目的：验证样式数组的处理
     * 验证路径：baseStyles + [style1, style2] → 正确合并
     * 重要性：支持多层样式覆盖
     */
    test('应该能够处理样式数组', () => {
      const baseStyles = { padding: 16, color: 'blue', margin: 4 };
      const propStyles = [
        { color: 'red', fontSize: 20 },
        { margin: 8, padding: 20 }
      ];
      const result = mergeStyles(baseStyles, propStyles);
      
      expect(result).toEqual({
        padding: { top: 20, right: 20, bottom: 20, left: 20 },    // 最后的数组元素覆盖，转换为EdgeInsets
        color: 'red',   // 第一个数组元素覆盖
        margin: { top: 8, right: 8, bottom: 8, left: 8 },      // 最后的数组元素覆盖，转换为EdgeInsets
        fontSize: 20    // 第一个数组元素添加
      });
    });

    /**
     * 测试目的：验证空数组的处理
     * 验证路径：baseStyles + [] → baseStyles
     * 重要性：确保空数组不会影响基础样式
     */
    test('应该能够处理空样式数组', () => {
      const baseStyles = { padding: 16, color: 'blue' };
      const result = mergeStyles(baseStyles, []);
      
      expect(result).toEqual({
        padding: { top: 16, right: 16, bottom: 16, left: 16 },
        color: 'blue'
      });
    });

    /**
     * 测试目的：验证包含null/undefined的数组处理
     * 验证路径：baseStyles + [style1, null, style2] → 忽略null值
     * 重要性：确保健壮性，忽略无效值
     */
    test('应该能够处理包含null/undefined的样式数组', () => {
      const baseStyles = { padding: 16 };
      const propStyles = [
        { color: 'red' },
        null,
        undefined,
        { margin: 8 }
      ];
      const result = mergeStyles(baseStyles, propStyles);
      
      expect(result).toEqual({
        padding: { top: 16, right: 16, bottom: 16, left: 16 },
        color: 'red',
        margin: { top: 8, right: 8, bottom: 8, left: 8 }
      });
    });
  });

  describe('复杂对象覆盖策略', () => {
    /**
     * 测试目的：验证复杂对象的覆盖策略
     * 验证路径：复杂对象属性 → 完全覆盖，非深度合并
     * 重要性：确保覆盖策略的正确实现
     */
    test('应该完全覆盖复杂对象属性', () => {
      const baseStyles = {
        padding: 16,
        decoration: {
          border: { width: 1, color: 'gray' },
          boxShadow: [{ color: 'black', blurRadius: 2 }]
        }
      };
      
      const propStyles = {
        decoration: {
          borderRadius: 12  // 只有borderRadius，应该完全覆盖decoration
        }
      };
      
      const result = mergeStyles(baseStyles, propStyles);

      // decoration应该完全被覆盖，border和boxShadow信息丢失
      expect(result).toEqual({
        padding: { top: 16, right: 16, bottom: 16, left: 16 },
        decoration: {
          borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 }
        }
      });
    });

    /**
     * 测试目的：验证嵌套对象的完全覆盖
     * 验证路径：深层嵌套对象 → 完全覆盖
     * 重要性：确保深层对象也遵循覆盖策略
     */
    test('应该完全覆盖多层嵌套对象', () => {
      const baseStyles = {
        decoration: {
          border: { width: 2, color: 'red' },
          borderRadius: 8,
          boxShadow: [{ color: 'gray', blurRadius: 4 }]
        }
      };
      
      const propStyles = {
        decoration: {
          borderRadius: 16
        }
      };
      
      const result = mergeStyles(baseStyles, propStyles);
      
      expect(result.decoration).toEqual({
        borderRadius: { topLeft: 16, topRight: 16, bottomRight: 16, bottomLeft: 16 }
      });
      expect(result.decoration.border).toBeUndefined();
      expect(result.decoration.boxShadow).toBeUndefined();
    });
  });

  describe('数据类型处理', () => {
    /**
     * 测试目的：验证不同数据类型的处理
     * 验证路径：各种数据类型 → 正确保留
     * 重要性：确保类型安全
     */
    test('应该正确处理不同数据类型', () => {
      const baseStyles = {
        width: 100,      // 数字
        visible: true,   // 布尔值
        text: 'hello',   // 字符串
        items: [1, 2, 3] // 数组
      };
      const propStyles = {
        height: 200,
        visible: false
      };
      const result = mergeStyles(baseStyles, propStyles);
      
      expect(result).toEqual({
        width: 100,
        height: 200,
        visible: false,  // 被覆盖
        text: 'hello',
        items: [1, 2, 3]
      });
    });
  });

  describe('自动转换功能', () => {
    /**
     * 测试目的：验证BorderRadius自动转换
     * 验证路径：数字borderRadius → BorderRadius对象
     * 重要性：确保简化语法正确转换
     */
    test('应该自动转换数字borderRadius为BorderRadius对象', () => {
      const styles = { borderRadius: 8 };
      const result = mergeStyles({}, styles);
      
      expect(result).toEqual({
        borderRadius: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 }
      });
    });
  });
});

describe('mergeMultipleStyles', () => {
  describe('多样式合并', () => {
    /**
     * 测试目的：验证多个样式对象的合并
     * 验证路径：style1 + style2 + style3 → 合并结果
     * 重要性：支持复杂的样式继承链
     */
    test('应该能够合并多个样式对象', () => {
      const style1 = { padding: 16, color: 'blue' };
      const style2 = { color: 'red', margin: 8, fontWeight: 'bold' };
      const style3 = { fontSize: 24, color: 'green' };
      const result = mergeMultipleStyles(style1, style2, style3);
      
      expect(result).toEqual({
        padding: { top: 16, right: 16, bottom: 16, left: 16 },        // 来自style1，转换为EdgeInsets
        margin: { top: 8, right: 8, bottom: 8, left: 8 },          // 来自style2，转换为EdgeInsets
        fontWeight: 'bold', // 来自style2
        fontSize: 24,       // 来自style3
        color: 'green'      // 来自style3
      });
    });

    /**
     * 测试目的：验证null和undefined参数的处理
     * 验证路径：混合null/undefined参数 → 正确忽略
     * 重要性：确保健壮性
     */
    test('应该能够处理包含null和undefined的参数', () => {
      const style1 = { padding: 16 };
      const style2 = null;
      const style3 = undefined;
      const style4 = { color: 'red' };
      const style5 = { margin: 8 };
      const result = mergeMultipleStyles(style1, style2, style3, style4, style5);
      
      expect(result).toEqual({
        padding: { top: 16, right: 16, bottom: 16, left: 16 },
        color: 'red',
        margin: { top: 8, right: 8, bottom: 8, left: 8 }
      });
    });

    /**
     * 测试目的：验证无参数调用
     * 验证路径：mergeMultipleStyles() → 空对象
     * 重要性：边界情况处理
     */
    test('应该能够处理无参数调用', () => {
      const result = mergeMultipleStyles();
      
      expect(result).toEqual({});
    });

    /**
     * 测试目的：验证单个样式参数
     * 验证路径：单个style → 转换后的style
     * 重要性：确保单一参数也正确处理
     */
    test('应该能够处理单个样式参数', () => {
      const style = { padding: 16, color: 'blue' };
      const result = mergeMultipleStyles(style);
      
      expect(result).toEqual({
        padding: { top: 16, right: 16, bottom: 16, left: 16 },
        color: 'blue'
      });
      expect(result).not.toBe(style); // 应该是新对象，不是同一引用
    });
  });

  describe('复杂场景测试', () => {
    /**
     * 测试目的：验证复杂的样式继承链
     * 验证路径：baseTitle → redTitle → centerRedTitle → propsStyle
     * 重要性：模拟真实的styleSheet使用场景
     */
    test('应该能够模拟styleSheet继承链', () => {
      const baseTitle = { fontWeight: 'bold' };
      const redTitle = { color: 'red' };
      const centerRedTitle = { textAlign: 'center' };
      const propsStyle = { margin: 8, fontSize: 32 };
      
      const result = mergeMultipleStyles(baseTitle, redTitle, centerRedTitle, propsStyle);
      
      expect(result).toEqual({
        fontWeight: 'bold',   // 来自baseTitle
        color: 'red',         // 来自redTitle
        textAlign: 'center',  // 来自centerRedTitle
        fontSize: 32,         // 来自propsStyle
        margin: { top: 8, right: 8, bottom: 8, left: 8 }             // 来自propsStyle，转换为EdgeInsets
      });
    });
  });
});
