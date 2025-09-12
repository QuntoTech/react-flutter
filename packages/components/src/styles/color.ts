/**
 * Color类 - 完全对齐Flutter Color API
 * 用于表示颜色值，支持ARGB格式
 */

export class Color {
  private readonly _value: number;

  /**
   * 从32位ARGB值创建颜色
   * 对应Flutter: Color(0xFF2196F3)
   */
  constructor(value: number) {
    this._value = value >>> 0; // 确保为无符号32位整数
  }

  /**
   * 从ARGB分量创建颜色
   * 对应Flutter: Color.fromARGB(alpha, red, green, blue)
   * @param alpha 透明度 (0-255)
   * @param red 红色分量 (0-255)
   * @param green 绿色分量 (0-255)
   * @param blue 蓝色分量 (0-255)
   */
  static fromARGB(alpha: number, red: number, green: number, blue: number): Color {
    const value = ((alpha & 0xFF) << 24) |
                  ((red & 0xFF) << 16) |
                  ((green & 0xFF) << 8) |
                  (blue & 0xFF);
    return new Color(value);
  }

  /**
   * 从RGBO创建颜色
   * 对应Flutter: Color.fromRGBO(red, green, blue, opacity)
   * @param red 红色分量 (0-255)
   * @param green 绿色分量 (0-255)
   * @param blue 蓝色分量 (0-255)
   * @param opacity 不透明度 (0.0-1.0)
   */
  static fromRGBO(red: number, green: number, blue: number, opacity: number): Color {
    const alpha = Math.round(opacity * 255);
    return Color.fromARGB(alpha, red, green, blue);
  }

  /**
   * 获取颜色的ARGB值
   */
  get value(): number {
    return this._value;
  }

  /**
   * 获取透明度分量 (0-255)
   */
  get alpha(): number {
    return (this._value >> 24) & 0xFF;
  }

  /**
   * 获取红色分量 (0-255)
   */
  get red(): number {
    return (this._value >> 16) & 0xFF;
  }

  /**
   * 获取绿色分量 (0-255)
   */
  get green(): number {
    return (this._value >> 8) & 0xFF;
  }

  /**
   * 获取蓝色分量 (0-255)
   */
  get blue(): number {
    return this._value & 0xFF;
  }

  /**
   * 获取不透明度 (0.0-1.0)
   */
  get opacity(): number {
    return this.alpha / 255;
  }

  /**
   * 创建具有指定不透明度的新颜色
   * 对应Flutter: color.withOpacity(opacity)
   */
  withOpacity(opacity: number): Color {
    const alpha = Math.round(opacity * 255);
    return Color.fromARGB(alpha, this.red, this.green, this.blue);
  }

  /**
   * 创建具有指定透明度的新颜色
   * 对应Flutter: color.withAlpha(alpha)
   */
  withAlpha(alpha: number): Color {
    return Color.fromARGB(alpha, this.red, this.green, this.blue);
  }

  /**
   * 转换为Flutter端能理解的对象
   */
  toFlutterMap(): { value: number } {
    return { value: this.value };
  }

  /**
   * 转换为十六进制字符串 (用于调试)
   */
  toString(): string {
    return `Color(0x${this.value.toString(16).toUpperCase().padStart(8, '0')})`;
  }

  /**
   * 相等性比较
   */
  equals(other: Color): boolean {
    return this.value === other.value;
  }

  // =============================================================================
  // 预定义颜色常量 - 对齐Flutter Colors类
  // =============================================================================

  // 透明和基础颜色
  static get transparent(): Color { return new Color(0x00000000); }

  // 黑色系列
  static get black(): Color { return new Color(0xFF000000); }
  static get black87(): Color { return new Color(0xDD000000); }
  static get black54(): Color { return new Color(0x8A000000); }
  static get black45(): Color { return new Color(0x73000000); }
  static get black38(): Color { return new Color(0x61000000); }
  static get black26(): Color { return new Color(0x42000000); }
  static get black12(): Color { return new Color(0x1F000000); }

  // 白色系列
  static get white(): Color { return new Color(0xFFFFFFFF); }
  static get white70(): Color { return new Color(0xB3FFFFFF); }
  static get white60(): Color { return new Color(0x99FFFFFF); }
  static get white54(): Color { return new Color(0x8AFFFFFF); }
  static get white38(): Color { return new Color(0x62FFFFFF); }
  static get white30(): Color { return new Color(0x4DFFFFFF); }
  static get white24(): Color { return new Color(0x3DFFFFFF); }
  static get white12(): Color { return new Color(0x1FFFFFFF); }
  static get white10(): Color { return new Color(0x1AFFFFFF); }

  // Material Design主色板
  static get red(): Color { return new Color(0xFFF44336); }
  static get pink(): Color { return new Color(0xFFE91E63); }
  static get purple(): Color { return new Color(0xFF9C27B0); }
  static get deepPurple(): Color { return new Color(0xFF673AB7); }
  static get indigo(): Color { return new Color(0xFF3F51B5); }
  static get blue(): Color { return new Color(0xFF2196F3); }
  static get lightBlue(): Color { return new Color(0xFF03A9F4); }
  static get cyan(): Color { return new Color(0xFF00BCD4); }
  static get teal(): Color { return new Color(0xFF009688); }
  static get green(): Color { return new Color(0xFF4CAF50); }
  static get lightGreen(): Color { return new Color(0xFF8BC34A); }
  static get lime(): Color { return new Color(0xFFCDDC39); }
  static get yellow(): Color { return new Color(0xFFFFEB3B); }
  static get amber(): Color { return new Color(0xFFFFC107); }
  static get orange(): Color { return new Color(0xFFFF9800); }
  static get deepOrange(): Color { return new Color(0xFFFF5722); }
  static get brown(): Color { return new Color(0xFF795548); }
  static get grey(): Color { return new Color(0xFF9E9E9E); }
  static get blueGrey(): Color { return new Color(0xFF607D8B); }
}

/**
 * 颜色值类型
 * 严格只支持Color实例，完全对齐Flutter
 */
export type ColorValue = Color;
