export default class FallingObject {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  image: HTMLImageElement;
  points: number;
  speedX: number;
  speedY: number;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.x = Math.floor(Math.random() * 325);
    this.y = 10;
    this.speedX = 1;
    this.speedY = 1.001;
  }

  move(): void {
    this.y *= this.speedY;
  }

  draw(): void {
    this.context.beginPath();
    this.context.drawImage(this.image, 0, 0, 60, 60);
    this.context.fill();
  }
}
