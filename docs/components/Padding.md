# Padding

Flutter Padding组件的React定义，用于为子组件添加内边距。

## 组件说明

`Padding`是一个为其子组件添加内边距（空白空间）的组件。它是Flutter中最常用的布局组件之一，用于在子组件周围创建空间。

## 基本用法

```jsx
import { Padding, EdgeInsets, Container, Color } from '@react-flutter/components';

<Padding padding={EdgeInsets.all(16)}>
  <Container style={{
    decoration: { color: Color.blue }
  }}>
    <Text text="带内边距的内容" />
  </Container>
</Padding>
```

## Props

### padding (必需)
- 类型：`EdgeInsetsValue`
- 必需：是
- 说明：内边距的大小，使用`EdgeInsets`工具类创建
- 示例：
```jsx
// 四周相同内边距
<Padding padding={EdgeInsets.all(16)}>
  <Container />
</Padding>

// 对称内边距
<Padding padding={EdgeInsets.symmetric({ horizontal: 24, vertical: 12 })}>
  <Container />
</Padding>

// 指定边内边距
<Padding padding={EdgeInsets.only({ left: 32, top: 8 })}>
  <Container />
</Padding>
```

### children
- 类型：`React.ReactNode`
- 必需：是
- 说明：要添加内边距的子组件（仅支持单个子组件）
- 示例：
```jsx
<Padding padding={EdgeInsets.all(16)}>
  <Text text="子组件" />
</Padding>
```

### id
- 类型：`string`
- 必需：否
- 说明：组件的唯一标识（用于测试和调试）
- 示例：
```jsx
<Padding padding={EdgeInsets.all(16)} id="my-padding">
  <Container />
</Padding>
```

## EdgeInsets类型

### EdgeInsets.all
四周相同的内边距：

```jsx
// 四周都是16px
<Padding padding={EdgeInsets.all(16)}>
  <Container />
</Padding>
```

### EdgeInsets.symmetric
对称的内边距：

```jsx
// 左右24px
<Padding padding={EdgeInsets.symmetric({ horizontal: 24 })}>
  <Container />
</Padding>

// 上下12px
<Padding padding={EdgeInsets.symmetric({ vertical: 12 })}>
  <Container />
</Padding>

// 左右24px，上下12px
<Padding padding={EdgeInsets.symmetric({ horizontal: 24, vertical: 12 })}>
  <Container />
</Padding>
```

### EdgeInsets.only
指定某些边的内边距：

```jsx
// 仅左边
<Padding padding={EdgeInsets.only({ left: 32 })}>
  <Container />
</Padding>

// 左和上
<Padding padding={EdgeInsets.only({ left: 32, top: 8 })}>
  <Container />
</Padding>

// 所有边都指定
<Padding padding={EdgeInsets.only({ top: 10, right: 15, bottom: 20, left: 25 })}>
  <Container />
</Padding>
```

## 使用场景

### 1. 基础内边距

```jsx
<Container style={{
  decoration: { color: Color.grey }
}}>
  <Padding padding={EdgeInsets.all(16)}>
    <Text text="带内边距的文本" />
  </Padding>
</Container>
```

### 2. 卡片内容间距

```jsx
<Container style={{
  width: 300,
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
  <Padding padding={EdgeInsets.all(20)}>
    <Column crossAxisAlignment="start">
      <Text text="标题" style={{ fontSize: 18, fontWeight: 'bold' }} />
      <SizedBox height={8} />
      <Text text="内容描述" style={{ fontSize: 14 }} />
    </Column>
  </Padding>
</Container>
```

### 3. 列表项间距

```jsx
<Column>
  <Padding padding={EdgeInsets.symmetric({ horizontal: 16, vertical: 8 })}>
    <Container style={{
      height: 50,
      decoration: { color: Color.white }
    }}>
      <Text text="列表项 1" />
    </Container>
  </Padding>
  
  <Padding padding={EdgeInsets.symmetric({ horizontal: 16, vertical: 8 })}>
    <Container style={{
      height: 50,
      decoration: { color: Color.white }
    }}>
      <Text text="列表项 2" />
    </Container>
  </Padding>
</Column>
```

### 4. 不对称内边距

