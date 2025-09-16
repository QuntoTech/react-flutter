import { EdgeInsets, styleSheet, Color, BorderRadius, Border, BorderSide } from '@react-flutter/components';

export const CardContainer = styleSheet.Container({
    // 使用EdgeInsets.symmetric 
    padding: EdgeInsets.symmetric({ vertical: 24, horizontal: 32 }),
    margin: EdgeInsets.all(16),
    decoration: {
      color: Color.white,  // 颜色应该在decoration内部
      borderRadius: BorderRadius.circular(12),
      border: Border.all({ width: 2, color: Color.fromRGBO(33, 150, 243, 1.0) })
    }
});

// 基础样式卡片
export const BasicStyleCard = styleSheet.Container({
  width: 250,
  height: 80,
  padding: EdgeInsets.all(15),
  margin: EdgeInsets.all(10),
  decoration: {
    color: Color.fromRGBO(33, 150, 243, 1.0),
    borderRadius: { topLeft: 15, topRight: 15, bottomRight: 15, bottomLeft: 15 },
    boxShadow: [{
      color: Color.fromRGBO(0, 0, 0, 0.3),
      blurRadius: 8,
      offset: { dx: 0, dy: 4 },
      spreadRadius: 1,
      blurStyle: 'normal'
    }],
    border: {
      top: { color: Color.white, width: 2, style: 'solid' },
      right: { color: Color.white, width: 2, style: 'solid' },
      bottom: { color: Color.white, width: 2, style: 'solid' },
      left: { color: Color.white, width: 2, style: 'solid' }
    }
  }
});

// 线性渐变卡片
export const LinearGradientCard = styleSheet.Container({
  width: 250,
  height: 80,
  padding: EdgeInsets.all(15),
  margin: EdgeInsets.all(10),
  decoration: {
    gradient: {
      type: 'linear',
      colors: [
        Color.fromRGBO(255, 87, 34, 1.0),   // 橙色
        Color.fromRGBO(255, 193, 7, 1.0)    // 黄色
      ],
      begin: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      tileMode: 'clamp'
    },
    borderRadius: { topLeft: 15, topRight: 15, bottomRight: 15, bottomLeft: 15 }
  }
});

// 径向渐变卡片
export const RadialGradientCard = styleSheet.Container({
  width: 250,
  height: 80,
  padding: EdgeInsets.all(15),
  margin: EdgeInsets.all(10),
  decoration: {
    gradient: {
      type: 'radial',
      colors: [
        Color.fromRGBO(156, 39, 176, 1.0),   // 紫色
        Color.fromRGBO(63, 81, 181, 1.0)     // 蓝紫色
      ],
      center: { x: 0.5, y: 0.5 },
      radius: 0.8,
      tileMode: 'clamp'
    },
    borderRadius: { topLeft: 15, topRight: 15, bottomRight: 15, bottomLeft: 15 }
  }
});

// 主要滚动视图
export const MainScrollView = styleSheet.SingleChildScrollView({
  padding: EdgeInsets.all(8)
});

// 圆形容器
export const CircleCard = styleSheet.Container({
  width: 100,
  height: 100,
  margin: EdgeInsets.all(10),
  decoration: {
    gradient: {
      type: 'radial',
      colors: [Color.fromRGBO(255, 193, 7, 1.0), Color.fromRGBO(255, 87, 34, 1.0)],
      center: { x: 0.5, y: 0.5 },
      radius: 0.8
    },
    shape: 'circle'
  }
});

// 对齐演示容器
export const AlignmentCard = styleSheet.Container({
  width: 280,
  height: 120,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.all(10),
  decoration: {
    color: Color.fromRGBO(233, 30, 99, 1.0),
    borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 }
  },
  alignment: 'bottomRight'
});

// 约束演示容器
export const ConstraintsCard = styleSheet.Container({
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.all(10),
  constraints: {
    minWidth: 150,
    maxWidth: 300,
    minHeight: 80,
    maxHeight: 120
  },
  decoration: {
    color: Color.fromRGBO(139, 195, 74, 1.0),
    borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 }
  }
});

