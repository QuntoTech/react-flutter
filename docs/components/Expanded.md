# Expanded

Flutter Expanded组件的React定义，用于在Row、Column或Flex中创建弹性布局。

## 组件说明

`Expanded`组件用于让子组件填充父组件（Row、Column或Flex）主轴上的剩余空间。多个Expanded子组件会根据flex比例分配空间。

## 基本用法

```jsx
import { Row, Expanded, Container, Color } from '@react-flutter/components';

<Row>
  <Expanded>
    <Container style={{
      height: 50,
      decoration: { color: Color.red }
    }} />
  </Expanded>
  <Expanded>
    <Container style={{
      height: 50,
      decoration: { color: Color.blue }
    }} />
  </Expanded>
</Row>
```

## Props

### children
- 类型：`React.ReactNode`
- 必需：是
- 说明：要扩展的子组件（仅支持单个子组件）
- 示例：
```jsx
<Expanded>
  <Container />
</Expanded>
```

### flex
- 类型：`number`
- 必需：否
- 默认值：`1`
- 说明：子组件占据剩余空间的比例因子。多个Expanded子组件会根据flex比例分配空间
- 示例：
```jsx
// 两个子组件平分空间（1:1）
<Row>
  <Expanded flex={1}>
    <Container />
  </Expanded>
  <Expanded flex={1}>
    <Container />
  </Expanded>
</Row>

// 第一个占2/3，第二个占1/3（2:1）
<Row>
  <Expanded flex={2}>
    <Container />
  </Expanded>
  <Expanded flex={1}>
    <Container />
  </Expanded>
</Row>
```

### id
- 类型：`string`
- 必需：否
- 说明：组件的唯一标识（用于测试和调试）
- 示例：
```jsx
<Expanded id="my-expanded">
  <Container />
</Expanded>
```

## 空间分配规则

### 1. 剩余空间计算
```
剩余空间 = 父组件主轴空间 - 所有固定尺寸子组件的空间
```

### 2. Expanded空间分配
```
单个Expanded空间 = (剩余空间 × 当前Expanded的flex) / 所有Expanded的flex总和
```

### 示例计算
```jsx
// 假设Row宽度为300px
<Row> {/* 300px */}
  <Container style={{ width: 100 }} /> {/* 固定100px */}
  <Expanded flex={2}> {/* (300-100) × 2/3 = 133.33px */}
    <Container />
  </Expanded>
  <Expanded flex={1}> {/* (300-100) × 1/3 = 66.67px */}
    <Container />
  </Expanded>
</Row>
```

## 使用场景

### 1. 平分空间（1:1）

```jsx
<Row>
  <Expanded>
    <Container style={{
      height: 50,
      decoration: { color: Color.red }
    }}>
      <Text text="1/2" textAlign="center" />
    </Container>
  </Expanded>
  <Expanded>
    <Container style={{
      height: 50,
      decoration: { color: Color.blue }
    }}>
      <Text text="1/2" textAlign="center" />
    </Container>
  </Expanded>
</Row>
```

### 2. 按比例分配（2:1）

```jsx
<Row>
  <Expanded flex={2}>
    <Container style={{
      height: 50,
      decoration: { color: Color.green }
    }}>
      <Text text="2/3 (flex: 2)" textAlign="center" />
    </Container>
  </Expanded>
  <Expanded flex={1}>
    <Container style={{
      height: 50,
      decoration: { color: Color.orange }
    }}>
      <Text text="1/3 (flex: 1)" textAlign="center" />
    </Container>
  </Expanded>
</Row>
```

### 3. 固定尺寸 + Expanded

```jsx
<Row>
  <Container style={{
    width: 100,
    height: 50,
    decoration: { color: Color.purple }
  }}>
    <Text text="100px" textAlign="center" />
  </Container>
  <Expanded>
    <Container style={{
      height: 50,
      decoration: { color: Color.cyan }
    }}>
      <Text text="剩余空间" textAlign="center" />
    </Container>
  </Expanded>
</Row>
```

### 4. Column中的Expanded

```jsx
<Container style={{ height: 200 }}>
  <Column>
    <Expanded>
      <Container style={{
        decoration: { color: Color.yellow }
      }}>
        <Text text="上部 (Expanded)" textAlign="center" />
      </Container>
    </Expanded>
    <Container style={{
      height: 60,
      decoration: { color: Color.grey }
    }}>
      <Text text="固定60px" textAlign="center" />
    </Container>
  </Column>
</Container>
```

