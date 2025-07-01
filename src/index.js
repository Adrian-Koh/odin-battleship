import "./styles.css";
import { populateGrids, setupSquareListeners } from "./board-display";
import { Player } from "./player";

const player = new Player(true);
const computer = new Player(false);
player.placeCarrier([0, 0], true);
populateGrids();
setupSquareListeners(player, computer);