// 前景装饰容器
export const ForegroundDecorationCard = styleSheet.Container({
  width: 280,
  height: 120,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.all(10),
  decoration: {
    color: Color.fromRGBO(63, 81, 181, 1.0),
    borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 }
  },
  foregroundDecoration: {
    border: {
      top: { color: Color.fromRGBO(255, 193, 7, 1.0), width: 3, style: 'solid' },
      right: { color: Color.fromRGBO(255, 193, 7, 1.0), width: 3, style: 'solid' },
      bottom: { color: Color.fromRGBO(255, 193, 7, 1.0), width: 3, style: 'solid' },
      left: { color: Color.fromRGBO(255, 193, 7, 1.0), width: 3, style: 'solid' }
    },
    borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 }
  }
});

// 裁剪行为容器
export const ClipBehaviorCard = styleSheet.Container({
  width: 200,
  height: 80,
  margin: EdgeInsets.all(10),
  decoration: {
    color: Color.fromRGBO(156, 39, 176, 1.0),  // 紫色背景
    borderRadius: { topLeft: 20, topRight: 20, bottomRight: 20, bottomLeft: 20 }
  },
  clipBehavior: 'antiAlias'  // 抗锯齿裁剪
});

// 内部溢出容器（用于ClipBehavior演示）
export const OverflowContainer = styleSheet.Container({
  width: 300,  // 故意超出父容器宽度
  height: 120, // 故意超出父容器高度
  decoration: {
    color: Color.fromRGBO(255, 235, 59, 0.8)  // 半透明黄色，展示裁剪效果
  }
});

// 变换中心点容器
export const TransformAlignmentCard = styleSheet.Container({
  width: 200,
  height: 80,
  margin: EdgeInsets.all(10),
  decoration: {
    color: Color.fromRGBO(255, 87, 34, 1.0),  // 橙红色背景
    borderRadius: { topLeft: 10, topRight: 10, bottomRight: 10, bottomLeft: 10 }
  },
  transformAlignment: 'topLeft'  // 设置变换中心点为左上角
});

// 变换演示容器
export const TransformCard = styleSheet.Container({
  width: 150,
  height: 60,
  margin: EdgeInsets.all(20),
  decoration: {
    color: Color.fromRGBO(121, 85, 72, 1.0),  // 棕色背景
    borderRadius: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 }
  },
  transformAlignment: 'center',
  transform: [
    1.2, 0.0, 0.0, 0.0,    // 缩放X=1.2
    0.0, 1.2, 0.0, 0.0,    // 缩放Y=1.2
    0.0, 0.0, 1.0, 0.0,    // Z轴不变
    0.0, 0.0, 0.0, 1.0     // 齐次坐标
  ]
});

// Column演示容器
export const ColumnDemoCard = styleSheet.Container({
  width: 280,
  height: 180,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.all(10),
  decoration: {
    color: Color.fromRGBO(76, 175, 80, 1.0),
    borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 }
  }
});

// Column内部项目容器
export const ColumnItem1 = styleSheet.Container({
  width: 60, 
  height: 20,
  decoration: { 
    color: Color.fromRGBO(255, 255, 255, 0.8) 
  }
});

export const ColumnItem2 = styleSheet.Container({
  width: 80, 
  height: 20,
  decoration: { 
    color: Color.fromRGBO(255, 255, 255, 0.8) 
  }
});

export const ColumnItem3 = styleSheet.Container({
  width: 100, 
  height: 20,
  decoration: { 
    color: Color.fromRGBO(255, 255, 255, 0.8) 
  }
});

// Row演示容器
export const RowDemoCard = styleSheet.Container({
  width: 300,
  height: 120,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.all(10),
  decoration: {
    color: Color.fromRGBO(96, 125, 139, 1.0),  // 蓝灰色
    borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 }
  }
});

// Row内部项目容器
export const RowItem1 = styleSheet.Container({
  width: 50, 
  height: 40,
  decoration: { 
    color: Color.fromRGBO(255, 255, 255, 0.8),
    borderRadius: { topLeft: 6, topRight: 6, bottomRight: 6, bottomLeft: 6 }
  }
});

export const RowItem2 = styleSheet.Container({
  width: 60, 
  height: 40,
  decoration: { 
    color: Color.fromRGBO(255, 255, 255, 0.8),
    borderRadius: { topLeft: 6, topRight: 6, bottomRight: 6, bottomLeft: 6 }
  }
});

export const RowItem3 = styleSheet.Container({
  width: 70,
  height: 40,
  decoration: {
    color: Color.fromRGBO(255, 255, 255, 0.8),
    borderRadius: { topLeft: 6, topRight: 6, bottomRight: 6, bottomLeft: 6 }
  }
});

