# Container 组件

通用容器组件，提供布局、装饰和变换功能。完全对齐Flutter Container API。

## 概述

Container是React-Flutter框架中最重要的布局组件之一，提供了丰富的样式和布局功能：

- **尺寸控制** - width、height约束
- **间距管理** - padding、margin设置
- **视觉装饰** - 背景色、边框、阴影、渐变
- **布局对齐** - 子组件对齐方式
- **高级功能** - 变换、裁剪、前景装饰

## API参考

### Props接口

```typescript
interface ContainerProps {
  children?: React.ReactNode;
  style?: ContainerStyle;
  id?: string;  // 用于测试和调试
}
```

### 样式接口

```typescript
interface ContainerStyle {
  // 尺寸属性
  width?: number;
  height?: number;
  
  // 间距属性
  padding?: EdgeInsetsValue;
  margin?: EdgeInsetsValue;
  
  // 颜色属性
  color?: ColorValue;
  
  // 装饰属性
  decoration?: DecorationStyle;
  foregroundDecoration?: DecorationStyle;
  
  // 布局属性
  alignment?: AlignmentValue;
  constraints?: ConstraintsStyle;
  
  // 高级属性
  clipBehavior?: ClipBehaviorValue;
  transform?: TransformValue;
  transformAlignment?: AlignmentValue;
}
```

## 详细属性说明

### 1. 尺寸属性

#### width & height
```jsx
<Container style={{ width: 200, height: 100 }}>
  <Text text="固定尺寸容器" />
</Container>
```

### 2. 间距属性

#### padding - 内边距
```jsx
// 四边相同
<Container style={{ padding: EdgeInsets.all(16) }}>

// 垂直水平设置
<Container style={{ padding: EdgeInsets.symmetric({ vertical: 20, horizontal: 16 }) }}>

// 单独设置
<Container style={{ padding: EdgeInsets.only({ top: 20, left: 16 }) }}>
```

#### margin - 外边距
```jsx
// 用法与padding相同
<Container style={{ margin: EdgeInsets.all(10) }}>
```

### 3. 颜色属性

#### color - 背景色
```jsx
<Container style={{ color: Color.blue }}>
<Container style={{ color: Color.fromRGBO(255, 0, 0, 0.5) }}>
```

### 4. 装饰属性

#### decoration - 背景装饰
```jsx
<Container style={{
  decoration: {
    color: Color.blue,
    borderRadius: BorderRadius.circular(12),
    border: Border.all({ color: Color.white, width: 2 }),
    boxShadow: [{
      color: Color.black,
      blurRadius: 8,
      spreadRadius: 1,
      offset: { dx: 0, dy: 4 }
    }],
    gradient: {
      type: 'linear',
      colors: [Color.red, Color.blue],
      begin: 'topLeft',
      end: 'bottomRight'
    }
  }
}}>
```

#### foregroundDecoration - 前景装饰
```jsx
// 在子组件之上绘制装饰
<Container style={{
  decoration: { color: Color.blue },
  foregroundDecoration: {
    border: Border.all({ color: Color.yellow, width: 3 })
  }
}}>
```

### 5. 布局属性

#### alignment - 子组件对齐
```jsx
<Container style={{ 
  width: 200, 
  height: 100,
  alignment: 'center'  // 'topLeft', 'center', 'bottomRight' 等
}}>
  <Text text="居中对齐" />
</Container>
```

#### constraints - 尺寸约束
```jsx
<Container style={{
  constraints: {
    minWidth: 100,
    maxWidth: 300,
    minHeight: 50,
    maxHeight: 150
  }
}}>
```

### 6. 高级属性

#### clipBehavior - 裁剪行为
```jsx
<Container style={{
  width: 100,
  height: 100,
  clipBehavior: 'antiAlias',  // 'none', 'hardEdge', 'antiAlias', 'antiAliasWithSaveLayer'
  decoration: { borderRadius: BorderRadius.circular(20) }
}}>
  {/* 超出圆角边界的内容会被裁剪 */}
</Container>
```

