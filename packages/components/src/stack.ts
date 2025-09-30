/**
 * Flutter Stack组件的React定义
 * 完全对齐Flutter Stack API - 层叠布局组件
 */

import * as React from 'react';
import { 
  AlignmentValue,
  TextDirectionValue,
  StackFitValue,
  ClipBehaviorValue
} from './styles/types';

export interface StackProps {
  children?: React.ReactNode;
  alignment?: AlignmentValue;           // 非定位子组件的对齐方式
  textDirection?: TextDirectionValue;   // 文本方向，影响定位计算
  fit?: StackFitValue;                 // Stack尺寸适应策略
  clipBehavior?: ClipBehaviorValue;     // 裁剪行为
  id?: string;                         // 标识属性
}

export const Stack: React.FC<StackProps> = ({ 
  children, 
  alignment,
  textDirection,
  fit,
  clipBehavior,
  id,
  ...props 
}) => {
  return React.createElement('Stack', { 
    alignment,
    textDirection,
    fit,
    clipBehavior,
    id,
    ...props 
  }, children);
};

