/**
 * Flutter Text组件的React定义
 * 完全对齐Flutter Text API - 独立属性与style属性分离
 */

import * as React from 'react';
import { TextStyle } from './styles/types';

export interface TextProps {
  children?: React.ReactNode;
  text: string;                        // 文本内容 - 核心数据
  style?: TextStyle;                   // 文本样式 - 视觉相关
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';  // 文本对齐
  textDirection?: 'ltr' | 'rtl';       // 文本方向
  maxLines?: number;                   // 最大行数
  overflow?: 'clip' | 'fade' | 'ellipsis' | 'visible'; // 溢出处理
  softWrap?: boolean;                  // 软换行
  textScaleFactor?: number;            // 文本缩放
  semanticsLabel?: string;             // 语义标签
  locale?: string;                     // 本地化
  id?: string;                         // 标识属性
}

export const Text: React.FC<TextProps> = ({ 
  children, 
  text, 
  style,
  textAlign,
  textDirection,
  maxLines,
  overflow,
  softWrap,
  textScaleFactor,
  semanticsLabel,
  locale,
  id,
  ...props 
}) => {
  return React.createElement('Text', { 
    text,
    style,
    textAlign,
    textDirection,
    maxLines,
    overflow,
    softWrap,
    textScaleFactor,
    semanticsLabel,
    locale,
    id,
    ...props 
  }, children);
};
