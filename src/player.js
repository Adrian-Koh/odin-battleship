import { Gameboard } from "./gameboard";

export class Player {
  constructor(isHuman = true) {
    this.isHuman = isHuman;
    this.gameboard = new Gameboard();
  }
}
