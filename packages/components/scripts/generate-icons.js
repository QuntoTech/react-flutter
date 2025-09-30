#!/usr/bin/env node

/**
 * Icon组件自动生成脚本
 * 从Flutter SDK中提取Icons定义，生成TypeScript Icon组件
 * 
 * 执行时机：每次 npm run build 前自动执行（via prebuild）
 * 手动执行：npm run generate:icons
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. 定位 Flutter SDK
function findFlutterSdk() {
  try {
    // 方法1：从环境变量获取
    if (process.env.FLUTTER_SDK) {
      return process.env.FLUTTER_SDK;
    }

    // 方法2：通过 flutter --version 获取路径
    const flutterPath = execSync('flutter --version -v', { encoding: 'utf8' });
    const match = flutterPath.match(/Flutter root:\s*([^\n]+)/i) || 
                  flutterPath.match(/Flutter\s+\(.*?\)\s+•\s+revision.*?•\s+([^\n]+)/i);
    
    if (match) {
      return match[1].trim();
    }

    // 方法3：通过 which/where 命令
    const whichCmd = process.platform === 'win32' ? 'where flutter' : 'which flutter';
    const flutterBin = execSync(whichCmd, { encoding: 'utf8' }).trim().split('\n')[0];
    
    // 从 flutter 可执行文件路径推断 SDK 路径
    // 通常是: /path/to/flutter/bin/flutter -> /path/to/flutter
    return path.dirname(path.dirname(flutterBin));
  } catch (error) {
    console.error('❌ 无法找到 Flutter SDK，请设置 FLUTTER_SDK 环境变量');
    console.error('   export FLUTTER_SDK=/path/to/flutter');
    process.exit(1);
  }
}

// 2. 解析 Flutter icons.dart 文件
function parseFlutterIcons(iconsFilePath) {
  console.log(`📖 读取 Flutter Icons: ${iconsFilePath}`);
  
  if (!fs.existsSync(iconsFilePath)) {
    console.error(`❌ 文件不存在: ${iconsFilePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(iconsFilePath, 'utf8');
  const icons = [];

  // 正则匹配: static const IconData iconName = IconData(0xXXXX, fontFamily: 'MaterialIcons');
  const iconRegex = /static\s+const\s+IconData\s+(\w+)\s*=\s*IconData\(0x([0-9a-fA-F]+)(?:,\s*fontFamily:\s*'([^']+)')?(?:,\s*matchTextDirection:\s*(true|false))?\s*(?:,\s*fontPackage:\s*'([^']+)')?\)/g;

  let match;
  while ((match = iconRegex.exec(content)) !== null) {
    const [, name, codePoint, fontFamily, matchTextDirection, fontPackage] = match;
    
    icons.push({
      name: name.trim(),
      codePoint: `0x${codePoint}`,
      fontFamily: fontFamily || 'MaterialIcons',
      matchTextDirection: matchTextDirection === 'true',
      fontPackage: fontPackage
    });
  }

  console.log(`✅ 成功解析 ${icons.length} 个图标`);
  return icons;
}

// 3. 转换为 PascalCase (favorite -> Favorite)
function toPascalCase(str) {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// 4. 生成 TypeScript Icon 组件
function generateIconComponent(icons, flutterVersion) {
  const timestamp = new Date().toISOString();
  
  // 生成Icon组件代码
  const iconComponents = icons.map(icon => {
    const componentName = toPascalCase(icon.name);
    const props = [`codePoint: ${icon.codePoint}`];
    
    if (icon.fontFamily && icon.fontFamily !== 'MaterialIcons') {
      props.push(`fontFamily: '${icon.fontFamily}'`);
    }
    if (icon.matchTextDirection) {
      props.push('matchTextDirection: true');
    }
    if (icon.fontPackage) {
      props.push(`fontPackage: '${icon.fontPackage}'`);
    }

    return `  ${componentName}: (props: BaseIconProps) => React.createElement(IconBase, { ...props, ${props.join(', ')} })`;
  }).join(',\n');

  return `/**
 * ⚠️ 此文件由脚本自动生成，请勿手动编辑
 * 
 * 生成时间: ${timestamp}
 * Flutter版本: ${flutterVersion}
 * 图标数量: ${icons.length}
 * 
 * 使用方式:
 * import { Icon } from '@react-flutter/components';
 * 
 * <Icon.Favorite size={24} color={Color.red} />
 * <Icon.Home size={32} />
 */

import * as React from 'react';
import type { ColorValue } from './styles/color';

/**
 * Icon组件基础属性
 */
export interface BaseIconProps {
  size?: number;
  color?: ColorValue;
  semanticLabel?: string;
  textDirection?: 'ltr' | 'rtl';
  id?: string;
}

/**
 * IconData接口定义
 * 对应Flutter的IconData类
 */
export interface IconData {
  codePoint: number;
  fontFamily?: string;
  fontPackage?: string;
  matchTextDirection?: boolean;
}

/**
 * Icon基础组件
 * 所有具体图标组件的底层实现
 */
const IconBase: React.FC<BaseIconProps & Partial<IconData>> = ({
  codePoint,
  fontFamily = 'MaterialIcons',
  fontPackage,
  matchTextDirection = false,
  size,
  color,
  semanticLabel,
  textDirection,
  id,
}) => {
  return React.createElement('Icon', {
    icon: { 
      codePoint, 
      fontFamily, 
      fontPackage, 
      matchTextDirection 
    },
    size,
    color,
    semanticLabel,
    textDirection,
    id,
  });
};

/**
 * Icon命名空间
 * 包含所有Material Design图标组件
 */
export const Icon = {
${iconComponents}
};

/**
 * Icon名称类型
 * 用于类型安全的图标引用
 */
export type IconName = keyof typeof Icon;
`;
}

// 5. 主函数
function main() {
  console.log('🚀 开始生成Icon组件...\n');

  // 定位 Flutter SDK
  const flutterSdkPath = findFlutterSdk();
  console.log(`✅ Flutter SDK: ${flutterSdkPath}\n`);

  // 获取 Flutter 版本
  let flutterVersion = 'unknown';
  try {
    const versionOutput = execSync('flutter --version', { encoding: 'utf8' });
    const versionMatch = versionOutput.match(/Flutter\s+(\d+\.\d+\.\d+)/);
    if (versionMatch) {
      flutterVersion = versionMatch[1];
    }
  } catch (error) {
    console.warn('⚠️ 无法获取Flutter版本');
  }

  // icons.dart 文件路径
  const iconsFilePath = path.join(
    flutterSdkPath,
    'packages',
    'flutter',
    'lib',
    'src',
    'material',
    'icons.dart'
  );

  // 解析图标
  const icons = parseFlutterIcons(iconsFilePath);

  // 生成代码
  const code = generateIconComponent(icons, flutterVersion);

  // 写入文件
  const outputPath = path.join(__dirname, '..', 'src', 'icon.ts');
  fs.writeFileSync(outputPath, code, 'utf8');
  
  console.log(`\n✅ 成功生成Icon组件: ${outputPath}`);
  console.log(`📊 包含 ${icons.length} 个Material Design图标\n`);
}

// 执行
if (require.main === module) {
  main();
}

module.exports = { findFlutterSdk, parseFlutterIcons, toPascalCase };
