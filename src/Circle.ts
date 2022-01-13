import { Graphics } from "@pixi/graphics";
import { Shape } from "./Shape";

export interface ICircle {
  x: number;
  y: number;
  radius: number;
  color: number;
  alpha: number;
}

export default class Circle implements Shape, ICircle {
  x: number;
  y: number;
  radius: number;
  color: number;
  alpha: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    color: number,
    alpha: number
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.alpha = alpha;
  }

  draw(graphics: Graphics): void {
    graphics.lineStyle(0);
    graphics.beginFill(this.color, this.alpha);
    graphics.drawCircle(this.x, this.y, this.radius);
    graphics.endFill();
  }

  updateProp(prop: string, value: number): void {
    this[prop as keyof ICircle] = value;
  }

  getProp(prop: string): number {
    return this[prop as keyof ICircle];
  }
}
