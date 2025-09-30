# Image组件

## 概述

`Image`组件用于显示各种类型的图片，包括网络图片、asset图片和文件图片。完全对齐Flutter Image API，支持丰富的图片适应、对齐和颜色混合功能。

## 核心特性

✅ **多种图片源** - 支持网络图片、asset图片、文件图片  
✅ **适应方式** - BoxFit控制图片如何适应容器  
✅ **对齐控制** - Alignment控制图片在容器中的位置  
✅ **颜色混合** - ColorBlendMode支持颜色叠加效果  
✅ **无障碍** - 支持semanticLabel语义标签  
✅ **完全对齐** - 与Flutter Image API 100%一致

## 使用方式

### 基础用法 - 网络图片

```jsx
import { Image } from '@react-flutter/components';

// 显示网络图片
<Image 
  src="https://picsum.photos/300/200"
  width={300}
  height={200}
/>
```

### BoxFit适应方式

```jsx
// cover - 覆盖容器，保持宽高比，可能裁剪
<Image 
  src="https://picsum.photos/200"
  width={150}
  height={150}
  fit="cover"
/>

// contain - 完整显示图片，保持宽高比，可能留白
<Image 
  src="https://picsum.photos/200"
  width={150}
  height={150}
  fit="contain"
/>

// fill - 填充容器，可能变形
<Image 
  src="https://picsum.photos/200"
  width={150}
  height={150}
  fit="fill"
/>

// none - 不缩放，原始大小显示
<Image 
  src="https://picsum.photos/200"
  width={150}
  height={150}
  fit="none"
/>
```

### 对齐方式

```jsx
// 使用alignment控制图片在容器中的位置
<Image 
  src="https://picsum.photos/200"
  width={300}
  height={200}
  fit="none"  // fit="none"时alignment最明显
  alignment="centerRight"
/>

// 常用对齐值
// - "topLeft", "topCenter", "topRight"
// - "centerLeft", "center", "centerRight"
// - "bottomLeft", "bottomCenter", "bottomRight"
```

### 颜色混合

```jsx
// 为图片添加颜色叠加效果
<Image 
  src="https://picsum.photos/150"
  width={100}
  height={100}
  color={Color.fromRGBO(255, 0, 0, 0.5)}  // 半透明红色
  colorBlendMode="modulate"
/>

// 常用混合模式
// - "modulate" - 颜色调制（最常用）
// - "multiply" - 正片叠底
// - "overlay" - 叠加
// - "screen" - 滤色
```

### 图片重复

```jsx
// 使用repeat控制图片如何重复填充空间
<Image 
  src="https://picsum.photos/50"
  width={200}
  height={200}
  repeat="repeatX"  // 水平重复
/>

// 重复模式
// - "noRepeat" - 不重复（默认）
// - "repeat" - 水平和垂直重复
// - "repeatX" - 仅水平重复
// - "repeatY" - 仅垂直重复
```

### 无障碍支持

```jsx
// semanticLabel为屏幕阅读器提供图片描述
<Image 
  src="https://picsum.photos/200"
  width={150}
  height={150}
  semanticLabel="美丽的风景照片"
/>

// excludeFromSemantics排除无障碍树（装饰性图片）
<Image 
  src="https://picsum.photos/200"
  width={150}
  height={150}
  excludeFromSemantics={true}
/>
```

### 滤镜质量

```jsx
// filterQuality控制图片缩放时的滤镜质量
<Image 
  src="https://picsum.photos/500"
  width={100}
  height={100}
  filterQuality="high"
/>

// 质量等级
// - "none" - 无滤镜，最快，质量最低
// - "low" - 低质量（默认）
// - "medium" - 中等质量
// - "high" - 高质量，最慢，质量最高
```

### Asset图片

```jsx
// 使用asset路径（需要在Flutter中配置）
<Image 
  src="assets/images/logo.png"
  width={200}
  height={100}
/>
```

## Props

### ImageProps

| 属性 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `src` | `string` | 是 | - | 图片源（URL或asset路径） |
| `width` | `number` | 否 | - | 图片宽度 |
| `height` | `number` | 否 | - | 图片高度 |
| `fit` | `BoxFitValue` | 否 | - | 图片适应方式 |
| `alignment` | `AlignmentValue` | 否 | `'center'` | 图片对齐方式 |
| `repeat` | `ImageRepeatValue` | 否 | `'noRepeat'` | 图片重复方式 |
| `color` | `ColorValue` | 否 | - | 颜色混合色值 |
| `colorBlendMode` | `BlendModeValue` | 否 | - | 颜色混合模式 |
| `semanticLabel` | `string` | 否 | - | 语义标签（无障碍） |
| `excludeFromSemantics` | `boolean` | 否 | `false` | 是否排除无障碍树 |
| `filterQuality` | `'none' \| 'low' \| 'medium' \| 'high'` | 否 | `'low'` | 滤镜质量 |
| `id` | `string` | 否 | - | 唯一标识（映射为Flutter Key） |

