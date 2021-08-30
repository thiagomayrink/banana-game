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

if (canvas.width < 450) context.font = '25px Ruslan Display';
else context.font = '50px Ruslan Display';

const dropInterval = 2000;

let timeToNextDrop = 0;
let lastTime = 0;
let animationInterval: number;
let score = 0;
let lives = 4;
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
      if (!isBomb) {
        lives--;
        updateLives();
      }
      deleteFallingObject(obj);
    }

    if (player.checkCollision(obj)) {
      const { points, isBanana, isBomb } = obj.info();
      if (isBomb) {
        gameOver = true;
        lives = 0;
        updateLives();
      }
      if (isBanana) score *= 2;
      if (points !== 0) score += points;
      deleteFallingObject(obj);
    }
  });

  if (lives < 1) gameOver = true;

  floor.draw();
  player.draw();
  drops.forEach(obj => obj.draw());
  drawScore();

  if (!gameOver) animationInterval = window.requestAnimationFrame(animate);
  else drawGameOve();
}

function drawGameOve() {
  context.textAlign = 'center';
  context.fillStyle = '#FEFAFF';
  context.fillText('GAME OVER', canvas.width * 0.5, canvas.height * 0.5);
  context.fillStyle = '#3200A6';
  context.fillText('your Score: ' + score.toString(), canvas.width * 0.5, canvas.height * 0.5 + 50);
  context.fillStyle = '#FEFAFF';
  context.fillText('Press SPACE!', canvas.width * 0.5, canvas.height * 0.5 + 100);
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

function updateLives() {
  const lifeBar = document.querySelector('.lifeBar') as HTMLElement;
  lifeBar.innerHTML = '';

  for (let i = 1; i <= 4; i++) {
    const life = new Image(45, 45);
    if (i > lives) life.src = './assets/sprites/heart-empty.png';
    else life.src = './assets/sprites/heart.png';
    lifeBar.appendChild(life);
  }
}

function deleteFallingObject(object: FallingObject) {
  drops = drops.filter(o => o !== object);
}

function stopAnimation(interval: number): void {
  window.cancelAnimationFrame(interval);
}

function startGame() {
  updateLives();
  animate(0);
}

function restartGame() {
  timeToNextDrop = 0;
  lastTime = 0;
  animationInterval = 0;
  score = 0;
  lives = 4;
  gameOver = false;
  drops = [];
  const restart = new Promise(() => window.location.reload());
  restart.then(() => animate(0));
}
