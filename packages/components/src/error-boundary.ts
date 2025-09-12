/**
 * React错误边界组件
 * 用于捕获渲染错误，包括循环引用问题
 */

import * as React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 ErrorBoundary caught an error:', error);
    console.error('🚨 Error info:', errorInfo);
    console.error('🚨 Component stack:', errorInfo.componentStack);
    
    this.setState({
      error,
      errorInfo
    });
    
    // 检查是否是循环引用错误
    if (error.message.includes('circular') || error.message.includes('Maximum call stack')) {
      console.error('🔄 Detected circular reference error!');
      console.error('🔍 This usually happens when component names conflict with React.createElement calls');
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || React.createElement('Text', {
        text: `Error: ${this.state.error?.message || 'Unknown error'}`
      });
    }

    return this.props.children;
  }
}
