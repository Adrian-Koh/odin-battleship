import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

export class Player {
  #isHuman;
  #movesMade = [];
  #gameboard;

  constructor(isHuman = true) {
    this.#isHuman = isHuman;
    this.#gameboard = new Gameboard();
    for (let i = 0; i < 10; i++) {
      this.#movesMade.push([]);
      for (let j = 0; j < 10; j++) {
        this.#movesMade[i].push(false);
      }
    }
  }

  #randomizePlacement() {
    if (this.#isHuman)
      throw new Error("cannot call randomizePlacement for human player.");

    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let isHorizontal = Math.random() > 0.5;
    return { coords: [row, col], isHorizontal };
  }

  placeComputerShips() {
    if (this.#isHuman)
      throw new Error("cannot call placeComputerShips for human player.");

    let obj;
    do {
      obj = this.#randomizePlacement();
    } while (!this.placeCarrier(obj.coords, obj.isHorizontal));

    do {
      obj = this.#randomizePlacement();
    } while (!this.placeBattleship(obj.coords, obj.isHorizontal));

    do {
      obj = this.#randomizePlacement();
    } while (!this.placeCruiser(obj.coords, obj.isHorizontal));

    do {
      obj = this.#randomizePlacement();
    } while (!this.placeSubmarine(obj.coords, obj.isHorizontal));

    do {
      obj = this.#randomizePlacement();
    } while (!this.placeDestroyer(obj.coords, obj.isHorizontal));
  }

  placeCarrier(coords, isHorizontal) {
    return this.#gameboard.addShip(coords, isHorizontal, new Ship(5));
  }

  placeBattleship(coords, isHorizontal) {
    return this.#gameboard.addShip(coords, isHorizontal, new Ship(4));
  }

  placeCruiser(coords, isHorizontal) {
    return this.#gameboard.addShip(coords, isHorizontal, new Ship(3));
  }

  placeSubmarine(coords, isHorizontal) {
    return this.#gameboard.addShip(coords, isHorizontal, new Ship(3));
  }

  placeDestroyer(coords, isHorizontal) {
    return this.#gameboard.addShip(coords, isHorizontal, new Ship(2));
  }

  computerMove() {
    if (this.#isHuman)
      throw new Error("cannot call computerMove for human player.");

    let obj;
    do {
      obj = this.#randomizePlacement();
    } while (this.isSquareChosen(obj.coords));
    this.chooseSquare(obj.coords);
    return obj.coords;
  }

  chooseSquare(coords) {
    if (this.isSquareChosen(coords))
      throw new Error("This square has already been chosen");

    this.#movesMade[coords[0]][coords[1]] = true;
  }

  isSquareChosen(coords) {
    return this.#movesMade[coords[0]][coords[1]];
  }

  receiveAttack(coords) {
    return this.#gameboard.receiveAttack(coords);
  }

  hasLost() {
    return this.#gameboard.isGameOver();
  }
}
