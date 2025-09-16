import 'package:flutter/material.dart';
import 'primitive_parsers.dart';

/// Material状态解析器
/// 提供完整的Material状态管理解析，被所有Material组件复用
class MaterialStateParsers {
  /// 解析Material状态颜色
  static MaterialStateProperty<Color?>? parseColor(dynamic value) {
    if (value == null) return null;
    
    // 简单值：直接应用到所有状态
    if (value is! Map) {
      final color = PrimitiveParsers.parseColor(value);
      return color != null ? MaterialStateProperty.all(color) : null;
    }
    
    // 状态映射：为不同状态设置不同值
    final stateMap = value as Map<String, dynamic>;
    return MaterialStateProperty.resolveWith<Color?>((states) {
      return _resolveColorByStates(states, stateMap);
    });
  }

  /// 解析Material状态数值
  static MaterialStateProperty<double?>? parseDouble(dynamic value) {
    if (value == null) return null;
    
    // 简单值
    if (value is! Map) {
      final number = PrimitiveParsers.parseNumber(value, 0.0);
      return MaterialStateProperty.all(number);
    }
    
    // 状态映射
    final stateMap = Map<String, dynamic>.from(value as Map);
    return MaterialStateProperty.resolveWith<double?>((states) {
      return _resolveDoubleByStates(states, stateMap);
    });
  }

  /// 解析Material状态边距
  static MaterialStateProperty<EdgeInsetsGeometry?>? parseEdgeInsets(dynamic value) {
    if (value == null) return null;
    
    // 简单值
    if (value is! Map || _isEdgeInsetsMap(Map<String, dynamic>.from(value))) {
      final padding = PrimitiveParsers.parseEdgeInsets(value);
      return padding != null ? MaterialStateProperty.all(padding) : null;
    }
    
    // 状态映射
    final stateMap = Map<String, dynamic>.from(value as Map);
    return MaterialStateProperty.resolveWith<EdgeInsetsGeometry?>((states) {
      return _resolveEdgeInsetsByStates(states, stateMap);
    });
  }

  /// 解析Material状态尺寸
  static MaterialStateProperty<Size?>? parseSize(dynamic value) {
    if (value == null) return null;
    
    // 简单值
    if (value is! Map || _isSizeMap(Map<String, dynamic>.from(value))) {
      final size = _parseSize(value);
      return size != null ? MaterialStateProperty.all(size) : null;
    }
    
    // 状态映射
    final stateMap = Map<String, dynamic>.from(value as Map);
    return MaterialStateProperty.resolveWith<Size?>((states) {
      return _resolveSizeByStates(states, stateMap);
    });
  }

  /// 解析Material状态边框
  static MaterialStateProperty<BorderSide?>? parseBorderSide(dynamic value) {
    if (value == null) return null;
    
    // 简单值
    if (value is! Map || _isBorderSideMap(Map<String, dynamic>.from(value))) {
      final border = PrimitiveParsers.parseBorderSide(value);
      return border != null ? MaterialStateProperty.all(border) : null;
    }
    
    // 状态映射
    final stateMap = Map<String, dynamic>.from(value as Map);
    return MaterialStateProperty.resolveWith<BorderSide?>((states) {
      return _resolveBorderSideByStates(states, stateMap);
    });
  }

  /// 解析Material状态形状
  static MaterialStateProperty<OutlinedBorder?>? parseShape(dynamic value) {
    if (value == null) return null;
    
    // 简单值
    if (value is! Map || _isShapeMap(Map<String, dynamic>.from(value))) {
      final shape = _parseOutlinedBorder(value);
      return shape != null ? MaterialStateProperty.all(shape) : null;
    }
    
    // 状态映射
    final stateMap = Map<String, dynamic>.from(value as Map);
    return MaterialStateProperty.resolveWith<OutlinedBorder?>((states) {
      return _resolveShapeByStates(states, stateMap);
    });
  }

