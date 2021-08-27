import FallingObject from './FallingObject';

export default class Banana extends FallingObject {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  image: HTMLImageElement;
  points: number;
  speedY: number;
  width: number;
  height: number;
  spriteWidth: number;
  spriteHeight: number;
  timeSinceLastStep: number;
  stepsInterval: number;
  dt: number;

  constructor(context: CanvasRenderingContext2D) {
    super(context);
    this.x = Math.floor(Math.random() * 325);
    this.y = 10;
    this.speedY = 1.71;
    this.spriteWidth = 30;
    this.spriteHeight = 50;
    this.width = 60;
    this.height = 100;
    this.image = new Image();
    this.image.src = './assets/sprites/banana.png';
    this.timeSinceLastStep = 0;
    this.stepsInterval = 120;
  }
}
