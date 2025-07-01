export function populateGrids() {
  const playerBoard = document.querySelector("#player-board");
  const computerBoard = document.querySelector("#computer-board");

  const square = document.createElement("div");
  square.className = "board-square";
  for (let i = 0; i < 100; i++) {
    playerBoard.appendChild(square.cloneNode(false));
    computerBoard.appendChild(square.cloneNode(false));
  }
}
