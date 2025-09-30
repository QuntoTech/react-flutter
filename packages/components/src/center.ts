import * as React from 'react';

export interface CenterProps {
  children: React.ReactNode;
  widthFactor?: number;
  heightFactor?: number;
  id?: string;
}

export const Center: React.FC<CenterProps> = ({
  children,
  widthFactor,
  heightFactor,
  id,
  ...props
}) => {
  return React.createElement('Center', {
    widthFactor,
    heightFactor,
    id,
    ...props
  }, children);
};
