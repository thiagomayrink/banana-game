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
    this.radius = 25;
    this.speedY = 1.5;
    this.spriteWidth = 50;
    this.spriteHeight = 50;
    this.width = 50;
    this.height = 50;
  }

  isOutOfScreen(canvas: HTMLCanvasElement): boolean {
    return this.y < 0 || this.y > canvas.height;
  }

  move(): void {
    this.y += 1 * this.speedY;
  }

  draw(): void {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.context.strokeStyle = '#0000FF';
    this.context.stroke();
    this.context.drawImage(this.image, this.x, this.y, this.spriteWidth, this.spriteHeight);
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
