import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

/// 手势事件详情解析器
/// 将Flutter手势事件详情转换为JSON格式，便于通过bridge传递到JavaScript端
class GestureParsers {
  
  /// 解析Offset为JSON
  static Map<String, dynamic> offsetToJson(Offset offset) {
    return {
      'dx': offset.dx,
      'dy': offset.dy,
    };
  }

  /// 解析Velocity为JSON
  static Map<String, dynamic> velocityToJson(Velocity velocity) {
    return {
      'pixelsPerSecond': offsetToJson(velocity.pixelsPerSecond),
    };
  }

  /// 解析PointerDeviceKind为字符串
  static String pointerDeviceKindToString(PointerDeviceKind kind) {
    switch (kind) {
      case PointerDeviceKind.touch:
        return 'touch';
      case PointerDeviceKind.mouse:
        return 'mouse';
      case PointerDeviceKind.stylus:
        return 'stylus';
      case PointerDeviceKind.invertedStylus:
        return 'invertedStylus';
      case PointerDeviceKind.trackpad:
        return 'trackpad';
      case PointerDeviceKind.unknown:
        return 'unknown';
    }
  }

  /// 解析TapDownDetails为JSON
  static Map<String, dynamic> tapDownDetailsToJson(TapDownDetails details) {
    return {
      'globalPosition': offsetToJson(details.globalPosition),
      'localPosition': offsetToJson(details.localPosition),
      'kind': pointerDeviceKindToString(details.kind ?? PointerDeviceKind.touch),
    };
  }

  /// 解析TapUpDetails为JSON
  static Map<String, dynamic> tapUpDetailsToJson(TapUpDetails details) {
    return {
      'globalPosition': offsetToJson(details.globalPosition),
      'localPosition': offsetToJson(details.localPosition),
      'kind': pointerDeviceKindToString(details.kind),
    };
  }

  /// 解析DragDownDetails为JSON
  static Map<String, dynamic> dragDownDetailsToJson(DragDownDetails details) {
    return {
      'globalPosition': offsetToJson(details.globalPosition),
      'localPosition': offsetToJson(details.localPosition),
    };
  }

  /// 解析DragStartDetails为JSON
  static Map<String, dynamic> dragStartDetailsToJson(DragStartDetails details) {
    return {
      'globalPosition': offsetToJson(details.globalPosition),
      'localPosition': offsetToJson(details.localPosition),
      'sourceTimeStamp': details.sourceTimeStamp?.inMicroseconds,
      'kind': details.kind != null ? pointerDeviceKindToString(details.kind!) : null,
    };
  }

  /// 解析DragUpdateDetails为JSON
  static Map<String, dynamic> dragUpdateDetailsToJson(DragUpdateDetails details) {
    return {
      'globalPosition': offsetToJson(details.globalPosition),
      'localPosition': offsetToJson(details.localPosition),
      'delta': offsetToJson(details.delta),
      'primaryDelta': details.primaryDelta,
      'sourceTimeStamp': details.sourceTimeStamp?.inMicroseconds,
    };
  }

  /// 解析DragEndDetails为JSON
  static Map<String, dynamic> dragEndDetailsToJson(DragEndDetails details) {
    return {
      'velocity': velocityToJson(details.velocity),
      'primaryVelocity': details.primaryVelocity,
    };
  }

  /// 解析ScaleStartDetails为JSON
  static Map<String, dynamic> scaleStartDetailsToJson(ScaleStartDetails details) {
    return {
      'focalPoint': offsetToJson(details.focalPoint),
      'localFocalPoint': offsetToJson(details.localFocalPoint),
      'pointerCount': details.pointerCount,
    };
  }

  /// 解析ScaleUpdateDetails为JSON
  static Map<String, dynamic> scaleUpdateDetailsToJson(ScaleUpdateDetails details) {
    return {
      'focalPoint': offsetToJson(details.focalPoint),
      'localFocalPoint': offsetToJson(details.localFocalPoint),
      'focalPointDelta': offsetToJson(details.focalPointDelta),
      'scale': details.scale,
      'horizontalScale': details.horizontalScale,
      'verticalScale': details.verticalScale,
      'rotation': details.rotation,
      'pointerCount': details.pointerCount,
      'sourceTimeStamp': details.sourceTimeStamp?.inMicroseconds,
    };
  }

  /// 解析ScaleEndDetails为JSON
  static Map<String, dynamic> scaleEndDetailsToJson(ScaleEndDetails details) {
    return {
      'velocity': velocityToJson(details.velocity),
      'pointerCount': details.pointerCount,
    };
  }

  /// 解析LongPressDownDetails为JSON
  static Map<String, dynamic> longPressDownDetailsToJson(LongPressDownDetails details) {
    return {
      'globalPosition': offsetToJson(details.globalPosition),
      'localPosition': offsetToJson(details.localPosition),
    };
  }

  /// 解析LongPressStartDetails为JSON
  static Map<String, dynamic> longPressStartDetailsToJson(LongPressStartDetails details) {
    return {
      'globalPosition': offsetToJson(details.globalPosition),
      'localPosition': offsetToJson(details.localPosition),
    };
  }

  /// 解析LongPressMoveUpdateDetails为JSON
  static Map<String, dynamic> longPressMoveUpdateDetailsToJson(LongPressMoveUpdateDetails details) {
    return {
      'globalPosition': offsetToJson(details.globalPosition),
      'localPosition': offsetToJson(details.localPosition),
      'offsetFromOrigin': offsetToJson(details.offsetFromOrigin),
      'localOffsetFromOrigin': offsetToJson(details.localOffsetFromOrigin),
    };
  }

  /// 解析LongPressEndDetails为JSON
  static Map<String, dynamic> longPressEndDetailsToJson(LongPressEndDetails details) {
    return {
      'globalPosition': offsetToJson(details.globalPosition),
      'localPosition': offsetToJson(details.localPosition),
      'velocity': velocityToJson(details.velocity),
    };
  }

  /// 解析ForcePressDetails为JSON
  static Map<String, dynamic> forcePressDetailsToJson(ForcePressDetails details) {
    return {
      'globalPosition': offsetToJson(details.globalPosition),
      'localPosition': offsetToJson(details.localPosition),
      'pressure': details.pressure,
    };
  }
}