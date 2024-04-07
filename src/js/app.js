import GamePlay from './classes/GamePlay';
import GameController from './classes/GameController';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));

const gameCtrl = new GameController(gamePlay);
gameCtrl.init();
