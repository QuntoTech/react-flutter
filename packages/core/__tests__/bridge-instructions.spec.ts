/**
 * Bridge指令生成测试
 * 验证React组件渲染生成正确的Flutter bridge指令
 */

import * as React from 'react';
import { FlutterRenderer } from '../src/flutter-renderer';

// Mock sendMessage全局函数
let capturedInstructions: any[] = [];
(globalThis as any).sendMessage = (type: string, data: string) => {
  if (type === 'updateInstructions') {
    const instructions = JSON.parse(data);
    capturedInstructions.push(...instructions);
  }
};

describe('Bridge指令生成', () => {
  beforeEach(() => {
    // 每次测试前重新初始化
    FlutterRenderer.initialize();
    FlutterRenderer.createRoot();
    // 重置指令捕获
    capturedInstructions = [];
  });

  describe('基础组件渲染', () => {
    test('Text组件应该生成createWidget指令', () => {
      const element = React.createElement('Text', { text: 'Hello', id: 'test-text' });
      FlutterRenderer.render(element);

      // 应该包含createWidget指令
      const createInstructions = capturedInstructions.filter(
        (inst) => Array.isArray(inst) && inst[0] === 'createWidget' && inst[2] === 'Text'
      );
      expect(createInstructions.length).toBeGreaterThan(0);

      // 验证指令格式：['createWidget', instanceId, 'Text', props]
      const textInstruction = createInstructions.find(
        (inst) => inst[3]?.id === 'test-text'
      );
      expect(textInstruction).toBeDefined();
      expect(textInstruction[0]).toBe('createWidget');
      expect(textInstruction[1]).toBe('test-text'); // instanceId与id prop一致
      expect(textInstruction[2]).toBe('Text');
      expect(textInstruction[3]).toEqual(expect.objectContaining({
        text: 'Hello',
        id: 'test-text'
      }));
    });

    test('Container组件应该生成createWidget指令', () => {
      const element = React.createElement('Container', {
        id: 'test-container',
        style: { width: 100, height: 50 }
      });
      FlutterRenderer.render(element);

      const createInstructions = capturedInstructions.filter(
        (inst) => Array.isArray(inst) && inst[0] === 'createWidget' && inst[2] === 'Container'
      );
      expect(createInstructions.length).toBeGreaterThan(0);

      const containerInstruction = createInstructions.find(
        (inst) => inst[3]?.id === 'test-container'
      );
      expect(containerInstruction).toBeDefined();
      expect(containerInstruction[3]).toEqual(expect.objectContaining({
        id: 'test-container',
        style: expect.objectContaining({ width: 100, height: 50 })
      }));
    });
  });

  describe('父子关系', () => {
    test('应该生成appendChild指令建立父子关系', () => {
      const child = React.createElement('Text', { text: 'Child', id: 'child-text' });
      const parent = React.createElement('Container', { id: 'parent-container' }, child);
      FlutterRenderer.render(parent);

      // 应该包含appendChild指令
      const appendInstructions = capturedInstructions.filter(
        (inst) => Array.isArray(inst) && inst[0] === 'appendChild'
      );
      expect(appendInstructions.length).toBeGreaterThan(0);

      // 验证指令格式：['appendChild', parentId, childId, childType, childProps]
      // 注意：Container在创建时使用临时ID，然后通过updateWidget更新为parent-container
      const appendInstruction = appendInstructions.find(
        (inst) => inst[2] === 'child-text' && inst[3] === 'Text'
      );
      expect(appendInstruction).toBeDefined();
      expect(appendInstruction[0]).toBe('appendChild');
      expect(appendInstruction[2]).toBe('child-text'); // childId
      expect(appendInstruction[3]).toBe('Text'); // childType
      
      // 验证Container的createWidget和updateWidget指令
      const containerCreate = capturedInstructions.find(
        (inst) => Array.isArray(inst) && inst[0] === 'createWidget' && inst[2] === 'Container'
      );
      const containerUpdate = capturedInstructions.find(
        (inst) => Array.isArray(inst) && inst[0] === 'updateWidget' && inst[2]?.id === 'parent-container'
      );
      expect(containerCreate || containerUpdate).toBeDefined();
    });

    test('应该正确处理多个子组件', () => {
      const child1 = React.createElement('Text', { text: 'Child 1', id: 'child-1', key: 'child-1' });
      const child2 = React.createElement('Text', { text: 'Child 2', id: 'child-2', key: 'child-2' });
      const parent = React.createElement('Column', { id: 'parent-column' }, [child1, child2]);
      FlutterRenderer.render(parent);

      const appendInstructions = capturedInstructions.filter(
        (inst) => Array.isArray(inst) && inst[0] === 'appendChild'
      );

      // 应该有两个appendChild指令
      const child1Append = appendInstructions.find((inst) => inst[2] === 'child-1');
      const child2Append = appendInstructions.find((inst) => inst[2] === 'child-2');

      expect(child1Append).toBeDefined();
      expect(child2Append).toBeDefined();
      expect(child1Append[1]).toBe('parent-column');
      expect(child2Append[1]).toBe('parent-column');
    });
  });

  describe('嵌套组件', () => {
    test('应该正确处理深层嵌套结构', () => {
      const deepChild = React.createElement('Text', { text: 'Deep', id: 'deep-text' });
      const midChild = React.createElement('Container', { id: 'mid-container' }, deepChild);
      const root = React.createElement('Column', { id: 'root-column' }, midChild);
      FlutterRenderer.render(root);

      // 验证所有createWidget指令
      // 注意：Column可能被重用（只有updateWidget），所以可能只有2个createWidget（Container和Text）
      const createInstructions = capturedInstructions.filter(
        (inst) => Array.isArray(inst) && inst[0] === 'createWidget'
      );
      expect(createInstructions.length).toBeGreaterThanOrEqual(2); // 至少Container和Text

      // 验证所有appendChild指令
      const appendInstructions = capturedInstructions.filter(
        (inst) => Array.isArray(inst) && inst[0] === 'appendChild'
      );
      
      // 验证appendChild关系（不依赖父ID，因为可能使用临时ID）
      const midToRoot = appendInstructions.find((inst) => inst[2] === 'mid-container' && inst[3] === 'Container');
      const deepToMid = appendInstructions.find((inst) => inst[1] === 'mid-container' && inst[2] === 'deep-text');

      expect(midToRoot).toBeDefined();
      expect(deepToMid).toBeDefined();
    });
  });

  describe('Stack和Positioned', () => {
    test('Stack应该生成正确的createWidget指令', () => {
      const child = React.createElement('Text', { text: 'In Stack' });
      const element = React.createElement('Stack', { 
        id: 'test-stack',
        alignment: 'center',
        fit: 'loose'
      }, child);
      FlutterRenderer.render(element);

      const stackInstruction = capturedInstructions.find(
        (inst) => Array.isArray(inst) && inst[0] === 'createWidget' && inst[2] === 'Stack'
      );
      expect(stackInstruction).toBeDefined();
      expect(stackInstruction[3]).toEqual(expect.objectContaining({
        id: 'test-stack',
        alignment: 'center',
        fit: 'loose'
      }));
    });

    test('Positioned应该生成正确的createWidget指令', () => {
      const child = React.createElement('Container', { style: { width: 50, height: 50 } });
      const element = React.createElement('Positioned', {
        id: 'test-positioned',
        left: 20,
        top: 30,
        width: 100,
        height: 80
      }, child);
      FlutterRenderer.render(element);

      const positionedInstruction = capturedInstructions.find(
        (inst) => Array.isArray(inst) && inst[0] === 'createWidget' && inst[2] === 'Positioned'
      );
      expect(positionedInstruction).toBeDefined();
      expect(positionedInstruction[3]).toEqual(expect.objectContaining({
        id: 'test-positioned',
        left: 20,
        top: 30,
        width: 100,
        height: 80
      }));
    });
  });
});
