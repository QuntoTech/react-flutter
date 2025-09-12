/**
 * BorderRadius类 - 完全对齐Flutter BorderRadius API
 * 用于定义圆角半径，支持统一圆角和单独圆角设置
 */

export class BorderRadius {
  constructor(
    public readonly topLeft: number,
    public readonly topRight: number,
    public readonly bottomRight: number,
    public readonly bottomLeft: number
  ) {}

  /**
   * 创建所有圆角相同的BorderRadius
   * 对应Flutter: BorderRadius.circular(radius)
   */
  static circular(radius: number): BorderRadius {
    return new BorderRadius(radius, radius, radius, radius);
  }

  /**
   * 创建所有圆角相同的BorderRadius (circular的别名)
   * 对应Flutter: BorderRadius.all(Radius.circular(radius))
   */
  static all(radius: number): BorderRadius {
    return BorderRadius.circular(radius);
  }

  /**
   * 创建指定圆角的BorderRadius
   * 对应Flutter: BorderRadius.only(topLeft: Radius.circular(x), ...)
   */
  static only({
    topLeft = 0,
    topRight = 0,
    bottomRight = 0,
    bottomLeft = 0
  }: {
    topLeft?: number;
    topRight?: number;
    bottomRight?: number;
    bottomLeft?: number;
  }): BorderRadius {
    return new BorderRadius(topLeft, topRight, bottomRight, bottomLeft);
  }

  /**
   * 创建零圆角
   * 对应Flutter: BorderRadius.zero
   */
  static get zero(): BorderRadius {
    return new BorderRadius(0, 0, 0, 0);
  }

  /**
   * 创建水平和垂直对称的圆角
   * 扩展方法，Flutter中需要手动指定
   */
  static symmetric({
    horizontal = 0,
    vertical = 0
  }: {
    horizontal?: number;
    vertical?: number;
  }): BorderRadius {
    return new BorderRadius(vertical, horizontal, vertical, horizontal);
  }

  /**
   * 转换为Flutter端能理解的对象
   */
  toFlutterMap(): { 
    topLeft: number; 
    topRight: number; 
    bottomRight: number; 
    bottomLeft: number; 
  } {
    return {
      topLeft: this.topLeft,
      topRight: this.topRight,
      bottomRight: this.bottomRight,
      bottomLeft: this.bottomLeft
    };
  }

  /**
   * 字符串表示
   */
  toString(): string {
    if (this.topLeft === this.topRight && 
        this.topRight === this.bottomRight && 
        this.bottomRight === this.bottomLeft) {
      return `BorderRadius.circular(${this.topLeft})`;
    }
    return `BorderRadius.only(topLeft: ${this.topLeft}, topRight: ${this.topRight}, bottomRight: ${this.bottomRight}, bottomLeft: ${this.bottomLeft})`;
  }

  /**
   * 相等性比较
   */
  equals(other: BorderRadius): boolean {
    return this.topLeft === other.topLeft &&
           this.topRight === other.topRight &&
           this.bottomRight === other.bottomRight &&
           this.bottomLeft === other.bottomLeft;
  }

  /**
   * 检查是否为零圆角
   */
  get isZero(): boolean {
    return this.topLeft === 0 && 
           this.topRight === 0 && 
           this.bottomRight === 0 && 
           this.bottomLeft === 0;
  }

  /**
   * 检查是否为统一圆角
   */
  get isUniform(): boolean {
    return this.topLeft === this.topRight && 
           this.topRight === this.bottomRight && 
           this.bottomRight === this.bottomLeft;
  }

  /**
   * 获取统一圆角值（仅当isUniform为true时有效）
   */
  get uniformRadius(): number | null {
    return this.isUniform ? this.topLeft : null;
  }
}

/**
 * BorderRadius值类型
 * 支持数字（自动转换为BorderRadius.circular）或BorderRadius实例
 */
export type BorderRadiusValue = BorderRadius | number;
