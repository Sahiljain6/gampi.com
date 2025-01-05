const chessboard = document.getElementById("chessboard");

const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

let selectedPiece = null;
let selectedPosition = null;

function renderBoard(board) {
  chessboard.innerHTML = "";
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const square = document.createElement("div");
      square.className = "square " + ((rowIndex + colIndex) % 2 === 0 ? "white" : "black");
      square.dataset.row = rowIndex;
      square.dataset.col = colIndex;
      square.textContent = cell;

      square.addEventListener("click", () => handleSquareClick(rowIndex, colIndex));
      chessboard.appendChild(square);
    });
  });
}

function handleSquareClick(row, col) {
  if (selectedPiece) {
    initialBoard[row][col] = selectedPiece;
    initialBoard[selectedPosition.row][selectedPosition.col] = "";
    selectedPiece = null;
    selectedPosition = null;
    renderBoard(initialBoard);
  } else {
    if (initialBoard[row][col] !== "") {
      selectedPiece = initialBoard[row][col];
      selectedPosition = { row, col };
    }
  }
}

renderBoard(initialBoard);
