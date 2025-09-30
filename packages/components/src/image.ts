/**
 * Image组件 - 对齐Flutter Image API
 * 用于显示图片，支持网络图片、本地资源、文件等
 */

import * as React from 'react';
import type { ColorValue } from './styles/color';
import type { BoxFitValue, ImageRepeatValue, BlendModeValue, AlignmentValue } from './styles/types';

/**
 * 图片源类型
 */
export type ImageSourceType = 'network' | 'asset' | 'file' | 'memory';

/**
 * Image组件属性
 */
export interface ImageProps {
  /** 图片源URL或路径（必需） */
  src: string;
  
  /** 图片源类型 */
  srcType?: ImageSourceType;
  
  // 尺寸属性
  /** 图片宽度 */
  width?: number;
  /** 图片高度 */
  height?: number;
  
  // 适配属性
  /** 图片适配方式 */
  fit?: BoxFitValue;
  /** 图片对齐方式 */
  alignment?: AlignmentValue;
  /** 图片重复方式 */
  repeat?: ImageRepeatValue;
  
  // 颜色滤镜
  /** 颜色滤镜 */
  color?: ColorValue;
  /** 颜色混合模式 */
  colorBlendMode?: BlendModeValue;
  
  // 性能优化
  /** 缓存宽度 */
  cacheWidth?: number;
  /** 缓存高度 */
  cacheHeight?: number;
  
  // 无障碍
  /** 语义标签 */
  semanticLabel?: string;
  
  /** 唯一标识 */
  id?: string;
}

/**
 * Image组件
 * 对应Flutter的Image widget
 * 
 * @example
 * // 网络图片
 * <Image 
 *   src="https://example.com/image.png" 
 *   srcType="network"
 *   width={300}
 *   height={200}
 *   fit="cover"
 * />
 * 
 * @example
 * // 本地资源
 * <Image 
 *   src="assets/images/logo.png" 
 *   srcType="asset"
 *   width={100}
 *   height={100}
 * />
 * 
 * @example
 * // 带颜色滤镜
 * <Image 
 *   src="https://example.com/image.png"
 *   color={Color.fromRGBO(255, 0, 0, 0.5)}
 *   colorBlendMode="multiply"
 *   fit="contain"
 * />
 */
export const Image: React.FC<ImageProps> = ({
  src,
  srcType = 'network', // 默认为网络图片
  width,
  height,
  fit,
  alignment,
  repeat,
  color,
  colorBlendMode,
  cacheWidth,
  cacheHeight,
  semanticLabel,
  id,
}) => {
  return React.createElement('Image', {
    src,
    srcType,
    width,
    height,
    fit,
    alignment,
    repeat,
    color,
    colorBlendMode,
    cacheWidth,
    cacheHeight,
    semanticLabel,
    id,
  });
};
