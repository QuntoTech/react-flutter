import React from 'react';
import { Column, Row, Text, SizedBox, Color, Stack, Positioned, Container, Expanded } from '@react-flutter/components';
import { 
  BasicStyleCard, 
  LinearGradientCard, 
  RadialGradientCard, 
  MainScrollView,
  CircleCard,
  AlignmentCard,
  ConstraintsCard,
  ForegroundDecorationCard,
  ClipBehaviorCard,
  OverflowContainer,
  TransformAlignmentCard,
  TransformCard,
  ColumnDemoCard,
  ColumnItem1,
  ColumnItem2,
  ColumnItem3,
  RowDemoCard,
  RowItem1,
  RowItem2,
  RowItem3,
  TextDemoCard,
  TitleText,
  BodyText,
  StyledText,
  EllipsisText,
  SizedBoxDemoCard,
  StackDemoCard,
  ExpandedDemoCard,
  FixedSizeBox,
  SpacerBox
} from './styled';
import CounterDemo from './CounterDemo';


/**
 * Container组件功能展示
 * 演示Container组件的完整功能和API
 */
const Counter = () => {
  
  // 展示基础样式：颜色+圆角+阴影+边框
  const BasicStyleContainer = () => (
    <BasicStyleCard id="basic-style-demo">
      <Text text={`基础样式：颜色+圆角+阴影+边框`} fontSize={12} color={Color.white} />
    </BasicStyleCard>
  );

  // 展示线性渐变
  const LinearGradientContainer = () => (
    <LinearGradientCard id="linear-gradient-demo">
      <Text text="线性渐变：橙色到黄色" fontSize={12} color={Color.white} />
    </LinearGradientCard>
  );

  // 展示径向渐变
  const RadialGradientContainer = () => (
    <RadialGradientCard id="radial-gradient-demo">
      <Text text="径向渐变：紫色到蓝紫色" fontSize={12} color={Color.white} />
    </RadialGradientCard>
  );

  // 展示圆形形状
  const CircleShapeContainer = () => (
    <CircleCard id="circle-shape-demo">
      <Text text="圆形" fontSize={12} color={Color.white} />
    </CircleCard>
  );

  // 展示alignment对齐功能
  const AlignmentDemoContainer = () => (
    <AlignmentCard id="alignment-demo">
      <Text text="右下角对齐文本" fontSize={12} color={Color.white} />
    </AlignmentCard>
  );

  // 展示constraints约束功能
  const ConstraintsDemoContainer = () => (
    <ConstraintsCard id="constraints-demo">
      <Text text="约束: 150-300x80-120" fontSize={12} color={Color.white} />
    </ConstraintsCard>
  );

  // 展示foregroundDecoration前景装饰功能
  const ForegroundDecorationDemoContainer = () => (
    <ForegroundDecorationCard id="foreground-decoration-demo">
      <Text text="前景装饰：金色边框覆盖层" fontSize={12} color={Color.white} />
    </ForegroundDecorationCard>
  );

  // 展示clipBehavior裁剪行为功能
  const ClipBehaviorDemoContainer = () => (
    <ClipBehaviorCard id="clip-behavior-demo">
      <OverflowContainer>
        <Text text="裁剪演示：超出部分被裁剪" fontSize={12} color={Color.black} />
      </OverflowContainer>
    </ClipBehaviorCard>
  );

  // 展示transformAlignment变换中心点功能
  const TransformAlignmentDemoContainer = () => (
    <TransformAlignmentCard id="transform-alignment-demo">
      <Text text="变换中心点：左上角对齐" fontSize={12} color={Color.white} />
    </TransformAlignmentCard>
  );

  // 展示transform Matrix4变换功能
  const TransformDemoContainer = () => (
    <TransformCard id="transform-demo">
      <Text text="Matrix4变换：缩放1.2倍" fontSize={11} color={Color.white} />
    </TransformCard>
  );

  // Column布局演示组件
  const ColumnDemoContainer = () => (
    <ColumnDemoCard id="column-demo">
      <Column 
        id="demo-column"
        mainAxisAlignment="spaceEvenly"
        crossAxisAlignment="center"
        mainAxisSize="max"
      >
        <Text text="Column演示" fontSize={14} color={Color.white} />
        <ColumnItem1>
          <Text text="项目1" fontSize={10} color={Color.black} />
        </ColumnItem1>
        <ColumnItem2>
          <Text text="项目2" fontSize={10} color={Color.black} />
        </ColumnItem2>
        <ColumnItem3>
          <Text text="项目3" fontSize={10} color={Color.black} />
        </ColumnItem3>
      </Column>
    </ColumnDemoCard>
  );

  // Row布局演示组件
  const RowDemoContainer = () => (
    <RowDemoCard id="row-demo">
      <Column>
        <Text text="Row演示" fontSize={14} color={Color.white} />
        <Row
          id="demo-row"
          mainAxisAlignment="spaceEvenly"
          crossAxisAlignment="center"
          mainAxisSize="max"
        >
          <RowItem1>
            <Text text="A" fontSize={10} color={Color.black} />
          </RowItem1>
          <RowItem2>
            <Text text="B" fontSize={10} color={Color.black} />
          </RowItem2>
          <RowItem3>
            <Text text="C" fontSize={10} color={Color.black} />
          </RowItem3>
        </Row>
      </Column>
    </RowDemoCard>
  );

  // Text文本组件演示
  const TextDemoContainer = () => (
    <TextDemoCard id="text-demo">
      <Column mainAxisAlignment="spaceEvenly" crossAxisAlignment="start">
        <TitleText 
          id="title-text"
          text="Text组件演示" 
        />
        <BodyText 
          id="body-text"
          text="这是一段普通文本，展示了基础的字体样式和行高设置。支持多行显示和自动换行。" 
          maxLines={3}
          textAlign="left"
        />
        <StyledText 
          id="styled-text"
          text="这是样式文本：加粗、金色、下划线、字母间距" 
        />
        <EllipsisText 
          id="ellipsis-text"
          text="这是一段很长的文本，用来演示溢出处理，当文本超过容器宽度时会显示省略号..." 
          maxLines={1}
          overflow="ellipsis"
        />
      </Column>
    </TextDemoCard>
  );

  // SizedBox尺寸控制组件演示
  const SizedBoxDemoContainer = () => (
    <SizedBoxDemoCard id="sizedbox-demo">
      <Column mainAxisAlignment="spaceEvenly" crossAxisAlignment="start">
        <Text text="SizedBox演示" style={{ fontSize: 16, fontWeight: 'bold', color: Color.white }} />
        
        {/* 固定尺寸演示 */}
        <Row mainAxisAlignment="spaceAround" crossAxisAlignment="center">
          <SizedBox width={50} height={30} id="fixed-size-box">
            <FixedSizeBox>
              <Text text="50x30" style={{ fontSize: 10, color: Color.black }} textAlign="center" />
            </FixedSizeBox>
          </SizedBox>
          
          <SizedBox width={80} height={40} id="larger-size-box">
            <FixedSizeBox>
              <Text text="80x40" style={{ fontSize: 12, color: Color.black }} textAlign="center" />
            </FixedSizeBox>
          </SizedBox>
          
          <SizedBox width={60} height={60} id="square-size-box">
            <FixedSizeBox>
              <Text text="60x60" style={{ fontSize: 10, color: Color.black }} textAlign="center" />
            </FixedSizeBox>
          </SizedBox>
        </Row>

        {/* 间距控制演示 */}
        <Column crossAxisAlignment="start">
          <Text text="间距控制" style={{ fontSize: 12, color: Color.white }} />
          <Row>
            <SpacerBox>
              <Text text="项目A" style={{ fontSize: 10, color: Color.black }} />
            </SpacerBox>
            <SizedBox width={20} id="spacer-20" />
            <SpacerBox>
              <Text text="项目B" style={{ fontSize: 10, color: Color.black }} />
            </SpacerBox>
            <SizedBox width={40} id="spacer-40" />
            <SpacerBox>
              <Text text="项目C" style={{ fontSize: 10, color: Color.black }} />
            </SpacerBox>
          </Row>
        </Column>
      </Column>
    </SizedBoxDemoCard>
  );

  // Stack组件演示
  const StackDemoContainer = () => (
    <StackDemoCard>
      <Column crossAxisAlignment="start">
        <Text text="Stack组件演示" style={{ fontSize: 16, fontWeight: 'bold', color: Color.white }} />
        
        {/* 1. 多层Container层叠示例 */}
        <Text text="多层叠层示例" style={{ fontSize: 12, color: Color.white }} />
        <Stack id="layered-stack-demo" alignment="center">
          <Container 
            id="stack-bg-layer"
            style={{
              width: 200,
              height: 100,
              decoration: { color: Color.fromRGBO(100, 150, 200, 1.0) }
            }}
          />
          <Container 
            id="stack-mid-layer"
            style={{
              width: 140,
              height: 70,
              decoration: { color: Color.fromRGBO(255, 100, 100, 1.0) }
            }}
          />
          <Container 
            id="stack-top-layer"
            style={{
              width: 80,
              height: 40,
              decoration: { color: Color.fromRGBO(255, 220, 100, 1.0) }
            }}
          >
            <Text text="三层" style={{ fontSize: 10, color: Color.fromRGBO(0, 0, 0, 1.0) }} textAlign="center" />
          </Container>
        </Stack>
        
        <SizedBox height={12} />
        
        {/* 2. Positioned绝对定位示例 */}
        <Text text="Positioned定位" style={{ fontSize: 12, color: Color.white }} />
        <Stack id="positioned-stack-demo">
          <Container 
            style={{
              width: 200,
              height: 100,
              decoration: { color: Color.fromRGBO(80, 80, 80, 0.3) }
            }}
          />
          <Positioned 
            id="positioned-demo"
            left={20} 
            top={30}
            width={80}
            height={40}
          >
            <Container 
              style={{
                decoration: { color: Color.fromRGBO(100, 200, 100, 1.0) }
              }}
            >
              <Text text="定位" style={{ fontSize: 10, color: Color.white }} textAlign="center" />
            </Container>
          </Positioned>
        </Stack>
        
        <SizedBox height={12} />
        
        {/* 3. 不同alignment示例 */}
        <Text text="Alignment对齐" style={{ fontSize: 12, color: Color.white }} />
        <Row mainAxisAlignment="spaceAround">
          <Stack id="topleft-stack" alignment="topLeft">
            <Container 
              style={{
                width: 80,
                height: 60,
                decoration: { color: Color.fromRGBO(150, 100, 200, 0.3) }
              }}
            />
            <Container 
              style={{
                width: 40,
                height: 30,
                decoration: { color: Color.fromRGBO(200, 100, 150, 1.0) }
              }}
            >
              <Text text="左上" style={{ fontSize: 8, color: Color.white }} textAlign="center" />
            </Container>
          </Stack>
          
          <Stack id="center-stack" alignment="center">
            <Container 
              style={{
                width: 80,
                height: 60,
                decoration: { color: Color.fromRGBO(150, 100, 200, 0.3) }
              }}
            />
            <Container 
              style={{
                width: 40,
                height: 30,
                decoration: { color: Color.fromRGBO(200, 100, 150, 1.0) }
              }}
            >
              <Text text="居中" style={{ fontSize: 8, color: Color.white }} textAlign="center" />
            </Container>
          </Stack>
        </Row>
        
        <SizedBox height={12} />
        
        {/* 4. 不同fit示例 */}
        <Text text="Fit适配模式" style={{ fontSize: 12, color: Color.white }} />
        <Row mainAxisAlignment="spaceAround">
          <Container style={{ width: 90, height: 70 }}>
            <Stack id="loose-stack" fit="loose">
              <Container 
                style={{
                  width: 60,
                  height: 50,
                  decoration: { color: Color.fromRGBO(100, 200, 200, 1.0) }
                }}
              >
                <Text text="loose" style={{ fontSize: 8, color: Color.white }} textAlign="center" />
              </Container>
            </Stack>
          </Container>
          
          <Container style={{ width: 90, height: 70 }}>
            <Stack id="expand-stack" fit="expand">
              <Container 
                style={{
                  decoration: { color: Color.fromRGBO(200, 150, 100, 1.0) }
                }}
              >
                <Text text="expand" style={{ fontSize: 8, color: Color.white }} textAlign="center" />
              </Container>
            </Stack>
          </Container>
        </Row>
      </Column>
    </StackDemoCard>
  );

  // Expanded组件演示
  const ExpandedDemoContainer = () => (
    <ExpandedDemoCard>
      <Column crossAxisAlignment="start">
        <Text text="Expanded弹性布局演示" style={{ fontSize: 16, fontWeight: 'bold', color: Color.white }} />
        
        {/* 1. 基础使用 - 平分空间 */}
        <SizedBox height={8} />
        <Text text="1. 平分空间 (1:1)" style={{ fontSize: 12, color: Color.white }} />
        <SizedBox height={4} />
        <Row id="expanded-equal-demo">
          <Expanded id="expanded-equal-1">
            <Container style={{
              height: 50,
              decoration: { color: Color.fromRGBO(244, 67, 54, 1.0) }
            }}>
              <Text text="1/2" style={{ fontSize: 14, color: Color.white }} textAlign="center" />
            </Container>
          </Expanded>
          <Expanded id="expanded-equal-2">
            <Container style={{
              height: 50,
              decoration: { color: Color.fromRGBO(33, 150, 243, 1.0) }
            }}>
              <Text text="1/2" style={{ fontSize: 14, color: Color.white }} textAlign="center" />
            </Container>
          </Expanded>
        </Row>
        
        {/* 2. flex比例 - 2:1分配 */}
        <SizedBox height={12} />
        <Text text="2. flex比例 (2:1)" style={{ fontSize: 12, color: Color.white }} />
        <SizedBox height={4} />
        <Row id="expanded-flex-demo">
          <Expanded flex={2} id="expanded-flex-2">
            <Container style={{
              height: 50,
              decoration: { color: Color.fromRGBO(76, 175, 80, 1.0) }
            }}>
              <Text text="2/3 (flex: 2)" style={{ fontSize: 12, color: Color.white }} textAlign="center" />
            </Container>
          </Expanded>
          <Expanded flex={1} id="expanded-flex-1">
            <Container style={{
              height: 50,
              decoration: { color: Color.fromRGBO(255, 152, 0, 1.0) }
            }}>
              <Text text="1/3 (flex: 1)" style={{ fontSize: 12, color: Color.white }} textAlign="center" />
            </Container>
          </Expanded>
        </Row>
        
        {/* 3. 与固定尺寸混合 */}
        <SizedBox height={12} />
        <Text text="3. 固定尺寸 + Expanded" style={{ fontSize: 12, color: Color.white }} />
        <SizedBox height={4} />
        <Row id="expanded-mixed-demo">
          <Container style={{
            width: 100,
            height: 50,
            decoration: { color: Color.fromRGBO(156, 39, 176, 1.0) }
          }}>
            <Text text="100px" style={{ fontSize: 14, color: Color.white }} textAlign="center" />
          </Container>
          <Expanded id="expanded-remaining">
            <Container style={{
              height: 50,
              decoration: { color: Color.fromRGBO(0, 188, 212, 1.0) }
            }}>
              <Text text="剩余空间" style={{ fontSize: 14, color: Color.white }} textAlign="center" />
            </Container>
          </Expanded>
        </Row>
        
        {/* 4. Column中的Expanded */}
        <SizedBox height={12} />
        <Text text="4. Column中的Expanded" style={{ fontSize: 12, color: Color.white }} />
        <SizedBox height={4} />
        <Container style={{ height: 100 }}>
          <Column id="expanded-column-demo">
            <Expanded id="expanded-column-top">
              <Container style={{
                decoration: { color: Color.fromRGBO(255, 193, 7, 1.0) }
              }}>
                <Text text="上部 (Expanded)" style={{ fontSize: 12, color: Color.fromRGBO(0, 0, 0, 1.0) }} textAlign="center" />
              </Container>
            </Expanded>
            <Container style={{
              height: 30,
              decoration: { color: Color.fromRGBO(96, 125, 139, 1.0) }
            }}>
              <Text text="固定30px" style={{ fontSize: 12, color: Color.white }} textAlign="center" />
            </Container>
          </Column>
        </Container>
      </Column>
    </ExpandedDemoCard>
  );

  return (
    <MainScrollView 
      id="main-scroll-view"
      scrollDirection="vertical"
    >
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
        <ColumnDemoContainer />
        <RowDemoContainer />
        <TextDemoContainer />
        <SizedBoxDemoContainer />
        <StackDemoContainer />
        <ExpandedDemoContainer />
        <CounterDemo />
      </Column>
    </MainScrollView>
  );
};


export default Counter;
