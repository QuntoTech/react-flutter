# Row 组件

Row组件是Flutter风格的水平布局组件，用于将子组件按水平方向排列。

## 基本用法

```jsx
import { Row } from '@react-flutter/components';

function MyComponent() {
  return (
    <Row>
      <Text text="项目A" />
      <Text text="项目B" />
      <Text text="项目C" />
    </Row>
  );
}
```

## 属性

Row组件支持以下属性（所有属性都是独立属性，无style属性）：

### 布局属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `mainAxisAlignment` | `MainAxisAlignmentValue` | `'start'` | 主轴（水平）方向的对齐方式 |
| `crossAxisAlignment` | `CrossAxisAlignmentValue` | `'center'` | 交叉轴（垂直）方向的对齐方式 |
| `mainAxisSize` | `MainAxisSizeValue` | `'max'` | 主轴方向占用的空间大小 |

### 方向属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `textDirection` | `TextDirectionValue` | `'ltr'` | 文本方向，影响start/end的含义 |
| `verticalDirection` | `VerticalDirectionValue` | `'down'` | 垂直方向，影响子组件的排列顺序 |
| `textBaseline` | `TextBaselineValue` | `null` | 文本基线，用于baseline对齐 |

### 通用属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `id` | `string` | `undefined` | 组件标识符，用于测试和调试 |
| `children` | `ReactNode` | `undefined` | 子组件 |

## 属性值枚举

### MainAxisAlignment（主轴对齐）

- `'start'` - 起始位置对齐（默认）
- `'end'` - 结束位置对齐  
- `'center'` - 居中对齐
- `'spaceBetween'` - 两端对齐，中间平分空间
- `'spaceAround'` - 每个子组件周围分配相等空间
- `'spaceEvenly'` - 所有空间平均分配

### CrossAxisAlignment（交叉轴对齐）

- `'start'` - 交叉轴起始位置对齐
- `'end'` - 交叉轴结束位置对齐
- `'center'` - 交叉轴居中对齐（默认）
- `'stretch'` - 拉伸填满交叉轴
- `'baseline'` - 按文本基线对齐

### MainAxisSize（主轴大小）

- `'min'` - 最小空间，紧贴内容
- `'max'` - 最大空间，填满可用空间（默认）

## 使用示例

### 基础布局

```jsx
<Row
  mainAxisAlignment="center"
  crossAxisAlignment="start"
>
  <Text text="按钮1" />
  <Text text="按钮2" />
  <Text text="按钮3" />
</Row>
```

### 空间分配

```jsx
<Row
  mainAxisAlignment="spaceBetween"
  crossAxisAlignment="stretch"
  mainAxisSize="max"
>
  <Container style={{ width: 50, color: Color.red }} />
  <Container style={{ width: 50, color: Color.green }} />
  <Container style={{ width: 50, color: Color.blue }} />
</Row>
```

### 文本基线对齐

```jsx
<Row
  crossAxisAlignment="baseline"
  textBaseline="alphabetic"
>
  <Text text="大" style={{ fontSize: 24 }} />
  <Text text="中" style={{ fontSize: 18 }} />
  <Text text="小" style={{ fontSize: 12 }} />
</Row>
```

### 方向控制

```jsx
<Row
  textDirection="rtl"
  verticalDirection="up"
>
  <Text text="右到左" />
  <Text text="排列" />
  <Text text="示例" />
</Row>
```

### 紧凑布局

```jsx
<Row
  mainAxisSize="min"
  mainAxisAlignment="center"
>
  <Container style={{ width: 30, height: 30, color: Color.red }} />
  <Container style={{ width: 30, height: 30, color: Color.green }} />
</Row>
```

## Row vs Column 对比

| 特性 | Row | Column |
|------|-----|--------|
| 主轴方向 | 水平（horizontal） | 垂直（vertical） |
| 交叉轴方向 | 垂直（vertical） | 水平（horizontal） |
| 典型用途 | 导航栏、按钮组、工具栏 | 表单、列表、页面布局 |
| 溢出行为 | 水平滚动或溢出警告 | 垂直滚动或溢出警告 |

## 设计原则

1. **纯布局组件** - Row只负责布局，不包含视觉样式
2. **Flutter API对齐** - 所有属性与Flutter Row Widget完全一致
3. **独立属性** - 所有属性都是独立的props，无style属性
4. **类型安全** - 使用TypeScript严格类型定义，确保类型安全

## 注意事项

1. Row组件没有`style`属性，所有属性都是独立的props
2. 主轴是水平方向，交叉轴是垂直方向
3. `textDirection`会影响`start`/`end`的实际方向（LTR vs RTL）
4. 使用`baseline`对齐时需要设置`textBaseline`属性
5. `mainAxisSize`为`min`时，Row会收缩到内容大小
6. 当内容超出屏幕宽度时，Flutter会显示溢出警告（黄黑条纹）

## 相关组件

- [Column](./Column.md) - 垂直布局组件
- [Container](./Container.md) - 容器组件，可包含单个子组件
- [SingleChildScrollView](./SingleChildScrollView.md) - 可滚动容器组件
