/**
 * Flutter Row组件的React定义
 * 完全对齐Flutter Row API - 纯布局组件，无style属性
 */

import * as React from 'react';
import { 
  MainAxisAlignmentValue, 
  CrossAxisAlignmentValue, 
  MainAxisSizeValue,
  TextDirectionValue,
  VerticalDirectionValue,
  TextBaselineValue
} from './styles/types';

export interface RowProps {
  children?: React.ReactNode;
  mainAxisAlignment?: MainAxisAlignmentValue;   // 主轴对齐
  crossAxisAlignment?: CrossAxisAlignmentValue; // 交叉轴对齐
  mainAxisSize?: MainAxisSizeValue;            // 主轴大小
  textDirection?: TextDirectionValue;          // 文本方向
  verticalDirection?: VerticalDirectionValue;  // 垂直方向
  textBaseline?: TextBaselineValue;           // 文本基线
  id?: string;                                // 标识属性
}

export const Row: React.FC<RowProps> = ({ 
  children, 
  mainAxisAlignment,
  crossAxisAlignment,
  mainAxisSize,
  textDirection,
  verticalDirection,
  textBaseline,
  id,
  ...props 
}) => {
  return React.createElement('Row', { 
    mainAxisAlignment,
    crossAxisAlignment,
    mainAxisSize,
    textDirection,
    verticalDirection,
    textBaseline,
    id,
    ...props 
  }, children);
};
