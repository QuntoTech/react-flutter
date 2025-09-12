/**
 * Flutter Text组件的React定义
 */

import * as React from 'react';

export interface TextProps {
  text: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  [key: string]: any;
}

export const Text: React.FC<TextProps> = ({ text, fontSize, fontWeight, color, ...props }) => {
  return React.createElement('Text', { text, fontSize, fontWeight, color, ...props });
};