  /// 解析Material状态鼠标指针
  static MaterialStateProperty<MouseCursor?>? parseMouseCursor(dynamic value) {
    if (value == null) return null;
    
    // 简单值
    if (value is! Map) {
      final cursor = _parseMouseCursor(value);
      return cursor != null ? MaterialStateProperty.all(cursor) : null;
    }
    
    // 状态映射
    final stateMap = Map<String, dynamic>.from(value as Map);
    return MaterialStateProperty.resolveWith<MouseCursor?>((states) {
      return _resolveMouseCursorByStates(states, stateMap);
    });
  }

  // ==== 私有状态解析方法 ====

  /// 根据状态解析颜色
  static Color? _resolveColorByStates(Set<MaterialState> states, Map<String, dynamic> stateMap) {
    // 如果stateMap包含'value'键，说明这是一个简单的颜色值，直接解析
    if (stateMap.containsKey('value')) {
      return PrimitiveParsers.parseColor(stateMap);
    }
    
    // 否则按照Material状态优先级解析
    if (states.contains(MaterialState.disabled) && stateMap['disabled'] != null) {
      return PrimitiveParsers.parseColor(stateMap['disabled']);
    }
    if (states.contains(MaterialState.pressed) && stateMap['pressed'] != null) {
      return PrimitiveParsers.parseColor(stateMap['pressed']);
    }
    if (states.contains(MaterialState.hovered) && stateMap['hovered'] != null) {
      return PrimitiveParsers.parseColor(stateMap['hovered']);
    }
    if (states.contains(MaterialState.focused) && stateMap['focused'] != null) {
      return PrimitiveParsers.parseColor(stateMap['focused']);
    }
    if (states.contains(MaterialState.selected) && stateMap['selected'] != null) {
      return PrimitiveParsers.parseColor(stateMap['selected']);
    }
    if (states.contains(MaterialState.dragged) && stateMap['dragged'] != null) {
      return PrimitiveParsers.parseColor(stateMap['dragged']);
    }
    if (states.contains(MaterialState.error) && stateMap['error'] != null) {
      return PrimitiveParsers.parseColor(stateMap['error']);
    }
    if (states.contains(MaterialState.scrolledUnder) && stateMap['scrolledUnder'] != null) {
      return PrimitiveParsers.parseColor(stateMap['scrolledUnder']);
    }
    // 默认状态
    return PrimitiveParsers.parseColor(stateMap['default']);
  }

  /// 根据状态解析数值
  static double? _resolveDoubleByStates(Set<MaterialState> states, Map<String, dynamic> stateMap) {
    if (states.contains(MaterialState.disabled) && stateMap['disabled'] != null) {
      return PrimitiveParsers.parseNumber(stateMap['disabled'], 0.0);
    }
    if (states.contains(MaterialState.pressed) && stateMap['pressed'] != null) {
      return PrimitiveParsers.parseNumber(stateMap['pressed'], 0.0);
    }
    if (states.contains(MaterialState.hovered) && stateMap['hovered'] != null) {
      return PrimitiveParsers.parseNumber(stateMap['hovered'], 0.0);
    }
    if (states.contains(MaterialState.focused) && stateMap['focused'] != null) {
      return PrimitiveParsers.parseNumber(stateMap['focused'], 0.0);
    }
    if (states.contains(MaterialState.selected) && stateMap['selected'] != null) {
      return PrimitiveParsers.parseNumber(stateMap['selected'], 0.0);
    }
    if (states.contains(MaterialState.dragged) && stateMap['dragged'] != null) {
      return PrimitiveParsers.parseNumber(stateMap['dragged'], 0.0);
    }
    if (states.contains(MaterialState.error) && stateMap['error'] != null) {
      return PrimitiveParsers.parseNumber(stateMap['error'], 0.0);
    }
    if (states.contains(MaterialState.scrolledUnder) && stateMap['scrolledUnder'] != null) {
      return PrimitiveParsers.parseNumber(stateMap['scrolledUnder'], 0.0);
    }
    return PrimitiveParsers.parseNumber(stateMap['default'], 0.0);
  }

