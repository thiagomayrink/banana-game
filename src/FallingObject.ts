import { randomIntFromInterval } from './tools/helpers';

export default abstract class FallingObject {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  radius: number;
  image: HTMLImageElement;
  speedY: number;
  spriteWidth: number;
  spriteHeight: number;
  width: number;
  height: number;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.x = randomIntFromInterval(0, 375);
    this.y = 10;
    this.radius = 35;
    this.speedY = 2;
    this.spriteWidth = 500;
    this.spriteHeight = 500;
    this.width = 60;
    this.height = 60;
  }

  isOutOfScreen(canvas: HTMLCanvasElement): boolean {
    return this.y < 0 || this.y > canvas.height;
  }

  move(): void {
    this.y += 1 * this.speedY;
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