// Text组件演示样式
export const TextDemoCard = styleSheet.Container({
  width: 300,
  height: 200,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.all(10),
  decoration: {
    color: Color.fromRGBO(63, 81, 181, 1.0),  // 靛蓝色
    borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 }
  }
});

export const TitleText = styleSheet.Text({
  fontSize: 18,
  fontWeight: 'bold',
  color: Color.white
});

export const BodyText = styleSheet.Text({
  fontSize: 14,
  color: Color.fromRGBO(255, 255, 255, 0.9),
  height: 1.5  // 行高
});

export const StyledText = styleSheet.Text({
  fontSize: 16,
  fontWeight: '600',
  color: Color.fromRGBO(255, 193, 7, 1.0),  // 金色
  decoration: 'underline',
  letterSpacing: 1.2
});

export const EllipsisText = styleSheet.Text({
  fontSize: 12,
  color: Color.fromRGBO(255, 255, 255, 0.7),
  fontStyle: 'italic'
});

// SizedBox演示容器和样式
export const SizedBoxDemoCard = styleSheet.Container({
  width: 300,
  height: 250,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.all(10),
  decoration: {
    color: Color.fromRGBO(156, 39, 176, 1.0),  // 紫色
    borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 }
  }
});

// 固定尺寸演示框
export const FixedSizeBox = styleSheet.Container({
  decoration: {
    color: Color.fromRGBO(255, 255, 255, 0.9),
    borderRadius: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 }
  }
});

// 间距演示框  
export const SpacerBox = styleSheet.Container({
  decoration: {
    color: Color.fromRGBO(255, 193, 7, 0.6),  // 半透明金色
    borderRadius: { topLeft: 4, topRight: 4, bottomRight: 4, bottomLeft: 4 }
  }
});

// ElevatedButton演示容器
export const ElevatedButtonDemoCard = styleSheet.Container({
  width: 320,
  height: 280,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.all(10),
  decoration: {
    color: Color.fromRGBO(103, 58, 183, 1.0),  // 深紫色
    borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 }
  }
});

// 基础ElevatedButton
export const BasicElevatedButton = styleSheet.ElevatedButton({
  backgroundColor: Color.fromRGBO(33, 150, 243, 1.0),  // 蓝色背景
  foregroundColor: Color.white,                        // 白色文字
  padding: EdgeInsets.symmetric({ horizontal: 24, vertical: 12 }),
  shape: {
    type: 'RoundedRectangleBorder',
    borderRadius: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 }
  },
  elevation: 4
});

// Material状态按钮 - 展示不同状态的颜色
export const StatefulElevatedButton = styleSheet.ElevatedButton({
  backgroundColor: {
    default: Color.fromRGBO(76, 175, 80, 1.0),    // 默认绿色
    pressed: Color.fromRGBO(56, 142, 60, 1.0),    // 按下时深绿色
    hovered: Color.fromRGBO(102, 187, 106, 1.0),  // 悬停时浅绿色
    disabled: Color.fromRGBO(189, 189, 189, 1.0)  // 禁用时灰色
  },
  foregroundColor: {
    default: Color.white,
    disabled: Color.fromRGBO(158, 158, 158, 1.0)
  },
  elevation: {
    default: 6,
    pressed: 12,
    hovered: 8,
    disabled: 0
  },
  padding: EdgeInsets.symmetric({ horizontal: 20, vertical: 14 }),
  shape: {
    type: 'RoundedRectangleBorder',
    borderRadius: { topLeft: 16, topRight: 16, bottomRight: 16, bottomLeft: 16 }
  }
});

// 大尺寸按钮
export const LargeElevatedButton = styleSheet.ElevatedButton({
  backgroundColor: Color.fromRGBO(255, 87, 34, 1.0),  // 橙色
  foregroundColor: Color.white,
  minimumSize: { width: 200, height: 56 },
  padding: EdgeInsets.symmetric({ horizontal: 32, vertical: 16 }),
  shape: {
    type: 'RoundedRectangleBorder',
    borderRadius: { topLeft: 28, topRight: 28, bottomRight: 28, bottomLeft: 28 }
  },
  elevation: 8
});

// 圆形按钮
export const CircularElevatedButton = styleSheet.ElevatedButton({
  backgroundColor: Color.fromRGBO(156, 39, 176, 1.0),  // 紫色
  foregroundColor: Color.white,
  fixedSize: { width: 64, height: 64 },
  shape: {
    type: 'CircleBorder'
  },
  elevation: 6
});