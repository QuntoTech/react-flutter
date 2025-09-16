# ElevatedButton 组件

ElevatedButton 是一个 Material Design 风格的按钮组件，具有凸起的外观和丰富的交互状态。

## 基本用法

```jsx
import { ElevatedButton, Text, Color } from '@react-flutter/components';

// 基础按钮
<ElevatedButton onPressed={() => console.log('按钮点击')}>
  <Text text="点击我" />
</ElevatedButton>

// 禁用按钮
<ElevatedButton onPressed={null}>
  <Text text="禁用状态" />
</ElevatedButton>
```

## 使用 StyleSheet

```jsx
import { styleSheet, Color, EdgeInsets } from '@react-flutter/components';

const StyledButton = styleSheet.ElevatedButton({
  backgroundColor: Color.fromRGBO(33, 150, 243, 1.0),
  foregroundColor: Color.white,
  padding: EdgeInsets.symmetric({ horizontal: 24, vertical: 12 }),
  elevation: 4,
  shape: {
    type: 'RoundedRectangleBorder',
    borderRadius: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 }
  }
});

<StyledButton onPressed={() => console.log('样式按钮点击')}>
  <Text text="样式化按钮" />
</StyledButton>
```

## Material 状态管理

ElevatedButton 支持 Material Design 的状态管理，可以为不同状态设置不同的样式：

```jsx
const StatefulButton = styleSheet.ElevatedButton({
  backgroundColor: {
    default: Color.fromRGBO(76, 175, 80, 1.0),    // 默认状态
    pressed: Color.fromRGBO(56, 142, 60, 1.0),    // 按下状态
    hovered: Color.fromRGBO(102, 187, 106, 1.0),  // 悬停状态
    disabled: Color.fromRGBO(189, 189, 189, 1.0)  // 禁用状态
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
  }
});
```

## 属性

### 独立属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `children` | `React.ReactNode` | - | 按钮内容 |
| `onPressed` | `() => void \| null` | - | 点击事件回调，null表示禁用 |
| `onLongPress` | `() => void` | - | 长按事件回调 |
| `onHover` | `(hovering: boolean) => void` | - | 悬停事件回调 |
| `onFocusChange` | `(focused: boolean) => void` | - | 焦点变化事件回调 |
| `autofocus` | `boolean` | `false` | 是否自动获取焦点 |
| `clipBehavior` | `ClipBehaviorValue` | - | 内容裁剪行为 |
| `id` | `string` | - | 组件唯一标识，用于测试 |

### Style 属性

`style` 属性包含所有视觉相关的样式设置：

#### 颜色属性
| 属性名 | 类型 | 说明 |
|--------|------|------|
| `backgroundColor` | `Color \| MaterialStateColor` | 按钮背景色 |
| `foregroundColor` | `Color \| MaterialStateColor` | 按钮前景色（文字、图标） |
| `overlayColor` | `Color \| MaterialStateColor` | 覆盖层颜色（水波纹效果） |
| `shadowColor` | `Color \| MaterialStateColor` | 阴影颜色 |
| `surfaceTintColor` | `Color \| MaterialStateColor` | 表面着色 |

#### 尺寸和间距
| 属性名 | 类型 | 说明 |
|--------|------|------|
| `elevation` | `number \| MaterialStateNumber` | 按钮阴影高度 |
| `padding` | `EdgeInsets \| MaterialStateEdgeInsets` | 内边距 |
| `minimumSize` | `Size \| MaterialStateSize` | 最小尺寸 |
| `fixedSize` | `Size \| MaterialStateSize` | 固定尺寸 |
| `maximumSize` | `Size \| MaterialStateSize` | 最大尺寸 |

#### 形状和边框
| 属性名 | 类型 | 说明 |
|--------|------|------|
| `side` | `BorderSide \| MaterialStateBorderSide` | 边框样式 |
| `shape` | `OutlinedBorder \| MaterialStateShape` | 按钮形状 |

#### 交互和行为
| 属性名 | 类型 | 说明 |
|--------|------|------|
| `mouseCursor` | `MouseCursorValue \| MaterialStateMouseCursor` | 鼠标光标样式 |
| `visualDensity` | `VisualDensityValue` | 视觉密度 |
| `tapTargetSize` | `MaterialTapTargetSizeValue` | 点击目标尺寸 |
| `animationDuration` | `number` | 动画持续时间（毫秒） |
| `enableFeedback` | `boolean` | 是否启用触觉反馈 |
| `alignment` | `AlignmentValue` | 内容对齐方式 |
| `splashFactory` | `InteractiveInkFeatureFactoryValue` | 水波纹工厂 |

## 形状类型

按钮支持多种形状：

```jsx
// 圆角矩形按钮
const RoundedButton = styleSheet.ElevatedButton({
  shape: {
    type: 'RoundedRectangleBorder',
    borderRadius: { topLeft: 16, topRight: 16, bottomRight: 16, bottomLeft: 16 }
  }
});

// 圆形按钮
const CircularButton = styleSheet.ElevatedButton({
  shape: { type: 'CircleBorder' },
  fixedSize: { width: 64, height: 64 }
});

// 体育场形按钮
const StadiumButton = styleSheet.ElevatedButton({
  shape: { type: 'StadiumBorder' }
});
```

## 尺寸变体

```jsx
// 小按钮
const SmallButton = styleSheet.ElevatedButton({
  padding: EdgeInsets.symmetric({ horizontal: 16, vertical: 8 }),
  minimumSize: { width: 64, height: 32 }
});

// 大按钮
const LargeButton = styleSheet.ElevatedButton({
  padding: EdgeInsets.symmetric({ horizontal: 32, vertical: 16 }),
  minimumSize: { width: 200, height: 56 }
});

// 固定尺寸按钮
const FixedButton = styleSheet.ElevatedButton({
  fixedSize: { width: 120, height: 40 }
});
```

## 最佳实践

1. **事件处理**: 使用 `onPressed={null}` 来禁用按钮
2. **Material 状态**: 为不同交互状态提供视觉反馈
3. **无障碍**: 使用 `id` 属性便于测试和无障碍访问
4. **性能**: 使用 StyleSheet 预定义样式而不是内联样式

## 注意事项

- `onPressed` 为 `null` 时按钮自动进入禁用状态
- Material 状态样式支持 `default`、`pressed`、`hovered`、`focused`、`disabled`、`selected`、`dragged`、`error`、`scrolledUnder` 状态
- 使用 `elevation` 控制按钮的立体感，0 表示平面按钮
- `shape` 和 `clipBehavior` 配合使用可以实现复杂的视觉效果

## 相关组件

- [Text](./Text.md) - 按钮文字内容
- [Container](./Container.md) - 按钮布局容器
