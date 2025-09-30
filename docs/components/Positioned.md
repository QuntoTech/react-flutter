# Positioned

Flutter Positioned组件的React定义，用于在Stack中精确控制子组件的位置。

## 组件说明

`Positioned`组件必须作为`Stack`的直接子组件使用，它允许你精确控制子组件在Stack中的位置和尺寸。

## 基本用法

```jsx
import { Stack, Positioned, Container, Color } from '@react-flutter/components';

<Stack>
  <Container style={{
    width: 200,
    height: 100,
    decoration: { color: Color.grey }
  }} />
  <Positioned left={20} top={30}>
    <Container style={{
      width: 80,
      height: 40,
      decoration: { color: Color.green }
    }}>
      <Text text="Positioned" />
    </Container>
  </Positioned>
</Stack>
```

## Props

### children
- 类型：`React.ReactNode`
- 必需：是
- 说明：要定位的子组件（仅支持单个子组件）
- 示例：
```jsx
<Positioned left={10} top={20}>
  <Container />
</Positioned>
```

### left
- 类型：`number`
- 必需：否
- 说明：子组件左边缘距Stack左边缘的距离（像素）
- 示例：
```jsx
<Positioned left={20}>
  <Container />
</Positioned>
```

### top
- 类型：`number`
- 必需：否
- 说明：子组件上边缘距Stack上边缘的距离（像素）
- 示例：
```jsx
<Positioned top={30}>
  <Container />
</Positioned>
```

### right
- 类型：`number`
- 必需：否
- 说明：子组件右边缘距Stack右边缘的距离（像素）
- 示例：
```jsx
<Positioned right={20}>
  <Container />
</Positioned>
```

### bottom
- 类型：`number`
- 必需：否
- 说明：子组件下边缘距Stack下边缘的距离（像素）
- 示例：
```jsx
<Positioned bottom={30}>
  <Container />
</Positioned>
```

### width
- 类型：`number`
- 必需：否
- 说明：子组件的宽度（像素）
- 示例：
```jsx
<Positioned left={20} width={100}>
  <Container />
</Positioned>
```

### height
- 类型：`number`
- 必需：否
- 说明：子组件的高度（像素）
- 示例：
```jsx
<Positioned top={30} height={80}>
  <Container />
</Positioned>
```

### id
- 类型：`string`
- 必需：否
- 说明：组件的唯一标识（用于测试和调试）
- 示例：
```jsx
<Positioned id="my-positioned" left={10}>
  <Container />
</Positioned>
```

## 定位规则

### 水平定位
- 仅设置`left`：从左边定位，宽度由子组件决定
- 仅设置`right`：从右边定位，宽度由子组件决定
- 设置`left`和`right`：拉伸宽度适应
- 设置`left`和`width`：从左边定位，固定宽度
- 设置`right`和`width`：从右边定位，固定宽度

### 垂直定位
- 仅设置`top`：从顶部定位，高度由子组件决定
- 仅设置`bottom`：从底部定位，高度由子组件决定
- 设置`top`和`bottom`：拉伸高度适应
- 设置`top`和`height`：从顶部定位，固定高度
- 设置`bottom`和`height`：从底部定位，固定高度

## 使用场景

### 1. 绝对定位

```jsx
<Stack>
  <Container style={{ width: 200, height: 100, decoration: { color: Color.grey } }} />
  <Positioned left={20} top={30}>
    <Container style={{
      width: 80,
      height: 40,
      decoration: { color: Color.green }
    }}>
      <Text text="定位" />
    </Container>
  </Positioned>
</Stack>
```

### 2. 拉伸适应

```jsx
// 水平拉伸
<Stack>
  <Container style={{ width: 200, height: 100 }} />
  <Positioned left={10} right={10} top={20}>
    <Container style={{
      height: 40,
      decoration: { color: Color.blue }
    }}>
      <Text text="水平拉伸" />
    </Container>
  </Positioned>
</Stack>

// 垂直拉伸
<Stack>
  <Container style={{ width: 200, height: 100 }} />
  <Positioned left={10} top={10} bottom={10}>
    <Container style={{
      width: 60,
      decoration: { color: Color.blue }
    }}>
      <Text text="垂直拉伸" />
    </Container>
  </Positioned>
</Stack>

// 完全拉伸
<Stack>
  <Container style={{ width: 200, height: 100 }} />
  <Positioned left={0} right={0} top={0} bottom={0}>
    <Container style={{ decoration: { color: Color.fromRGBO(0, 0, 0, 0.3) } }}>
      <Text text="覆盖层" />
    </Container>
  </Positioned>
</Stack>
```

### 3. 角落定位

```jsx
<Stack>
  <Container style={{ width: 200, height: 100, decoration: { color: Color.grey } }} />
  
  {/* 左上角 */}
  <Positioned left={10} top={10}>
    <Container style={{
      width: 40,
      height: 40,
      decoration: { color: Color.red }
    }} />
  </Positioned>
  
  {/* 右上角 */}
  <Positioned right={10} top={10}>
    <Container style={{
      width: 40,
      height: 40,
      decoration: { color: Color.green }
    }} />
  </Positioned>
  
  {/* 左下角 */}
  <Positioned left={10} bottom={10}>
    <Container style={{
      width: 40,
      height: 40,
      decoration: { color: Color.blue }
    }} />
  </Positioned>
  
  {/* 右下角 */}
  <Positioned right={10} bottom={10}>
    <Container style={{
      width: 40,
      height: 40,
      decoration: { color: Color.yellow }
    }} />
  </Positioned>
</Stack>
```

### 4. 居中定位

```jsx
// 使用left和top计算居中
<Stack>
  <Container style={{ width: 200, height: 100 }} />
  <Positioned left={75} top={30}>
    <Container style={{
      width: 50,
      height: 40,
      decoration: { color: Color.red }
    }} />
  </Positioned>
</Stack>

// 或使用Stack的alignment
<Stack alignment="center">
  <Container style={{ width: 200, height: 100 }} />
  <Container style={{
    width: 50,
    height: 40,
    decoration: { color: Color.red }
  }} />
</Stack>
```

## 注意事项

1. **必须在Stack中使用**：Positioned组件只能作为Stack的直接子组件，否则会报错

2. **单个子组件**：Positioned只支持单个子组件

3. **定位冲突**：
   - 避免同时设置`left`、`right`和`width`（会导致冲突）
   - 避免同时设置`top`、`bottom`和`height`（会导致冲突）

4. **不影响Stack尺寸**：Positioned子组件不影响Stack的尺寸，Stack的尺寸由非定位子组件决定

5. **性能考虑**：合理使用Positioned，避免过度嵌套

## 相关组件

- [Stack](./Stack.md) - Positioned的父组件
- [Container](./Container.md) - 常用作Positioned的子组件
- [Align](./Align.md) - 另一种定位方式（未实现）

## 与Flutter API对齐

本组件完全对齐Flutter Positioned API：
- [Flutter Positioned文档](https://api.flutter.dev/flutter/widgets/Positioned-class.html)

所有属性和行为与Flutter保持一致。
