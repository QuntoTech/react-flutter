/**
 * React-Flutter样式系统类型定义
 * 对齐Flutter Widget的原生属性名
 */

import * as React from 'react';
import { EdgeInsets, EdgeInsetsValue } from './edge-insets';
import { Color, ColorValue } from './color';
import { BorderRadius, BorderRadiusValue } from './border-radius';
import { Border, BorderSide, BorderValue } from './border';

// =============================================================================
// 基础样式类型
// =============================================================================

/**
 * 容器样式类型 (对齐Flutter Container)
 */
export interface ContainerStyle {
  // 尺寸属性
  width?: number;
  height?: number;
  
  // 间距属性  
  padding?: EdgeInsetsValue;
  margin?: EdgeInsetsValue;
  
  // 颜色和装饰
  color?: ColorValue;
  decoration?: DecorationStyle;
  foregroundDecoration?: DecorationStyle;
  
  // 布局属性
  alignment?: AlignmentValue;
  constraints?: ConstraintsStyle;
  transform?: TransformValue;
  transformAlignment?: AlignmentValue;
  clipBehavior?: ClipBehaviorValue;
}

/**
 * 文本样式类型 (对齐Flutter Text)
 */
export interface TextStyle {
  // 字体属性
  fontSize?: number;
  fontWeight?: FontWeightValue;
  fontFamily?: string;
  fontStyle?: FontStyleValue;
  
  // 颜色和装饰
  color?: ColorValue;
  backgroundColor?: ColorValue;
  decoration?: TextDecorationValue;
  decorationColor?: string;
  decorationStyle?: TextDecorationStyleValue;
  
  // 布局属性
  textAlign?: TextAlignValue;
  textDirection?: TextDirectionValue;
  letterSpacing?: number;
  wordSpacing?: number;
  height?: number;
  
  // 溢出处理
  overflow?: TextOverflowValue;
  maxLines?: number;
}

/**
 * 列布局样式类型 (对齐Flutter Column)
 */
export interface ColumnStyle {
  mainAxisAlignment?: MainAxisAlignmentValue;
  crossAxisAlignment?: CrossAxisAlignmentValue;
  mainAxisSize?: MainAxisSizeValue;
  textDirection?: TextDirectionValue;
  verticalDirection?: VerticalDirectionValue;
}

/**
 * 行布局样式类型 (对齐Flutter Row)
 */
export interface RowStyle {
  mainAxisAlignment?: MainAxisAlignmentValue;
  crossAxisAlignment?: CrossAxisAlignmentValue;
  mainAxisSize?: MainAxisSizeValue;
  textDirection?: TextDirectionValue;
  verticalDirection?: VerticalDirectionValue;
}

// =============================================================================
// 辅助样式类型
// =============================================================================

export interface DecorationStyle {
  color?: ColorValue;
  borderRadius?: BorderRadiusValue;
  border?: BorderValue;
  boxShadow?: BoxShadowStyle[];
  gradient?: GradientStyle;
  image?: DecorationImageStyle;
}

// BorderStyle已被Border类替代，保留用于向后兼容
export interface BorderStyle {
  width?: number;
  color?: ColorValue;
  style?: BorderStyleValue;
}

export interface BoxShadowStyle {
  color?: ColorValue;
  blurRadius?: number;
  spreadRadius?: number;
  offset?: { dx: number; dy: number };
}

export interface ConstraintsStyle {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

// =============================================================================
// 枚举值类型
// =============================================================================


export type AlignmentValue = 
  | 'topLeft' | 'topCenter' | 'topRight'
  | 'centerLeft' | 'center' | 'centerRight'
  | 'bottomLeft' | 'bottomCenter' | 'bottomRight';

export type FontWeightValue = 
  | 'normal' | 'bold' 
  | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type FontStyleValue = 'normal' | 'italic';

export type TextAlignValue = 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';

export type TextDirectionValue = 'ltr' | 'rtl';

export type TextOverflowValue = 'clip' | 'fade' | 'ellipsis' | 'visible';

export type TextDecorationValue = 'none' | 'underline' | 'overline' | 'lineThrough';

export type TextDecorationStyleValue = 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';

export type MainAxisAlignmentValue = 
  | 'start' | 'end' | 'center' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly';

export type CrossAxisAlignmentValue = 
  | 'start' | 'end' | 'center' | 'stretch' | 'baseline';

export type MainAxisSizeValue = 'min' | 'max';

export type VerticalDirectionValue = 'up' | 'down';

export type ClipBehaviorValue = 'none' | 'hardEdge' | 'antiAlias' | 'antiAliasWithSaveLayer';

export type BorderStyleValue = 'none' | 'solid';


export type TransformValue = {
  // 2D变换
  translateX?: number;
  translateY?: number;
  scaleX?: number;
  scaleY?: number;
  rotateZ?: number;
  // 3D变换
  translateZ?: number;
  scaleZ?: number;
  rotateX?: number;
  rotateY?: number;
};

export type GradientStyle = {
  type: 'linear' | 'radial';
  colors: string[];
  stops?: number[];
  begin?: AlignmentValue;
  end?: AlignmentValue;
};

export type DecorationImageStyle = {
  url: string;
  fit?: 'fill' | 'contain' | 'cover' | 'fitWidth' | 'fitHeight' | 'none' | 'scaleDown';
  repeat?: 'repeat' | 'repeatX' | 'repeatY' | 'noRepeat';
};

// =============================================================================
// StyleSheet相关类型
// =============================================================================

/**
 * 样式化组件的元数据接口
 */
export interface StyledComponentMetadata {
  isStyledComponent: true;
  Component: React.ComponentType<any>;
  baseStyles: any;
}

/**
 * 样式化组件类型
 */
export type StyledComponent<P = any> = React.ForwardRefExoticComponent<P> & StyledComponentMetadata;

/**
 * 提取组件样式类型的工具类型
 */
export type StyleOf<T> = T extends React.ComponentType<{ style?: infer S; [key: string]: any }>
  ? S
  : never;
