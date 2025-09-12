/**
 * EdgeInsets类 - 对齐Flutter EdgeInsets API
 * 用于定义组件的内边距和外边距
 */

export class EdgeInsets {
  constructor(
    public readonly top: number,
    public readonly right: number,
    public readonly bottom: number,
    public readonly left: number
  ) {}

  /**
   * 创建所有方向相同的EdgeInsets
   * 对应Flutter: EdgeInsets.all(value)
   */
  static all(value: number): EdgeInsets {
    return new EdgeInsets(value, value, value, value);
  }

  /**
   * 创建对称的EdgeInsets
   * 对应Flutter: EdgeInsets.symmetric(vertical: x, horizontal: y)
   */
  static symmetric({ 
    vertical = 0, 
    horizontal = 0 
  }: {
    vertical?: number;
    horizontal?: number;
  }): EdgeInsets {
    return new EdgeInsets(vertical, horizontal, vertical, horizontal);
  }

  /**
   * 创建指定方向的EdgeInsets
   * 对应Flutter: EdgeInsets.only(top: x, right: y, bottom: z, left: w)
   */
  static only({
    top = 0,
    right = 0,
    bottom = 0,
    left = 0
  }: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }): EdgeInsets {
    return new EdgeInsets(top, right, bottom, left);
  }

  /**
   * 从左上右下值创建EdgeInsets
   * 对应Flutter: EdgeInsets.fromLTRB(left, top, right, bottom)
   */
  static fromLTRB(left: number, top: number, right: number, bottom: number): EdgeInsets {
    return new EdgeInsets(top, right, bottom, left);
  }

  /**
   * 零边距
   * 对应Flutter: EdgeInsets.zero
   */
  static get zero(): EdgeInsets {
    return new EdgeInsets(0, 0, 0, 0);
  }

  /**
   * 获取水平方向总边距
   */
  get horizontal(): number {
    return this.left + this.right;
  }

  /**
   * 获取垂直方向总边距
   */
  get vertical(): number {
    return this.top + this.bottom;
  }

  /**
   * 转换为Flutter端能理解的对象
   */
  toFlutterMap(): { top: number; right: number; bottom: number; left: number } {
    return {
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left
    };
  }

  /**
   * 字符串表示
   */
  toString(): string {
    return `EdgeInsets(${this.top}, ${this.right}, ${this.bottom}, ${this.left})`;
  }

  /**
   * 相等性比较
   */
  equals(other: EdgeInsets): boolean {
    return this.top === other.top &&
           this.right === other.right &&
           this.bottom === other.bottom &&
           this.left === other.left;
  }
}

/**
 * EdgeInsets值类型
 * 支持数字（自动转换为EdgeInsets.all）或EdgeInsets实例
 */
export type EdgeInsetsValue = EdgeInsets | number;
