# SizedBox 组件

SizedBox组件是Flutter风格的尺寸控制组件，用于给子组件设置固定的宽度和高度，或作为布局中的间距控制。

## 基本用法

```jsx
import { SizedBox } from '@react-flutter/components';

function MyComponent() {
  return (
    <SizedBox width={100} height={50}>
      <Text text="固定尺寸内容" />
    </SizedBox>
  );
}
```

## 属性

SizedBox组件支持以下属性（所有属性都是独立属性，无style属性）：

### 尺寸属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `width` | `number` | `undefined` | 宽度（像素） |
| `height` | `number` | `undefined` | 高度（像素） |

### 通用属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `children` | `ReactNode` | `undefined` | 子组件 |
| `id` | `string` | `undefined` | 组件标识符，用于测试和调试 |

## Flutter命名构造函数对应用法

Flutter的SizedBox有几个命名构造函数，在React中可以用标准props实现：

### expand效果（对应SizedBox.expand()）

```jsx
// Flutter: SizedBox.expand()
// React: 使用无穷大值
<SizedBox width={Number.POSITIVE_INFINITY} height={Number.POSITIVE_INFINITY}>
  <Text text="填满父容器" />
</SizedBox>
```

### shrink效果（对应SizedBox.shrink()）

```jsx
// Flutter: SizedBox.shrink()
// React: 使用零值
<SizedBox width={0} height={0}>
  <Text text="最小尺寸" />
</SizedBox>
```

### square效果（对应SizedBox.square()）

```jsx
// Flutter: SizedBox.square(50)
// React: 设置相同的宽高
<SizedBox width={50} height={50}>
  <Text text="50x50正方形" />
</SizedBox>
```

## 使用示例

### 固定尺寸容器

```jsx
<SizedBox width={200} height={100}>
  <Container style={{ 
    color: Color.blue,
    decoration: { borderRadius: BorderRadius.circular(8) }
  }}>
    <Text text="200x100 容器" />
  </Container>
</SizedBox>
```

### 间距控制

```jsx
<Row>
  <Text text="左侧内容" />
  <SizedBox width={20} />  {/* 20像素水平间距 */}
  <Text text="右侧内容" />
</Row>

<Column>
  <Text text="上方内容" />
  <SizedBox height={15} />  {/* 15像素垂直间距 */}
  <Text text="下方内容" />
</Column>
```

### 单维度约束

```jsx
{/* 只限制宽度，高度自适应 */}
<SizedBox width={150}>
  <Text text="这段文本的宽度被限制为150像素，但高度会根据内容自动调整" />
</SizedBox>

{/* 只限制高度，宽度自适应 */}
<SizedBox height={80}>
  <Container style={{ color: Color.green }}>
    <Text text="高度固定80像素" />
  </Container>
</SizedBox>
```

### 响应式布局

```jsx
<Column>
  <SizedBox width={double.infinity} height={50}>
    <Container style={{ color: Color.red }}>
      <Text text="全宽，固定高度50" />
    </Container>
  </SizedBox>
  
  <SizedBox.expand>
    <Container style={{ color: Color.blue }}>
      <Text text="填满剩余空间" />
    </Container>
  </SizedBox.expand>
</Column>
```

### 占位符和空白区域

```jsx
<Column>
  <Text text="顶部内容" />
  
  {/* 作为占位符，创建空白区域 */}
  <SizedBox height={50} />
  
  <Text text="中间内容" />
  
  {/* 弹性空白，填满剩余空间 */}
  <SizedBox width={Number.POSITIVE_INFINITY} height={Number.POSITIVE_INFINITY} />
  
  <Text text="底部内容" />
</Column>
```

### 与其他组件配合

```jsx
<Container style={{ 
  width: 300, 
  height: 200, 
  padding: EdgeInsets.all(16),
  color: Color.grey[100] 
}}>
  <Column mainAxisAlignment="spaceEvenly">
    <SizedBox width={280} height={40}>
      <Container style={{ color: Color.blue }}>
        <Text text="蓝色条" textAlign="center" />
      </Container>
    </SizedBox>
    
    <Row mainAxisAlignment="spaceBetween">
      <SizedBox width={50} height={50}>
        <Container style={{ color: Color.red }}>
          <Text text="红" textAlign="center" />
        </Container>
      </SizedBox>
      
      <SizedBox width={50} height={50}>
        <Container style={{ color: Color.green }}>
          <Text text="绿" textAlign="center" />
        </Container>
      </SizedBox>
      
      <SizedBox width={50} height={50}>
        <Container style={{ color: Color.yellow }}>
          <Text text="黄" textAlign="center" />
        </Container>
      </SizedBox>
    </Row>
  </Column>
</Container>
```

## 特殊值说明

### 无穷大值

```jsx
// 使用 Number.POSITIVE_INFINITY 表示无限大小
<SizedBox width={Number.POSITIVE_INFINITY} height={100}>
  <Text text="宽度填满，高度固定" />
</SizedBox>

// 等同于（嵌套使用）
<SizedBox width={Number.POSITIVE_INFINITY} height={Number.POSITIVE_INFINITY}>
  <SizedBox height={100}>
    <Text text="同样效果" />
  </SizedBox>
</SizedBox>
```

### 零值

```jsx
// 使用 0 创建不可见的占位符
<SizedBox width={0} height={0}>
  <Text text="不可见" />
</SizedBox>

// 等同于
<SizedBox width={0} height={0}>
  <Text text="同样不可见" />
</SizedBox>
```

## 设计原则

1. **纯尺寸控制** - SizedBox只负责尺寸约束，不包含任何视觉样式
2. **Flutter API对齐** - 所有属性与Flutter SizedBox Widget完全一致
3. **独立属性** - 所有属性都是独立的props，无style属性
4. **灵活性** - 可以只设置宽度或高度，也可以同时设置两者

## 注意事项

1. SizedBox组件没有`style`属性，它是纯尺寸控制组件
2. `width`和`height`都是可选的，可以只设置其中一个
3. 当`width`或`height`为`undefined`时，该维度会根据子组件自适应
4. 使用`Number.POSITIVE_INFINITY`可以创建填满可用空间的效果
5. SizedBox常用作布局中的间距控制，比margin/padding更精确
6. 使用`Number.POSITIVE_INFINITY`创建expand效果，使用`0`创建shrink效果

## 性能优化

1. **固定尺寸优化** - SizedBox提供固定尺寸约束，有助于Flutter的布局性能
2. **避免过度嵌套** - 直接使用SizedBox而不是多层Container嵌套
3. **间距控制推荐** - 使用SizedBox作为间距比使用Container的margin更高效

## 相关组件

- [Container](./Container.md) - 容器组件，提供更丰富的布局和装饰功能
- [Column](./Column.md) - 垂直布局，常与SizedBox配合控制间距
- [Row](./Row.md) - 水平布局，常与SizedBox配合控制间距
- [SingleChildScrollView](./SingleChildScrollView.md) - 可滚动容器，可用SizedBox控制内容尺寸
