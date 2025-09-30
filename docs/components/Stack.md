# Stack

Flutter Stack组件的React定义，用于实现层叠布局。

## 组件说明

`Stack`组件允许多个子组件层叠在一起，后面的子组件会覆盖前面的子组件。可以结合`Positioned`组件精确控制子组件的位置。

## 基本用法

```jsx
import { Stack, Container, Text, Color } from '@react-flutter/components';

// 基本层叠布局
<Stack alignment="center">
  <Container style={{
    width: 200,
    height: 150,
    decoration: { color: Color.blue }
  }} />
  <Container style={{
    width: 120,
    height: 80,
    decoration: { color: Color.red }
  }} />
  <Container style={{
    width: 60,
    height: 40,
    decoration: { color: Color.yellow }
  }}>
    <Text text="Top" />
  </Container>
</Stack>
```

## Props

### children
- 类型：`React.ReactNode`
- 必需：是
- 说明：要层叠的子组件列表
- 示例：
```jsx
<Stack>
  <Container />
  <Text text="Overlay" />
</Stack>
```

### alignment
- 类型：`AlignmentValue`
- 必需：否
- 默认值：`'topLeft'`
- 说明：子组件在Stack中的对齐方式
- 可选值：
  - `'topLeft'` - 左上对齐
  - `'topCenter'` - 顶部居中
  - `'topRight'` - 右上对齐
  - `'centerLeft'` - 左侧居中
  - `'center'` - 居中
  - `'centerRight'` - 右侧居中
  - `'bottomLeft'` - 左下对齐
  - `'bottomCenter'` - 底部居中
  - `'bottomRight'` - 右下对齐
- 示例：
```jsx
<Stack alignment="center">
  <Container />
  <Text text="Centered" />
</Stack>
```

### fit
- 类型：`StackFitValue`
- 必需：否
- 默认值：`'loose'`
- 说明：非定位子组件的尺寸适配方式
- 可选值：
  - `'loose'` - 子组件保持自然尺寸
  - `'expand'` - 子组件扩展填充Stack
  - `'passthrough'` - 传递约束给子组件
- 示例：
```jsx
<Stack fit="expand">
  <Container />
</Stack>
```

### clipBehavior
- 类型：`ClipBehaviorValue`
- 必需：否
- 默认值：`'none'`
- 说明：裁剪行为
- 可选值：
  - `'none'` - 不裁剪
  - `'hardEdge'` - 硬边裁剪
  - `'antiAlias'` - 抗锯齿裁剪
  - `'antiAliasWithSaveLayer'` - 带保存层的抗锯齿裁剪
- 示例：
```jsx
<Stack clipBehavior="antiAlias">
  <Container />
</Stack>
```

### id
- 类型：`string`
- 必需：否
- 说明：组件的唯一标识（用于测试和调试）
- 示例：
```jsx
<Stack id="my-stack">
  <Container />
</Stack>
```

## 使用场景

### 1. 多层Container层叠

```jsx
<Stack alignment="center">
  <Container 
    style={{
      width: 200,
      height: 100,
      decoration: { color: Color.blue }
    }}
  />
  <Container 
    style={{
      width: 140,
      height: 70,
      decoration: { color: Color.red }
    }}
  />
  <Container 
    style={{
      width: 80,
      height: 40,
      decoration: { color: Color.yellow }
    }}
  >
    <Text text="Top Layer" />
  </Container>
</Stack>
```

### 2. 结合Positioned精确定位

```jsx
import { Stack, Positioned, Container } from '@react-flutter/components';

<Stack>
  <Container 
    style={{
      width: 200,
      height: 100,
      decoration: { color: Color.grey }
    }}
  />
  <Positioned left={20} top={30} width={80} height={40}>
    <Container style={{ decoration: { color: Color.green } }}>
      <Text text="Positioned" />
    </Container>
  </Positioned>
</Stack>
```

### 3. 不同alignment效果

```jsx
// 左上对齐
<Stack alignment="topLeft">
  <Container style={{ width: 100, height: 100 }} />
  <Container style={{ width: 50, height: 50, decoration: { color: Color.red } }} />
</Stack>

// 居中对齐
<Stack alignment="center">
  <Container style={{ width: 100, height: 100 }} />
  <Container style={{ width: 50, height: 50, decoration: { color: Color.red } }} />
</Stack>

// 右下对齐
<Stack alignment="bottomRight">
  <Container style={{ width: 100, height: 100 }} />
  <Container style={{ width: 50, height: 50, decoration: { color: Color.red } }} />
</Stack>
```

### 4. 不同fit效果

```jsx
// loose: 子组件保持自然尺寸
<Container style={{ width: 200, height: 100 }}>
  <Stack fit="loose">
    <Container style={{
      width: 100,
      height: 50,
      decoration: { color: Color.blue }
    }} />
  </Stack>
</Container>

// expand: 子组件扩展填充
<Container style={{ width: 200, height: 100 }}>
  <Stack fit="expand">
    <Container style={{ decoration: { color: Color.blue } }} />
  </Stack>
</Container>
```

## 注意事项

1. **层叠顺序**：子组件按照在children数组中的顺序层叠，后面的组件会覆盖前面的组件

2. **尺寸约束**：
   - Stack的尺寸由其非定位子组件决定
   - Positioned子组件不影响Stack的尺寸

3. **alignment vs Positioned**：
   - `alignment`影响所有非定位子组件
   - `Positioned`可以精确控制单个子组件的位置

4. **性能考虑**：
   - 避免在Stack中放置过多子组件
   - 合理使用`clipBehavior`以平衡性能和视觉效果

## 相关组件

- [Positioned](./Positioned.md) - Stack中精确定位子组件
- [Container](./Container.md) - 常用作Stack的子组件
- [Column](./Column.md) - 垂直线性布局
- [Row](./Row.md) - 水平线性布局

## 与Flutter API对齐

本组件完全对齐Flutter Stack API：
- [Flutter Stack文档](https://api.flutter.dev/flutter/widgets/Stack-class.html)

所有属性和行为与Flutter保持一致。
