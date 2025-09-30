/**
 * Flutter GestureDetector组件的React实现
 * 完全对齐Flutter GestureDetector API
 */

import * as React from 'react';
import type {
  TapDownDetails,
  TapUpDetails,
  DragStartDetails,
  DragUpdateDetails,
  DragEndDetails,
  DragDownDetails,
  ScaleStartDetails,
  ScaleUpdateDetails,
  ScaleEndDetails,
  LongPressStartDetails,
  LongPressMoveUpdateDetails,
  LongPressEndDetails,
  ForcePressDetails,
  HitTestBehaviorValue,
  DragStartBehaviorValue,
  PointerDeviceKindValue,
} from './styles/types';

export interface GestureDetectorProps {
  children?: React.ReactNode;
  
  // ===== Tap手势 =====
  /** 单击回调 */
  onTap?: () => void;
  /** 单击按下回调 */
  onTapDown?: (details: TapDownDetails) => void;
  /** 单击抬起回调 */
  onTapUp?: (details: TapUpDetails) => void;
  /** 单击取消回调 */
  onTapCancel?: () => void;
  
  // ===== DoubleTap双击手势 =====
  /** 双击回调 */
  onDoubleTap?: () => void;
  /** 双击按下回调 */
  onDoubleTapDown?: (details: TapDownDetails) => void;
  /** 双击取消回调 */
  onDoubleTapCancel?: () => void;
  
  // ===== LongPress长按手势 =====
  /** 长按回调 */
  onLongPress?: () => void;
  /** 长按开始回调 */
  onLongPressStart?: (details: LongPressStartDetails) => void;
  /** 长按移动更新回调 */
  onLongPressMoveUpdate?: (details: LongPressMoveUpdateDetails) => void;
  /** 长按抬起回调 */
  onLongPressUp?: () => void;
  /** 长按结束回调 */
  onLongPressEnd?: (details: LongPressEndDetails) => void;
  /** 长按取消回调 */
  onLongPressCancel?: () => void;
  
  // ===== Secondary Tap次要点击（右键）手势 =====
  /** 次要点击按下回调 */
  onSecondaryTap?: () => void;
  /** 次要点击按下回调 */
  onSecondaryTapDown?: (details: TapDownDetails) => void;
  /** 次要点击抬起回调 */
  onSecondaryTapUp?: (details: TapUpDetails) => void;
  /** 次要点击取消回调 */
  onSecondaryTapCancel?: () => void;
  
  // ===== Tertiary Tap第三按键点击（中键）手势 =====
  /** 第三按键点击按下回调 */
  onTertiaryTapDown?: (details: TapDownDetails) => void;
  /** 第三按键点击抬起回调 */
  onTertiaryTapUp?: (details: TapUpDetails) => void;
  /** 第三按键点击取消回调 */
  onTertiaryTapCancel?: () => void;
  
  // ===== Secondary LongPress次要长按（右键长按）手势 =====
  /** 次要长按回调 */
  onSecondaryLongPress?: () => void;
  /** 次要长按开始回调 */
  onSecondaryLongPressStart?: (details: LongPressStartDetails) => void;
  /** 次要长按移动更新回调 */
  onSecondaryLongPressMoveUpdate?: (details: LongPressMoveUpdateDetails) => void;
  /** 次要长按抬起回调 */
  onSecondaryLongPressUp?: () => void;
  /** 次要长按结束回调 */
  onSecondaryLongPressEnd?: (details: LongPressEndDetails) => void;
  
  // ===== Tertiary LongPress第三按键长按（中键长按）手势 =====
  /** 第三按键长按回调 */
  onTertiaryLongPress?: () => void;
  /** 第三按键长按开始回调 */
  onTertiaryLongPressStart?: (details: LongPressStartDetails) => void;
  /** 第三按键长按移动更新回调 */
  onTertiaryLongPressMoveUpdate?: (details: LongPressMoveUpdateDetails) => void;
  /** 第三按键长按抬起回调 */
  onTertiaryLongPressUp?: () => void;
  /** 第三按键长按结束回调 */
  onTertiaryLongPressEnd?: (details: LongPressEndDetails) => void;
  
