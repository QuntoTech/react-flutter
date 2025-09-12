import Counter from './Counter.jsx';

/**
 * Agent入口文件
 * 负责注册组件到宿主环境
 */

// Agent元数据
const AGENT_METADATA = {
  name: 'Counter Agent',
  version: '1.0.0',
  description: '现代React开发的计数器Agent',
  author: 'Agent Developer',
  components: ['Counter'],
  permissions: ['user_interaction', 'local_storage']
};

// Agent初始化函数
function initializeAgent() {
  console.log('🚀 Initializing Counter Agent...');
  
  // 注册主组件到React运行时
  if (typeof setCurrentComponent === 'function') {
    setCurrentComponent(Counter);
    console.log('✅ Counter component registered');
  }
  
  // 注册Agent元数据到全局
  globalThis.CounterAgent = {
    ...AGENT_METADATA,
    component: Counter,
    getState: () => {
      // 这里可以获取组件当前状态（如果需要的话）
      return { initialized: true };
    },
    getInstance: () => Counter
  };
  
  console.log('✅ Agent metadata registered to globalThis.CounterAgent');
  
  // 注册生命周期钩子
  if (typeof addLifecycleHook === 'function') {
    addLifecycleHook('mounted', () => {
      console.log('🎯 Counter Agent lifecycle: mounted');
    });
    
    addLifecycleHook('beforeDestroy', () => {
      console.log('🎯 Counter Agent lifecycle: beforeDestroy');
    });
  }
  
  console.log('🎉 Counter Agent initialization complete');
  
  return AGENT_METADATA;
}

// 创建默认导出对象
const AgentExport = {
  metadata: AGENT_METADATA,
  component: Counter,
  initialize: initializeAgent
};

// 执行初始化
const agentInfo = initializeAgent();

// 确保全局注册正确
if (typeof globalThis !== 'undefined') {
  globalThis.CounterAgent = {
    default: AgentExport,
    metadata: AGENT_METADATA,
    component: Counter,
    initialize: initializeAgent
  };
}

// 导出给构建工具
export default AgentExport;
