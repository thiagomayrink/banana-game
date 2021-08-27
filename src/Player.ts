//abstract
export default class Player {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  spriteWidth: number;
  spriteHeight: number;
  frame: number;
  maxFrame: number;
  timeSinceLastStep: number;
  stepsInterval: number;
  speed: number;
  dt: number;

  constructor(context: CanvasRenderingContext2D, initialX: number, initialY: number) {
    this.context = context;
    this.spriteWidth = 30;
    this.spriteHeight = 50;
    this.width = 60;
    this.height = 80;
    this.x = initialX;
    this.y = initialY;
    this.image = new Image();
    this.image.src = './assets/sprites/player-sprite.png';
    this.frame = 0;
    this.maxFrame = 1;
    this.timeSinceLastStep = 0;
    this.stepsInterval = 120;
    this.speed = 1.4;
  }

  moveRight(screenWidth: number): void {
    if (this.x <= screenWidth - 63) {
      this.x += this.speed * this.dt;
    }
  }

  moveLeft(): void {
    if (this.x > 0) {
      this.x -= this.speed * this.dt;
    }
  }

  updateState(deltaTime: number): void {
    this.dt = deltaTime;
    this.timeSinceLastStep += deltaTime;
    if (this.timeSinceLastStep > this.stepsInterval) {
      if (this.frame > this.maxFrame) this.frame = 0;
      else this.frame++;
      this.timeSinceLastStep = 0;
    }
  }

  draw(): void {
    this.context.strokeRect(this.x, this.y, this.width, this.height);
    this.context.drawImage(
      this.image,
      this.frame * this.spriteWidth,
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
