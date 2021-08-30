import Bomb from './Bomb';
import FallingObject from './FallingObject';
import Floor from './Floor';
import Player from './Player';
import RandomFruit from './RandomFruit';
import { randomBoolean } from './tools/helpers';

export default class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private dropInterval: number;
  private timeToNextDrop: number;
  private lastTime: number;
  private animationInterval: number;
  private score: number;
  private lives: number;
  private gameOver: boolean;
  private drops: FallingObject[];
  private player: Player;
  private floor: Floor;

  constructor(canvas: HTMLCanvasElement, screenWidth: number, screenHeight: number) {
    this.canvas = canvas;
    this.canvas.width = screenWidth;
    this.canvas.height = screenHeight;
    this.context = this.canvas.getContext('2d');
    //game default
    this.dropInterval = 2000;
    this.timeToNextDrop = 0;
    this.lastTime = 0;
    this.animationInterval = 0;
    this.score = 0;
    this.lives = 4;
    this.gameOver = false;
    this.drops = [];
    this.animate = this.animate.bind(this);
  }

  private animate(timestamp: number): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const deltatime: number = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.timeToNextDrop += deltatime;

    if (this.timeToNextDrop > this.dropInterval) {
      this.timeToNextDrop = 0;
      this.drops.push(new RandomFruit(this.canvas, this.context));
      if (randomBoolean(0.8)) this.drops.push(new Bomb(this.canvas, this.context));
    }

    this.player.updateState(deltatime);
    this.drops.forEach(obj => {
      obj.move();
      if (obj.isOutOfScreen(this.canvas)) {
        const { isBomb } = obj.info();
        if (!isBomb) {
          this.lives--;
          this.updateLives();
        }
        this.deleteFallingObject(obj);
      }

      if (this.player.checkCollision(obj)) {
        const { points, isBanana, isBomb } = obj.info();
        if (isBomb) {
          this.gameOver = true;
          this.lives = 0;
          this.updateLives();
        }
        if (isBanana) this.score *= 2;
        if (points !== 0) this.score += points;
        this.deleteFallingObject(obj);
      }
    });

    if (this.lives < 1) this.gameOver = true;

    this.floor.draw();
    this.player.draw();
    this.drops.forEach(obj => obj.draw());
    this.drawScore();

    if (!this.gameOver) this.animationInterval = window.requestAnimationFrame(this.animate);
    else this.drawGameOverMessage();
  }

  private spawnPlayer(): void {
    this.player = new Player(this.context, this.canvas.width * 0.5, this.canvas.height - 120);
    this.floor = new Floor(this.canvas, this.context);
  }

  onKeyUpEvent(event: KeyboardEvent): void {
    if (event.key) {
      this.player.idle();
    }
  }

  onKeyDownEvent(event: KeyboardEvent): void {
    switch (event.key) {
      case 'a':
        this.player.moveLeft();
        break;
      case 'd':
        this.player.moveRight(this.canvas.width);
        break;
      case 'w':
        this.pause(this.animationInterval);
        break;
      case 's':
        this.start();
        break;
      case ' ':
        this.restart();
        break;
    }
  }

  private scaleText(): void {
    if (this.canvas.width < 450) this.context.font = '25px Ruslan Display';
    else this.context.font = '50px Ruslan Display';
  }

  private drawGameOverMessage(): void {
    this.context.textAlign = 'center';
    this.context.fillStyle = '#FEFAFF';
    this.context.fillText('GAME OVER', this.canvas.width * 0.5, this.canvas.height * 0.5);
    this.context.fillStyle = '#3200A6';
    this.context.fillText(
      'your Score: ' + this.score.toString(),
      this.canvas.width * 0.5,
      this.canvas.height * 0.5 + 50,
    );
    this.context.fillStyle = '#FEFAFF';
    this.context.fillText('Press SPACE!', this.canvas.width * 0.5, this.canvas.height * 0.5 + 100);
  }

  private drawScore(): void {
    const initialX = this.canvas.width * 0.95;
    const initialY = this.canvas.height - this.canvas.height * 0.95;
    this.context.textAlign = 'right';
    this.context.fillStyle = '#3200A6';
    this.context.fillText('Score: ' + this.score, initialX, initialY, this.canvas.width * 0.5);
    this.context.fillStyle = '#FEFAFF';
    this.context.fillText(
      'Score: ' + this.score,
      initialX + 3,
      initialY + 4,
      this.canvas.width * 0.5,
    );
  }

  private updateLives(): void {
    const lifeBar = document.querySelector('.lifeBar') as HTMLElement;
    lifeBar.innerHTML = '';

    for (let i = 1; i <= 4; i++) {
      const life = new Image(45, 45);
      if (i > this.lives) life.src = './assets/sprites/heart-empty.png';
      else life.src = './assets/sprites/heart.png';
      lifeBar.appendChild(life);
    }
  }

  private deleteFallingObject(object: FallingObject): void {
    this.drops = this.drops.filter(o => o !== object);
  }

  pause(interval: number): void {
    window.cancelAnimationFrame(interval);
  }

  start(): void {
    this.clearCache();
    this.scaleText();
    this.spawnPlayer();
    this.updateLives();
    this.animate(0);
  }

  restart(): void {
    const restart = new Promise(() => window.location.reload());
    restart.then(() => this.animate(0));
  }

  private clearCache(): void {
    this.timeToNextDrop = 0;
    this.lastTime = 0;
    this.animationInterval = 0;
    this.score = 0;
    this.lives = 4;
    this.gameOver = false;
    this.drops = [];
  }
}
