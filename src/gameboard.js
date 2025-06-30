import { Ship } from "./ship";

export class Gameboard {
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
    // TODO: reset squares if error thrown
    if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9) {
      throw new Error("starting coordinate of ship passed in is invalid.");
    }

    if (
      (isHorizontal && coords[1] + ship.length > 9) ||
      (!isHorizontal && coords[0] + ship.length > 9)
    ) {
      throw new Error(
        "ship cannot fit in board with current starting position and length",
      );
    }

    if (isHorizontal) {
      for (let i = coords[1]; i < coords[1] + ship.length; i++) {
        if (this.board[coords[0]][i] !== ".")
          throw new Error(
            `The square at ${coords[0]},${i} is already occupied.`,
          );
        this.board[coords[0]][i] = "O";
      }
    } else {
      for (let i = coords[0]; i < coords[0] + ship.length; i++) {
        if (this.board[i][coords[1]] !== ".")
          throw new Error(
            `The square at ${i},${coords[1]} is already occupied.`,
          );
        this.board[i][coords[1]] = "O";
      }
    }
  }
  receiveAttack(coords) {
    // TODO: reset squares if error thrown
    if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9) {
      throw new Error("received coordinates are invalid.");
    }
    if (this.board[coords[0]][coords[1]] === "X") {
      throw new Error("this square has already been hit.");
    } else if (this.board[coords[0]][coords[1]] === "O") {
      this.board[coords[0]][coords[1]] = "X";
      return true;
    } else {
      this.board[coords[0]][coords[1]] = "X";
      return false;
    }
  }
}
