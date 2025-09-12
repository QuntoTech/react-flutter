### **React-Flutter 样式系统设计文档**

**版本:** 4.0 (最终实现版)
**日期:** 2025年9月11日
**作者:** Gemini

---

### 1. 核心设计哲学

我们确立了"**以 Flutter 为本，以 Web 为体**"的核心思想，旨在为 React 开发者提供一套既熟悉强大、又清晰安全的样式方案。

1.  **组件命名忠于 Flutter**: 框架的组件（如 `Container`, `Text`）与 Flutter 官方命名保持一致，方便开发者查阅 Flutter 文档来理解组件的核心行为与能力。
2.  **样式接口对齐 Web 生态**: 采用业界验证的"CSS-in-JS"模式，提供从基础到高级的两种样式化方式。
3.  **属性命名忠于 Flutter**: 为保证实现的清晰、直接和无歧义，`style` 对象内的所有属性名**严格对齐** Flutter Widget 的原生属性名。

### 2. 分层样式系统 (Layered Styling System)

我们的样式系统分为两个层次：底层的 `style` 属性和上层的 `styleSheet` 高阶组件。

#### **第一层 (地基): `style` 属性**

每个可样式化的基础组件（如 `Container`, `Text`）都会提供一个统一的 `style` 属性。

*   **功能**: 接收一个"样式对象"或"样式对象数组"，用于定义组件的外观。
*   **类型安全**: 每个组件都会导出其专属的样式类型（如 `ContainerStyle`），`style` 属性会受到此类型的严格约束。

**`Container` 组件的 Props 定义:**

```typescript
// Container.ts
import type { ReactNode } from 'react';
import type { ContainerStyle } from './styles';

export type ContainerProps = {
  children?: ReactNode;
  style?: ContainerStyle | ContainerStyle[];
};
```

---

#### **第二层 (最佳实践): `styleSheet` 高阶组件**

这是我们推荐的、用于构建可复用样式组件的最佳方式，其 API 设计思想源于 `styled-components`，并支持样式组件的继承和扩展。

**核心API设计:**

1. **基础样式化**: `styleSheet.ComponentName(styles)` - 将基础组件样式化
2. **样式继承**: `styleSheet(StyledComponent)(newStyles)` - 继承并扩展已有样式组件

**样式合并优先级**: `baseStyles → inheritedStyles → props.style`

--- 

### 3. 示例用法 (TypeScript)

#### **用法一：直接使用 `style` 属性 (基础)**

```tsx
import React from 'react';
import { Container, Text } from './components';

const cardStyle = {
  padding: 16,
  color: 'white',
  decoration: { borderRadius: 8 },
};

const BasicCard: React.FC = () => {
  return (
    <Container style={cardStyle}>
      <Text>这是一个基础卡片</Text>
    </Container>
  );
}
```

#### **用法二：使用 `styleSheet` 基础样式化 (推荐)**

```tsx
import React from 'react';
import { styleSheet, Container, Text, Column } from './framework';

// 1. 基础组件样式化 - 创建可复用的样式组件
const Card = styleSheet.Container({
  margin: '16 0',
  padding: 16,
  color: 'white',
  decoration: {
    borderRadius: 8,
    border: { width: 1, color: '#E0E0E0' },
  },
});

const Title = styleSheet.Text({
  fontSize: 24,
  fontWeight: 'bold',
});

// 2. 在应用中使用
const BasicStyledCard: React.FC = () => {
  return (
    <Card>
      <Column>
        <Title>这是一个样式化卡片</Title>
      </Column>
    </Card>
  );
}
```

#### **用法三：样式组件继承扩展 (高级)**

```tsx
import React from 'react';
import { styleSheet } from './framework';

// 1. 创建基础样式组件
const BaseTitle = styleSheet.Text({
  fontSize: 20,
  fontWeight: 'bold',
});

// 2. 继承并扩展样式 - 第一次继承
const RedTitle = styleSheet(BaseTitle)({
  color: 'red',
  fontSize: 24,  // 覆盖基础样式中的fontSize
});

// 3. 继续继承扩展 - 多层继承
const CenterRedTitle = styleSheet(RedTitle)({
  textAlign: 'center',
  fontSize: 28,  // 再次覆盖fontSize
});

// 4. 创建复杂的卡片样式继承链
const BaseCard = styleSheet.Container({
  padding: 16,
  decoration: { borderRadius: 8 },
});

const ShadowCard = styleSheet(BaseCard)({
  decoration: {
    borderRadius: 12,  // 完全覆盖decoration对象
    boxShadow: [{ color: 'rgba(0,0,0,0.1)', blurRadius: 4 }],
  },
});

const ColorfulShadowCard = styleSheet(ShadowCard)({
  color: '#f0f0f0',
  margin: 8,
});

// 5. 使用继承的样式组件
const AdvancedCard: React.FC = () => {
  return (
    <ColorfulShadowCard style={{ margin: 12 }}>  {/* props.style具有最高优先级 */}
      <Column>
        <CenterRedTitle>高级样式标题</CenterRedTitle>
        <BaseTitle style={{ color: 'blue' }}>基础标题变蓝色</BaseTitle>
      </Column>
    </ColorfulShadowCard>
  );
}
```

#### **用法四：样式合并优先级示例**

