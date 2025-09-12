/**
 * Flutter Renderer - 干净的react-reconciler实现
 * 目标：渲染简单的Text组件
 */

// 为flutter_js环境提供缺失的API
if (typeof setTimeout === 'undefined') {
  (globalThis as any).setTimeout = (fn: Function, delay: number) => {
    return 0;
  };
}

if (typeof clearTimeout === 'undefined') {
  (globalThis as any).clearTimeout = (id: any) => {
    // No-op polyfill
  };
}

import * as React from 'react';
import Reconciler from 'react-reconciler';

/**
 * 浅比较函数 - React风格的高性能比较
 */
function shallowEqual(objA: Record<string, any>, objB: Record<string, any>): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 检查每个key的值是否相等（浅比较）
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!Object.prototype.hasOwnProperty.call(objB, key) || !Object.is(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

// Flutter Widget描述
interface FlutterWidget {
  type: string;
  props: Record<string, any>;
  children: FlutterWidget[];
}

// Flutter实例类型
interface FlutterInstance extends FlutterWidget {
  _type: string;
}

// Flutter文本实例
interface FlutterTextInstance {
  type: 'Text';
  props: { text: string };
  children: [];
  _isText: true;
}

/**
 * React Reconciler HostConfig
 */
const FlutterHostConfig = {
  // 基本配置
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,
  isPrimaryRenderer: true,
  
  // 创建元素实例
  createInstance(
    type: string,
    props: Record<string, any>,
    rootContainer: any,
    hostContext: any,
    internalHandle: any
  ): FlutterInstance {
    // flutter-renderer只负责调用，事件处理由组件负责
    // 从props中移除children，避免重复和循环引用
    const { children, ...cleanProps } = props;
    
    return {
      type,
      props: cleanProps,  // 不包含children的props
      children: [],       // 单独的children数组
      _type: 'element'
    };
  },
  
  // 创建文本实例
  createTextInstance(
    text: string,
    rootContainer: any,
    hostContext: any,
    internalHandle: any
  ): FlutterTextInstance {
    return {
      type: 'Text',
      props: { text },
      children: [],
      _isText: true
    };
  },
  
  // 添加初始子元素
  appendInitialChild(parent: FlutterInstance, child: FlutterInstance | FlutterTextInstance): void {
    parent.children.push(child);
  },
  
  // 完成初始化
  finalizeInitialChildren(
    instance: FlutterInstance,
    type: string,
    props: Record<string, any>
  ): boolean {
    return false;
  },
  
  // 获取公共实例
  getPublicInstance(instance: FlutterInstance): FlutterInstance {
    return instance;
  },
  
  // 获取根上下文
  getRootHostContext(rootContainer: any): any {
    return {};
  },
  
  // 获取子上下文
  getChildHostContext(parentHostContext: any): any {
    return parentHostContext;
  },
  
  // 应该设置文本内容
  shouldSetTextContent(type: string, props: Record<string, any>): boolean {
    return false; // Flutter使用显式Text组件
  },
  
  // 准备更新
  prepareUpdate(
    instance: FlutterInstance,
    type: string,
    oldProps: Record<string, any>,
    newProps: Record<string, any>
  ): any {
    // 使用高性能的浅比较检查props变化
    const hasChanges = !shallowEqual(oldProps, newProps);
    
    if (hasChanges) {
      return { oldProps, newProps };
    }
    
    // 没有变化则返回null，React不会调用commitUpdate
    return null;
  },
  
  commitUpdate(
    instance: FlutterInstance,
    updatePayload: any,
    type: string,
    oldProps: Record<string, any>,
    newProps: Record<string, any>,
    internalHandle: any
  ): void {
    // 更新实例的props
    const { children, ...cleanProps } = newProps;
    instance.props = cleanProps;
  },
  
  
  // 提交文本更新
  commitTextUpdate(
    textInstance: FlutterTextInstance,
    oldText: string,
    newText: string
  ): void {
    textInstance.props.text = newText;
  },
  
  // 重置提交后
  resetAfterCommit(containerInfo: any): void {
    // UI更新完成
  },
  
  // 准备提交
  prepareForCommit(containerInfo: any): any {
    return null;
  },
  
  // Mutation方法
  appendChild(parent: FlutterInstance, child: FlutterInstance | FlutterTextInstance): void {
    parent.children.push(child);
  },
  
  appendChildToContainer(container: any, child: FlutterInstance | FlutterTextInstance): void {
    container.rootWidget = child;
  },
  
  insertBefore(
    parent: FlutterInstance,
    child: FlutterInstance | FlutterTextInstance,
    beforeChild: FlutterInstance | FlutterTextInstance
  ): void {
    const index = parent.children.indexOf(beforeChild);
    if (index !== -1) {
      parent.children.splice(index, 0, child);
    } else {
      parent.children.push(child);
    }
  },
  
  removeChild(parent: FlutterInstance, child: FlutterInstance | FlutterTextInstance): void {
    const index = parent.children.indexOf(child);
    if (index !== -1) {
      parent.children.splice(index, 1);
    }
  },
  
  removeChildFromContainer(container: any, child: FlutterInstance | FlutterTextInstance): void {
    if (container.rootWidget === child) {
      container.rootWidget = null;
    }
  },
  
  // 时间和调度 - 为flutter_js环境提供简单实现
  scheduleTimeout: (fn: Function, delay: number) => {
    // flutter_js环境中的简单实现
    return setTimeout ? setTimeout(fn, delay) : 0;
  },
  cancelTimeout: (id: any) => {
    if (clearTimeout) clearTimeout(id);
  },
  noTimeout: -1,
  now: () => Date.now(),
  
  // 事件优先级
  getCurrentEventPriority(): number {
    return 16; // DefaultEventPriority
  },
  
  // 隐藏/显示
  hideInstance(instance: FlutterInstance): void {},
  hideTextInstance(textInstance: FlutterTextInstance): void {},
  unhideInstance(instance: FlutterInstance): void {},
  unhideTextInstance(textInstance: FlutterTextInstance): void {},
  
  // 清除容器
  clearContainer(container: any): void {
    container.rootWidget = null;
  },
  
  // 其他必需方法
  beforeActiveInstanceBlur(): void {},
  afterActiveInstanceBlur(): void {},
  getInstanceFromNode(): any { return null; },
  getInstanceFromScope(): any { return null; },
  prepareScopeUpdate(): void {},
  detachDeletedInstance(): void {},
  
  // react-reconciler 0.29.2 新增必需方法
  preparePortalMount(): void {},
  
  // 转换相关
  NotPendingTransition: null,
  HostTransitionContext: React.createContext(null) as any,
  
  // 优先级相关
  setCurrentUpdatePriority(newPriority: number): void {},
  
  // 资源相关
  prepareToCommit(): any { return null; },
  resetTextContent(instance: FlutterInstance): void {},
  
  // 范围相关
  getFirstHydratableChild(): any { return null; },
  getNextHydratableSibling(): any { return null; },
  getPublicTextInstance(): any { return null; },
  
  // Suspense相关  
  commitMount(): void {},
  
  // 水合相关
  canHydrateInstance(): any { return null; },
  canHydrateTextInstance(): any { return null; },
  canHydrateSuspenseInstance(): any { return null; },
  hydrateInstance(): any { return null; },
  hydrateTextInstance(): any { return null; },
  hydrateSuspenseInstance(): any { return null; },
  getNextHydratableInstanceAfterSuspenseInstance(): any { return null; },
  
  // 错误边界
  commitRoot(): void {},
  
  // 其他可能缺失的方法
  maySuspendCommit(): boolean { return false; },
  mayResourceSuspendCommit(): boolean { return false; },
  preloadInstance(): boolean { return true; },
  preloadResource(): boolean { return true; },
  startSuspendingCommit(): void {},
  suspendInstance(): void {},
  suspendResource(): void {},
  waitForCommitToBeReady(): null { return null; },
  
  // 最新需要的方法
  getCurrentUpdatePriority(): number { return 16; },
  resolveUpdatePriority(): number { return 16; },
  resetFormInstance(): void {},
  requestPostPaintCallback(): void {},
  
  // 额外可能需要的方法
  shouldAttemptEagerTransition(): boolean { return false; },
  requestFormReset(): void {},
  shouldResetOnClone(): boolean { return false; },
  cloneHiddenInstance(): any { return null; },
  
  // 调度器和事件相关
  trackSchedulerEvent(): void {},
  resolveEventType(): any { return null; },
  resolveEventTimeStamp(): number { return Date.now(); },
};

/**
 * Flutter渲染器 - 采用持续根容器模式
 */
export class FlutterRenderer {
  private static reconciler: any;
  private static initialized = false;
  private static container: { rootWidget: FlutterWidget | null } | null = null;
  private static fiberRoot: any = null;
  
  /**
   * 初始化渲染器
   */
  static initialize(): void {
    if (this.initialized) return;
    
    try {
      this.reconciler = Reconciler(FlutterHostConfig);
      this.initialized = true;
    } catch (error: any) {
      console.error('Flutter Renderer initialization failed:', error.message);
      throw error;
    }
  }
  
  /**
   * 创建持续的根容器（类似ReactDOM.createRoot）
   */
  static createRoot(): void {
    if (!this.initialized) {
      this.initialize();
    }
    
    if (this.fiberRoot) {
      return;
    }
    
    // 创建持续的容器
    this.container = {
      rootWidget: null as FlutterWidget | null
    };
    
    // 创建持续的Fiber根
    this.fiberRoot = this.reconciler.createContainer(
      this.container,
      0, // tag
      null, // hydrationCallbacks
      false, // isStrictMode
      null, // concurrentUpdatesByDefaultOverride
      '', // identifierPrefix
      console.error, // onRecoverableError
      null // transitionCallbacks
    );
  }
  
  /**
   * 渲染React元素为Flutter Widget（类似root.render）
   */
  static render(element: React.ReactElement): FlutterWidget {
    // 确保根容器存在
    if (!this.fiberRoot) {
      this.createRoot();
    }
    
    // 更新现有的根容器（不重新创建）
    this.reconciler.updateContainer(element, this.fiberRoot, null);
    
    // 同步刷新更新
    this.reconciler.flushSync();
    
    // 返回结果
    return this.container?.rootWidget || {
      type: 'Text',
      props: { text: 'Empty' },
      children: []
    };
  }
  
  /**
   * 销毁根容器
   */
  static unmount(): void {
    if (this.fiberRoot && this.container) {
      this.reconciler.updateContainer(null, this.fiberRoot, null);
      // 同步刷新卸载操作，确保useEffect清理函数执行
      this.reconciler.flushSync();
      this.fiberRoot = null;
      this.container = null;
    }
  }
  
  /**
   * 检查是否已初始化
   */
  static isInitialized(): boolean {
    return this.initialized;
  }
  
  /**
   * 检查根容器是否存在
   */
  static hasRoot(): boolean {
    return this.fiberRoot !== null;
  }
  
  /**
   * 获取当前的Widget（用于测试）
   */
  static getCurrentWidget(): FlutterWidget {
    return this.container?.rootWidget || {
      type: 'Text',
      props: { text: 'Empty' },
      children: []
    };
  }
}

// 导出基础事件处理模块的函数
export { executeFlutterEvent as handleFlutterEvent } from './event-handler';
