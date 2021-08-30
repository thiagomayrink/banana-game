import FallingObject from './FallingObject';

export default class RandomFruit extends FallingObject {
  image: HTMLImageElement;
  fruit: string;
  imagesPath: string[];

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    const orange = './assets/sprites/orange.png';
    const redApple = './assets/sprites/red-apple.png';
    const strawberry = './assets/sprites/strawberry.png';
    const watermelon = './assets/sprites/watermelon.png';
    const banana = './assets/sprites/banana.png';
    super(canvas, context);
    this.context = context;
    this.imagesPath = [orange, redApple, watermelon, strawberry, banana];
    this.fruit = this.imagesPath[this.returnRandomFruit()];
    this.image = new Image();
    this.image.src = this.fruit;
  }

  info(): { points: number; isBanana: boolean; isBomb: boolean } {
    if (this.fruit === this.imagesPath[0]) return { points: 5, isBanana: false, isBomb: false };
    if (this.fruit === this.imagesPath[1]) return { points: 10, isBanana: false, isBomb: false };
    if (this.fruit === this.imagesPath[2]) return { points: 20, isBanana: false, isBomb: false };
    if (this.fruit === this.imagesPath[3]) return { points: 30, isBanana: false, isBomb: false };
    if (this.fruit === this.imagesPath[4]) return { points: 0, isBanana: true, isBomb: false };
  }

  returnRandomFruit(): number {
    const number = Math.random();
    if (0 <= number && number < 0.3) return 0;
    if (0.3 <= number && number < 0.6) return 1;
    if (0.6 <= number && number < 0.8) return 2;
    if (0.8 <= number && number <= 0.95) return 3;
    if (0.95 <= number && number <= 1) return 4;
  }
}