## 类型定义

### BoxFitValue

```typescript
type BoxFitValue = 
  | 'fill'      // 填充容器，可能变形
  | 'contain'   // 完整显示，保持宽高比
  | 'cover'     // 覆盖容器，保持宽高比
  | 'fitWidth'  // 适应宽度
  | 'fitHeight' // 适应高度
  | 'none'      // 不缩放
  | 'scaleDown'; // 缩小但不放大
```

### ImageRepeatValue

```typescript
type ImageRepeatValue = 
  | 'repeat'    // 水平和垂直重复
  | 'repeatX'   // 仅水平重复
  | 'repeatY'   // 仅垂直重复
  | 'noRepeat'; // 不重复
```

### BlendModeValue

```typescript
type BlendModeValue = 
  | 'clear' | 'src' | 'dst' | 'srcOver' | 'dstOver'
  | 'srcIn' | 'dstIn' | 'srcOut' | 'dstOut'
  | 'srcATop' | 'dstATop' | 'xor' | 'plus'
  | 'modulate' | 'screen' | 'overlay'
  | 'darken' | 'lighten' | 'colorDodge' | 'colorBurn'
  | 'hardLight' | 'softLight' | 'difference' | 'exclusion'
  | 'multiply' | 'hue' | 'saturation' | 'color' | 'luminosity';
```

## 使用场景

### 1. 头像显示

```jsx
<Image 
  src={userAvatarUrl}
  width={60}
  height={60}
  fit="cover"
  id="user-avatar"
/>
```

### 2. 全屏背景图

```jsx
<Image 
  src="https://example.com/background.jpg"
  width={screenWidth}
  height={screenHeight}
  fit="cover"
  excludeFromSemantics={true}
/>
```

### 3. 相册缩略图

```jsx
<Image 
  src={photoUrl}
  width={120}
  height={120}
  fit="cover"
  filterQuality="medium"
  id={`photo-${photoId}`}
/>
```

### 4. Logo显示

```jsx
<Image 
  src="assets/images/logo.png"
  width={180}
  height={60}
  fit="contain"
  semanticLabel="公司Logo"
/>
```

### 5. 图片色调滤镜

```jsx
// 怀旧色调
<Image 
  src={photoUrl}
  width={200}
  height={200}
  color={Color.fromRGBO(139, 69, 19, 0.3)}
  colorBlendMode="multiply"
/>
```

## 注意事项

### 网络图片加载

1. **权限配置**：确保Flutter项目已配置网络权限
2. **HTTPS要求**：iOS默认要求HTTPS，HTTP需特殊配置
3. **加载状态**：当前版本不支持加载占位符，需在Flutter层实现

### Asset图片

1. **配置required**：asset图片需在`pubspec.yaml`中声明
2. **路径约定**：使用`assets/`前缀作为资源路径
3. **不同分辨率**：Flutter支持`@2x`, `@3x`等多分辨率资源

### 性能优化

1. **合适尺寸**：避免加载过大图片，使用合适的`width`和`height`
2. **滤镜质量**：根据需求选择`filterQuality`，高质量会影响性能
3. **缓存策略**：网络图片会自动缓存，但缓存策略在Flutter层控制

### 尺寸控制

1. **明确指定**：建议明确指定`width`和`height`避免布局抖动
2. **宽高比**：使用`fit`属性控制图片宽高比
3. **约束容器**：在`Container`中可通过`constraints`进一步控制

## 相关组件

- **Container** - 可用作图片容器，提供边框、圆角等装饰
- **Stack** - 可实现图片叠加效果
- **ClipRRect** - 可实现圆角图片裁剪（未来版本）

## Flutter API参考

完全对齐Flutter的`Image`组件：
- [Image class - Flutter API](https://api.flutter.dev/flutter/widgets/Image-class.html)
- [BoxFit enum - Flutter API](https://api.flutter.dev/flutter/painting/BoxFit.html)
- [BlendMode enum - Flutter API](https://api.flutter.dev/flutter/dart-ui/BlendMode.html)

## 自动生成说明

Image组件与Flutter SDK原生API完全对齐：
- 所有属性直接映射Flutter Image构造函数
- 所有枚举值与Flutter枚举一一对应
- 通过Flutter js bridge自动传递props到Flutter层

---

**版本**: v0.1.0  
**更新日期**: 2025-09-30  
**状态**: ✅ 已完成