### 5. 复杂布局

```jsx
// 三栏布局：左右固定，中间自适应
<Row>
  <Container style={{
    width: 80,
    height: 50,
    decoration: { color: Color.red }
  }}>
    <Text text="左侧" textAlign="center" />
  </Container>
  <Expanded>
    <Container style={{
      height: 50,
      decoration: { color: Color.green }
    }}>
      <Text text="中间 (自适应)" textAlign="center" />
    </Container>
  </Expanded>
  <Container style={{
    width: 80,
    height: 50,
    decoration: { color: Color.blue }
  }}>
    <Text text="右侧" textAlign="center" />
  </Container>
</Row>

// 多比例分配
<Row>
  <Expanded flex={1}>
    <Container style={{
      height: 50,
      decoration: { color: Color.red }
    }}>
      <Text text="1" textAlign="center" />
    </Container>
  </Expanded>
  <Expanded flex={2}>
    <Container style={{
      height: 50,
      decoration: { color: Color.green }
    }}>
      <Text text="2" textAlign="center" />
    </Container>
  </Expanded>
  <Expanded flex={3}>
    <Container style={{
      height: 50,
      decoration: { color: Color.blue }
    }}>
      <Text text="3" textAlign="center" />
    </Container>
  </Expanded>
</Row>
```

### 6. 响应式表单

```jsx
<Column>
  <Row>
    <Container style={{ width: 80 }}>
      <Text text="用户名:" />
    </Container>
    <Expanded>
      <Container style={{
        height: 40,
        decoration: { color: Color.grey }
      }}>
        <Text text="输入框" />
      </Container>
    </Expanded>
  </Row>
  
  <SizedBox height={10} />
  
  <Row>
    <Container style={{ width: 80 }}>
      <Text text="密码:" />
    </Container>
    <Expanded>
      <Container style={{
        height: 40,
        decoration: { color: Color.grey }
      }}>
        <Text text="输入框" />
      </Container>
    </Expanded>
  </Row>
</Column>
```

## 注意事项

1. **必须在Flex容器中使用**：Expanded只能作为Row、Column或Flex的直接子组件，否则会报错

2. **单个子组件**：Expanded只支持单个子组件

3. **flex必须为正数**：flex值必须大于0，通常为整数

4. **主轴方向**：
   - 在Row中，Expanded影响宽度
   - 在Column中，Expanded影响高度

5. **交叉轴尺寸**：
   - 在Row中，子组件高度不受Expanded影响
   - 在Column中，子组件宽度不受Expanded影响

6. **与Flexible的区别**（未实现）：
   - Expanded = Flexible(fit: FlexFit.tight)
   - Expanded强制子组件填充分配的空间
   - Flexible允许子组件小于分配的空间

7. **性能考虑**：合理使用Expanded，避免过度嵌套

## 常见错误

### 错误1：不在Flex容器中使用
```jsx
// ❌ 错误：Expanded不在Row/Column中
<Container>
  <Expanded>
    <Text text="错误" />
  </Expanded>
</Container>

// ✅ 正确
<Row>
  <Expanded>
    <Text text="正确" />
  </Expanded>
</Row>
```

### 错误2：flex值为0或负数
```jsx
// ❌ 错误：flex必须为正数
<Row>
  <Expanded flex={0}>
    <Container />
  </Expanded>
</Row>

// ✅ 正确
<Row>
  <Expanded flex={1}>
    <Container />
  </Expanded>
</Row>
```

### 错误3：多个子组件
```jsx
// ❌ 错误：Expanded只支持单个子组件
<Row>
  <Expanded>
    <Container />
    <Container />
  </Expanded>
</Row>

// ✅ 正确：用Column或Row包装
<Row>
  <Expanded>
    <Column>
      <Container />
      <Container />
    </Column>
  </Expanded>
</Row>
```

## 相关组件

- [Row](./Row.md) - 水平布局容器
- [Column](./Column.md) - 垂直布局容器
- [Flexible](./Flexible.md) - 更灵活的弹性布局（未实现）
- [Container](./Container.md) - 常用作Expanded的子组件

## 与Flutter API对齐

本组件完全对齐Flutter Expanded API：
- [Flutter Expanded文档](https://api.flutter.dev/flutter/widgets/Expanded-class.html)

所有属性和行为与Flutter保持一致。
