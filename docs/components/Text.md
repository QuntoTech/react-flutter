# Text 组件

Text组件是Flutter风格的文本显示组件，用于显示单行或多行文本内容。

## 基本用法

```jsx
import { Text } from '@react-flutter/components';
import { Color } from '@react-flutter/components';

function MyComponent() {
  return (
    <Text text="Hello World" />
  );
}
```

## 属性

Text组件的属性分为两类：**独立属性**（行为、布局）和**style属性**（视觉样式）。

### 独立属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `text` | `string` | **必需** | 要显示的文本内容 |
| `textAlign` | `TextAlignValue` | `null` | 文本对齐方式 |
| `textDirection` | `TextDirectionValue` | `null` | 文本方向 |
| `maxLines` | `number` | `null` | 最大显示行数 |
| `overflow` | `TextOverflowValue` | `null` | 文本溢出处理方式 |
| `softWrap` | `boolean` | `null` | 是否启用软换行 |
| `textScaleFactor` | `number` | `null` | 文本缩放因子 |
| `semanticsLabel` | `string` | `null` | 语义标签，用于无障碍访问 |
| `locale` | `string` | `null` | 本地化设置 |
| `id` | `string` | `undefined` | 组件标识符，用于测试和调试 |
| `children` | `ReactNode` | `undefined` | 子组件 |

### style属性

通过`style`对象设置文本的视觉样式：

| 样式属性 | 类型 | 默认值 | 说明 |
|----------|------|--------|------|
| `fontSize` | `number` | `16` | 字体大小 |
| `fontWeight` | `FontWeightValue` | `'normal'` | 字体粗细 |
| `fontFamily` | `string` | `null` | 字体族 |
| `fontStyle` | `FontStyleValue` | `'normal'` | 字体样式 |
| `color` | `Color` | `null` | 文本颜色 |
| `backgroundColor` | `Color` | `null` | 背景颜色 |
| `decoration` | `TextDecorationValue` | `'none'` | 文本装饰 |
| `decorationColor` | `Color` | `null` | 装饰线颜色 |
| `decorationStyle` | `TextDecorationStyleValue` | `'solid'` | 装饰线样式 |
| `decorationThickness` | `number` | `1.0` | 装饰线粗细 |
| `letterSpacing` | `number` | `null` | 字母间距 |
| `wordSpacing` | `number` | `null` | 单词间距 |
| `height` | `number` | `null` | 行高倍数 |

## 属性值枚举

### TextAlign（文本对齐）

- `'left'` - 左对齐
- `'right'` - 右对齐
- `'center'` - 居中对齐
- `'justify'` - 两端对齐
- `'start'` - 起始位置对齐（受textDirection影响）
- `'end'` - 结束位置对齐（受textDirection影响）

### TextOverflow（溢出处理）

- `'clip'` - 裁剪溢出部分
- `'fade'` - 渐变淡出效果
- `'ellipsis'` - 显示省略号(...)
- `'visible'` - 显示溢出内容

### FontWeight（字体粗细）

- `'100'` / `'w100'` - 最细
- `'200'` / `'w200'` - 超细
- `'300'` / `'w300'` - 细
- `'400'` / `'w400'` / `'normal'` - 正常（默认）
- `'500'` / `'w500'` - 中等
- `'600'` / `'w600'` - 半粗
- `'700'` / `'w700'` / `'bold'` - 粗体
- `'800'` / `'w800'` - 超粗
- `'900'` / `'w900'` - 最粗

### TextDecoration（文本装饰）

- `'none'` - 无装饰（默认）
- `'underline'` - 下划线
- `'overline'` - 上划线
- `'linethrough'` - 删除线

## 使用示例

### 基础文本

```jsx
<Text text="普通文本" />
```

### 样式文本

```jsx
<Text 
  text="样式文本"
  style={{
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.blue,
    decoration: 'underline'
  }}
/>
```

### 多行文本

```jsx
<Text 
  text="这是一段很长的文本，用来演示多行显示和溢出处理功能。"
  maxLines={3}
  overflow="ellipsis"
  textAlign="justify"
/>
```

### 复杂样式

```jsx
<Text 
  text="复杂样式文本"
  style={{
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Arial',
    fontStyle: 'italic',
    color: Color.fromRGBO(255, 100, 50, 1.0),
    backgroundColor: Color.fromRGBO(240, 240, 240, 0.8),
    decoration: 'underline',
    decorationColor: Color.red,
    decorationStyle: 'wavy',
    letterSpacing: 1.5,
    wordSpacing: 2.0,
    height: 1.6
  }}
  textAlign="center"
  maxLines={2}
  softWrap={true}
/>
```

### 使用styleSheet

```jsx
import { styleSheet } from '@react-flutter/components';

const TitleText = styleSheet.Text({
  fontSize: 24,
  fontWeight: 'bold',
  color: Color.black
});

const BodyText = styleSheet.Text({
  fontSize: 16,
  color: Color.grey,
  height: 1.4
});

function MyComponent() {
  return (
    <Column>
      <TitleText text="标题文本" />
      <BodyText 
        text="正文内容..."
        maxLines={3}
        overflow="ellipsis"
      />
    </Column>
  );
}
```

### 国际化和无障碍

```jsx
<Text 
  text="مرحبا بالعالم"
  textDirection="rtl"
  locale="ar_SA"
  semanticsLabel="阿拉伯语问候语"
  style={{
    fontSize: 18,
    fontFamily: 'Noto Sans Arabic'
  }}
/>
```

## 设计原则

1. **属性分离** - 行为属性（textAlign、maxLines等）为独立props，视觉样式进入style对象
2. **Flutter API对齐** - 所有属性与Flutter Text Widget完全一致
3. **类型安全** - 使用TypeScript严格类型定义，确保类型安全
4. **性能优化** - 样式对象可复用，减少重渲染

## 注意事项

1. `text`属性是必需的，不能为空
2. 视觉样式（fontSize、color等）必须放在`style`对象中，不能作为独立props
3. `textDirection`会影响`start`/`end`对齐的实际方向
4. `maxLines`和`overflow`通常配合使用来控制文本显示
5. `height`是行高倍数，不是绝对高度（例如：height: 1.5 表示1.5倍行高）
6. `locale`格式为语言_地区（如：'zh_CN'、'en_US'）

## 性能优化

1. **样式复用** - 使用styleSheet创建可复用的样式组件
2. **避免内联样式** - 将style对象提取到组件外部
3. **合理使用maxLines** - 限制大文本的渲染范围

## 相关组件

- [Container](./Container.md) - 容器组件，可为Text提供背景和布局
- [Column](./Column.md) - 垂直布局，常用于排列多个Text
- [Row](./Row.md) - 水平布局，可用于行内文本排列
