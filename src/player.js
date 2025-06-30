import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

export class Player {
  constructor(isHuman = true) {
    this.isHuman = isHuman;
    this.gameboard = new Gameboard();
  }

  #randomizePlacement() {
    let row = parseInt(Math.random() * 10) - 1;
    let col = parseInt(Math.random() * 10) - 1;
    let isHorizontal = Math.random() > 0.5;
    return { coords: [row, col], isHorizontal };
  }

  placeComputerShips() {
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
    return this.gameboard.addShip(coords, isHorizontal, new Ship(5));
  }

  placeBattleship(coords, isHorizontal) {
    return this.gameboard.addShip(coords, isHorizontal, new Ship(4));
  }

  placeCruiser(coords, isHorizontal) {
    return this.gameboard.addShip(coords, isHorizontal, new Ship(3));
  }

  placeSubmarine(coords, isHorizontal) {
    return this.gameboard.addShip(coords, isHorizontal, new Ship(3));
  }

  placeDestroyer(coords, isHorizontal) {
    return this.gameboard.addShip(coords, isHorizontal, new Ship(2));
  }
}
