import FallingObject from './FallingObject';
import Player from './Player';

const canvas: HTMLCanvasElement = document.querySelector('#canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextDrop = 0;
const dropInterval = 1000;
let lastTime = 0;
let animationInterval: number;

const drops: FallingObject[] = [];

const player = new Player(context, 480, 660);

player.draw();

window.addEventListener('keydown', e => onKeyDown(e));

function onKeyDown(e: KeyboardEvent) {
  e.preventDefault();
  switch (e.key) {
    case 'a':
      player.moveLeft();
      break;
    case 'd':
      player.moveRight(canvas.width);
      break;
    case 'Enter':
      stopAnimation(animationInterval);
      break;
    case ' ':
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
    //console.log(drops);
  }

  player.draw();
  player.updateState(deltatime);
  animationInterval = window.requestAnimationFrame(animate);
}

function stopAnimation(interval: number): void {
  window.cancelAnimationFrame(interval);
}

function startGame() {
  animate(0);
}
