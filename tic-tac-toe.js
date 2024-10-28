document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll("#board div");
    const statusDiv = document.getElementById("status");
    const newGameButton = document.querySelector(".btn"); // Select button by class
    let currentPlayer = "X";
    let gameActive = true;
  
    // Initialize the board by adding the "square" class to each div
    squares.forEach(square => {
      square.classList.add("square");
  
      // Event listeners for clicks and hover effects
      square.addEventListener("click", () => handleSquareClick(square));
      square.addEventListener("mouseover", () => square.classList.add("hover"));
      square.addEventListener("mouseout", () => square.classList.remove("hover"));
    });
  
    // Handle square clicks
    function handleSquareClick(square) {
      if (square.textContent === "" && gameActive) {
        square.textContent = currentPlayer;
        square.classList.add(currentPlayer);
        if (checkWinner()) {
          statusDiv.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
          statusDiv.classList.add("you-won");
          gameActive = false;
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    }
  
    // Check for a winning combination
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
      return winningCombinations.some(combo => {
        const [a, b, c] = combo;
        if (
          squares[a].textContent !== "" &&
          squares[a].textContent === squares[b].textContent &&
          squares[a].textContent === squares[c].textContent
        ) {
          return true;
        }
        return false;
      });
    }
  
    // Restart the game
    newGameButton.addEventListener("click", () => {
      squares.forEach(square => {
        square.textContent = "";
        square.classList.remove("X", "O");
      });
      currentPlayer = "X";
      gameActive = true;
      statusDiv.textContent = "Move your mouse over a square and click to play an X or an O.";
      statusDiv.classList.remove("you-won");
    });
  });
  