```jsx
// 顶部导航栏
<Container style={{
  decoration: { color: Color.blue }
}}>
  <Padding padding={EdgeInsets.only({ top: 40, left: 16, right: 16, bottom: 16 })}>
    <Row mainAxisAlignment="spaceBetween">
      <Text text="标题" style={{ fontSize: 20, color: Color.white }} />
      <Text text="菜单" style={{ color: Color.white }} />
    </Row>
  </Padding>
</Container>
```

### 5. 嵌套Padding

```jsx
// 外层大间距，内层小间距
<Container style={{
  decoration: { color: Color.grey }
}}>
  <Padding padding={EdgeInsets.all(24)}>
    <Container style={{
      decoration: { color: Color.white }
    }}>
      <Padding padding={EdgeInsets.all(12)}>
        <Text text="多层内边距" />
      </Padding>
    </Container>
  </Padding>
</Container>
```

### 6. 表单元素间距

```jsx
<Column crossAxisAlignment="stretch">
  <Padding padding={EdgeInsets.symmetric({ horizontal: 16, vertical: 8 })}>
    <Container style={{
      height: 50,
      decoration: { color: Color.grey }
    }}>
      <Text text="用户名输入框" />
    </Container>
  </Padding>
  
  <Padding padding={EdgeInsets.symmetric({ horizontal: 16, vertical: 8 })}>
    <Container style={{
      height: 50,
      decoration: { color: Color.grey }
    }}>
      <Text text="密码输入框" />
    </Container>
  </Padding>
  
  <Padding padding={EdgeInsets.symmetric({ horizontal: 16, vertical: 16 })}>
    <ElevatedButton text="登录" />
  </Padding>
</Column>
```

### 7. 响应式间距

```jsx
// 根据内容调整内边距
<Row>
  <Padding padding={EdgeInsets.only({ right: 8 })}>
    <Container style={{
      width: 60,
      height: 60,
      decoration: { color: Color.blue, shape: 'circle' }
    }} />
  </Padding>
  
  <Expanded>
    <Padding padding={EdgeInsets.symmetric({ vertical: 8 })}>
      <Column crossAxisAlignment="start">
        <Text text="用户名" style={{ fontWeight: 'bold' }} />
        <Text text="这是用户简介" style={{ fontSize: 12, color: Color.grey }} />
      </Column>
    </Padding>
  </Expanded>
</Row>
```

### 8. 屏幕边缘间距

```jsx
// 整个页面内容与屏幕边缘保持间距
<Column>
  <Padding padding={EdgeInsets.all(16)}>
    <Text text="页面标题" style={{ fontSize: 24, fontWeight: 'bold' }} />
  </Padding>
  
  <Padding padding={EdgeInsets.symmetric({ horizontal: 16 })}>
    <Column>
      <Text text="内容区域" />
      {/* 更多内容 */}
    </Column>
  </Padding>
</Column>
```

## 注意事项

1. **必需属性**：`padding`是必需属性，不能省略

2. **单个子组件**：Padding只支持单个子组件，如果需要为多个组件添加内边距，请将它们包装在Column或Row中

3. **EdgeInsets值范围**：
   - 必须 ≥ 0
   - 支持小数值（如16.5）
   - 各边可以设置不同的值

4. **与Container的区别**：
   - `Padding`是专门的内边距组件，功能单一
   - `Container`可以设置`padding`属性，但也支持更多其他属性
   - 使用`Padding`代码意图更清晰

5. **嵌套Padding**：
   - 可以嵌套使用
   - 内边距会累加
   - 注意避免过度嵌套导致不必要的空间

6. **性能考虑**：Padding是轻量级组件，性能开销很小

## 常见错误

### 错误1：忘记设置padding属性
```jsx
// ❌ 错误：padding是必需属性
<Padding>
  <Container />
</Padding>

// ✅ 正确
<Padding padding={EdgeInsets.all(16)}>
  <Container />
</Padding>
```

### 错误2：多个子组件
```jsx
// ❌ 错误：Padding只支持单个子组件
<Padding padding={EdgeInsets.all(16)}>
  <Container />
  <Container />
</Padding>

// ✅ 正确：用Column或Row包装
<Padding padding={EdgeInsets.all(16)}>
  <Column>
    <Container />
    <Container />
  </Column>
</Padding>
```

