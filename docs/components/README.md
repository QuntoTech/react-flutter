# React-Flutter 组件文档

本目录包含所有已实现的React-Flutter组件的详细文档。

## 已实现组件

### 布局组件
- [Container](./Container.md) - 通用容器组件，支持布局、装饰和变换
- [Column](./Column.md) - 垂直布局组件，将子组件按垂直方向排列
- [Row](./Row.md) - 水平布局组件，将子组件按水平方向排列
- [SizedBox](./SizedBox.md) - 尺寸控制组件，提供固定尺寸约束和间距控制
- [SingleChildScrollView](./SingleChildScrollView.md) - 单子组件滚动视图

### 基础组件
- [Text](./Text.md) - 文本显示组件，支持丰富的文本样式和布局
- [ElevatedButton](./ElevatedButton.md) - Material Design 凸起按钮，支持Material状态管理

## 文档约定

每个组件文档包含以下部分：

1. **概述** - 组件功能和用途
2. **API参考** - 完整的属性列表
3. **使用示例** - 常见用法和代码示例
4. **Flutter对齐** - 与Flutter原生API的对应关系
5. **最佳实践** - 推荐的使用方式

## 开发指南

- 所有组件严格对齐Flutter原生API
- 支持TypeScript类型定义
- 提供完整的测试覆盖
- 使用id属性便于测试和调试
