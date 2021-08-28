import FallingObject from './FallingObject';
import Player from './Player';
import RandomFruit from './RandomFruit';

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
let drops: FallingObject[] = [];

const player = new Player(context, 480, 660);

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
    drops.push(new RandomFruit(context));
  }

  player.updateState(deltatime);
  drops.forEach(obj => {
    obj.move();
    if (obj.isOutOfScreen(canvas)) {
      deleteFallingObject(obj);
    }

    if (player.checkCollision(obj)) {
      score += 110;
      deleteFallingObject(obj);
    }
  });

  player.draw();
  drops.forEach(obj => obj.draw());
  drawScore();
  animationInterval = window.requestAnimationFrame(animate);
}

function drawScore() {
  context.fillStyle = '#3200A6';
  context.fillText('Score: ' + score, canvas.width - 330, 40);
  context.fillStyle = '#FEFAFF';
  context.fillText('Score: ' + score, canvas.width - 333, 44);
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
