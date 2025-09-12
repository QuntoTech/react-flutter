/**
 * Flutter Column组件的React定义
 */

import * as React from 'react';

export interface ColumnProps {
  children?: React.ReactNode;
  mainAxisAlignment?: string;
  crossAxisAlignment?: string;
  [key: string]: any;
}

export const Column: React.FC<ColumnProps> = ({ children, mainAxisAlignment, crossAxisAlignment, ...props }) => {
  return React.createElement('Column', { mainAxisAlignment, crossAxisAlignment, ...props }, children);
};
