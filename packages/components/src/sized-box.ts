/**
 * Flutter SizedBox组件的React定义
 * 完全对齐Flutter SizedBox API - 纯尺寸控制组件
 */

import * as React from 'react';

export interface SizedBoxProps {
  children?: React.ReactNode;      // 子组件
  width?: number;                  // 宽度
  height?: number;                 // 高度
  id?: string;                     // 标识属性
}

export const SizedBox: React.FC<SizedBoxProps> = ({ 
  children, 
  width, 
  height, 
  id, 
  ...props 
}) => {
  return React.createElement('SizedBox', { 
    width, 
    height, 
    id, 
    ...props 
  }, children);
};
