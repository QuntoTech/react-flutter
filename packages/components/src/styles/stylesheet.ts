/**
 * StyleSheet高阶组件实现
 * 提供样式化组件的创建和继承功能
 */

import * as React from 'react';
import { mergeStyles, mergeMultipleStyles } from './merge-styles';
import { StyledComponent, StyledComponentMetadata } from './types';

// =============================================================================
// 样式组件工具函数
// =============================================================================

/**
 * 检查是否为样式化组件
 */
function isStyledComponent(component: any): component is StyledComponent {
  return component && typeof component === 'object' && component.isStyledComponent === true;
}

/**
 * 创建样式化组件
 * @param Component 基础组件
 * @param baseStyles 基础样式
 * @returns 样式化组件
 */
function createStyledComponent<P = any>(
  Component: React.ComponentType<P>,
  baseStyles: any
): StyledComponent<P> {
  const StyledComponent = React.forwardRef<any, P>((props: any, ref) => {
    // 合并基础样式和传入样式
    const mergedStyles = mergeStyles(baseStyles, props.style);
    
    return React.createElement(Component as any, {
      ...props,
      style: mergedStyles,
      ref
    });
  });

  // 设置显示名称
  const componentName = Component.displayName || Component.name || 'Component';
  StyledComponent.displayName = `Styled(${componentName})`;

  // 附加元数据到ForwardRef组件
  (StyledComponent as any).isStyledComponent = true;
  (StyledComponent as any).Component = Component;
  (StyledComponent as any).baseStyles = baseStyles;

  return StyledComponent as StyledComponent<P>;
}

// =============================================================================
// StyleSheet主函数（支持继承）
// =============================================================================

/**
 * StyleSheet函数 - 支持样式组件的继承
 * @param styledComponent 已有的样式化组件
 * @returns 继承函数
 */
function styleSheetInherit(styledComponent: StyledComponent) {
  return function(newStyles: any) {
    if (!isStyledComponent(styledComponent)) {
      throw new Error('styleSheet() 只能用于继承样式化组件');
    }

    // 合并原有基础样式和新样式
    const inheritedStyles = mergeMultipleStyles(
      styledComponent.baseStyles,
      newStyles
    );

    // 创建新的样式化组件
    return createStyledComponent(
      styledComponent.Component,
      inheritedStyles
    );
  };
}

// =============================================================================
// StyleSheet对象定义
// =============================================================================

// 注：不再需要createBaseComponent，因为所有组件都有真正的React实现

// 导入实际的React组件
import { Container } from '../container';
import { ElevatedButton } from '../elevated-button';
import { Text } from '../text';
import { Column } from '../column';
import { Row } from '../row';
import { SizedBox } from '../sized-box';
import { SingleChildScrollView } from '../single-child-scroll-view';

// 基础组件定义
const BaseContainer = Container; // 直接使用React组件
const BaseText = Text; // 直接使用React组件
const BaseColumn = Column; // 直接使用React组件
const BaseRow = Row; // 直接使用React组件
const BaseSizedBox = SizedBox; // 直接使用React组件
const BaseElevatedButton = ElevatedButton; // 直接使用React组件
const BaseSingleChildScrollView = SingleChildScrollView; // 直接使用React组件

/**
 * StyleSheet对象 - 提供基础组件的样式化功能
 * 
 * 使用方式：
 * - 基础样式化: styleSheet.Container({ padding: 16 })
 * - 样式继承: styleSheet(StyledComponent)({ color: 'red' })
 */
export const styleSheet = {
  /**
   * Container组件样式化
   */
  Container: (styles: any) => createStyledComponent(BaseContainer, styles),

  /**
   * Text组件样式化
   */
  Text: (styles: any) => createStyledComponent(BaseText, styles),

  /**
   * Column组件样式化
   */
  Column: (styles: any) => createStyledComponent(BaseColumn, styles),

  /**
   * Row组件样式化
   */
  Row: (styles: any) => createStyledComponent(BaseRow, styles),

  /**
   * SizedBox组件样式化
   */
  SizedBox: (styles: any) => createStyledComponent(BaseSizedBox, styles),

  /**
   * ElevatedButton组件样式化
   */
  ElevatedButton: (styles: any) => createStyledComponent(BaseElevatedButton, styles),

  /**
   * SingleChildScrollView组件样式化
   */
  SingleChildScrollView: (styles: any) => createStyledComponent(BaseSingleChildScrollView, styles),
} as const;

// 创建带函数调用支持的styleSheet
const styleSheetWithInherit = Object.assign(
  function(styledComponent: StyledComponent) {
    return styleSheetInherit(styledComponent);
  },
  styleSheet
);

export default styleSheetWithInherit;
