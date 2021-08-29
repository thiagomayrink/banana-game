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

const dropInterval = 2000;

let timeToNextDrop = 0;
let lastTime = 0;
let animationInterval: number;
let score = 0;
let lifes = 3;
let gameOver = false;
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

  if (lifes < 1) gameOver = true;

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

  if (!gameOver) animationInterval = window.requestAnimationFrame(animate);
  else drawGameOve();
}

function drawGameOve() {
  context.textAlign = 'center';
  context.fillStyle = '#000000';
  context.fillText('GAME OVER, your score is: ' + score, canvas.width * 0.5, canvas.height * 0.5);
  context.fillStyle = '#FFFFFF';
  context.fillText(
    'GAME OVER, your score is: ' + score,
    canvas.width * 0.5 + 3,
    canvas.height * 0.5 + 3,
  );

  context.fillStyle = '#000000';
  context.fillText('Press SPACE to restart!', canvas.width * 0.5, canvas.height * 0.5 + 60);
  context.fillStyle = '#FFFFFF';
  context.fillText('Press SPACE to restart!', canvas.width * 0.5 + 3, canvas.height * 0.5 + 63);
}

function drawScore() {
  context.textAlign = 'right';
  context.fillStyle = '#3200A6';
  context.fillText('Score: ' + score, canvas.width - 330, 20);
  context.fillStyle = '#FEFAFF';
  context.fillText('Score: ' + score, canvas.width - 333, 24);
}

function drawLifes() {
  context.textAlign = 'left';
  context.fillStyle = 'yellow';
  context.fillText('Lifes: ' + lifes, 40, 20);
  context.fillStyle = '#FF0000';
  context.fillText('Lifes: ' + lifes, 42, 22);
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

function restartGame() {
  timeToNextDrop = 0;
  lastTime = 0;
  animationInterval = 0;
  score = 0;
  lifes = 3;
  gameOver = false;
  drops = [];
  bananas = [];
  bombs = [];
  const restart = new Promise(() => window.location.reload());
  restart.then(() => animate(0));
}
