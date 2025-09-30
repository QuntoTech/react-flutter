# Icon组件

## 概述

`Icon`组件用于显示Material Design图标。React-Flutter框架提供了7999+个Material Design图标，全部通过代码自动生成，与Flutter SDK 100%同步。

## 核心特性

✅ **7999+图标** - 完整的Material Design图标库  
✅ **自动生成** - 从Flutter SDK自动提取，零维护  
✅ **类型安全** - TypeScript智能提示所有图标名称  
✅ **零配置** - MaterialIcons字体Flutter内置  
✅ **完全对齐** - 与Flutter Icon API 100%一致

## 使用方式

### 基础用法

```jsx
import { Icon, Color } from '@react-flutter/components';

// 直接使用Icon命名空间
<Icon.Favorite />
<Icon.Home />
<Icon.Settings />
```

### 自定义大小

```jsx
// size属性控制图标大小（默认24.0）
<Icon.Add size={24} />
<Icon.Delete size={32} />
<Icon.Edit size={48} />
```

### 自定义颜色

```jsx
// color属性设置图标颜色
<Icon.Favorite color={Color.red} />
<Icon.Home color={Color.fromRGBO(33, 150, 243, 1.0)} />
<Icon.Settings color={Color.white} />
```

### 组合使用

```jsx
// 图标+文本组合
<Column crossAxisAlignment="center">
  <Icon.Home size={28} color={Color.blue} />
  <Text text="首页" style={{ fontSize: 12 }} />
</Column>
```

### 无障碍支持

```jsx
// semanticLabel为屏幕阅读器提供语义标签
<Icon.Add 
  size={32} 
  color={Color.blue}
  semanticLabel="添加新项目"
/>
```

## Props

### BaseIconProps

所有Icon组件都接受以下属性：

| 属性 | 类型 | 必需 | 默认值 | 说明 |
|------|------|------|--------|------|
| `size` | `number` | 否 | 24.0 | 图标大小（像素） |
| `color` | `ColorValue` | 否 | 继承主题 | 图标颜色 |
| `semanticLabel` | `string` | 否 | - | 语义标签（无障碍） |
| `textDirection` | `'ltr' \| 'rtl'` | 否 | - | 文本方向 |
| `id` | `string` | 否 | - | 唯一标识（映射为Flutter Key） |

## 常用图标

### 操作类

- `Icon.Add` - 添加
- `Icon.Delete` - 删除
- `Icon.Edit` - 编辑
- `Icon.Close` - 关闭
- `Icon.Check` - 确认
- `Icon.Clear` - 清除
- `Icon.Save` - 保存
- `Icon.Cancel` - 取消

### 导航类

- `Icon.Home` - 首页
- `Icon.ArrowBack` - 返回
- `Icon.ArrowForward` - 前进
- `Icon.Menu` - 菜单
- `Icon.MoreVert` - 更多（垂直）
- `Icon.MoreHoriz` - 更多（水平）

### 功能类

- `Icon.Search` - 搜索
- `Icon.Settings` - 设置
- `Icon.Favorite` - 收藏
- `Icon.Star` - 星标
- `Icon.Share` - 分享
- `Icon.Info` - 信息
- `Icon.Warning` - 警告
- `Icon.Error` - 错误

### 媒体类

- `Icon.PlayArrow` - 播放
- `Icon.Pause` - 暂停
- `Icon.Stop` - 停止
- `Icon.VolumeUp` - 音量增加
- `Icon.VolumeDown` - 音量减少
- `Icon.VolumeMute` - 静音

*提示：IDE会自动提示所有7999+个可用图标名称*

## IconData结构

虽然通常不需要直接使用，但了解IconData结构有助于理解Icon组件的工作原理：

```typescript
interface IconData {
  codePoint: number;           // Unicode码点（如0xe87d）
  fontFamily?: string;         // 字体族（默认'MaterialIcons'）
  fontPackage?: string;        // 字体包
  matchTextDirection?: boolean; // 是否匹配文本方向
}
```

## 代码生成机制

Icon组件采用自动代码生成机制，确保与Flutter SDK完全同步：

### 生成流程

1. **构建前自动执行**：每次`npm run build`前自动运行生成脚本
2. **提取Flutter Icons**：从Flutter SDK的`icons.dart`文件提取所有IconData定义
3. **生成TypeScript代码**：自动生成`packages/components/src/icon.ts`文件
4. **包含所有图标**：7999+个Material Design图标全部生成

### 手动生成

```bash
cd packages/components
npm run generate:icons
```

### 生成的代码格式

```typescript
export const Icon = {
  Favorite: (props: BaseIconProps) => 
    React.createElement(IconBase, { ...props, codePoint: 0xe87d }),
  Home: (props: BaseIconProps) => 
    React.createElement(IconBase, { ...props, codePoint: 0xe88a }),
  // ... 7997 more icons
};
```

## Flutter API对齐

### Flutter Icon构造函数

```dart
Icon(
  IconData icon,
  {
    Key? key,
    double? size,
    Color? color,
    String? semanticLabel,
    TextDirection? textDirection,
  }
)
```

### React-Flutter Icon组件

```jsx
<Icon.Favorite
  id="icon-key"          // → key
  size={24}              // → size
  color={Color.red}      // → color
  semanticLabel="收藏"   // → semanticLabel
  textDirection="ltr"    // → textDirection
/>
```

### IconData对应关系

