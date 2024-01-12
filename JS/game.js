class Game {
  constructor() {
    this.startButton = document.getElementById("game-intro");
    this.restartGame = document.getElementById("restart-game");
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.startButton.addEventListener("click", () => {
      const board = document.getElementById("board");
      board.style.display = "grid";

      const startScreen = document.getElementById("start-screen");
      startScreen.style.display = "none";
    });

    this.restartGame.addEventListener("click", () => {
      this.startNewGame();
    });
  }

  startNewGame() {
    const board = document.getElementById("board");
    board.style.display = "grid";

    const gameOverArea = document.getElementById("game-over-area");
    gameOverArea.style.display = "none";

    startNewGame();
    location.reload();
  }
}

const game = new Game();

const tiles = document.querySelectorAll(".tile");
const PlayerX = "X";
const PlayerO = "O";
let turn = PlayerX;

const boardState = Array(tiles.length);
boardState.fill(null);

const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText() {
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;
  tiles.forEach((tile) => {
    if (tile.innerText == "") {
      tile.classList.add(hoverClass);
    }
  });
}

setHoverText();

function tileClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.getAttribute("boardLine");

  if (tile.innerText != "") {
    return;
  }

  if (turn === PlayerX) {
    tile.innerText = PlayerX;
    boardState[tileNumber - 1] = PlayerX;
    turn = PlayerO;
  } else {
    tile.innerText = PlayerO;
    boardState[tileNumber - 1] = PlayerO;
    turn = PlayerX;
  }

  setHoverText();
  checkWinner();
}

function checkWinner() {
  for (const winningCombination of winningCombinations) {
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass);
      gameOver(tileValue1);
      return;
    }
  }
  const allTileFilledin = boardState.every((tile) => tile != null);
  if (allTileFilledin) {
    gameOver(null);
  }
}

function gameOver(winnerText) {
  let text = "Draw! TRY AGAIN";
  if (winnerText != null) {
    text = `Winner is ${winnerText}`;

    let winnerImage = document.createElement("img");
    winnerImage.src =
      "https://media1.tenor.com/m/oqZkMwaJR3EAAAAd/chicken-dance-lets-do-the-chicken-dance.gif";
    winnerImage.setAttribute("alt", "chicken img");
    gameOverArea.appendChild(winnerImage);
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
}

function startNewGame() {
  strike.className = "strike";
  gameOver.className = "hidden";
  boardState.fill(null);
  tiles.forEach((tile) => tile.innerText == "");
  turn = PlayerX;
  setHoverText();
}

const winningCombinations = [
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];
