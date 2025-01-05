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
    clearPredictedMoves();
    initialBoard[row][col] = selectedPiece;
    initialBoard[selectedPosition.row][selectedPosition.col] = "";
    selectedPiece = null;
    selectedPosition = null;
    renderBoard(initialBoard);
  } else {
    if (initialBoard[row][col] !== "") {
      selectedPiece = initialBoard[row][col];
      selectedPosition = { row, col };
      const validMoves = predictMoves(selectedPiece, row, col);
      highlightPredictedMoves(validMoves);
    }
  }
}

function predictMoves(piece, row, col) {
  const moves = [];
  const pieceLower = piece.toLowerCase();

  if (pieceLower === "♟" || pieceLower === "♙") {
    const direction = piece === "♟" ? 1 : -1;
    if (initialBoard[row + direction] && initialBoard[row + direction][col] === "") {
      moves.push({ row: row + direction, col });
    }
    if (initialBoard[row + direction] && initialBoard[row + direction][col - 1] && isEnemy(piece, initialBoard[row + direction][col - 1])) {
      moves.push({ row: row + direction, col: col - 1 });
    }
    if (initialBoard[row + direction] && initialBoard[row + direction][col + 1] && isEnemy(piece, initialBoard[row + direction][col + 1])) {
      moves.push({ row: row + direction, col: col + 1 });
    }
  } else if (pieceLower === "♜" || pieceLower === "♖") {
    // Rook moves
    moves.push(...getLinearMoves(row, col, 1, 0)); // Up
    moves.push(...getLinearMoves(row, col, -1, 0)); // Down
    moves.push(...getLinearMoves(row, col, 0, 1)); // Right
    moves.push(...getLinearMoves(row, col, 0, -1)); // Left
  } else if (pieceLower === "♞" || pieceLower === "♘") {
    // Knight moves
    const knightMoves = [
      { dr: -2, dc: -1 }, { dr: -2, dc: 1 }, { dr: -1, dc: -2 }, { dr: -1, dc: 2 },
      { dr: 1, dc: -2 }, { dr: 1, dc: 2 }, { dr: 2, dc: -1 }, { dr: 2, dc: 1 }
    ];
    knightMoves.forEach(({ dr, dc }) => {
      const newRow = row + dr;
      const newCol = col + dc;
      if (isValidPosition(newRow, newCol) && !isFriendly(piece, initialBoard[newRow][newCol])) {
        moves.push({ row: newRow, col: newCol });
      }
    });
  }
  // Add similar logic for other pieces (bishop, queen, king)

  return moves;
}

function getLinearMoves(row, col, dr, dc) {
  const moves = [];
  let r = row + dr, c = col + dc;
  while (isValidPosition(r, c)) {
    if (initialBoard[r][c] === "") {
      moves.push({ row: r, col: c });
    } else {
      if (isEnemy(initialBoard[row][col], initialBoard[r][c])) {
        moves.push({ row: r, col: c });
      }
      break;
    }
    r += dr;
    c += dc;
  }
  return moves;
}

function isEnemy(piece, target) {
  if (target === "") return false;
  return (piece === piece.toUpperCase()) !== (target === target.toUpperCase());
}

function isFriendly(piece, target) {
  if (target === "") return false;
  return (piece === piece.toUpperCase()) === (target === target.toUpperCase());
}

function isValidPosition(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function highlightPredictedMoves(moves) {
  moves.forEach(({ row, col }) => {
    const square = document.querySelector(`.square[data-row='${row}'][data-col='${col}']`);
    if (square) {
      square.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
    }
  });
}

function clearPredictedMoves() {
  const squares = document.querySelectorAll(".square");
  squares.forEach(square => {
    square.style.backgroundColor = "";
  });
}

renderBoard(initialBoard);
