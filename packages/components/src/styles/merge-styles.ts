/**
 * 样式合并工具函数
 * 实现React-Flutter框架的样式合并逻辑
 */

import { Color } from './color';
import { EdgeInsets } from './edge-insets';
import { BorderRadius } from './border-radius';
import { Border, BorderSide } from './border';

/**
 * 转换样式对象，将Color对象转换为Flutter格式
 * @param style 样式对象
 * @returns 转换后的样式对象
 */
function convertStyleForFlutter(style: any): any {
  if (!style || typeof style !== 'object') return style;
  
  const converted: any = {};
  
  for (const [key, value] of Object.entries(style)) {
    if (value instanceof Color) {
      // Color对象转换为Flutter格式
      converted[key] = value.toFlutterMap();
    } else if (value instanceof EdgeInsets) {
      // EdgeInsets对象转换为Flutter格式
      converted[key] = value.toFlutterMap();
    } else if (value instanceof BorderRadius) {
      // BorderRadius对象转换为Flutter格式
      converted[key] = value.toFlutterMap();
    } else if (value instanceof Border) {
      // Border对象转换为Flutter格式
      converted[key] = value.toFlutterMap();
    } else if (value instanceof BorderSide) {
      // BorderSide对象转换为Flutter格式
      converted[key] = value.toFlutterMap();
    } else if (typeof value === 'object' && value !== null && key === 'border' && 'width' in value) {
      // 简化的border对象 {width, color, style} 转换为Border.all格式
      const borderConfig = value as { width?: number; color?: Color; style?: string };
      const border = Border.all({
        width: borderConfig.width ?? 1.0,
        color: borderConfig.color ?? Color.black,
        style: (borderConfig.style as any) ?? 'solid'
      });
      converted[key] = border.toFlutterMap();
    } else if (typeof value === 'number' && (key === 'padding' || key === 'margin')) {
      // 数字padding/margin转换为EdgeInsets.all格式
      converted[key] = EdgeInsets.all(value).toFlutterMap();
    } else if (typeof value === 'number' && key === 'borderRadius') {
      // 数字borderRadius转换为BorderRadius.circular格式
      converted[key] = BorderRadius.circular(value).toFlutterMap();
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // 递归处理嵌套对象（如decoration）
      converted[key] = convertStyleForFlutter(value);
    } else if (Array.isArray(value)) {
      // 处理数组（如boxShadow）
      converted[key] = value.map(item => 
        typeof item === 'object' && item !== null ? convertStyleForFlutter(item) : item
      );
    } else {
      converted[key] = value;
    }
  }
  
  return converted;
}

/**
 * 合并样式对象，采用覆盖策略
 * @param baseStyles 基础样式对象
 * @param propStyles 传入的样式（可以是对象或数组）
 * @returns 合并后的样式对象
 */
export function mergeStyles(baseStyles: any, propStyles?: any): any {
  let merged;
  
  if (!propStyles) {
    merged = baseStyles;
  } else if (Array.isArray(propStyles)) {
    // 数组情况：从左到右依次覆盖
    merged = propStyles.reduce((acc, style) => ({ ...acc, ...style }), baseStyles);
  } else {
    // 对象情况：propStyles直接覆盖baseStyles
    merged = { ...baseStyles, ...propStyles };
  }
  
  // 转换Color对象为Flutter格式
  return convertStyleForFlutter(merged);
}

/**
 * 合并多个样式对象（用于样式继承）
 * @param styles 样式对象数组，按优先级从低到高排列
 * @returns 合并后的样式对象
 */
export function mergeMultipleStyles(...styles: any[]): any {
  const merged = styles.reduce((acc, style) => {
    if (!style) return acc;
    return { ...acc, ...style };
  }, {});
  
  // 转换Color对象为Flutter格式
  return convertStyleForFlutter(merged);
}
