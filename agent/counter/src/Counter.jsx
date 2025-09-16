import React from 'react';
import { Container, Column, Text, EdgeInsets, Color } from '@react-flutter/components';

/**
 * Container组件功能展示
 * 演示Container组件的完整功能和API
 */
const Counter = () => {
  // 展示基础样式：颜色+圆角+阴影+边框
  const BasicStyleContainer = () => (
    <Container id="basic-style-demo" style={{
      width: 250,
      height: 80,
      padding: EdgeInsets.all(15),
      margin: EdgeInsets.all(10),
      decoration: {
        color: Color.fromRGBO(33, 150, 243, 1.0),
        borderRadius: { topLeft: 15, topRight: 15, bottomRight: 15, bottomLeft: 15 },
        boxShadow: [{
          color: Color.fromRGBO(0, 0, 0, 0.3),
          blurRadius: 8,
          offset: { dx: 0, dy: 4 },
          spreadRadius: 1,
          blurStyle: 'normal'
        }],
        border: {
          top: { color: Color.white, width: 2, style: 'solid' },
          right: { color: Color.white, width: 2, style: 'solid' },
          bottom: { color: Color.white, width: 2, style: 'solid' },
          left: { color: Color.white, width: 2, style: 'solid' }
        }
      }
    }}>
      <Text text="基础样式：颜色+圆角+阴影+边框" fontSize={12} color={Color.white} />
    </Container>
  );

  // 展示线性渐变
  const LinearGradientContainer = () => (
    <Container id="linear-gradient-demo" style={{
      width: 250,
      height: 80,
      padding: EdgeInsets.all(15),
      margin: EdgeInsets.all(10),
      decoration: {
        gradient: {
          type: 'linear',
          colors: [
            Color.fromRGBO(255, 87, 34, 1.0),   // 橙色
            Color.fromRGBO(255, 193, 7, 1.0)    // 黄色
          ],
          begin: { x: 0, y: 0 },
          end: { x: 1, y: 1 },
          tileMode: 'clamp'
        },
        borderRadius: { topLeft: 15, topRight: 15, bottomRight: 15, bottomLeft: 15 }
      }
    }}>
      <Text text="线性渐变：橙色到黄色" fontSize={12} color={Color.white} />
    </Container>
  );

  // 展示径向渐变
  const RadialGradientContainer = () => (
    <Container id="radial-gradient-demo" style={{
      width: 250,
      height: 80,
      padding: EdgeInsets.all(15),
      margin: EdgeInsets.all(10),
      decoration: {
        gradient: {
          type: 'radial',
          colors: [
            Color.fromRGBO(156, 39, 176, 1.0),   // 紫色
            Color.fromRGBO(63, 81, 181, 1.0)     // 蓝紫色
          ],
          center: { x: 0.5, y: 0.5 },
          radius: 0.8,
          tileMode: 'clamp'
        },
        borderRadius: { topLeft: 15, topRight: 15, bottomRight: 15, bottomLeft: 15 }
      }
    }}>
      <Text text="径向渐变：紫色到蓝紫色" fontSize={12} color={Color.white} />
    </Container>
  );

  // 展示圆形形状
  const CircleShapeContainer = () => (
    <Container id="circle-shape-demo" style={{
      width: 100,
      height: 100,
      margin: EdgeInsets.all(10),
      decoration: {
        color: Color.fromRGBO(76, 175, 80, 1.0),  // 绿色
        shape: 'circle'
      }
    }}>
      <Text text="圆形" fontSize={12} color={Color.white} />
    </Container>
  );

  // 展示alignment对齐功能
  const AlignmentDemoContainer = () => (
    <Container id="alignment-demo" style={{
      width: 250,
      height: 80,
      margin: EdgeInsets.all(10),
      decoration: {
        color: Color.fromRGBO(233, 30, 99, 1.0),  // 粉色
        borderRadius: { topLeft: 15, topRight: 15, bottomRight: 15, bottomLeft: 15 }
      },
      alignment: 'bottomRight'  // 新增：右下角对齐
    }}>
      <Text text="右下角对齐文本" fontSize={12} color={Color.white} />
    </Container>
  );

  // 展示constraints约束功能
  const ConstraintsDemoContainer = () => (
    <Container id="constraints-demo" style={{
      margin: EdgeInsets.all(10),
      constraints: {
        minWidth: 150,
        maxWidth: 300,
        minHeight: 80,
        maxHeight: 120
      },
      decoration: {
        color: Color.fromRGBO(76, 175, 80, 1.0),  // 绿色
        borderRadius: { topLeft: 15, topRight: 15, bottomRight: 15, bottomLeft: 15 }
      },
      alignment: 'center'
    }}>
      <Text text="约束: 150-300x80-120" fontSize={12} color={Color.white} />
    </Container>
  );

  // 展示foregroundDecoration前景装饰功能
  const ForegroundDecorationDemoContainer = () => (
    <Container id="foreground-decoration-demo" style={{
      width: 250,
      height: 80,
      padding: EdgeInsets.all(15),
      margin: EdgeInsets.all(10),
      decoration: {
        color: Color.fromRGBO(63, 81, 181, 1.0),  // 靛蓝色背景
        borderRadius: { topLeft: 15, topRight: 15, bottomRight: 15, bottomLeft: 15 }
      },
      foregroundDecoration: {
        border: {
          top: { color: Color.fromRGBO(255, 193, 7, 1.0), width: 3, style: 'solid' },    // 金色边框
          right: { color: Color.fromRGBO(255, 193, 7, 1.0), width: 3, style: 'solid' },
          bottom: { color: Color.fromRGBO(255, 193, 7, 1.0), width: 3, style: 'solid' },
          left: { color: Color.fromRGBO(255, 193, 7, 1.0), width: 3, style: 'solid' }
        },
        borderRadius: { topLeft: 15, topRight: 15, bottomRight: 15, bottomLeft: 15 }  // 保持与背景一致
      }
    }}>
      <Text text="前景装饰：金色边框覆盖层" fontSize={12} color={Color.white} />
    </Container>
  );

  // 展示clipBehavior裁剪行为功能
  const ClipBehaviorDemoContainer = () => (
    <Container id="clip-behavior-demo" style={{
      width: 200,
      height: 80,
      margin: EdgeInsets.all(10),
      decoration: {
        color: Color.fromRGBO(156, 39, 176, 1.0),  // 紫色背景
        borderRadius: { topLeft: 20, topRight: 20, bottomRight: 20, bottomLeft: 20 }
      },
      clipBehavior: 'antiAlias'  // 抗锯齿裁剪
    }}>
      <Container style={{
        width: 300,  // 故意超出父容器宽度
        height: 120, // 故意超出父容器高度
        decoration: {
          color: Color.fromRGBO(255, 235, 59, 0.8)  // 半透明黄色，展示裁剪效果
        }
      }}>
        <Text text="裁剪演示：超出部分被裁剪" fontSize={12} color={Color.black} />
      </Container>
    </Container>
  );

  // 展示transformAlignment变换中心点功能
  const TransformAlignmentDemoContainer = () => (
    <Container id="transform-alignment-demo" style={{
      width: 200,
      height: 80,
      margin: EdgeInsets.all(10),
      decoration: {
        color: Color.fromRGBO(255, 87, 34, 1.0),  // 橙红色背景
        borderRadius: { topLeft: 10, topRight: 10, bottomRight: 10, bottomLeft: 10 }
      },
      transformAlignment: 'topLeft'  // 设置变换中心点为左上角
    }}>
      <Text text="变换中心点：左上角对齐" fontSize={12} color={Color.white} />
    </Container>
  );

  // 展示transform Matrix4变换功能
  const TransformDemoContainer = () => (
    <Container id="transform-demo" style={{
      width: 150,
      height: 60,
      margin: EdgeInsets.all(20),
      decoration: {
        color: Color.fromRGBO(121, 85, 72, 1.0),  // 棕色背景
        borderRadius: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 }
      },
      transformAlignment: 'center',
      transform: [
        1.2, 0.0, 0.0, 0.0,    // 缩放X=1.2
        0.0, 1.2, 0.0, 0.0,    // 缩放Y=1.2
        0.0, 0.0, 1.0, 0.0,    // Z轴不变
        0.0, 0.0, 0.0, 1.0     // 齐次坐标
      ]  // Matrix4缩放1.2倍
    }}>
      <Text text="Matrix4变换：缩放1.2倍" fontSize={11} color={Color.white} />
    </Container>
  );

  return (
    <Column>
      <BasicStyleContainer />
      <LinearGradientContainer />
      <RadialGradientContainer />
      <CircleShapeContainer />
      <AlignmentDemoContainer />
      <ConstraintsDemoContainer />
      <ForegroundDecorationDemoContainer />
      <ClipBehaviorDemoContainer />
      <TransformAlignmentDemoContainer />
      <TransformDemoContainer />
    </Column>
  );
};


export default Counter;
