/**
 * Flutter Container组件的React实现
 * 支持统一的style属性，对齐Flutter Container的原生API
 */

import * as React from 'react';
import { ContainerStyle } from './styles/types';
import { mergeStyles } from './styles/merge-styles';

export interface ContainerProps {
  children?: React.ReactNode;
  style?: ContainerStyle;
  id?: string;  // 通用id属性，用于测试和查找
}

export const Container: React.FC<ContainerProps> = ({ children, style, id, ...props }) => {
  // 确保Color对象被正确转换为Flutter格式
  const processedStyle = style ? mergeStyles({}, style) : undefined;
  
  // 构建传递给Flutter的props，包含id
  const flutterProps: any = { style: processedStyle, ...props };
  if (id) {
    flutterProps.id = id;
  }
  
  return React.createElement('Container', flutterProps, children);
};