#### transform - Matrix4变换
```jsx
// 缩放变换
<Container style={{
  transform: [
    1.2, 0.0, 0.0, 0.0,    // X轴缩放1.2倍
    0.0, 1.2, 0.0, 0.0,    // Y轴缩放1.2倍
    0.0, 0.0, 1.0, 0.0,    // Z轴不变
    0.0, 0.0, 0.0, 1.0     // 齐次坐标
  ],
  transformAlignment: 'center'  // 变换中心点
}}>
```

## 使用示例

### 基础卡片
```jsx
const BasicCard = () => (
  <Container style={{
    width: 300,
    padding: EdgeInsets.all(16),
    margin: EdgeInsets.all(8),
    decoration: {
      color: Color.white,
      borderRadius: BorderRadius.circular(12),
      boxShadow: [{
        color: Color.fromRGBO(0, 0, 0, 0.1),
        blurRadius: 8,
        spreadRadius: 0,
        offset: { dx: 0, dy: 2 }
      }]
    }
  }}>
    <Text text="这是一个基础卡片" />
  </Container>
);
```

### 渐变按钮
```jsx
const GradientButton = () => (
  <Container style={{
    width: 200,
    height: 50,
    alignment: 'center',
    decoration: {
      borderRadius: BorderRadius.circular(25),
      gradient: {
        type: 'linear',
        colors: [Color.fromRGBO(255, 107, 107, 1), Color.fromRGBO(255, 142, 83, 1)],
        begin: 'topLeft',
        end: 'bottomRight'
      }
    }
  }}>
    <Text text="渐变按钮" color={Color.white} />
  </Container>
);
```

### 复合装饰
```jsx
const ComplexCard = () => (
  <Container style={{
    width: 250,
    height: 150,
    padding: EdgeInsets.all(20),
    decoration: {
      color: Color.fromRGBO(63, 81, 181, 1.0),
      borderRadius: BorderRadius.circular(16)
    },
    foregroundDecoration: {
      border: Border.all({ color: Color.amber, width: 2 }),
      borderRadius: BorderRadius.circular(16)
    },
    clipBehavior: 'antiAlias'
  }}>
    <Text text="复合装饰容器" color={Color.white} />
  </Container>
);
```

## Flutter对齐

Container组件完全对齐Flutter Container API：

| React-Flutter | Flutter | 说明 |
|---------------|---------|------|
| `width` | `width` | 容器宽度 |
| `height` | `height` | 容器高度 |
| `padding` | `padding` | 内边距 |
| `margin` | `margin` | 外边距 |
| `color` | `color` | 背景色 |
| `decoration` | `decoration` | 背景装饰 |
| `foregroundDecoration` | `foregroundDecoration` | 前景装饰 |
| `alignment` | `alignment` | 子组件对齐 |
| `constraints` | `constraints` | 尺寸约束 |
| `clipBehavior` | `clipBehavior` | 裁剪行为 |
| `transform` | `transform` | Matrix4变换 |
| `transformAlignment` | `transformAlignment` | 变换中心点 |

## 最佳实践

### 1. 性能优化
```jsx
// ✅ 推荐：使用具体的尺寸
<Container style={{ width: 200, height: 100 }}>

// ❌ 避免：过度嵌套
<Container>
  <Container>
    <Container>
      <Text text="过度嵌套" />
    </Container>
  </Container>
</Container>
```

### 2. 样式组织
```jsx
// ✅ 推荐：提取样式常量
const cardStyle = {
  padding: EdgeInsets.all(16),
  decoration: {
    color: Color.white,
    borderRadius: BorderRadius.circular(8)
  }
};

<Container style={cardStyle}>
```

### 3. 测试支持
```jsx
// ✅ 推荐：使用id便于测试
<Container id="user-profile-card" style={cardStyle}>
  <Text text="用户信息" />
</Container>
```

### 4. 响应式设计
```jsx
// ✅ 推荐：使用constraints实现响应式
<Container style={{
  constraints: {
    minWidth: 200,
    maxWidth: 400
  }
}}>
```

## 注意事项

1. **decoration vs color**：不能同时使用，decoration优先级更高
2. **transform性能**：复杂变换可能影响性能，适当使用
3. **clipBehavior选择**：antiAlias质量最高但性能开销大
4. **边界情况**：注意处理空children和无效样式值

## 相关组件

- [SingleChildScrollView](./SingleChildScrollView.md) - 可滚动容器