  // ===== Pan拖拽手势（同时支持水平和垂直）=====
  /** 拖拽按下回调 */
  onPanDown?: (details: DragDownDetails) => void;
  /** 拖拽开始回调 */
  onPanStart?: (details: DragStartDetails) => void;
  /** 拖拽更新回调 */
  onPanUpdate?: (details: DragUpdateDetails) => void;
  /** 拖拽结束回调 */
  onPanEnd?: (details: DragEndDetails) => void;
  /** 拖拽取消回调 */
  onPanCancel?: () => void;
  
  // ===== HorizontalDrag水平拖拽手势 =====
  /** 水平拖拽按下回调 */
  onHorizontalDragDown?: (details: DragDownDetails) => void;
  /** 水平拖拽开始回调 */
  onHorizontalDragStart?: (details: DragStartDetails) => void;
  /** 水平拖拽更新回调 */
  onHorizontalDragUpdate?: (details: DragUpdateDetails) => void;
  /** 水平拖拽结束回调 */
  onHorizontalDragEnd?: (details: DragEndDetails) => void;
  /** 水平拖拽取消回调 */
  onHorizontalDragCancel?: () => void;
  
  // ===== VerticalDrag垂直拖拽手势 =====
  /** 垂直拖拽按下回调 */
  onVerticalDragDown?: (details: DragDownDetails) => void;
  /** 垂直拖拽开始回调 */
  onVerticalDragStart?: (details: DragStartDetails) => void;
  /** 垂直拖拽更新回调 */
  onVerticalDragUpdate?: (details: DragUpdateDetails) => void;
  /** 垂直拖拽结束回调 */
  onVerticalDragEnd?: (details: DragEndDetails) => void;
  /** 垂直拖拽取消回调 */
  onVerticalDragCancel?: () => void;
  
  // ===== Scale缩放/旋转手势 =====
  /** 缩放开始回调 */
  onScaleStart?: (details: ScaleStartDetails) => void;
  /** 缩放更新回调 */
  onScaleUpdate?: (details: ScaleUpdateDetails) => void;
  /** 缩放结束回调 */
  onScaleEnd?: (details: ScaleEndDetails) => void;
  
  // ===== ForcePress力度按压手势（3D Touch / Haptic Touch）=====
  /** 力度按压开始回调 */
  onForcePressStart?: (details: ForcePressDetails) => void;
  /** 力度按压峰值回调 */
  onForcePressPeak?: (details: ForcePressDetails) => void;
  /** 力度按压更新回调 */
  onForcePressUpdate?: (details: ForcePressDetails) => void;
  /** 力度按压结束回调 */
  onForcePressEnd?: (details: ForcePressDetails) => void;
  
  // ===== 行为控制属性 =====
  /** 命中测试行为 */
  behavior?: HitTestBehaviorValue;
  /** 是否排除无障碍树 */
  excludeFromSemantics?: boolean;
  /** 拖拽开始行为 */
  dragStartBehavior?: DragStartBehaviorValue;
  /** 触控板滚动是否触发缩放手势 */
  trackpadScrollCausesScale?: boolean;
  /** 触控板滚动到缩放的转换因子 */
  trackpadScrollToScaleFactor?: number;
  /** 支持的设备类型列表 */
  supportedDevices?: PointerDeviceKindValue[];
  
  /** 唯一标识（映射为Flutter Key） */
  id?: string;
}

