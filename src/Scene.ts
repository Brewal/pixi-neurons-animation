import {
  Container,
  IRendererOptionsAuto,
  autoDetectRenderer,
  AbstractRenderer,
  Graphics
} from "pixi.js";
import ShapeAnimation from "./ShapeAnimation";

interface SceneOptions {
  loop?: boolean;
  onEnd?: () => void;
}

const defaultsOptions: SceneOptions = {
  loop: true
};

export default class Scene {
  private readonly renderer: AbstractRenderer;
  private readonly stage: Container;
  private readonly graphics: Graphics;
  private readonly shapeAnimations: ShapeAnimation[];
  private start: number | null;
  private options: SceneOptions;
  private element: HTMLElement;

  constructor(
    element: HTMLElement,
    renderOptions: IRendererOptionsAuto,
    options?: SceneOptions
  ) {
    this.options = {
      ...defaultsOptions,
      ...options
    };
    this.renderer = autoDetectRenderer(renderOptions);
    this.stage = new Container();
    this.graphics = new Graphics();
    this.element = element;
    this.renderView(element);
    this.shapeAnimations = [];
    this.stage.addChild(this.graphics);
    this.start = null;
  }

  renderView(element: HTMLElement): void {
    element.appendChild(this.renderer.view);
  }

  animate(): void {
    if (this.start === null) {
      this.start = Date.now();
    }

    let longestAnimationTime = 0;

    this.graphics.clear();
    const time = Date.now() - this.start;

    for (const shapeAnimation of this.shapeAnimations) {
      shapeAnimation.animate(time, this.graphics);
      longestAnimationTime = Math.max(
        longestAnimationTime,
        shapeAnimation.getDuration()
      );
    }

    // loop the animation
    if (time > longestAnimationTime) {
      if (this.options.onEnd) this.options.onEnd();
      if (this.options.loop) this.start = null;
      else {
        this.element.removeChild(this.renderer.view);
        this.renderer.destroy();
        this.stage.removeChild(this.graphics);
        this.stage.destroy();
        this.graphics.destroy();
        return;
      }
    }

    this.renderer.render(this.stage);
    requestAnimationFrame(() => this.animate());
  }

  addShapeAnimation(animation: ShapeAnimation) {
    this.shapeAnimations.push(animation);
  }
}
