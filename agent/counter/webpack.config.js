const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'CounterAgent',
    libraryTarget: 'global',
  },
  externals: {
    'react': 'React',
    '@react-flutter/core': 'FlutterReactCore',
    '@react-flutter/components': 'ReactFlutterComponents'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: ['> 1%', 'last 2 versions']
                }
              }],
              '@babel/preset-react'
            ]
          }
        }
      }, { // <-- 新增 .ts 和 .tsx 的处理规则
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  optimization: {
    minimize: false
  },
  target: 'web'
};
