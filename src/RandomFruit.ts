import FallingObject from './FallingObject';
import { randomIntFromInterval } from './tools/helpers';

export default class RandomFruit extends FallingObject {
  image: HTMLImageElement;
  points: number;
  imagesPath: string[];

  constructor(context: CanvasRenderingContext2D) {
    const orange = './assets/sprites/orange.png';
    const redApple = './assets/sprites/red-apple.png';
    const strawberry = './assets/sprites/strawberry.png';
    const watermelon = './assets/sprites/watermelon.png';
    super(context);

    this.context = context;
    this.image = new Image();
    this.imagesPath = [orange, redApple, strawberry, watermelon];
    this.image.src = this.imagesPath[randomIntFromInterval(0, 3)];
  }
}
