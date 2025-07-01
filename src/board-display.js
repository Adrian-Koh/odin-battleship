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
      attackSquare([row, col], computer, square);

      let computerMove = computer.computerMove();
      let playerSquare =
        document.querySelector("#player-board").children[
          computerMove[0] * 10 + computerMove[1]
        ];
      attackSquare(computerMove, player, playerSquare);

      if (computer.hasLost()) alert("You win!");
      if (player.hasLost()) alert("Computer wins!");
    });
  }
}

function attackSquare(coords, attackedPlayer, square) {
  if (attackedPlayer.receiveAttack(coords)) {
    square.innerText = "X";
    square.classList.add("ship-hit");
  } else {
    square.innerText = ".";
    square.classList.add("hit");
  }
}
