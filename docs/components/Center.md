# Center

Flutter Center组件的React定义，用于将子组件在水平和垂直方向上居中对齐。

## 组件说明

`Center`是一个便捷的居中布局组件，它将其子组件在可用空间的中心位置对齐。本质上，`Center`是`Align(alignment: Alignment.center)`的简写形式。

## 基本用法

```jsx
import { Center, Container, Color } from '@react-flutter/components';

<Center>
  <Container style={{
    width: 100,
    height: 100,
    decoration: { color: Color.blue }
  }} />
</Center>
```

## Props

### children
- 类型：`React.ReactNode`
- 必需：是
- 说明：要居中的子组件（仅支持单个子组件）
- 示例：
```jsx
<Center>
  <Container />
</Center>
```

### widthFactor
- 类型：`number`
- 必需：否
- 默认值：`null`
- 说明：宽度因子。如果非null，Center的宽度将是子组件宽度的倍数
- 取值范围：≥ 0
- 示例：
```jsx
// Center宽度 = 子组件宽度 × 2.0
<Center widthFactor={2.0}>
  <Container style={{ width: 50, height: 50 }} />
</Center>
```

### heightFactor
- 类型：`number`
- 必需：否
- 默认值：`null`
- 说明：高度因子。如果非null，Center的高度将是子组件高度的倍数
- 取值范围：≥ 0
- 示例：
```jsx
// Center高度 = 子组件高度 × 2.0
<Center heightFactor={2.0}>
  <Container style={{ width: 50, height: 50 }} />
</Center>
```

### id
- 类型：`string`
- 必需：否
- 说明：组件的唯一标识（用于测试和调试）
- 示例：
```jsx
<Center id="my-center">
  <Container />
</Center>
```

## 尺寸行为

### 默认行为（无因子）
当`widthFactor`和`heightFactor`都为`null`时，Center会尽可能大，受父组件的约束限制：

```jsx
<Container style={{ width: 200, height: 200 }}>
  <Center>
    <Container style={{
      width: 50,
      height: 50,
      decoration: { color: Color.red }
    }} />
  </Center>
</Container>
// Center尺寸: 200 × 200 (填满父容器)
// 子组件居中显示
```

### 使用widthFactor
当设置`widthFactor`时，Center的宽度 = 子组件宽度 × widthFactor：

```jsx
<Center widthFactor={2.0}>
  <Container style={{
    width: 50,  // 子组件宽度
    height: 50,
    decoration: { color: Color.blue }
  }} />
</Center>
// Center宽度: 50 × 2.0 = 100
// Center高度: 受父容器约束
```

### 使用heightFactor
当设置`heightFactor`时，Center的高度 = 子组件高度 × heightFactor：

```jsx
<Center heightFactor={2.0}>
  <Container style={{
    width: 50,
    height: 50,  // 子组件高度
    decoration: { color: Color.green }
  }} />
</Center>
// Center宽度: 受父容器约束
// Center高度: 50 × 2.0 = 100
```

### 组合因子
可以同时使用`widthFactor`和`heightFactor`：

```jsx
<Center widthFactor={1.5} heightFactor={1.5}>
  <Container style={{
    width: 60,
    height: 40,
    decoration: { color: Color.orange }
  }} />
</Center>
// Center宽度: 60 × 1.5 = 90
// Center高度: 40 × 1.5 = 60
```

## 使用场景

### 1. 基础居中

```jsx
<Container style={{ width: 300, height: 200 }}>
  <Center>
    <Container style={{
      width: 100,
      height: 100,
      decoration: { color: Color.blue }
    }}>
      <Text text="居中内容" textAlign="center" />
    </Container>
  </Center>
</Container>
```

### 2. 页面级居中

```jsx
<Column>
  <Center>
    <Container style={{
      width: 200,
      decoration: { color: Color.grey }
    }}>
      <Text text="欢迎使用" textAlign="center" />
    </Container>
  </Center>
</Column>
```

### 3. 带因子的紧凑布局

```jsx
// 创建一个正好是子组件两倍大小的居中容器
<Center widthFactor={2.0} heightFactor={2.0}>
  <Container style={{
    width: 80,
    height: 80,
    decoration: { 
      color: Color.purple,
      borderRadius: { topLeft: 40, topRight: 40, bottomRight: 40, bottomLeft: 40 }
    }
  }}>
    <Text text="Logo" textAlign="center" style={{ color: Color.white }} />
  </Container>
</Center>
```

### 4. 加载指示器

```jsx
<Container style={{ width: 300, height: 200 }}>
  <Center>
    <Container style={{
      width: 60,
      height: 60,
      decoration: { 
        color: Color.fromRGBO(33, 150, 243, 1.0),
        shape: 'circle'
      }
    }}>
      <Text text="..." textAlign="center" style={{ color: Color.white }} />
    </Container>
  </Center>
</Container>
```

