/**
 * 简化的Agent加载器
 * 目标：简单地加载和渲染Agent组件
 */

import * as React from 'react';
import { FlutterRenderer } from './flutter-renderer';

/**
 * 简化的Agent加载器
 */
export class AgentLoader {
  private static initialized = false;
  
  /**
   * 初始化Agent加载器
   */
  static initialize(): void {
    if (this.initialized) return;
    
    // console.log('📦 Initializing Simple Agent Loader');
    
    this.initialized = true;
    // console.log('✅ Simple Agent Loader initialized');
  }
  
  /**
   * 查找Agent组件
   */
  static findAgentComponent(agentName: string): React.ComponentType<any> | null {
    // console.log(`🔍 Finding agent component: ${agentName}`);
    
    try {
      // 尝试多种方式查找Agent
      const methods = [
        () => (globalThis as any)[agentName],
        () => (globalThis as any).window?.[agentName],
        () => ((globalThis as any).window || globalThis)[agentName]
      ];
      
      let agentObj: any = undefined;
      
      for (let i = 0; i < methods.length; i++) {
        try {
          const result = methods[i]();
          if (result) {
            agentObj = result;
            // console.log(`✅ Agent found using method ${i}`);
            break;
          }
        } catch (e) {
          // 忽略错误，尝试下一种方法
        }
      }
      
      if (!agentObj) {
        // console.warn(`⚠️ Agent not found: ${agentName}`);
        return null;
      }
      
      // 获取组件
      let Component: React.ComponentType<any>;
      if (agentObj.default && typeof agentObj.default.component === 'function') {
        Component = agentObj.default.component;
      } else if (typeof agentObj.component === 'function') {
        Component = agentObj.component;
      } else if (typeof agentObj.default === 'function') {
        Component = agentObj.default;
      } else {
        // console.warn(`⚠️ No valid component found in agent: ${agentName}`);
        return null;
      }
      
      // console.log(`✅ Component found: ${Component.name || 'Anonymous'}`);
      return Component;
      
    } catch (error) {
      console.error(`❌ Error finding agent ${agentName}:`, error);
      return null;
    }
  }
  
  /**
   * 渲染Agent组件
   */
  static renderAgent(agentName: string, props: any = {}): any {
    // console.log(`🎨 Rendering agent: ${agentName}`);
    
    try {
      // 查找组件
      const Component = this.findAgentComponent(agentName);
      if (!Component) {
        throw new Error(`Agent component not found: ${agentName}`);
      }
      
      // console.log('🔍 About to check React availability...');
      
      // 确保React可用
      // const React = (globalThis as any).React;
      // // console.log('🔍 React check:', typeof React);
      // // console.log('🔍 Global React available:', typeof (globalThis as any).React);
      // if (!React) {
      //   throw new Error('React not available');
      // }
      
      // 创建React元素
      const element = React.createElement(Component, props);
      // console.log(`🎯 React element created for ${agentName}`);
      
      // 使用Flutter渲染器渲染（同步）
      const widget = FlutterRenderer.render(element);
      // console.log(`✅ Agent ${agentName} rendered successfully`);
      
      return widget;
      
    } catch (error: any) {
      console.error(`❌ Failed to render agent ${agentName}:`, error);
      
      // 返回错误组件
      return {
        type: 'Text',
        props: { text: `Error: ${error.message || 'Unknown error'}` },
        children: []
      };
    }
  }
  
  /**
   * 检查Agent是否存在
   */
  static hasAgent(agentName: string): boolean {
    const Component = this.findAgentComponent(agentName);
    return Component !== null;
  }
  
  /**
   * 获取Agent信息
   */
  static getAgentInfo(agentName: string): any {
    const agentObj = (globalThis as any)[agentName];
    
    if (!agentObj) {
      return null;
    }
    
    return {
      name: agentName,
      hasComponent: this.hasAgent(agentName),
      structure: Object.keys(agentObj),
      type: typeof agentObj
    };
  }
  
  /**
   * 检查是否已初始化
   */
  static isInitialized(): boolean {
    return this.initialized;
  }
}