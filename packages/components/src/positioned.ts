/**
 * Flutter Positioned组件的React定义
 * 完全对齐Flutter Positioned API - 用于Stack中的绝对定位
 */

import * as React from 'react';

export interface PositionedProps {
  children: React.ReactNode;
  left?: number;                       // 距离左边距离
  top?: number;                        // 距离顶部距离
  right?: number;                      // 距离右边距离
  bottom?: number;                     // 距离底部距离
  width?: number;                      // 指定宽度
  height?: number;                     // 指定高度
  id?: string;                         // 标识属性
}

export const Positioned: React.FC<PositionedProps> = ({ 
  children,
  left,
  top,
  right,
  bottom,
  width,
  height,
  id,
  ...props 
}) => {
  return React.createElement('Positioned', { 
    left,
    top,
    right,
    bottom,
    width,
    height,
    id,
    ...props 
  }, children);
};

