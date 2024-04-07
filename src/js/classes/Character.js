export default class Character {
  constructor() {
    this._position;
  }

  get position() {
    return this._position;
  }

  set position(newPosition) {
    this._position = newPosition;
  }

  createNewPosition(boardSize) {
    let newPosition = Number(Math.floor(Math.random()*(boardSize**2)));
    while (newPosition === this._position) {
      newPosition = Number(Math.floor(Math.random()*(boardSize**2)));
    }
    return newPosition;
  }
}