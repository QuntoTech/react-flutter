/**
 * Flutter Row组件的React定义
 */

import * as React from 'react';

export interface RowProps {
  children?: React.ReactNode;
  mainAxisAlignment?: string;
  crossAxisAlignment?: string;
  [key: string]: any;
}

export const Row: React.FC<RowProps> = ({ children, mainAxisAlignment, crossAxisAlignment, ...props }) => {
  return React.createElement('Row', { mainAxisAlignment, crossAxisAlignment, ...props }, children);
};
