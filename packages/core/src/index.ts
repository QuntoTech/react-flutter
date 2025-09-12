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
 * 渲染Agent组件
 */
function renderAgentComponent(agentName: string, props: any = {}): string {
  try {
    const Component = AgentLoader.findAgentComponent(agentName);
    if (!Component) {
      throw new Error(`Agent component not found: ${agentName}`);
    }
    const element = React.createElement(Component, props);
    const widget = FlutterRenderer.render(element);
    return JSON.stringify(widget);
  } catch (error: any) {
    console.error('Render error:', error.message);
    return JSON.stringify({
      type: 'Text',
      props: { text: `Error: ${error.message}` },
      children: []
    });
  }
}

/**
 * 处理事件
 */
function handleEvent(eventName: string, eventData: any = {}): void {
  executeFlutterEvent(eventName, eventData);
}

// 创建全局对象
const FlutterReactCore = {
  initialize,
  renderAgentComponent,
  handleEvent
};

// 确保全局导出
(globalThis as any).FlutterReactCore = FlutterReactCore;

export {
  initialize,
  renderAgentComponent,
  handleEvent,
  processEventProps
};

export default FlutterReactCore;
