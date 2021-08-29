import { randomIntFromInterval } from './tools/helpers';

export default abstract class FallingObject {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  image: HTMLImageElement;
  velocityY: number;
  spriteWidth: number;
  spriteHeight: number;
  width: number;
  height: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.context = context;
    this.x = randomIntFromInterval(30, canvas.width - 30);
    this.y = 10;
    this.radius = 35;
    this.velocityY = 2;
    this.spriteWidth = 500;
    this.spriteHeight = 500;
    this.width = 60;
    this.height = 60;
  }

  abstract score(): number;

  isOutOfScreen(canvas: HTMLCanvasElement): boolean {
    return this.y < 0 || this.y > canvas.height;
  }

  move(): void {
    this.y += 1 * this.velocityY;
  }

  draw(): void {
    this.context.drawImage(
      this.image,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