  /// 根据状态解析边距
  static EdgeInsetsGeometry? _resolveEdgeInsetsByStates(Set<MaterialState> states, Map<String, dynamic> stateMap) {
    if (states.contains(MaterialState.disabled) && stateMap['disabled'] != null) {
      return PrimitiveParsers.parseEdgeInsets(stateMap['disabled']);
    }
    if (states.contains(MaterialState.pressed) && stateMap['pressed'] != null) {
      return PrimitiveParsers.parseEdgeInsets(stateMap['pressed']);
    }
    if (states.contains(MaterialState.hovered) && stateMap['hovered'] != null) {
      return PrimitiveParsers.parseEdgeInsets(stateMap['hovered']);
    }
    if (states.contains(MaterialState.focused) && stateMap['focused'] != null) {
      return PrimitiveParsers.parseEdgeInsets(stateMap['focused']);
    }
    if (states.contains(MaterialState.selected) && stateMap['selected'] != null) {
      return PrimitiveParsers.parseEdgeInsets(stateMap['selected']);
    }
    if (states.contains(MaterialState.dragged) && stateMap['dragged'] != null) {
      return PrimitiveParsers.parseEdgeInsets(stateMap['dragged']);
    }
    if (states.contains(MaterialState.error) && stateMap['error'] != null) {
      return PrimitiveParsers.parseEdgeInsets(stateMap['error']);
    }
    if (states.contains(MaterialState.scrolledUnder) && stateMap['scrolledUnder'] != null) {
      return PrimitiveParsers.parseEdgeInsets(stateMap['scrolledUnder']);
    }
    return PrimitiveParsers.parseEdgeInsets(stateMap['default']);
  }

  /// 根据状态解析尺寸
  static Size? _resolveSizeByStates(Set<MaterialState> states, Map<String, dynamic> stateMap) {
    if (states.contains(MaterialState.disabled) && stateMap['disabled'] != null) {
      return _parseSize(stateMap['disabled']);
    }
    if (states.contains(MaterialState.pressed) && stateMap['pressed'] != null) {
      return _parseSize(stateMap['pressed']);
    }
    if (states.contains(MaterialState.hovered) && stateMap['hovered'] != null) {
      return _parseSize(stateMap['hovered']);
    }
    if (states.contains(MaterialState.focused) && stateMap['focused'] != null) {
      return _parseSize(stateMap['focused']);
    }
    if (states.contains(MaterialState.selected) && stateMap['selected'] != null) {
      return _parseSize(stateMap['selected']);
    }
    if (states.contains(MaterialState.dragged) && stateMap['dragged'] != null) {
      return _parseSize(stateMap['dragged']);
    }
    if (states.contains(MaterialState.error) && stateMap['error'] != null) {
      return _parseSize(stateMap['error']);
    }
    if (states.contains(MaterialState.scrolledUnder) && stateMap['scrolledUnder'] != null) {
      return _parseSize(stateMap['scrolledUnder']);
    }
    return _parseSize(stateMap['default']);
  }

  /// 根据状态解析边框
  static BorderSide? _resolveBorderSideByStates(Set<MaterialState> states, Map<String, dynamic> stateMap) {
    if (states.contains(MaterialState.disabled) && stateMap['disabled'] != null) {
      return PrimitiveParsers.parseBorderSide(stateMap['disabled']);
    }
    if (states.contains(MaterialState.pressed) && stateMap['pressed'] != null) {
      return PrimitiveParsers.parseBorderSide(stateMap['pressed']);
    }
    if (states.contains(MaterialState.hovered) && stateMap['hovered'] != null) {
      return PrimitiveParsers.parseBorderSide(stateMap['hovered']);
    }
    if (states.contains(MaterialState.focused) && stateMap['focused'] != null) {
      return PrimitiveParsers.parseBorderSide(stateMap['focused']);
    }
    if (states.contains(MaterialState.selected) && stateMap['selected'] != null) {
      return PrimitiveParsers.parseBorderSide(stateMap['selected']);
    }
    if (states.contains(MaterialState.dragged) && stateMap['dragged'] != null) {
      return PrimitiveParsers.parseBorderSide(stateMap['dragged']);
    }
    if (states.contains(MaterialState.error) && stateMap['error'] != null) {
      return PrimitiveParsers.parseBorderSide(stateMap['error']);
    }
    if (states.contains(MaterialState.scrolledUnder) && stateMap['scrolledUnder'] != null) {
      return PrimitiveParsers.parseBorderSide(stateMap['scrolledUnder']);
    }
    return PrimitiveParsers.parseBorderSide(stateMap['default']);
  }

