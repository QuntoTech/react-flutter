# SingleChildScrollView 组件

单子组件滚动视图，当内容超出可视区域时提供滚动功能。完全对齐Flutter SingleChildScrollView API。

## 概述

SingleChildScrollView是一个滚动容器组件，适用于以下场景：

- **内容溢出** - 当内容高度/宽度超出屏幕时
- **表单界面** - 长表单需要滚动查看
- **详情页面** - 内容长度不确定的页面
- **响应式布局** - 适配不同屏幕尺寸

与ListView不同，SingleChildScrollView只有一个子组件，适合内容结构相对简单的场景。

## API参考

### Props接口

```typescript
interface SingleChildScrollViewProps {
  children?: React.ReactNode;
  scrollDirection?: 'vertical' | 'horizontal';  // 独立属性 - 功能配置
  reverse?: boolean;                            // 独立属性 - 功能配置
  style?: SingleChildScrollViewStyle;           // style属性 - 视觉样式
  id?: string;                                 // 独立属性 - 标识
}
```

### 样式接口

```typescript
interface SingleChildScrollViewStyle {
  // 视觉样式属性
  padding?: EdgeInsetsValue;
  physics?: ScrollPhysicsValue;            // 'bouncing' | 'clamping' | 'never'
  clipBehavior?: ClipBehaviorValue;        // 'none' | 'hardEdge' | 'antiAlias' | 'antiAliasWithSaveLayer'
}
```

## 详细属性说明

### 1. 滚动方向

#### scrollDirection - 滚动方向
```jsx
// 垂直滚动（默认）
<SingleChildScrollView scrollDirection="vertical">
  <Column>
    <Container style={{ height: 200 }} />
    <Container style={{ height: 200 }} />
    <Container style={{ height: 200 }} />
  </Column>
</SingleChildScrollView>

// 水平滚动
<SingleChildScrollView scrollDirection="horizontal">
  <Row>
    <Container style={{ width: 200 }} />
    <Container style={{ width: 200 }} />
    <Container style={{ width: 200 }} />
  </Row>
</SingleChildScrollView>
```

### 2. 滚动行为

#### reverse - 反向滚动
```jsx
// 从底部开始显示内容
<SingleChildScrollView 
  scrollDirection="vertical"
  reverse={true}
>
  <Column>
    <Text text="这会显示在底部" />
    <Text text="这会显示在中间" />
    <Text text="这会显示在顶部" />
  </Column>
</SingleChildScrollView>
```

#### physics - 滚动物理效果
```jsx
// 回弹效果（iOS风格）
<SingleChildScrollView style={{ physics: 'bouncing' }}>

// 夹紧效果（Android风格）
<SingleChildScrollView style={{ physics: 'clamping' }}>

// 禁止滚动
<SingleChildScrollView style={{ physics: 'never' }}>
```

### 3. 视觉属性

#### padding - 内边距
```jsx
<SingleChildScrollView style={{
  padding: EdgeInsets.all(16)  // 滚动内容的内边距
}}>
  <Column>
    {/* 内容 */}
  </Column>
</SingleChildScrollView>
```

#### clipBehavior - 裁剪行为
```jsx
<SingleChildScrollView style={{
  clipBehavior: 'antiAlias'  // 平滑裁剪溢出内容
}}>
```

## 使用示例

### 基础垂直滚动
```jsx
const VerticalScrollExample = () => (
  <SingleChildScrollView 
    scrollDirection="vertical"
    style={{
      padding: EdgeInsets.all(16)
    }}
  >
    <Column>
      <Container style={{
        height: 200,
        margin: EdgeInsets.only({ bottom: 16 }),
        decoration: { color: Color.red }
      }}>
        <Text text="第一个容器" />
      </Container>
      
      <Container style={{
        height: 200,
        margin: EdgeInsets.only({ bottom: 16 }),
        decoration: { color: Color.green }
      }}>
        <Text text="第二个容器" />
      </Container>
      
      <Container style={{
        height: 200,
        decoration: { color: Color.blue }
      }}>
        <Text text="第三个容器" />
      </Container>
    </Column>
  </SingleChildScrollView>
);
```

### 水平卡片滚动
```jsx
const HorizontalCardScroll = () => (
  <SingleChildScrollView 
    scrollDirection="horizontal"
    style={{
      padding: EdgeInsets.symmetric({ horizontal: 16 })
    }}
  >
    <Row>
      {[1, 2, 3, 4, 5].map(i => (
        <Container key={i} style={{
          width: 200,
          height: 120,
          margin: EdgeInsets.only({ right: 12 }),
          decoration: {
            color: Color.fromRGBO(100 + i * 30, 150, 200, 1),
            borderRadius: BorderRadius.circular(12)
          },
          alignment: 'center'
        }}>
          <Text text={`卡片 ${i}`} color={Color.white} />
        </Container>
      ))}
    </Row>
  </SingleChildScrollView>
);
```