### 5. 卡片内容居中

```jsx
<Container style={{
  width: 280,
  height: 200,
  decoration: {
    color: Color.white,
    borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 },
    boxShadow: [{
      color: Color.fromRGBO(0, 0, 0, 0.1),
      blurRadius: 10,
      offset: { dx: 0, dy: 4 }
    }]
  }
}}>
  <Center>
    <Column mainAxisAlignment="center" crossAxisAlignment="center">
      <Text text="标题" style={{ fontSize: 18, fontWeight: 'bold' }} />
      <SizedBox height={8} />
      <Text text="这是一段描述文字" style={{ fontSize: 14, color: Color.grey }} />
    </Column>
  </Center>
</Container>
```

### 6. 响应式布局

```jsx
// 使用widthFactor创建与内容成比例的布局
<Row mainAxisAlignment="spaceEvenly">
  <Center widthFactor={1.2}>
    <Container style={{
      width: 60,
      height: 60,
      decoration: { color: Color.red }
    }}>
      <Text text="A" textAlign="center" />
    </Container>
  </Center>
  
  <Center widthFactor={1.2}>
    <Container style={{
      width: 60,
      height: 60,
      decoration: { color: Color.green }
    }}>
      <Text text="B" textAlign="center" />
    </Container>
  </Center>
  
  <Center widthFactor={1.2}>
    <Container style={{
      width: 60,
      height: 60,
      decoration: { color: Color.blue }
    }}>
      <Text text="C" textAlign="center" />
    </Container>
  </Center>
</Row>
```

## 注意事项

1. **单个子组件**：Center只支持单个子组件，如果需要居中多个组件，请将它们包装在Column或Row中

2. **因子范围**：`widthFactor`和`heightFactor`必须 ≥ 0，`null`表示不限制

3. **默认填充行为**：
   - 当因子为`null`时，Center会尽可能大
   - 当因子为数值时，Center的尺寸严格等于子组件尺寸 × 因子

4. **与Align的区别**：
   - `Center` = `Align(alignment: Alignment.center)`
   - Center不支持自定义alignment
   - 如需其他对齐方式，使用Align组件（未实现）

5. **性能考虑**：Center是轻量级组件，性能开销很小

## 常见错误

### 错误1：多个子组件
```jsx
// ❌ 错误：Center只支持单个子组件
<Center>
  <Container />
  <Container />
</Center>

// ✅ 正确：用Column或Row包装
<Center>
  <Column>
    <Container />
    <Container />
  </Column>
</Center>
```

### 错误2：负数因子
```jsx
// ❌ 错误：因子必须 ≥ 0
<Center widthFactor={-1.0}>
  <Container />
</Center>

// ✅ 正确：使用非负数
<Center widthFactor={1.0}>
  <Container />
</Center>
```

### 错误3：误解默认行为
```jsx
// ❌ 误解：以为Center总是紧凑包裹子组件
<Container style={{ width: 300, height: 200 }}>
  <Center>
    <Container style={{ width: 50, height: 50 }} />
  </Center>
</Container>
// 实际上Center尺寸是 300 × 200，不是 50 × 50

// ✅ 正确：使用因子实现紧凑包裹
<Container style={{ width: 300, height: 200 }}>
  <Center widthFactor={1.0} heightFactor={1.0}>
    <Container style={{ width: 50, height: 50 }} />
  </Center>
</Container>
// Center尺寸是 50 × 50
```

## 与其他组件对比

### Center vs Container (alignment)
```jsx
// 使用Center
<Center>
  <Text text="居中" />
</Center>

// 使用Container alignment（效果相同）
<Container style={{ alignment: 'center' }}>
  <Text text="居中" />
</Container>

// 区别：
// - Center专注于居中，代码更清晰
// - Container更通用，支持更多属性
```

### Center vs Align (未实现)
```jsx
// Center（当前）
<Center>
  <Text text="居中" />
</Center>

// Align（未实现，等效写法）
<Align alignment="center">
  <Text text="居中" />
</Align>

// 区别：
// - Center = Align(alignment: center)
// - Align支持任意alignment值
```

## 相关组件

- [Container](./Container.md) - 支持alignment属性的通用容器
- [Align](./Align.md) - 更灵活的对齐组件（未实现）
- [Column](./Column.md) - 垂直布局容器
- [Row](./Row.md) - 水平布局容器

## 与Flutter API对齐

本组件完全对齐Flutter Center API：
- [Flutter Center文档](https://api.flutter.dev/flutter/widgets/Center-class.html)

所有属性和行为与Flutter保持一致。
