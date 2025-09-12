/**
 * Flutter Container组件的React实现
 * 支持统一的style属性，对齐Flutter Container的原生API
 */

import * as React from 'react';
import { ContainerStyle } from './styles/types';
import { mergeStyles } from './styles/merge-styles';

export interface ContainerProps {
  children?: React.ReactNode;
  style?: ContainerStyle | ContainerStyle[];
}

export const Container: React.FC<ContainerProps> = ({ children, style, ...props }) => {
  // 确保Color对象被正确转换为Flutter格式
  const processedStyle = style ? mergeStyles({}, style) : undefined;
  
  return React.createElement('Container', { style: processedStyle, ...props }, children);
};
