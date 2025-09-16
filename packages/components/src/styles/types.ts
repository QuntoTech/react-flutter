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
 * 文本样式类型 (对齐Flutter TextStyle)
 * 只包含视觉样式相关属性
 */
export interface TextStyle {
  // 字体属性
  fontSize?: number;                    // 字体大小
  fontWeight?: FontWeightValue;         // 字体粗细
  fontFamily?: string;                  // 字体族
  fontStyle?: FontStyleValue;           // 字体样式(italic/normal)
  
  // 颜色和装饰
  color?: ColorValue;                   // 文本颜色
  backgroundColor?: ColorValue;         // 背景颜色
  decoration?: TextDecorationValue;     // 文本装饰(underline/strikethrough)
  decorationColor?: ColorValue;         // 装饰颜色
  decorationStyle?: TextDecorationStyleValue; // 装饰样式
  decorationThickness?: number;         // 装饰线粗细
  
  // 间距属性  
  letterSpacing?: number;               // 字母间距
  wordSpacing?: number;                 // 单词间距
  height?: number;                      // 行高倍数
  
  // 高级样式
  shadows?: BoxShadowStyle[];           // 文本阴影
  // 注意：Flutter的foreground/background Paint暂不实现
}

/**
 * 按钮样式类型 (完全对齐Flutter ElevatedButton的ButtonStyle)
 * 支持完整的Material状态管理 - 每个属性都可以为不同状态设置不同值
 */
export interface ElevatedButtonStyle {
  // 颜色属性 - 支持Material状态
  backgroundColor?: MaterialStateColorValue;     // 背景颜色
  foregroundColor?: MaterialStateColorValue;     // 前景颜色（文本/图标颜色）
  overlayColor?: MaterialStateColorValue;        // 覆盖色（按下/悬停时）
  shadowColor?: MaterialStateColorValue;         // 阴影颜色
  surfaceTintColor?: MaterialStateColorValue;    // 表面着色
  
  // 尺寸和间距 - 支持Material状态
  elevation?: MaterialStateNumberValue;          // 高度/阴影深度
  padding?: MaterialStateEdgeInsetsValue;        // 内边距
  minimumSize?: MaterialStateSizeValue;          // 最小尺寸
  fixedSize?: MaterialStateSizeValue;            // 固定尺寸
  maximumSize?: MaterialStateSizeValue;          // 最大尺寸
  
  // 形状和边框 - 支持Material状态
  side?: MaterialStateBorderSideValue;           // 边框
  shape?: MaterialStateShapeValue;               // 形状
  
  // 鼠标和交互
  mouseCursor?: MaterialStateMouseCursorValue;   // 鼠标指针
  visualDensity?: VisualDensityValue;            // 视觉密度
  tapTargetSize?: MaterialTapTargetSizeValue;    // 点击目标大小
  animationDuration?: number;                    // 动画时长（毫秒）
  enableFeedback?: boolean;                      // 启用触觉反馈
  alignment?: AlignmentValue;                    // 内容对齐
  splashFactory?: InteractiveInkFeatureFactoryValue; // 水波纹工厂
}

/**
 * Material状态值类型 - 完全对齐Flutter MaterialState
 */
type MaterialStateValue<T> = T | {
  default?: T;        // 默认状态
  disabled?: T;       // 禁用状态
  dragged?: T;        // 拖拽状态
  error?: T;          // 错误状态
  focused?: T;        // 聚焦状态
  hovered?: T;        // 悬停状态
  pressed?: T;        // 按下状态
  scrolledUnder?: T;  // 滚动覆盖状态
  selected?: T;       // 选中状态
};

// Material状态相关类型定义
export type MaterialStateColorValue = MaterialStateValue<ColorValue>;
export type MaterialStateNumberValue = MaterialStateValue<number>;
export type MaterialStateEdgeInsetsValue = MaterialStateValue<EdgeInsetsValue>;
export type MaterialStateSizeValue = MaterialStateValue<{ width?: number; height?: number }>;
export type MaterialStateBorderSideValue = MaterialStateValue<BorderValue>;
export type MaterialStateShapeValue = MaterialStateValue<OutlinedBorderValue>;
export type MaterialStateMouseCursorValue = MaterialStateValue<MouseCursorValue>;

