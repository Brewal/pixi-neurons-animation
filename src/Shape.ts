import { Graphics } from "pixi.js";

export interface Shape {
  draw(graphics: Graphics): void;
  updateProp(prop: string, value: number): void;
  getProp(prop: string): number;
}

export enum ShapeProperties {
  x = "x",
  y = "y",
  x1 = "x1",
  y1 = "y1",
  x2 = "x2",
  y2 = "y2",
  width = "width",
  height = "height",
  radius = "radius"
}
