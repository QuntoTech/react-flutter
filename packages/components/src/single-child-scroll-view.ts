/**
 * Flutter SingleChildScrollView组件的React定义
 * 对齐Flutter SingleChildScrollView API
 */

import * as React from 'react';
import { SingleChildScrollViewStyle } from './styles/types';

export interface SingleChildScrollViewProps {
  children?: React.ReactNode;
  scrollDirection?: 'vertical' | 'horizontal';  // 独立属性 - 功能配置
  reverse?: boolean;                            // 独立属性 - 功能配置
  style?: SingleChildScrollViewStyle;           // style属性 - 视觉样式
  id?: string;                                 // 独立属性 - 标识
}

export const SingleChildScrollView: React.FC<SingleChildScrollViewProps> = ({ 
  children, 
  scrollDirection,
  reverse,
  style, 
  id, 
  ...props 
}) => {
  return React.createElement(
    'SingleChildScrollView', 
    { scrollDirection, reverse, style, id, ...props }, 
    children
  );
};
