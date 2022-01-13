import { Graphics } from "pixi.js";
import { Shape } from "./Shape";

const linearEase = (
  source: number,
  target: number,
  start: number,
  duration: number,
  timestamp: number
): number => {
  const percentage = Math.min((timestamp - start) / duration, 1);

  return source + (target - source) * percentage;
};

const colorLinearEase = (
  source: number,
  target: number,
  start: number,
  duration: number,
  timestamp: number
): number => {
  const redSource = source >> 16;
  const greenSource = (source >> 8) & 0x00ff;
  const blueSource = source & 0x0000ff;

  const redTarget = target >> 16;
  const greenTarget = (target >> 8) & 0x00ff;
  const blueTarget = target & 0x0000ff;

  const red = linearEase(redSource, redTarget, start, duration, timestamp);
  const green = linearEase(
    greenSource,
    greenTarget,
    start,
    duration,
    timestamp
  );
  const blue = linearEase(blueSource, blueTarget, start, duration, timestamp);

  return (red << 16) + (green << 8) + blue;
};

export enum EasingTypes {
  linear,
  colorLinear
}

const Easings = {
  [EasingTypes.linear]: linearEase,
  [EasingTypes.colorLinear]: colorLinearEase
};

interface Motion {
  property: string;
  target: number;
  duration: number;
  start?: number;
  easing?: EasingTypes;
}

export default class ShapeAnimation {
  readonly shape: Shape;
  readonly motions: Motion[];

  startTime: number | null;
  startShape: Shape;
  transitionShape: Shape;

  constructor(shape: Shape, motions: Motion[]) {
    this.shape = shape;
    this.startShape = this.getShapeClone();
    this.transitionShape = this.getShapeClone();
    this.motions = motions;
    this.startTime = null;
  }

  private getShapeClone(): Shape {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this.shape)),
      this.shape
    );
  }

  animate(timestamp: number, graphics: Graphics): void {
    if (this.startTime === null) {
      this.startTime = Date.now();
    }

    this.handleMotions(timestamp);
    this.shape.draw(graphics);
  }

  private handleMotions(timestamp: number): void {
    let lastMotionStart: number = 0;

    for (const motion of this.motions) {
      const motionStart = motion.start || 0;

      if (motionStart < timestamp) {
        if (motionStart > lastMotionStart) {
          lastMotionStart = motionStart;
          this.transitionShape = this.getShapeClone();
        }

        const easeFunction = Easings[motion.easing || EasingTypes.linear];

        this.shape.updateProp(
          motion.property,
          easeFunction(
            this.transitionShape.getProp(motion.property),
            motion.target,
            motionStart,
            motion.duration,
            timestamp
          )
        );
      }
    }

    if (timestamp > this.getDuration()) {
      this.transitionShape = this.startShape;
    }
  }

  getDuration(): number {
    return Math.max(
      ...this.motions.map((motion) => motion.duration + (motion.start || 0))
    );
  }
}