// 其他Flutter对齐类型
export type VisualDensityValue = 'standard' | 'compact' | 'comfortable' | 'adaptivePlatformDensity';
export type MaterialTapTargetSizeValue = 'padded' | 'shrinkWrap';
export type MouseCursorValue = 'basic' | 'click' | 'forbidden' | 'wait' | 'progress' | 'help' | 'text' | 'verticalText' | 'cell' | 'contextMenu' | 'alias' | 'copy' | 'move' | 'noDrop' | 'notAllowed' | 'grab' | 'grabbing' | 'scrollHorizontal' | 'scrollVertical' | 'resizeColumn' | 'resizeRow' | 'resizeUpLeft' | 'resizeUpRight' | 'resizeUp' | 'resizeDown' | 'resizeLeft' | 'resizeRight' | 'resizeUpLeftDownRight' | 'resizeUpRightDownLeft' | 'zoomIn' | 'zoomOut';
export type InteractiveInkFeatureFactoryValue = 'splash' | 'ripple' | 'noSplash';
export type OutlinedBorderValue = BorderRadiusValue | {
  type: 'RoundedRectangleBorder' | 'CircleBorder' | 'StadiumBorder' | 'BeveledRectangleBorder';
  borderRadius?: BorderRadiusValue;
  side?: BorderValue;
};

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
  textBaseline?: TextBaselineValue;
}

/**
 * 单子组件滚动视图样式类型 (对齐Flutter SingleChildScrollView)
 */
export interface SingleChildScrollViewStyle {
  // 视觉样式属性
  padding?: EdgeInsetsValue;
  physics?: ScrollPhysicsValue;
  clipBehavior?: ClipBehaviorValue;
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
  shape?: BoxShapeValue;
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
  blurStyle?: BlurStyleValue;
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

/**
 * 文本基线值类型 (对齐Flutter TextBaseline枚举)
 */
export type TextBaselineValue = 'alphabetic' | 'ideographic';

export type ClipBehaviorValue = 'none' | 'hardEdge' | 'antiAlias' | 'antiAliasWithSaveLayer';

export type ScrollDirectionValue = 'vertical' | 'horizontal';

export type ScrollPhysicsValue = 'bouncing' | 'clamping' | 'never';

export type BorderStyleValue = 'none' | 'solid';

export type BlurStyleValue = 'normal' | 'solid' | 'outer' | 'inner';

export type TileModeValue = 'clamp' | 'repeated' | 'mirror';

export type GradientTransformValue = {
  // 2D变换矩阵 (对齐Flutter GradientTransform)
  matrix?: number[];  // 4x4变换矩阵
  // 简化变换属性
  rotation?: number;  // 旋转角度 (弧度)
  scale?: number;     // 缩放比例
  translation?: { dx: number; dy: number }; // 平移
};


// Matrix4变换值 - 完全对齐Flutter Matrix4 API
export type TransformValue = number[];  // 16个数字，表示4x4变换矩阵

/**
 * 渐变样式类型 - 完全对齐Flutter Gradient API
 */
export type GradientStyle = LinearGradientStyle | RadialGradientStyle | SweepGradientStyle;

/**
 * 线性渐变样式 (对齐Flutter LinearGradient)
 */
export interface LinearGradientStyle {
  type: 'linear';
  begin?: AlignmentValue;           // 默认: Alignment.centerLeft
  end?: AlignmentValue;             // 默认: Alignment.centerRight
  colors: ColorValue[];             // 必需: 渐变颜色列表
  stops?: number[];                 // 可选: 颜色停止位置
  tileMode?: TileModeValue;         // 默认: 'clamp'
  transform?: GradientTransformValue; // 可选: 渐变变换
}

/**
 * 径向渐变样式 (对齐Flutter RadialGradient)
 */
export interface RadialGradientStyle {
  type: 'radial';
  center?: AlignmentValue;          // 默认: Alignment.center
  radius?: number;                  // 默认: 0.5
  colors: ColorValue[];             // 必需: 渐变颜色列表
  stops?: number[];                 // 可选: 颜色停止位置
  tileMode?: TileModeValue;         // 默认: 'clamp'
  focal?: AlignmentValue;           // 可选: 焦点位置
  focalRadius?: number;             // 默认: 0.0
  transform?: GradientTransformValue; // 可选: 渐变变换
}

/**
 * 扫描渐变样式 (对齐Flutter SweepGradient)
 */
export interface SweepGradientStyle {
  type: 'sweep';
  center?: AlignmentValue;          // 默认: Alignment.center
  startAngle?: number;              // 默认: 0.0 (弧度)
  endAngle?: number;                // 默认: 2π (弧度)
  colors: ColorValue[];             // 必需: 渐变颜色列表
  stops?: number[];                 // 可选: 颜色停止位置
  tileMode?: TileModeValue;         // 默认: 'clamp'
  transform?: GradientTransformValue; // 可选: 渐变变换
}

export interface DecorationImageStyle {
  url: string;
  fit?: BoxFitValue;
  repeat?: ImageRepeatValue;
}

export type BoxFitValue = 'fill' | 'contain' | 'cover' | 'fitWidth' | 'fitHeight' | 'none' | 'scaleDown';

export type ImageRepeatValue = 'repeat' | 'repeatX' | 'repeatY' | 'noRepeat';

export type BoxShapeValue = 'rectangle' | 'circle';

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
