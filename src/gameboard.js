export class Gameboard {
  #ships = [];
  #sunkShipCount = 0;
  #gameOver = false;

  constructor() {
    this.board = [];
    for (let i = 0; i < 10; i++) {
      this.board.push([]);
      for (let j = 0; j < 10; j++) {
        this.board[i].push(".");
      }
    }
  }
  addShip(coords, isHorizontal, ship) {
    // return true if successfully added ship, false otherwise
    let reset = this.#saveBoard();
    if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9) {
      throw new Error("starting coordinate of ship passed in is invalid.");
    }

    if (
      (isHorizontal && coords[1] + ship.length - 1 > 9) ||
      (!isHorizontal && coords[0] + ship.length - 1 > 9)
    ) {
      return false;
    }

    if (isHorizontal) {
      for (let i = coords[1]; i < coords[1] + ship.length; i++) {
        if (this.board[coords[0]][i] !== ".") {
          this.board = reset;
          return false;
        }

        this.board[coords[0]][i] = this.#ships.length.toString();
      }
    } else {
      for (let i = coords[0]; i < coords[0] + ship.length; i++) {
        if (this.board[i][coords[1]] !== ".") {
          this.board = reset;
          return false;
        }

        this.board[i][coords[1]] = this.#ships.length.toString();
      }
    }
    this.#ships.push(ship);
    return true;
  }
  receiveAttack(coords) {
    if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9) {
      throw new Error("received coordinates are invalid.");
    }
    if (this.board[coords[0]][coords[1]] === "X") {
      throw new Error("this square has already been hit.");
    } else if (this.board[coords[0]][coords[1]] === ".") {
      this.board[coords[0]][coords[1]] = "X";
      return false;
    } else {
      this.#hitShip(coords);
      return true;
    }
  }
  #hitShip(coords) {
    let shipIndex = parseInt(this.board[coords[0]][coords[1]]);
    this.#ships[shipIndex].hit();
    this.board[coords[0]][coords[1]] = "X";
    if (this.#ships[shipIndex].isSunk()) {
      this.#sunkShipCount++;
    }
    if (this.#sunkShipCount === this.#ships.length) {
      this.#gameOver = true;
    }
  }
  #saveBoard() {
    let board = [];
    for (const row of this.board) {
      board.push(row.slice());
    }
    return board;
  }
  isGameOver() {
    return this.#gameOver;
  }
}
