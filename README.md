# React-Flutter Framework

🚀 React-Flutter是一个创新的跨平台UI框架，允许开发者使用React语法编写代码，并在Flutter引擎上渲染原生UI组件。

## ✨ 特性亮点

- 🚀 **React语法**: 使用熟悉的React Hooks和JSX语法
- 🎯 **Flutter渲染**: 利用Flutter强大的UI渲染引擎  
- 📦 **Agent系统**: 支持热插拔的独立组件包
- 🔄 **实时状态管理**: 基于React状态自动更新UI
- 🎨 **完整样式系统**: API化的样式类(Color, EdgeInsets, BorderRadius, Border)
- ⚡ **高性能测试**: 毫秒级精确检测的集成测试体系
- 🏗️ **生产就绪**: 完整的端到端架构验证

## 🚀 快速开始

### 环境要求

- Flutter 3.9.0+
- Node.js 16+
- pnpm (推荐)
- Windows/macOS/Linux

### 安装运行

```bash
# 1. 安装Flutter依赖
flutter pub get

# 2. 安装JavaScript依赖
pnpm install

# 3. 构建所有包
pnpm -r build

# 4. 运行应用
flutter run
```

### 运行测试

```bash
# 构建Windows应用(测试环境需要)
flutter build windows

# 设置PATH环境变量
$env:path += ";${pwd}\build\windows\x64\runner\Release"

# 运行完整集成测试
flutter test integration_test -d windows
```

## 🏗️ 核心架构

### Agent系统

React-Flutter采用Agent架构，每个Agent是一个独立的React组件包：

```
agent/
├── counter/                 # Counter Agent演示
│   ├── manifest.json        # Agent配置
│   ├── src/
│   │   ├── Counter.jsx      # React组件
│   │   └── styled.js        # 样式组件
│   └── dist/                # 编译产物
```

### 组件示例

```jsx
import { Container, Text, ElevatedButton, Color, EdgeInsets, BorderRadius } from '@react-flutter/components';

const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = React.useState(initialValue);

  return (
    <Container 
      style={{
        padding: EdgeInsets.all(16),
        margin: EdgeInsets.symmetric({ horizontal: 8 }),
        decoration: {
          color: Color.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all({ color: Color.blue, width: 2 })
        }
      }}
    >
      <Text text={`当前计数: ${count}`} />
      <ElevatedButton onPressed={() => setCount(count + 1)}>
        <Text text="增加 (+1)" />
      </ElevatedButton>
    </Container>
  );
};
```

## 🎨 样式系统

### API化样式设计

React-Flutter提供Flutter风格的API化样式类：

```jsx
// EdgeInsets - 边距和内边距
EdgeInsets.all(16)
EdgeInsets.symmetric({ vertical: 8, horizontal: 16 })
EdgeInsets.only({ top: 8, left: 16 })

// Color - 颜色系统
Color.blue
Color.fromRGBO(255, 0, 0, 0.8)
Color.fromARGB(255, 255, 0, 0)

// BorderRadius - 圆角
BorderRadius.circular(12)
BorderRadius.only({ topLeft: 8, topRight: 8 })

// Border - 边框
Border.all({ color: Color.blue, width: 2 })
Border.symmetric({ horizontal: BorderSide.none })
```

### 样式使用方式

```jsx
<Container 
  style={{
    padding: EdgeInsets.all(16),        // 内边距
    margin: EdgeInsets.all(8),          // 外边距  
    color: Color.white,                 // 背景色
    decoration: {                       // 装饰
      borderRadius: BorderRadius.circular(12),
      border: Border.all({ color: Color.blue, width: 1 })
    }
  }}
>
  <Text 
    text="Hello World" 
    style={{ 
      color: Color.black87,
      fontSize: 16 
    }} 
  />
</Container>
```

## 📊 项目结构

```
react_flutter/
├── lib/                     # Flutter核心代码
│   ├── components/          # Flutter组件实现
│   ├── core/               # React引擎和组件注册
│   ├── examples/           # 演示应用
│   └── utils/              # 工具类
├── packages/               # JavaScript包
│   ├── core/               # React核心包
│   └── components/         # React组件和样式系统
├── agent/                  # Agent包
│   └── counter/            # Counter演示Agent
├── integration_test/       # 集成测试
│   ├── agent_integration_test.dart
│   └── README.md           # 测试文档
├── docs/                   # 项目文档
└── assets/                 # 资源文件
```

## 🧪 测试体系

### 高性能集成测试

- ⚡ **毫秒级检测**: 平均10ms精确状态检测
- 🎯 **端到端验证**: React代码到Flutter渲染的完整链路
- 🔄 **压力测试**: 快速操作下的系统稳定性验证
- 🎨 **样式验证**: 完整的样式系统渲染测试

### 测试覆盖

- ✅ Agent初始化和加载
- ✅ 样式系统渲染(Color, EdgeInsets, BorderRadius, Border)
- ✅ Counter交互功能
- ✅ React-Flutter数据同步
- ✅ UI状态持久性

## 🎯 技术亮点

### 解决的核心挑战

1. **Flutter+React+JS混合编程测试**
   - 解决了flutter_js在测试环境中的DLL加载问题
   - 实现了ReactEngine在集成测试中的稳定运行

2. **精确状态检测**
   - 从固定时间等待优化到状态检测
   - 测试性能提升75%+

3. **完整样式系统**
   - API化样式设计，对齐Flutter原生API
   - 类型安全的样式属性
   - 跨平台数据转换

## 📈 开发路线

### ✅ 已完成

- [x] 基础React-Flutter桥接
- [x] Agent系统和热加载  
- [x] 完整组件库
- [x] **API化样式系统**(Color, EdgeInsets, BorderRadius, Border)
- [x] **高性能集成测试体系**
- [x] **端到端架构验证**
- [x] 事件处理和状态管理

### 🔄 进行中

- [ ] 更多样式属性(BoxShadow, Gradient, DecorationImage)
- [ ] 性能优化和内存管理
- [ ] 开发者工具

### 📋 计划中

- [ ] 动画支持
- [ ] 主题系统
- [ ] 更多内置组件
- [ ] 多平台适配优化

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

### 开发指南

1. Fork本仓库
2. 创建功能分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 创建Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

🎉 **React-Flutter Framework - 让React开发者享受Flutter的强大渲染能力！**