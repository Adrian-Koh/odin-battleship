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

export function setupSquareListeners(player, computer) {
  const computerBoard = document.querySelector("#computer-board");
  const computerSquares = computerBoard.children;

  for (let i = 0; i < computerSquares.length; i++) {
    let row = Math.floor(i / 10);
    let col = i % 10;
    const square = computerSquares[i];
    square.addEventListener("click", () => {
      if (computer.receiveAttack([row, col])) square.innerText = "X";
      else square.innerText = ".";
      square.classList.add("hit");
      let computerMove = computer.computerMove();
      let playerSquare =
        document.querySelector("#player-board").children[
          computerMove[0] * 10 + computerMove[1]
        ];
      if (player.receiveAttack(computerMove)) playerSquare.innerText = "X";
      else playerSquare.innerText = ".";
      playerSquare.classList.add("hit");

      if (computer.hasLost()) alert("You win!");
      if (player.hasLost()) alert("Computer wins!");
    });
  }
}
