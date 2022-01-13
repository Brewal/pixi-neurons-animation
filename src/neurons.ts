import Scene from "./Scene";
import Line from "./Line";
import Circle from "./Circle";
import { ShapeProperties } from "./Shape";
import ShapeAnimation from "./ShapeAnimation";

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const generateDots = (
  total: number,
  xMax: number,
  yMax: number,
  dotRadius: number
): Point[] => {
  const points: Point[] = [];

  for (let i = 0; i < total; i++) {
    points.push(
      new Point(
        dotRadius + Math.random() * (xMax - dotRadius * 2),
        dotRadius + Math.random() * (yMax - dotRadius * 2)
      )
    );
  }

  return points;
};

interface NeuronsOptions {
  dotRadius?: number;
  speedRatio?: number;
  color?: number;
}

const defaultOptions = {
  dotRadius: 9,
  speedRatio: 1,
  color: 0xffffff
};

export const launchAnimation = (
  container: HTMLElement,
  neuronsOptions?: NeuronsOptions
) => {
  const options = {
    ...defaultOptions,
    ...neuronsOptions
  };

  const fixedDots = generateDots(
    6,
    container.offsetWidth,
    container.offsetHeight,
    options.dotRadius
  );
  const scene = new Scene(
    container,
    {
      width: container.offsetWidth,
      height: container.offsetHeight,
      antialias: true,
      backgroundAlpha: 0
    },
    {
      loop: false,
      onEnd: () => launchAnimation(container, options)
    }
  );
  const speedChunk = 500 * options.speedRatio;

  let i = 0;
  for (const dot of fixedDots) {
    const start: number = Math.random() * 1000;
    const alphaTransition = {
      property: "alpha"
    };

    scene.addShapeAnimation(
      new ShapeAnimation(
        new Circle(dot.x, dot.y, options.dotRadius, options.color, 0),
        [
          {
            ...alphaTransition,
            target: 0,
            duration: start
          },
          {
            ...alphaTransition,
            target: 1,
            duration: speedChunk,
            start: start
          },
          {
            ...alphaTransition,
            target: 1,
            duration: speedChunk * 8,
            start: start + speedChunk
          },
          {
            ...alphaTransition,
            target: 0,
            duration: speedChunk / 2,
            start: start + speedChunk * 9.5
          }
        ]
      )
    );

    const nextDot = fixedDots[(i + 1) % fixedDots.length];
    const nextDot2 = fixedDots[(i + 2) % fixedDots.length];
    scene.addShapeAnimation(
      new ShapeAnimation(new Line(dot.x, dot.y, dot.x, dot.y, options.color, 1, 2), [
        {
          property: ShapeProperties.x1,
          target: dot.x,
          duration: start + speedChunk
        },
        {
          property: ShapeProperties.y1,
          target: dot.y,
          duration: start + speedChunk
        },
        {
          property: ShapeProperties.x1,
          target: nextDot.x,
          duration: speedChunk * 2,
          start: start + speedChunk * 3
        },
        {
          property: ShapeProperties.y1,
          target: nextDot.y,
          duration: speedChunk * 2,
          start: start + speedChunk * 3
        },
        {
          property: ShapeProperties.x1,
          target: nextDot.x,
          duration: speedChunk,
          start: start + speedChunk * 5
        },
        {
          property: ShapeProperties.y1,
          target: nextDot.y,
          duration: speedChunk,
          start: start + speedChunk * 5
        },
        {
          property: ShapeProperties.x1,
          target: dot.x,
          duration: speedChunk,
          start: start + speedChunk * 8
        },
        {
          property: ShapeProperties.y1,
          target: dot.y,
          duration: speedChunk,
          start: start + speedChunk * 8
        }
      ])
    );
    scene.addShapeAnimation(
      new ShapeAnimation(new Line(dot.x, dot.y, dot.x, dot.y, options.color, 1, 2), [
        {
          property: ShapeProperties.x1,
          target: dot.x,
          duration: start + speedChunk * 3
        },
        {
          property: ShapeProperties.y1,
          target: dot.y,
          duration: start + speedChunk * 3
        },
        {
          property: ShapeProperties.x1,
          target: nextDot2.x,
          duration: speedChunk * 2,
          start: start + speedChunk * 5
        },
        {
          property: ShapeProperties.y1,
          target: nextDot2.y,
          duration: speedChunk * 2,
          start: start + speedChunk * 5
        },
        {
          property: ShapeProperties.x1,
          target: nextDot2.x,
          duration: speedChunk,
          start: start + speedChunk * 7
        },
        {
          property: ShapeProperties.y1,
          target: nextDot2.y,
          duration: speedChunk,
          start: start + speedChunk * 7
        },
        {
          property: ShapeProperties.x1,
          target: dot.x,
          duration: speedChunk,
          start: start + speedChunk * 8
        },
        {
          property: ShapeProperties.y1,
          target: dot.y,
          duration: speedChunk,
          start: start + speedChunk * 8
        }
      ])
    );

    i++;
  }

  scene.animate();
};
