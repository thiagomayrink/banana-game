import Banana from './Banana';
import Bomb from './Bomb';
import FallingObject from './FallingObject';
import Player from './Player';
import RandomFruit from './RandomFruit';
import { randomBoolean } from './tools/helpers';

const canvas: HTMLCanvasElement = document.querySelector('#canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.font = '50px Ruslan Display';

let timeToNextDrop = 0;
const dropInterval = 2000;
let lastTime = 0;
let animationInterval: number;
let score = 0;
let lifes = 3;
let drops: FallingObject[] = [];
let bananas: FallingObject[] = [];
let bombs: FallingObject[] = [];

const player = new Player(context, canvas.width * 0.5, canvas.height - 120);

player.draw();

window.addEventListener('keydown', e => onKeyDown(e));
window.addEventListener('keyup', e => onKeyUp(e));

function onKeyUp(e: KeyboardEvent) {
  e.preventDefault();
  if (e.key) {
    player.idle();
  }
}

function onKeyDown(e: KeyboardEvent) {
  e.preventDefault();
  switch (e.key) {
    case 'a':
      player.moveLeft();
      break;
    case 'd':
      player.moveRight(canvas.width);
      break;
    case 'w':
      stopAnimation(animationInterval);
      break;
    case 's':
      startGame();
      break;
  }
}

function animate(timestamp: number) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const deltatime: number = timestamp - lastTime;
  lastTime = timestamp;
  timeToNextDrop += deltatime;

  if (timeToNextDrop > dropInterval) {
    timeToNextDrop = 0;
    drops.push(new RandomFruit(canvas, context));
    if (randomBoolean(0.98)) bananas.push(new Banana(canvas, context));
    if (randomBoolean(0.9)) bombs.push(new Bomb(canvas, context));
  }

  player.updateState(deltatime);
  drops.forEach(obj => {
    obj.move();
    if (obj.isOutOfScreen(canvas)) {
      deleteFallingObject(obj);
    }

    if (player.checkCollision(obj)) {
      score += 20;
      deleteFallingObject(obj);
    }
  });

  bombs.forEach(bomb => {
    bomb.move();
    if (bomb.isOutOfScreen(canvas)) {
      deleteBomb(bomb);
    }

    if (player.checkCollision(bomb)) {
      lifes -= 1;
      deleteBomb(bomb);
    }
  });

  bananas.forEach(banana => {
    banana.move();
    if (banana.isOutOfScreen(canvas)) {
      deleteBanana(banana);
    }

    if (player.checkCollision(banana)) {
      score *= 2;
      deleteBanana(banana);
    }
  });

  player.draw();
  drops.forEach(obj => obj.draw());
  bananas.forEach(banana => banana.draw());
  bombs.forEach(bomb => bomb.draw());
  drawScore();
  drawLifes();
  animationInterval = window.requestAnimationFrame(animate);
}

function drawScore() {
  context.fillStyle = '#3200A6';
  context.fillText('Score: ' + score, canvas.width - 330, 40);
  context.fillStyle = '#FEFAFF';
  context.fillText('Score: ' + score, canvas.width - 333, 44);
}

function drawLifes() {
  context.fillStyle = 'yellow';
  context.fillText('Lifes: ' + lifes, 40, 40);
  context.fillStyle = '#FF0000';
  context.fillText('Lifes: ' + lifes, 42, 42);
}

function deleteFallingObject(object: FallingObject) {
  drops = drops.filter(o => o !== object);
}

function deleteBanana(object: FallingObject) {
  bananas = bananas.filter(o => o !== object);
}

function deleteBomb(object: FallingObject) {
  bombs = bombs.filter(o => o !== object);
}

function stopAnimation(interval: number): void {
  window.cancelAnimationFrame(interval);
}

function startGame() {
  animate(0);
}
