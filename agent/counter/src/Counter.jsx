import React from 'react';
import { Container, Column, Text, SizedBox, ElevatedButton, EdgeInsets, Color, BorderRadius, Border, BorderSide } from '@react-flutter/components';
import { CardContainer } from './styled';

/**
 * Counter Agent 主组件
 * 使用现代React Hooks和JSX语法
 * 演示新的style属性支持
 */
const Counter = ({ initialValue = 0 }) => {
  const [count, setCount] = React.useState(initialValue);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  // 演示EdgeInsets的各种用法
  return <CardContainer>
    <Column>
      <Text text={`当前计数: ${count}`} fontSize={24} fontWeight="bold" color={Color.fromRGBO(25, 118, 210, 1.0)} />
      
      <SizedBox height={20} />
      
      {/* 使用EdgeInsets.only的Container */}
      <Container style={{
        padding: EdgeInsets.only({ top: 12, bottom: 12, left: 8, right: 8 }),
        margin: EdgeInsets.symmetric({ vertical: 8 }),
        decoration: {
          // 演示Border.symmetric，但不使用borderRadius（因为颜色不统一）
          border: Border.symmetric({ 
            vertical: new BorderSide(Color.grey, 2), 
            horizontal: new BorderSide(Color.blue, 1) 
          })
        }
      }}>
        <ElevatedButton onPressed={handleIncrement}>
          <Text text="增加 (+1)" />
        </ElevatedButton>
      </Container>
      
      <SizedBox height={8} />
      
      {/* 使用简化语法（数字自动转换为EdgeInsets.all） */}
      <Container style={{
        padding: 12,  // 自动转换为 EdgeInsets.all(12)
        margin: EdgeInsets.fromLTRB(8, 4, 8, 4),
        decoration: {
          borderRadius: 8,  // 数字简化语法，自动转换为BorderRadius.circular(8)
          border: { width: 1, color: new Color(0xFFF44336) }  // 简化语法，向后兼容
        }
      }}>
        <ElevatedButton onPressed={handleDecrement}>
          <Text text="减少 (-1)" />
        </ElevatedButton>
      </Container>
      
      {/* 显示EdgeInsets使用说明 */}
      <SizedBox height={16} />
      <Container style={{
        padding: EdgeInsets.symmetric({ horizontal: 16, vertical: 8 }),
        decoration: {
          // 演示Border.only，颜色不统一所以不使用borderRadius
          border: Border.only({ 
            top: new BorderSide(Color.blueGrey, 1), 
            bottom: new BorderSide(Color.green, 2) 
          })
        }
      }}>
        <Text 
          text="Flutter原生API演示: Color + EdgeInsets + BorderRadius + Border" 
          fontSize={12} 
          color={Color.black54} 
        />
      </Container>
    </Column>
  </CardContainer>;
};

export default Counter;