  /// 根据状态解析形状
  static OutlinedBorder? _resolveShapeByStates(Set<MaterialState> states, Map<String, dynamic> stateMap) {
    if (states.contains(MaterialState.disabled) && stateMap['disabled'] != null) {
      return _parseOutlinedBorder(stateMap['disabled']);
    }
    if (states.contains(MaterialState.pressed) && stateMap['pressed'] != null) {
      return _parseOutlinedBorder(stateMap['pressed']);
    }
    if (states.contains(MaterialState.hovered) && stateMap['hovered'] != null) {
      return _parseOutlinedBorder(stateMap['hovered']);
    }
    if (states.contains(MaterialState.focused) && stateMap['focused'] != null) {
      return _parseOutlinedBorder(stateMap['focused']);
    }
    if (states.contains(MaterialState.selected) && stateMap['selected'] != null) {
      return _parseOutlinedBorder(stateMap['selected']);
    }
    if (states.contains(MaterialState.dragged) && stateMap['dragged'] != null) {
      return _parseOutlinedBorder(stateMap['dragged']);
    }
    if (states.contains(MaterialState.error) && stateMap['error'] != null) {
      return _parseOutlinedBorder(stateMap['error']);
    }
    if (states.contains(MaterialState.scrolledUnder) && stateMap['scrolledUnder'] != null) {
      return _parseOutlinedBorder(stateMap['scrolledUnder']);
    }
    return _parseOutlinedBorder(stateMap['default']);
  }

  /// 根据状态解析鼠标指针
  static MouseCursor? _resolveMouseCursorByStates(Set<MaterialState> states, Map<String, dynamic> stateMap) {
    if (states.contains(MaterialState.disabled) && stateMap['disabled'] != null) {
      return _parseMouseCursor(stateMap['disabled']);
    }
    if (states.contains(MaterialState.pressed) && stateMap['pressed'] != null) {
      return _parseMouseCursor(stateMap['pressed']);
    }
    if (states.contains(MaterialState.hovered) && stateMap['hovered'] != null) {
      return _parseMouseCursor(stateMap['hovered']);
    }
    if (states.contains(MaterialState.focused) && stateMap['focused'] != null) {
      return _parseMouseCursor(stateMap['focused']);
    }
    if (states.contains(MaterialState.selected) && stateMap['selected'] != null) {
      return _parseMouseCursor(stateMap['selected']);
    }
    if (states.contains(MaterialState.dragged) && stateMap['dragged'] != null) {
      return _parseMouseCursor(stateMap['dragged']);
    }
    if (states.contains(MaterialState.error) && stateMap['error'] != null) {
      return _parseMouseCursor(stateMap['error']);
    }
    if (states.contains(MaterialState.scrolledUnder) && stateMap['scrolledUnder'] != null) {
      return _parseMouseCursor(stateMap['scrolledUnder']);
    }
    return _parseMouseCursor(stateMap['default']);
  }

  // ==== 辅助判断方法 ====

  /// 判断是否为EdgeInsets映射
  static bool _isEdgeInsetsMap(Map<String, dynamic> map) {
    return map.containsKey('top') || map.containsKey('bottom') || 
           map.containsKey('left') || map.containsKey('right') ||
           map.containsKey('all') || map.containsKey('horizontal') || 
           map.containsKey('vertical');
  }

  /// 判断是否为Size映射
  static bool _isSizeMap(Map<String, dynamic> map) {
    return map.containsKey('width') || map.containsKey('height');
  }

  /// 判断是否为BorderSide映射
  static bool _isBorderSideMap(Map<String, dynamic> map) {
    return map.containsKey('color') || map.containsKey('width') || map.containsKey('style');
  }

  /// 判断是否为Shape映射
  static bool _isShapeMap(Map<String, dynamic> map) {
    return map.containsKey('type') || map.containsKey('borderRadius') || map.containsKey('side');
  }

