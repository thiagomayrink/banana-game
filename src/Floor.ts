export default class Floor {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  image: HTMLImageElement;
  spriteWidth: number;
  spriteHeight: number;
  width: number;
  height: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.context = context;
    this.x = 0;
    this.y = canvas.height - 50;
    this.spriteWidth = 160;
    this.spriteHeight = 160;
    this.width = canvas.width;
    this.height = 50;
    this.image = new Image();
    this.image.src = './assets/sprites/wood-tile.png';
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
