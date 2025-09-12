import { EdgeInsets, styleSheet, Color, BorderRadius, Border, BorderSide } from '@react-flutter/components';

export const CardContainer = styleSheet.Container({
    // 使用EdgeInsets.symmetric 
    padding: EdgeInsets.symmetric({ vertical: 24, horizontal: 32 }),
    margin: EdgeInsets.all(16),
    // 使用Color类演示
    color: Color.white,
    decoration: {
      borderRadius: BorderRadius.circular(12),
      border: Border.all({ width: 2, color: Color.fromRGBO(33, 150, 243, 1.0) })
    }
});
