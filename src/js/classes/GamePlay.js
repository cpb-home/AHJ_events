export default class GamePlay {
  constructor() {
    this.boardSize = 4;
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.cellClickListeners = [];
    this.timoutId;
  }


  drawUi() {
    this.checkBinding();

    this.container.innerHTML = `
      <div class="score">Счёт игры: <span>0</span></div>
      <div class="board-container">
        <div data-id="board" class="board"></div>
      </div>
    `;

    this.boardEl = this.container.querySelector('[data-id=board]');

    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      cellEl.dataset.number = (i);
      cellEl.addEventListener('click', event => this.onCellClick(event));
      this.boardEl.appendChild(cellEl);
    }

    this.cells = Array.from(this.boardEl.children);
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('GamePlay not bind to DOM');
    }
  }

  redrawPosition(char, boardSize) {
    const newPosition = char.createNewPosition(boardSize);
    char.position = newPosition;

    for (const cell of this.cells) {
      if (Number(cell.dataset.number) === newPosition) {
        cell.innerHTML = '<img class="charImg" src="./img/goblin.png" alt="">';
      } else {
        cell.innerHTML = '';
      }
    }

    this.timoutId = setTimeout(() => {
      clearTimeout(this.timoutId);
      this.redrawPosition(char, boardSize);
    }, 3000);
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  onCellClick(event) {
    clearTimeout(this.timoutId);
    const index = event.currentTarget.dataset.number;
    this.cellClickListeners.forEach(o => o.call(null, index));
  }

  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

}