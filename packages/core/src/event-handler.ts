/**
 * 基础事件处理模块
 * 提供通用的事件转换和处理能力
 */

// 全局事件处理器存储
const globalEventHandlers = new Map<string, Function>();

/**
 * 处理事件props，转换函数为事件名称
 */
export function processEventProps(props: Record<string, any>): Record<string, any> {
  const processedProps = { ...props };
  
  // 处理所有以'on'开头的函数props
  Object.keys(props).forEach(key => {
    if (key.startsWith('on') && typeof props[key] === 'function') {
      const handler = props[key];
      const funcName = handler.name || 'unknown';
      const eventName = funcName.replace(/^handle/, '').toLowerCase();
      const uniqueEventName = `${eventName}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // 存储事件处理器
      globalEventHandlers.set(uniqueEventName, handler);
      
      // 替换为事件名称
      processedProps[key] = uniqueEventName;
    }
  });
  
  return processedProps;
}

/**
 * 执行Flutter事件
 */
export function executeFlutterEvent(eventName: string, eventData: any = {}): void {
  if (globalEventHandlers.has(eventName)) {
    const handler = globalEventHandlers.get(eventName)!;
    try {
      handler(eventData);
    } catch (error) {
      console.error('Event handler failed:', error);
    }
  } else {
    // No handler found for event: eventName
  }
}

/**
 * 获取事件处理器数量（调试用）
 */
export function getEventHandlerCount(): number {
  return globalEventHandlers.size;
}
