import "./styles.css";
import { populateGrids, setupSquareListeners } from "./board-display";
import { Player } from "./player";

let player;
let computer;

document.querySelector("#new-game").addEventListener("click", () => {
  document.querySelector("#new-game-form").style.display = "flex";
});

document
  .querySelector("#new-game-form")
  .addEventListener("submit", (event) => event.preventDefault());

document.querySelector("#start-game").addEventListener("click", () => {
  const carrierRow = parseInt(document.querySelector("#carrier-row").value);
  const carrierCol = parseInt(document.querySelector("#carrier-col").value);
  const carrierHor = document.querySelector("#carrier-horizontal").checked;

  const battleshipRow = parseInt(
    document.querySelector("#battleship-row").value,
  );
  const battleshipCol = parseInt(
    document.querySelector("#battleship-col").value,
  );
  const battleshipHor = document.querySelector(
    "#battleship-horizontal",
  ).checked;

  const cruiserRow = parseInt(document.querySelector("#cruiser-row").value);
  const cruiserCol = parseInt(document.querySelector("#cruiser-col").value);
  const cruiserHor = document.querySelector("#cruiser-horizontal").checked;

  const submarineRow = parseInt(document.querySelector("#submarine-row").value);
  const submarineCol = parseInt(document.querySelector("#submarine-col").value);
  const submarineHor = document.querySelector("#submarine-horizontal").checked;

  const destroyerRow = parseInt(document.querySelector("#destroyer-row").value);
  const destroyerCol = parseInt(document.querySelector("#destroyer-col").value);
  const destroyerHor = document.querySelector("#destroyer-horizontal").checked;

  player = new Player(true);

  if (!player.placeCarrier([carrierRow, carrierCol], carrierHor)) {
    alert(
      "Failed to place carrier (due to exceeding board or overlap), please enter new coordinates.",
    );
    return;
  }
  if (!player.placeBattleship([battleshipRow, battleshipCol], battleshipHor)) {
    alert(
      "Failed to place battleship (due to exceeding board or overlap), please enter new coordinates.",
    );
    return;
  }
  if (!player.placeCruiser([cruiserRow, cruiserCol], cruiserHor)) {
    alert(
      "Failed to place cruiser (due to exceeding board or overlap), please enter new coordinates.",
    );
    return;
  }
  if (!player.placeSubmarine([submarineRow, submarineCol], submarineHor)) {
    alert(
      "Failed to place submarine (due to exceeding board or overlap), please enter new coordinates.",
    );
    return;
  }
  if (!player.placeDestroyer([destroyerRow, destroyerCol], destroyerHor)) {
    alert(
      "Failed to place destroyer (due to exceeding board or overlap), please enter new coordinates.",
    );
    return;
  }

  computer = new Player(false);
  computer.placeComputerShips();

  document.querySelector("#new-game-form").style.display = "none";
  populateGrids();
  setupSquareListeners(player, computer);
});
