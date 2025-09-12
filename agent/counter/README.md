# Counter Agent - React开发示例

这是一个使用现代React技术栈开发的Agent示例，展示真实的Agent开发流程。

## 🚀 技术栈

- **React 18** - 使用Hooks和JSX
- **Webpack 5** - 模块打包
- **Babel** - JSX转换和ES6+支持
- **Flutter组件** - 目标渲染平台

## 📦 项目结构

```
counter_agent/
├── src/
│   ├── Counter.jsx      # 主组件（JSX语法）
│   └── index.js         # Agent入口
├── dist/                # 打包输出
├── package.json         # 项目配置
├── webpack.config.js    # 打包配置
├── .babelrc            # Babel配置
└── manifest.json       # Agent配置
```

## 🛠️ 开发流程

### 1. 安装依赖
```bash
npm install
```

### 2. 开发模式（监听文件变化）
```bash
npm run dev
```

### 3. 生产构建
```bash
npm run build
```

### 4. Flutter集成
构建完成后，Flutter会自动加载 `dist/index.js`。

## ⚠️ 重要提醒

如果缺少dist目录，请执行：
```bash
npm run build
```

然后在Flutter中测试：
```bash
flutter pub get
flutter run
```
