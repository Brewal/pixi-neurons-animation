import { Graphics } from "@pixi/graphics";
import { Shape } from "./Shape";

export interface ILine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default class Line implements Shape, ILine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: number;
  alpha: number;
  thickness: number;

  constructor(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: number,
    alpha: number,
    thickness: number
  ) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.alpha = alpha;
    this.thickness = thickness;
  }

  draw(graphics: Graphics): void {
    graphics.lineStyle(this.thickness, this.color, this.alpha);
    graphics.moveTo(this.x1, this.y1);
    graphics.lineTo(this.x2, this.y2);
  }

  updateProp(prop: string, value: number): void {
    this[prop as keyof ILine] = value;
  }

  getProp(prop: string): number {
    return this[prop as keyof ILine];
  }
}