  // ==== 私有解析方法 ====

  /// 解析Size
  static Size? _parseSize(dynamic value) {
    if (value == null) return null;
    if (value is Map<String, dynamic>) {
      final width = value['width']?.toDouble();
      final height = value['height']?.toDouble();
      if (width != null || height != null) {
        return Size(width ?? 0, height ?? 0);
      }
    }
    return null;
  }

  /// 解析OutlinedBorder
  static OutlinedBorder? _parseOutlinedBorder(dynamic value) {
    if (value == null) return null;
    
    // 简单BorderRadius值
    final borderRadius = PrimitiveParsers.parseBorderRadius(value);
    if (borderRadius != null) {
      return RoundedRectangleBorder(borderRadius: borderRadius);
    }
    
    // 复杂形状对象
    if (value is Map<String, dynamic>) {
      final type = value['type'] as String?;
      final side = PrimitiveParsers.parseBorderSide(value['side']);
      
      switch (type) {
        case 'RoundedRectangleBorder':
          final radius = PrimitiveParsers.parseBorderRadius(value['borderRadius']) ?? BorderRadius.zero;
          return RoundedRectangleBorder(borderRadius: radius, side: side ?? BorderSide.none);
        case 'CircleBorder':
          return CircleBorder(side: side ?? BorderSide.none);
        case 'StadiumBorder':
          return StadiumBorder(side: side ?? BorderSide.none);
        case 'BeveledRectangleBorder':
          final radius = PrimitiveParsers.parseBorderRadius(value['borderRadius']) ?? BorderRadius.zero;
          return BeveledRectangleBorder(borderRadius: radius, side: side ?? BorderSide.none);
        default:
          return null;
      }
    }
    
    return null;
  }

  /// 解析MouseCursor
  static MouseCursor? _parseMouseCursor(dynamic value) {
    if (value == null) return null;
    switch (value.toString()) {
      case 'basic': return MouseCursor.uncontrolled;
      case 'click': return SystemMouseCursors.click;
      case 'forbidden': return SystemMouseCursors.forbidden;
      case 'wait': return SystemMouseCursors.wait;
      case 'progress': return SystemMouseCursors.progress;
      case 'help': return SystemMouseCursors.help;
      case 'text': return SystemMouseCursors.text;
      case 'verticalText': return SystemMouseCursors.verticalText;
      case 'cell': return SystemMouseCursors.cell;
      case 'contextMenu': return SystemMouseCursors.contextMenu;
      case 'alias': return SystemMouseCursors.alias;
      case 'copy': return SystemMouseCursors.copy;
      case 'move': return SystemMouseCursors.move;
      case 'noDrop': return SystemMouseCursors.forbidden;
      case 'notAllowed': return SystemMouseCursors.forbidden;
      case 'grab': return SystemMouseCursors.grab;
      case 'grabbing': return SystemMouseCursors.grabbing;
      case 'scrollHorizontal': return SystemMouseCursors.resizeLeftRight;
      case 'scrollVertical': return SystemMouseCursors.resizeUpDown;
      case 'resizeColumn': return SystemMouseCursors.resizeColumn;
      case 'resizeRow': return SystemMouseCursors.resizeRow;
      case 'resizeUpLeft': return SystemMouseCursors.resizeUpLeft;
      case 'resizeUpRight': return SystemMouseCursors.resizeUpRight;
      case 'resizeUp': return SystemMouseCursors.resizeUp;
      case 'resizeDown': return SystemMouseCursors.resizeDown;
      case 'resizeLeft': return SystemMouseCursors.resizeLeft;
      case 'resizeRight': return SystemMouseCursors.resizeRight;
      case 'resizeUpLeftDownRight': return SystemMouseCursors.resizeUpLeftDownRight;
      case 'resizeUpRightDownLeft': return SystemMouseCursors.resizeUpRightDownLeft;
      case 'zoomIn': return SystemMouseCursors.zoomIn;
      case 'zoomOut': return SystemMouseCursors.zoomOut;
      default: return null;
    }
  }
}
