import * as React from 'react';
import { FlutterRenderer } from './flutter-renderer';
import { AgentLoader } from './agent-loader';
import { executeFlutterEvent, processEventProps } from './event-handler';

// 设置全局环境变量
(globalThis as any).self = globalThis;
(globalThis as any).window = globalThis;
(globalThis as any).global = globalThis;

// 立即全局化React，确保所有地方都能访问
(globalThis as any).React = React;

/**
 * 初始化Flutter-React核心系统
 */
async function initialize(): Promise<boolean> {
  try {
    FlutterRenderer.initialize();
    FlutterRenderer.createRoot();
    AgentLoader.initialize();
    return true;
  } catch (error) {
    console.error('Flutter-React Core initialization failed:', error);
    return false;
  }
}


/**
 * 渲染Agent组件 - 返回更新指令数组（默认模式）
 */
function renderAgentComponent(agentName: string, props: any = {}): void {
  try {
    const Component = AgentLoader.findAgentComponent(agentName);
    if (!Component) {
      throw new Error(`Agent component not found: ${agentName}`);
    }
    const element = React.createElement(Component, props);
    FlutterRenderer.render(element); // 现在通过bridge发送指令，不返回
  } catch (error: any) {
    console.error('Render error:', error.message);
  }
}

/**
 * 处理事件
 */
function handleEvent(eventName: string, eventData: any = {}): void {
  executeFlutterEvent(eventName, eventData);
}

/**
 * 渲染React组件到Flutter（类似react-dom的render）
 */
function render(element: React.ReactElement): void {
  try {
    FlutterRenderer.render(element);
  } catch (error: any) {
    console.error('Render error:', error.message);
  }
}

// 创建全局对象
const FlutterReactCore = {
  initialize,
  render,            // 新的通用render方法
  renderAgentComponent,  // 保留向后兼容
  handleEvent
};

// 确保全局导出
(globalThis as any).FlutterReactCore = FlutterReactCore;
(globalThis as any).FlutterRenderer = FlutterRenderer;
(globalThis as any).AgentLoader = AgentLoader;
(globalThis as any).React = React;

export {
  initialize,
  render,            // 导出render函数
  renderAgentComponent,
  handleEvent,
  processEventProps
};

export default FlutterReactCore;
