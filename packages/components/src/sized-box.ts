/**
 * Flutter SizedBox组件的React定义
 */

import * as React from 'react';

export interface SizedBoxProps {
  width?: number;
  height?: number;
  child?: React.ReactNode;
  [key: string]: any;
}

export const SizedBox: React.FC<SizedBoxProps> = ({ width, height, child, ...props }) => {
  return React.createElement('SizedBox', { width, height, ...props }, child);
};
