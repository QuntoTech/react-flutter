/**
 * Flutter Expanded组件的React定义
 * 完全对齐Flutter Expanded API
 */

import * as React from 'react';

export interface ExpandedProps {
  children: React.ReactNode;  // 必需：单个子组件
  flex?: number;              // 可选：弹性系数，默认1
  id?: string;                // 可选：组件标识
}

/**
 * Expanded组件
 * 
 * 使Flex容器（Row、Column、Flex）的子组件在主轴方向上扩展以填充可用空间。
 * 
 * 必须用作Row、Column或Flex的直接子组件。
 * 
 * @example
 * ```tsx
 * <Row>
 *   <Expanded flex={2}>
 *     <Container style={{ decoration: { color: Color.red } }} />
 *   </Expanded>
 *   <Expanded flex={1}>
 *     <Container style={{ decoration: { color: Color.blue } }} />
 *   </Expanded>
 * </Row>
 * ```
 */
export const Expanded: React.FC<ExpandedProps> = ({
  children,
  flex = 1,
  id,
  ...otherProps
}) => {
  return React.createElement('Expanded', {
    flex,
    id,
    ...otherProps
  }, children);
};
