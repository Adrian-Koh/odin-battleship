import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

export class Player {
  constructor(isHuman = true) {
    this.isHuman = isHuman;
    this.gameboard = new Gameboard();
  }

  placeCarrier(coords, isHorizontal) {
    this.gameboard.addShip(coords, isHorizontal, new Ship(5));
  }

  placeBattleship(coords, isHorizontal) {
    this.gameboard.addShip(coords, isHorizontal, new Ship(4));
  }

  placeCruiser(coords, isHorizontal) {
    this.gameboard.addShip(coords, isHorizontal, new Ship(3));
  }

  placeSubmarine(coords, isHorizontal) {
    this.gameboard.addShip(coords, isHorizontal, new Ship(3));
  }

  placeDestroyer(coords, isHorizontal) {
    this.gameboard.addShip(coords, isHorizontal, new Ship(2));
  }
}
