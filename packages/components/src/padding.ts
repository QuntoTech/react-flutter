import * as React from 'react';
import type { EdgeInsetsValue } from './styles/edge-insets';

export interface PaddingProps {
  children: React.ReactNode;
  padding: EdgeInsetsValue;
  id?: string;
}

export const Padding: React.FC<PaddingProps> = ({
  children,
  padding,
  id,
  ...props
}) => {
  return React.createElement('Padding', {
    padding,
    id,
    ...props
  }, children);
};