### 错误3：负数内边距
```jsx
// ❌ 错误：内边距不能为负数
<Padding padding={EdgeInsets.all(-10)}>
  <Container />
</Padding>

// ✅ 正确：使用非负数
<Padding padding={EdgeInsets.all(10)}>
  <Container />
</Padding>
```

### 错误4：误用EdgeInsets构造函数
```jsx
// ❌ 错误：EdgeInsets.symmetric需要对象参数
<Padding padding={EdgeInsets.symmetric(24)}>
  <Container />
</Padding>

// ✅ 正确
<Padding padding={EdgeInsets.symmetric({ horizontal: 24 })}>
  <Container />
</Padding>
```

## 与其他组件对比

### Padding vs Container (padding属性)
```jsx
// 使用Padding组件
<Padding padding={EdgeInsets.all(16)}>
  <Text text="内容" />
</Padding>

// 使用Container的padding属性（效果相同）
<Container style={{ padding: EdgeInsets.all(16) }}>
  <Text text="内容" />
</Container>

// 区别：
// - Padding更简洁，意图更明确
// - Container更通用，但会创建更复杂的widget
// - 如果只需要内边距，优先使用Padding
// - 如果还需要背景色、边框等，使用Container
```

### Padding vs SizedBox
```jsx
// Padding - 添加内边距
<Column>
  <Padding padding={EdgeInsets.all(16)}>
    <Text text="内容1" />
  </Padding>
  <Padding padding={EdgeInsets.all(16)}>
    <Text text="内容2" />
  </Padding>
</Column>

// SizedBox - 创建固定间距
<Column>
  <Text text="内容1" />
  <SizedBox height={16} />
  <Text text="内容2" />
</Column>

// 区别：
// - Padding在子组件周围添加空间
// - SizedBox创建独立的空白空间
// - Padding适合单个组件的内边距
// - SizedBox适合组件之间的间距
```

## 设计建议

### 1. 一致的间距体系
建议使用统一的间距值：
```jsx
// 推荐的间距值：4, 8, 12, 16, 20, 24, 32, 40
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

<Padding padding={EdgeInsets.all(spacing.md)}>
  <Container />
</Padding>
```

### 2. 8点网格系统
使用8的倍数作为间距值：
```jsx
// 好的实践：8, 16, 24, 32, 40
<Padding padding={EdgeInsets.all(16)}>
  <Container />
</Padding>

// 避免：7, 13, 19, 23
```

### 3. 语义化命名
为常用间距创建别名：
```jsx
const cardPadding = EdgeInsets.all(16);
const listItemPadding = EdgeInsets.symmetric({ horizontal: 16, vertical: 8 });

<Padding padding={cardPadding}>
  <Container />
</Padding>
```

## 相关组件

- [Container](./Container.md) - 支持padding属性的通用容器
- [SizedBox](./SizedBox.md) - 创建固定尺寸的空白空间
- [EdgeInsets](../utilities/EdgeInsets.md) - 内边距工具类（未实现文档）
- [Column](./Column.md) - 垂直布局容器
- [Row](./Row.md) - 水平布局容器

## 与Flutter API对齐

本组件完全对齐Flutter Padding API：
- [Flutter Padding文档](https://api.flutter.dev/flutter/widgets/Padding-class.html)

所有属性和行为与Flutter保持一致。

## 常见使用模式

### 模式1：卡片内边距
```jsx
export const Card = ({ children }) => (
  <Container style={{
    decoration: {
      color: Color.white,
      borderRadius: { topLeft: 12, topRight: 12, bottomRight: 12, bottomLeft: 12 },
      boxShadow: [{
        color: Color.fromRGBO(0, 0, 0, 0.1),
        blurRadius: 8
      }]
    }
  }}>
    <Padding padding={EdgeInsets.all(16)}>
      {children}
    </Padding>
  </Container>
);
```

### 模式2：页面容器
```jsx
export const PageContainer = ({ children }) => (
  <Padding padding={EdgeInsets.symmetric({ horizontal: 16, vertical: 24 })}>
    {children}
  </Padding>
);
```

### 模式3：安全区域内边距
```jsx
// 为顶部留出状态栏空间
export const SafeAreaTop = ({ children }) => (
  <Padding padding={EdgeInsets.only({ top: 40 })}>
    {children}
  </Padding>
);
```
