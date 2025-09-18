import 'dart:convert';

/// 虚拟DOM节点数据类
class VirtualDOM {
  final String type;
  final Map<String, dynamic> props;
  final dynamic children;
  
  VirtualDOM({
    required this.type,
    required this.props,
    this.children,
  });
  
  /// 从JSON创建VirtualDOM对象
  factory VirtualDOM.fromJson(Map<String, dynamic> json) {
    return VirtualDOM(
      type: json['type'] ?? '',
      props: Map<String, dynamic>.from(json['props'] ?? {}),
      children: json['children'],
    );
  }
  
  /// 转换为JSON
  Map<String, dynamic> toJson() {
    return {
      'type': type,
      'props': props,
      'children': children,
    };
  }
  
  /// 获取子元素列表
  List<VirtualDOM> getChildrenList() {
    if (children == null) return [];
    
    if (children is List) {
      return children
          .where((child) => child != null)
          .map<VirtualDOM>((child) {
            if (child is Map<String, dynamic>) {
              return VirtualDOM.fromJson(child);
            } else if (child is VirtualDOM) {
              return child;
            } else {
              // 处理字符串等原始类型作为文本节点
              return VirtualDOM(
                type: 'Text',
                props: {'text': child.toString()},
              );
            }
          }).toList();
    } else if (children is Map<String, dynamic>) {
      return [VirtualDOM.fromJson(children)];
    }
    
    return [];
  }
  
  /// 获取属性值，支持默认值和类型转换
  T? getProp<T>(String key, [T? defaultValue]) {
    final value = props[key];
    if (value == null) return defaultValue;
    
    // 类型转换
    if (T == double && value is num) {
      return value.toDouble() as T;
    } else if (T == int && value is num) {
      return value.toInt() as T;
    } else if (T == String) {
      return value.toString() as T;
    } else if (T == bool) {
      if (value is bool) return value as T;
      if (value is String) {
        return (value.toLowerCase() == 'true') as T;
      }
    }
    
    try {
      return value as T;
    } catch (e) {
      return defaultValue;
    }
  }
  
  /// 获取属性值，确保返回非空类型（当提供默认值时）
  T getPropOrDefault<T>(String key, T defaultValue) {
    final value = props[key];
    if (value == null) return defaultValue;
    
    // 类型转换
    if (T == double && value is num) {
      return value.toDouble() as T;
    } else if (T == int && value is num) {
      return value.toInt() as T;
    } else if (T == String) {
      return value.toString() as T;
    } else if (T == bool) {
      if (value is bool) return value as T;
      if (value is String) {
        return (value.toLowerCase() == 'true') as T;
      }
    }
    
    try {
      return value as T;
    } catch (e) {
      return defaultValue;
    }
  }
  
  @override
  String toString() {
    return 'VirtualDOM(type: $type, props: $props, children: $children)';
  }
}

/// 虚拟DOM解析器
class VirtualDOMParser {
  /// 从JSON字符串解析虚拟DOM
  static VirtualDOM parseFromJson(String jsonString) {
    try {
      final json = jsonDecode(jsonString);
      return VirtualDOM.fromJson(json);
    } catch (e) {
      throw Exception('解析虚拟DOM失败: $e');
    }
  }
  
  /// 从JSON字符串解析更新指令数组
  static List<dynamic> parseInstructionsFromJson(String jsonString) {
    try {
      final json = jsonDecode(jsonString);
      if (json is List) {
        return json;
      } else {
        throw Exception('指令数据必须是数组格式');
      }
    } catch (e) {
      throw Exception('解析更新指令失败: $e');
    }
  }
  
  /// 从Map解析虚拟DOM
  static VirtualDOM parseFromMap(Map<String, dynamic> json) {
    return VirtualDOM.fromJson(json);
  }
  
  /// 验证虚拟DOM结构
  static bool validate(VirtualDOM vdom) {
    // 基本验证
    if (vdom.type.isEmpty) return false;
    
    // 递归验证子元素
    for (final child in vdom.getChildrenList()) {
      if (!validate(child)) return false;
    }
    
    return true;
  }
}
