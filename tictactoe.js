const board = document.getElementById("tictactoe-board");
const statusDiv = document.getElementById("status");

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Render the board
function renderBoard() {
  board.innerHTML = "";
  gameBoard.forEach((cell, index) => {
    const square = document.createElement("div");
    square.className = "tic-square";
    square.dataset.index = index;
    square.textContent = cell;
    square.addEventListener("click", () => handleMove(index));
    board.appendChild(square);
  });
}

// Handle player moves
function handleMove(index) {
  if (!gameActive || gameBoard[index] !== "") return;

  gameBoard[index] = currentPlayer;
  if (checkWinner()) {
    statusDiv.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameBoard.every(cell => cell !== "")) {
    statusDiv.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  }
  renderBoard();
}

// Check for a winner
function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    );
  });
}

// Initialize the game
renderBoard();