```tsx
// 演示样式合并的优先级规则
const BaseButton = styleSheet.Container({
  padding: 16,        // 基础样式
  color: 'blue',
  decoration: { borderRadius: 8 },
});

const RedButton = styleSheet(BaseButton)({
  color: 'red',       // 继承样式覆盖基础样式
  margin: 8,
});

const App: React.FC = () => {
  return (
    <RedButton style={{ 
      color: 'green',   // props.style具有最高优先级
      padding: 20,      // 覆盖基础样式中的padding
    }}>
      {/* 
        最终样式结果:
        {
          padding: 20,           // 来自props.style
          color: 'green',        // 来自props.style  
          decoration: { borderRadius: 8 },  // 来自基础样式
          margin: 8,             // 来自继承样式
        }
      */}
      最终按钮
    </RedButton>
  );
}
```

#### **用法五：类型安全检查演示**

```tsx
// ✅ 正确用法 - TypeScript会提供完整的智能提示
const ValidCard = styleSheet.Container({
  padding: 16,        // ✅ ContainerStyle允许
  color: 'white',     // ✅ ContainerStyle允许  
  decoration: {       // ✅ ContainerStyle允许
    borderRadius: 8,
    border: { width: 1, color: '#E0E0E0' },
  },
});

// ❌ 错误用法 - TypeScript编译时报错
const InvalidCard = styleSheet.Container({
  fontSize: 24,       // ❌ TS Error: Property 'fontSize' does not exist on type 'ContainerStyle'
  backgroundColor: 'red', // ❌ TS Error: 应该使用 'color' 而不是 'backgroundColor'  
});

// ❌ 继承时的类型检查
const InvalidTextStyle = styleSheet(BaseTitle)({
  padding: 16,        // ❌ TS Error: Property 'padding' does not exist on type 'TextStyle'
});
```

### 4. 技术实现要点

#### **4.1 样式合并策略**

我们采用**覆盖策略**而非深度合并，确保行为清晰可预测：

```typescript
// 示例：decoration对象的覆盖行为
baseStyles = { 
  decoration: { borderRadius: 8, border: { width: 1, color: 'red' } } 
};

newStyles = { 
  decoration: { borderRadius: 12 } 
};

// 结果：decoration完全被覆盖，border信息丢失
finalStyles = { 
  decoration: { borderRadius: 12 }  // border丢失
};
```

#### **4.2 样式组件元数据**

每个样式化组件都携带必要的元数据以支持继承：

```typescript
interface StyledComponent extends React.ComponentType {
  isStyledComponent: true;
  Component: React.ComponentType;  // 原始基础组件
  baseStyles: StyleObject;         // 累积的样式对象
}
```

#### **4.3 React端负责样式合并**

样式合并完全在React端完成，Flutter端只需处理最终的单一样式对象：

- **React端**: 处理样式继承、合并、优先级逻辑
- **Flutter端**: 从`style`对象中提取属性，映射到Flutter Widget

### 5. 样式类型定义规范

#### **5.1 ContainerStyle (对齐Flutter Container)**

```typescript
interface ContainerStyle {
  // 尺寸属性
  width?: number;
  height?: number;
  
  // 间距属性  
  padding?: number | string | EdgeInsetsValue;
  margin?: number | string | EdgeInsetsValue;
  
  // 颜色和装饰
  color?: string;
  decoration?: DecorationStyle;
  foregroundDecoration?: DecorationStyle;
  
  // 布局属性
  alignment?: AlignmentValue;
  constraints?: ConstraintsStyle;
  transform?: TransformValue;
  transformAlignment?: AlignmentValue;
  clipBehavior?: ClipBehaviorValue;
}

interface DecorationStyle {
  color?: string;
  borderRadius?: number | BorderRadiusValue;
  border?: BorderStyle;
  boxShadow?: BoxShadowStyle[];
  gradient?: GradientStyle;
  image?: DecorationImageStyle;
}
```

#### **5.2 TextStyle (对齐Flutter Text)**

```typescript
interface TextStyle {
  // 字体属性
  fontSize?: number;
  fontWeight?: FontWeightValue;
  fontFamily?: string;
  fontStyle?: FontStyleValue;
  
  // 颜色和装饰
  color?: string;
  backgroundColor?: string;
  decoration?: TextDecorationValue;
  decorationColor?: string;
  decorationStyle?: TextDecorationStyleValue;
  
  // 布局属性
  textAlign?: TextAlignValue;
  textDirection?: TextDirectionValue;
  letterSpacing?: number;
  wordSpacing?: number;
  height?: number;
  
  // 溢出处理
  overflow?: TextOverflowValue;
  maxLines?: number;
}
```

### 6. 实现路线图

#### **第一阶段: 基础实现**
1. ✅ 设计文档完成
2. 🔄 实现styleSheet核心函数
3. 📋 重构React组件Props为style属性
4. 📋 更新Flutter端VirtualDOM解析器

#### **第二阶段: 功能完善**  
1. 📋 实现完整的样式类型定义
2. 📋 添加开发时类型检查和错误提示
3. 📋 性能优化和样式缓存

#### **第三阶段: 生态完善**
1. 📋 提供样式主题系统
2. 📋 支持响应式样式
3. 📋 开发者工具和调试支持

---

**本设计文档为React-Flutter框架样式系统的最终实现规范，所有代码实现都应严格遵循此文档的API设计和技术要求。**
