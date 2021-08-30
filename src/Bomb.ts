import FallingObject from './FallingObject';

export default class Bomb extends FallingObject {
  image: HTMLImageElement;
  points: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super(canvas, context);

    this.context = context;
    this.image = new Image();
    this.image.src = './assets/sprites/bomb.png';
  }

  info(): { points: number; isBanana: boolean; isBomb: boolean } {
    return { points: 0, isBanana: false, isBomb: true };
  }
}
