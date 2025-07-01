import "./styles.css";
import { populateGrids, setupSquareListeners } from "./board-display";
import { Player } from "./player";

const player = new Player(true);
const computer = new Player(false);
player.placeCarrier([0, 0], true);
player.placeBattleship([8, 4], true);
player.placeCruiser([4, 3], false);
player.placeSubmarine([4, 8], false);
player.placeDestroyer([0, 9], false);

computer.placeComputerShips();
populateGrids();
setupSquareListeners(player, computer);
