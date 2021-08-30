import Game from './Game';

//display
const canvas: HTMLCanvasElement = document.querySelector('#canvas');

const game = new Game(canvas, window.innerWidth, window.innerHeight);
//game.start();

//controller
window.addEventListener('keydown', e => onKeyDown(e));
window.addEventListener('keyup', e => onKeyUp(e));

function onKeyUp(e: KeyboardEvent) {
  e.preventDefault();
  game.onKeyUpEvent(e);
}

function onKeyDown(e: KeyboardEvent) {
  e.preventDefault();
  game.onKeyDownEvent(e);
}