### 表单页面滚动
```jsx
const FormScrollExample = () => (
  <SingleChildScrollView 
    scrollDirection="vertical"
    style={{
      padding: EdgeInsets.all(20),
      physics: 'bouncing'
    }}
  >
    <Column>
      <Text text="用户信息表单" fontSize={24} />
      
      <Container style={{ height: 20 }} />  {/* 间距 */}
      
      <Container style={{
        height: 50,
        margin: EdgeInsets.only({ bottom: 16 }),
        decoration: {
          border: Border.all({ color: Color.grey, width: 1 }),
          borderRadius: BorderRadius.circular(8)
        },
        padding: EdgeInsets.all(12),
        alignment: 'centerLeft'
      }}>
        <Text text="姓名" />
      </Container>
      
      <Container style={{
        height: 50,
        margin: EdgeInsets.only({ bottom: 16 }),
        decoration: {
          border: Border.all({ color: Color.grey, width: 1 }),
          borderRadius: BorderRadius.circular(8)
        },
        padding: EdgeInsets.all(12),
        alignment: 'centerLeft'
      }}>
        <Text text="邮箱" />
      </Container>
      
      <Container style={{
        height: 120,
        margin: EdgeInsets.only({ bottom: 32 }),
        decoration: {
          border: Border.all({ color: Color.grey, width: 1 }),
          borderRadius: BorderRadius.circular(8)
        },
        padding: EdgeInsets.all(12),
        alignment: 'topLeft'
      }}>
        <Text text="个人简介" />
      </Container>
      
      <Container style={{
        height: 50,
        decoration: {
          color: Color.blue,
          borderRadius: BorderRadius.circular(8)
        },
        alignment: 'center'
      }}>
        <Text text="提交" color={Color.white} />
      </Container>
    </Column>
  </SingleChildScrollView>
);
```

### 聊天消息滚动
```jsx
const ChatScrollExample = () => (
  <SingleChildScrollView 
    scrollDirection="vertical"
    reverse={true}  // 从底部开始，最新消息在下方
    style={{
      padding: EdgeInsets.all(16),
      physics: 'bouncing'
    }}
  >
    <Column>
      {messages.map((message, index) => (
        <Container key={index} style={{
          margin: EdgeInsets.only({ bottom: 8 }),
          padding: EdgeInsets.all(12),
          decoration: {
            color: message.isMe ? Color.blue : Color.grey,
            borderRadius: BorderRadius.circular(12)
          },
          alignment: message.isMe ? 'centerRight' : 'centerLeft'
        }}>
          <Text text={message.text} color={Color.white} />
        </Container>
      ))}
    </Column>
  </SingleChildScrollView>
);
```

## Flutter对齐

SingleChildScrollView组件完全对齐Flutter SingleChildScrollView API：

| React-Flutter | Flutter | 默认值 | 说明 |
|---------------|---------|--------|------|
| `scrollDirection` | `scrollDirection` | `Axis.vertical` | 滚动方向 |
| `reverse` | `reverse` | `false` | 是否反向滚动 |
| `padding` | `padding` | `null` | 滚动内容内边距 |
| `physics` | `physics` | 平台默认 | 滚动物理效果 |
| `clipBehavior` | `clipBehavior` | `Clip.hardEdge` | 裁剪行为 |

## 最佳实践

### 1. 选择合适的滚动方向
```jsx
// ✅ 推荐：垂直滚动用于长列表
<SingleChildScrollView scrollDirection="vertical">
  <Column>...</Column>
</SingleChildScrollView>

// ✅ 推荐：水平滚动用于卡片展示
<SingleChildScrollView scrollDirection="horizontal">
  <Row>...</Row>
</SingleChildScrollView>
```

### 2. 合理使用padding
```jsx
// ✅ 推荐：给滚动内容添加适当间距
<SingleChildScrollView style={{
  padding: EdgeInsets.all(16)  // 避免内容贴边
}}>
```

### 3. 性能考虑
```jsx
// ✅ 推荐：对于固定数量的元素使用SingleChildScrollView
<SingleChildScrollView>
  <Column>
    {/* 10-20个固定元素 */}
  </Column>
</SingleChildScrollView>

// ❌ 避免：大量动态数据应使用ListView
// <SingleChildScrollView>
//   <Column>
//     {/* 1000+个动态元素 - 应该用ListView */}
//   </Column>
// </SingleChildScrollView>
```

### 4. 测试支持
```jsx
// ✅ 推荐：添加id便于测试
<SingleChildScrollView id="main-content-scroll" scrollDirection="vertical" style={...}>
```

## 注意事项

### 1. 性能限制
- SingleChildScrollView会渲染所有子组件，不适合大量数据
- 对于长列表应使用ListView（虚拟化渲染）

### 2. 布局约束
- 子组件必须有确定的尺寸（垂直滚动需要确定高度，水平滚动需要确定宽度）
- 避免在SingleChildScrollView中嵌套无限高度的组件

### 3. 滚动冲突
```jsx
// ❌ 避免：嵌套相同方向的滚动视图
<SingleChildScrollView scrollDirection="vertical">
  <SingleChildScrollView scrollDirection="vertical">
    {/* 会导致滚动冲突 */}
  </SingleChildScrollView>
</SingleChildScrollView>
```

### 4. 平台差异
- iOS默认使用bouncing物理效果
- Android默认使用clamping物理效果
- 可通过physics属性统一行为

## 替代方案

| 场景 | 推荐组件 | 说明 |
|------|----------|------|
| 固定内容滚动 | SingleChildScrollView | 简单直接 |
| 大量列表数据 | *待实现* | 虚拟化渲染，性能更好 |

## 相关组件

- [Container](./Container.md) - 通用容器组件
