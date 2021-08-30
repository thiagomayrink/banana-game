import Bomb from './Bomb';
import FallingObject from './FallingObject';
import Floor from './Floor';
import Player from './Player';
import RandomFruit from './RandomFruit';
import { randomBoolean } from './tools/helpers';

const canvas: HTMLCanvasElement = document.querySelector('#canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.font = '50px Ruslan Display';

const dropInterval = 2000;

let timeToNextDrop = 0;
let lastTime = 0;
let animationInterval: number;
let score = 0;
let lifes = 4;
let gameOver = false;
let drops: FallingObject[] = [];

const player = new Player(context, canvas.width * 0.5, canvas.height - 120);
const floor = new Floor(canvas, context);

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
    case ' ':
      restartGame();
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
    if (randomBoolean(0.8)) drops.push(new Bomb(canvas, context));
  }

  player.updateState(deltatime);
  drops.forEach(obj => {
    obj.move();
    if (obj.isOutOfScreen(canvas)) {
      const { isBomb } = obj.info();
      if (!isBomb) lifes -= 1;
      deleteFallingObject(obj);
    }

    if (player.checkCollision(obj)) {
      const { points, isBanana, isBomb } = obj.info();
      if (isBomb) gameOver = true;
      if (isBanana) score *= 2;
      if (points !== 0) score += points;
      deleteFallingObject(obj);
    }
  });

  if (lifes < 1) gameOver = true;

  floor.draw();
  player.draw();
  drops.forEach(obj => obj.draw());
  drawScore();
  drawLifes();

  if (!gameOver) animationInterval = window.requestAnimationFrame(animate);
  else drawGameOve();
}

function drawGameOve() {
  context.textAlign = 'center';
  context.fillStyle = '#FF0000';
  context.fillText(
    'GAME OVER, your score is: ' + score,
    canvas.width * 0.5,
    canvas.height * 0.5,
    canvas.width,
  );
  context.fillStyle = '#FFFFFF';
  context.fillText(
    'GAME OVER, your score is: ' + score,
    canvas.width * 0.5 + 3,
    canvas.height * 0.5 + 3,
  );

  context.fillStyle = '#FF0000';
  context.fillText('Press SPACE to restart!', canvas.width * 0.5, canvas.height * 0.5 + 60);
  context.fillStyle = '#FFFFFF';
  context.fillText('Press SPACE to restart!', canvas.width * 0.5 + 3, canvas.height * 0.5 + 63);
}

function drawScore() {
  const initialX = canvas.width * 0.95;
  const initialY = canvas.height - canvas.height * 0.95;
  context.textAlign = 'right';
  context.fillStyle = '#3200A6';
  context.fillText('Score: ' + score, initialX, initialY, canvas.width * 0.5);
  context.fillStyle = '#FEFAFF';
  context.fillText('Score: ' + score, initialX + 3, initialY + 4, canvas.width * 0.5);
}

function drawLifes() {
  const initialX = canvas.width - canvas.width * 0.95;
  const initialY = canvas.height - canvas.height * 0.95;
  context.textAlign = 'left';
  context.fillStyle = 'yellow';
  context.fillText('Lifes: ' + lifes, initialX, initialY, canvas.width * 0.5);
  context.fillStyle = '#FF0000';
  context.fillText('Lifes: ' + lifes, initialX + 3, initialY + 4, canvas.width * 0.5);
}

function deleteFallingObject(object: FallingObject) {
  drops = drops.filter(o => o !== object);
}

function stopAnimation(interval: number): void {
  window.cancelAnimationFrame(interval);
}

function startGame() {
  animate(0);
}

function restartGame() {
  timeToNextDrop = 0;
  lastTime = 0;
  animationInterval = 0;
  score = 0;
  lifes = 3;
  gameOver = false;
  drops = [];
  const restart = new Promise(() => window.location.reload());
  restart.then(() => animate(0));
}