export const GestureDetector: React.FC<GestureDetectorProps> = ({
  children,
  
  // Tap手势
  onTap,
  onTapDown,
  onTapUp,
  onTapCancel,
  
  // DoubleTap手势
  onDoubleTap,
  onDoubleTapDown,
  onDoubleTapCancel,
  
  // LongPress手势
  onLongPress,
  onLongPressStart,
  onLongPressMoveUpdate,
  onLongPressUp,
  onLongPressEnd,
  onLongPressCancel,
  
  // SecondaryTap手势
  onSecondaryTap,
  onSecondaryTapDown,
  onSecondaryTapUp,
  onSecondaryTapCancel,
  
  // TertiaryTap手势
  onTertiaryTapDown,
  onTertiaryTapUp,
  onTertiaryTapCancel,
  
  // SecondaryLongPress手势
  onSecondaryLongPress,
  onSecondaryLongPressStart,
  onSecondaryLongPressMoveUpdate,
  onSecondaryLongPressUp,
  onSecondaryLongPressEnd,
  
  // TertiaryLongPress手势
  onTertiaryLongPress,
  onTertiaryLongPressStart,
  onTertiaryLongPressMoveUpdate,
  onTertiaryLongPressUp,
  onTertiaryLongPressEnd,
  
  // Pan手势
  onPanDown,
  onPanStart,
  onPanUpdate,
  onPanEnd,
  onPanCancel,
  
  // HorizontalDrag手势
  onHorizontalDragDown,
  onHorizontalDragStart,
  onHorizontalDragUpdate,
  onHorizontalDragEnd,
  onHorizontalDragCancel,
  
  // VerticalDrag手势
  onVerticalDragDown,
  onVerticalDragStart,
  onVerticalDragUpdate,
  onVerticalDragEnd,
  onVerticalDragCancel,
  
  // Scale手势
  onScaleStart,
  onScaleUpdate,
  onScaleEnd,
  
  // ForcePress手势
  onForcePressStart,
  onForcePressPeak,
  onForcePressUpdate,
  onForcePressEnd,
  
  // 行为控制
  behavior,
  excludeFromSemantics,
  dragStartBehavior,
  trackpadScrollCausesScale,
  trackpadScrollToScaleFactor,
  supportedDevices,
  
  id,
  ...props
}) => {
  return React.createElement('GestureDetector', {
    // Tap手势
    onTap,
    onTapDown,
    onTapUp,
    onTapCancel,
    
    // DoubleTap手势
    onDoubleTap,
    onDoubleTapDown,
    onDoubleTapCancel,
    
    // LongPress手势
    onLongPress,
    onLongPressStart,
    onLongPressMoveUpdate,
    onLongPressUp,
    onLongPressEnd,
    onLongPressCancel,
    
    // SecondaryTap手势
    onSecondaryTap,
    onSecondaryTapDown,
    onSecondaryTapUp,
    onSecondaryTapCancel,
    
    // TertiaryTap手势
    onTertiaryTapDown,
    onTertiaryTapUp,
    onTertiaryTapCancel,
    
    // SecondaryLongPress手势
    onSecondaryLongPress,
    onSecondaryLongPressStart,
    onSecondaryLongPressMoveUpdate,
    onSecondaryLongPressUp,
    onSecondaryLongPressEnd,
    
    // TertiaryLongPress手势
    onTertiaryLongPress,
    onTertiaryLongPressStart,
    onTertiaryLongPressMoveUpdate,
    onTertiaryLongPressUp,
    onTertiaryLongPressEnd,
    
    // Pan手势
    onPanDown,
    onPanStart,
    onPanUpdate,
    onPanEnd,
    onPanCancel,
    
    // HorizontalDrag手势
    onHorizontalDragDown,
    onHorizontalDragStart,
    onHorizontalDragUpdate,
    onHorizontalDragEnd,
    onHorizontalDragCancel,
    
    // VerticalDrag手势
    onVerticalDragDown,
    onVerticalDragStart,
    onVerticalDragUpdate,
    onVerticalDragEnd,
    onVerticalDragCancel,
    
    // Scale手势
    onScaleStart,
    onScaleUpdate,
    onScaleEnd,
    
    // ForcePress手势
    onForcePressStart,
    onForcePressPeak,
    onForcePressUpdate,
    onForcePressEnd,
    
    // 行为控制
    behavior,
    excludeFromSemantics,
    dragStartBehavior,
    trackpadScrollCausesScale,
    trackpadScrollToScaleFactor,
    supportedDevices,
    
    id,
    ...props
  }, children);
};
