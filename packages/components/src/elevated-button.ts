/**
 * Flutter ElevatedButton组件的React定义
 */

import * as React from 'react';
import { processEventProps } from '@react-flutter/core';

export interface ElevatedButtonProps {
  text?: string;
  onPressed?: () => void;
  children?: React.ReactNode;
  style?: any;
  [key: string]: any;
}

export const ElevatedButton: React.FC<ElevatedButtonProps> = (allProps) => {
  const { children, onPressed, ...otherProps } = allProps;
  
  // 只处理事件相关的props
  const eventProps = { onPressed };
  const processedEventProps = processEventProps(eventProps);
  
  // 合并处理后的事件props和其他props
  const finalProps = { ...otherProps, ...processedEventProps };
  
  return React.createElement('ElevatedButton', finalProps, children);
};
