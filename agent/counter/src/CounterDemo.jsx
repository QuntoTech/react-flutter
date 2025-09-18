import React, { useState } from 'react';
import { Column, Row, Text, SizedBox, Color } from '@react-flutter/components';
import { 
  ElevatedButtonDemoCard,
  BasicElevatedButton,
  StatefulElevatedButton,
  LargeElevatedButton,
  CircularElevatedButton
} from './styled';

/**
 * 独立的计数器演示组件
 * 只包含计数器状态和相关按钮，避免影响其他组件
 */
const CounterDemo = () => {
  // 计数器状态只在这个组件内
  const [count, setCount] = useState(0);
  
  
  return (
    <ElevatedButtonDemoCard id="elevated-button-demo">
      <Column crossAxisAlignment="start">
        <Text text="ElevatedButton 按钮演示" style={{ fontSize: 16, color: Color.white, fontWeight: 'bold' }} />
        
        {/* 基础按钮 */}
        <Column crossAxisAlignment="start">
          <Text text="基础按钮" style={{ fontSize: 12, color: Color.white }} />
          <BasicElevatedButton 
            id="basic-elevated-button"
            onPressed={() => setCount(c => c + 1)}
          >
            <Text text="点击我" style={{ fontSize: 14, color: Color.white }} />
          </BasicElevatedButton>
        </Column>

        <SizedBox height={16} />

        {/* Material状态按钮 */}
        <Column crossAxisAlignment="start">
          <Text text="状态响应按钮" style={{ fontSize: 12, color: Color.white }} />
          <Text text={`交互状态 (点击次数: ${count})`} style={{ fontSize: 14, color: Color.white }} />
          <Row>
            <StatefulElevatedButton 
              id="stateful-elevated-button"
              onPressed={() => {}}
            >
              <Text text={`交互状态 (点击次数: ${count})`} style={{ fontSize: 14, color: Color.white }} />
            </StatefulElevatedButton>
            
            <SizedBox width={12} />
            
            <StatefulElevatedButton 
              id="disabled-elevated-button"
              onPressed={null}  // 禁用状态
            >
              <Text text="禁用状态" style={{ fontSize: 14, color: Color.fromRGBO(158, 158, 158, 1.0) }} />
            </StatefulElevatedButton>
          </Row>
        </Column>

        <SizedBox height={16} />

        {/* 不同尺寸按钮 */}
        <Column crossAxisAlignment="start">
          <Text text="尺寸演示" style={{ fontSize: 12, color: Color.white }} />
          <Row crossAxisAlignment="center">
            <LargeElevatedButton 
              id="large-elevated-button"
              onPressed={() => {}}
            >
              <Text text="大尺寸按钮" style={{ fontSize: 16, color: Color.white, fontWeight: 'bold' }} />
            </LargeElevatedButton>
            
            <SizedBox width={16} />
            
            <CircularElevatedButton 
              id="circular-elevated-button"
              onPressed={() => {}}
            >
              <Text text="+" style={{ fontSize: 24, color: Color.white, fontWeight: 'bold' }} />
            </CircularElevatedButton>
          </Row>
        </Column>
      </Column>
    </ElevatedButtonDemoCard>
  );
};

export default CounterDemo;