| Flutter | React-Flutter |
|---------|---------------|
| `Icons.favorite` | `Icon.Favorite` |
| `Icons.home` | `Icon.Home` |
| `Icons.settings` | `Icon.Settings` |
| `codePoint: 0xe87d` | `codePoint: 0xe87d` |
| `fontFamily: 'MaterialIcons'` | `fontFamily: 'MaterialIcons'` |

## 使用场景

### 1. 按钮图标

```jsx
<ElevatedButton onPressed={handlePress}>
  <Row>
    <Icon.Add size={20} color={Color.white} />
    <SizedBox width={8} />
    <Text text="添加" style={{ color: Color.white }} />
  </Row>
</ElevatedButton>
```

### 2. 底部导航栏

```jsx
<Row mainAxisAlignment="spaceAround">
  <Column crossAxisAlignment="center">
    <Icon.Home size={24} color={isActive ? Color.blue : Color.grey} />
    <Text text="首页" style={{ fontSize: 10 }} />
  </Column>
  <Column crossAxisAlignment="center">
    <Icon.Search size={24} color={Color.grey} />
    <Text text="搜索" style={{ fontSize: 10 }} />
  </Column>
  <Column crossAxisAlignment="center">
    <Icon.Settings size={24} color={Color.grey} />
    <Text text="设置" style={{ fontSize: 10 }} />
  </Column>
</Row>
```

### 3. 列表项图标

```jsx
<Row>
  <Icon.Folder size={32} color={Color.blue} />
  <SizedBox width={16} />
  <Column crossAxisAlignment="start">
    <Text text="文档" style={{ fontSize: 16, fontWeight: 'bold' }} />
    <Text text="10个文件" style={{ fontSize: 12, color: Color.grey }} />
  </Column>
</Row>
```

### 4. 状态指示

```jsx
{status === 'success' && <Icon.CheckCircle color={Color.green} />}
{status === 'error' && <Icon.Error color={Color.red} />}
{status === 'warning' && <Icon.Warning color={Color.orange} />}
```

## 设计建议

### 1. 尺寸规范

- **小图标**：16-20px（用于内联文本）
- **标准图标**：24px（Material Design标准）
- **大图标**：32-48px（用于强调）
- **巨大图标**：64px+（用于空状态、占位符）

### 2. 颜色使用

- **主题色**：用于突出重要操作
- **灰色**：用于次要信息
- **语义色**：红色（错误）、绿色（成功）、橙色（警告）
- **白色**：用于深色背景

### 3. 无障碍性

- **关键操作图标**：必须添加`semanticLabel`
- **装饰性图标**：无需语义标签
- **触摸目标**：图标按钮最小44x44px

### 4. 性能优化

- **Tree-shaking**：只打包使用的图标
- **内置字体**：MaterialIcons已预加载
- **无网络请求**：所有图标本地渲染

## 常见问题

### 1. 如何查找图标？

- **IDE智能提示**：输入`Icon.`后IDE会列出所有可用图标
- **Material Design官网**：[material.io/icons](https://material.io/icons)
- **Flutter文档**：[api.flutter.dev/flutter/material/Icons-class.html](https://api.flutter.dev/flutter/material/Icons-class.html)

### 2. 图标显示为方框？

- **确认字体加载**：MaterialIcons字体Flutter内置，应自动可用
- **检查codePoint**：确认图标codePoint正确

### 3. 如何更新图标库？

```bash
# 重新生成Icon组件
cd packages/components
npm run generate:icons

# 重新构建
npm run build
```

### 4. 图标太大或太小？

```jsx
// 调整size属性
<Icon.Home size={32} />  // 更大
<Icon.Home size={16} />  // 更小
```

### 5. 如何使用自定义图标？

虽然Icon组件主要用于Material Icons，但也支持自定义IconData：

```jsx
// 不推荐：直接创建自定义IconData不如使用自定义字体
import { IconBase } from '@react-flutter/components';

<IconBase 
  codePoint={0x1234}
  fontFamily="CustomIcons"
  size={24}
  color={Color.blue}
/>
```

## 与Flutter API差异

### 无差异

Icon组件与Flutter Icon API完全对齐，无任何差异。

### 额外特性

- **命名空间组件**：`Icon.Favorite`比`<Icon icon={Icons.favorite} />`更简洁
- **自动代码生成**：确保永久与Flutter SDK同步

## 测试

### 单元测试

```typescript
import { Icon, BaseIconProps } from '@react-flutter/components';

test('Icon组件应该接受size属性', () => {
  const props: BaseIconProps = { size: 32 };
  expect(() => Icon.Home(props)).not.toThrow();
});
```

### 集成测试

```dart
testWidgets('Icon应该渲染正确的大小', (WidgetTester tester) async {
  await tester.pumpWidget(MyApp());
  
  final iconFinder = find.byKey(const Key('my-icon'));
  final icon = tester.widget<Icon>(iconFinder);
  
  expect(icon.size, equals(32.0));
});
```

## 相关组件

- **ElevatedButton** - 常与Icon组合使用
- **Text** - 图标+文本组合
- **Row/Column** - 图标布局
- **Container** - 图标容器

## 参考

- [Flutter Icon API](https://api.flutter.dev/flutter/widgets/Icon-class.html)
- [Material Design Icons](https://material.io/icons)
- [Icon代码生成脚本](../../packages/components/scripts/generate-icons.js)
