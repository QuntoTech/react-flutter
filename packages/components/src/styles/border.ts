/**
 * Border和BorderSide类 - 完全对齐Flutter Border API
 * 用于定义边框样式，支持单边和四边设置
 */

import { Color } from './color';

/**
 * BorderSide类 - 对应Flutter BorderSide
 * 表示单边的边框样式
 */
export class BorderSide {
  constructor(
    public readonly color: Color = Color.black,
    public readonly width: number = 1.0,
    public readonly style: BorderSideStyle = 'solid'
  ) {}

  /**
   * 创建无边框
   * 对应Flutter: BorderSide.none
   */
  static get none(): BorderSide {
    return new BorderSide(Color.transparent, 0.0, 'none');
  }

  /**
   * 转换为Flutter端能理解的对象
   */
  toFlutterMap(): {
    color: { value: number };
    width: number;
    style: string;
  } {
    return {
      color: this.color.toFlutterMap(),
      width: this.width,
      style: this.style
    };
  }

  /**
   * 字符串表示
   */
  toString(): string {
    if (this.style === 'none') {
      return 'BorderSide.none';
    }
    return `BorderSide(color: ${this.color.toString()}, width: ${this.width}, style: ${this.style})`;
  }

  /**
   * 相等性比较
   */
  equals(other: BorderSide): boolean {
    return this.color.equals(other.color) &&
           this.width === other.width &&
           this.style === other.style;
  }

  /**
   * 检查是否为无边框
   */
  get isNone(): boolean {
    return this.style === 'none' || this.width === 0;
  }

  /**
   * 复制并修改部分属性
   */
  copyWith({
    color,
    width,
    style
  }: {
    color?: Color;
    width?: number;
    style?: BorderSideStyle;
  }): BorderSide {
    return new BorderSide(
      color ?? this.color,
      width ?? this.width,
      style ?? this.style
    );
  }
}

/**
 * Border类 - 对应Flutter Border
 * 表示四边的边框组合
 */
export class Border {
  constructor(
    public readonly top: BorderSide = BorderSide.none,
    public readonly right: BorderSide = BorderSide.none,
    public readonly bottom: BorderSide = BorderSide.none,
    public readonly left: BorderSide = BorderSide.none
  ) {}

  /**
   * 创建四边相同的边框
   * 对应Flutter: Border.all(color: color, width: width, style: style)
   */
  static all({
    color = Color.black,
    width = 1.0,
    style = 'solid' as BorderSideStyle
  }: {
    color?: Color;
    width?: number;
    style?: BorderSideStyle;
  } = {}): Border {
    const borderSide = new BorderSide(color, width, style);
    return new Border(borderSide, borderSide, borderSide, borderSide);
  }

  /**
   * 创建对称边框
   * 对应Flutter: Border.symmetric(vertical: ..., horizontal: ...)
   */
  static symmetric({
    vertical,
    horizontal
  }: {
    vertical?: BorderSide;
    horizontal?: BorderSide;
  }): Border {
    const verticalSide = vertical ?? BorderSide.none;
    const horizontalSide = horizontal ?? BorderSide.none;
    
    return new Border(
      verticalSide,    // top
      horizontalSide,  // right
      verticalSide,    // bottom
      horizontalSide   // left
    );
  }

  /**
   * 创建指定边的边框
   * 对应Flutter: Border(top: ..., right: ..., bottom: ..., left: ...)
   */
  static only({
    top,
    right,
    bottom,
    left
  }: {
    top?: BorderSide;
    right?: BorderSide;
    bottom?: BorderSide;
    left?: BorderSide;
  }): Border {
    return new Border(
      top ?? BorderSide.none,
      right ?? BorderSide.none,
      bottom ?? BorderSide.none,
      left ?? BorderSide.none
    );
  }

  /**
   * 从单个BorderSide创建四边边框
   * 对应Flutter: Border.fromBorderSide(side)
   */
  static fromBorderSide(side: BorderSide): Border {
    return new Border(side, side, side, side);
  }

  /**
   * 转换为Flutter端能理解的对象
   */
  toFlutterMap(): {
    top: { color: { value: number }; width: number; style: string };
    right: { color: { value: number }; width: number; style: string };
    bottom: { color: { value: number }; width: number; style: string };
    left: { color: { value: number }; width: number; style: string };
  } {
    return {
      top: this.top.toFlutterMap(),
      right: this.right.toFlutterMap(),
      bottom: this.bottom.toFlutterMap(),
      left: this.left.toFlutterMap()
    };
  }

  /**
   * 字符串表示
   */
  toString(): string {
    if (this.isUniform) {
      return `Border.all(${this.top.toString()})`;
    }
    if (this.isSymmetric) {
      return `Border.symmetric(vertical: ${this.top.toString()}, horizontal: ${this.right.toString()})`;
    }
    return `Border(top: ${this.top.toString()}, right: ${this.right.toString()}, bottom: ${this.bottom.toString()}, left: ${this.left.toString()})`;
  }

  /**
   * 相等性比较
   */
  equals(other: Border): boolean {
    return this.top.equals(other.top) &&
           this.right.equals(other.right) &&
           this.bottom.equals(other.bottom) &&
           this.left.equals(other.left);
  }

  /**
   * 检查是否为统一边框（四边相同）
   */
  get isUniform(): boolean {
    return this.top.equals(this.right) &&
           this.right.equals(this.bottom) &&
           this.bottom.equals(this.left);
  }

  /**
   * 检查是否为对称边框（上下相同，左右相同）
   */
  get isSymmetric(): boolean {
    return this.top.equals(this.bottom) &&
           this.left.equals(this.right);
  }

  /**
   * 检查是否为无边框
   */
  get isNone(): boolean {
    return this.top.isNone &&
           this.right.isNone &&
           this.bottom.isNone &&
           this.left.isNone;
  }

  /**
   * 获取统一的BorderSide（仅当isUniform为true时有效）
   */
  get uniformSide(): BorderSide | null {
    return this.isUniform ? this.top : null;
  }
}

/**
 * 边框样式枚举
 */
export type BorderSideStyle = 'none' | 'solid';

/**
 * Border值类型
 * 支持Border实例或简化的边框配置
 */
export type BorderValue = Border | {
  width?: number;
  color?: Color;
  style?: BorderSideStyle;
};
