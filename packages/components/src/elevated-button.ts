/**
 * Flutter ElevatedButton组件的React定义
 * 完全对齐Flutter ElevatedButton API - 独立属性与style属性分离
 */

import * as React from 'react';
import { processEventProps } from '@react-flutter/core';
import { ElevatedButtonStyle, ClipBehaviorValue } from './styles/types';

export interface ElevatedButtonProps {
  children?: React.ReactNode;      // 子组件
  style?: ElevatedButtonStyle;     // 按钮样式 - 视觉相关
  onPressed?: () => void;          // 点击事件 - 行为
  onLongPress?: () => void;        // 长按事件 - 行为
  onHover?: (hovering: boolean) => void; // 悬停事件 - 行为
  onFocusChange?: (focused: boolean) => void; // 焦点事件 - 行为
  autofocus?: boolean;             // 自动焦点 - 行为
  clipBehavior?: ClipBehaviorValue; // 裁剪行为 - 行为
  id?: string;                     // 标识属性
}

export const ElevatedButton: React.FC<ElevatedButtonProps> = ({ 
  children, 
  style,
  onPressed,
  onLongPress,
  onHover,
  onFocusChange,
  autofocus,
  clipBehavior,
  id,
  ...otherProps 
}) => {
  // 处理事件相关的props，延续现有风格
  const eventProps = { 
    onPressed, 
    onLongPress, 
    onHover, 
    onFocusChange 
  };
  const processedEventProps = processEventProps(eventProps);
  
  // 合并所有props
  const finalProps = { 
    style,
    ...processedEventProps,
    autofocus,
    clipBehavior,
    id,
    ...otherProps 
  };
  
  return React.createElement('ElevatedButton', finalProps, children);
};
