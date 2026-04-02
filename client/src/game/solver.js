/**
 * Sudoku Solver & Validation Module
 */

// Check if a number can be placed at a specific cell
export const isValid = (board, row, col, num) => {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num && i !== col) return false;
  }
  
  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num && i !== row) return false;
  }
  
  // Check 3x3 subgrid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num && 
         (startRow + i !== row || startCol + j !== col)) {
        return false;
      }
    }
  }
  
  return true;
};

// Find the first empty cell in the board
export const findEmpty = (board) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return [r, c];
    }
  }
  return null;
};

// Solve the board in-place (returns boolean)
export const solve = (board) => {
  const emptyPos = findEmpty(board);
  if (!emptyPos) return true; // Solved
  
  const [row, col] = emptyPos;
  
  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      
      if (solve(board)) return true;
      
      board[row][col] = 0; // Backtrack
    }
  }
  
  return false;
};

// Count number of unique solutions (used for puzzle generation)
// Returns 0, 1, or 2 (stops early if > 1 for performance)
export const countSolutions = (board) => {
  let count = 0;
  
  const solveAndCount = (b) => {
    if (count > 1) return;
    
    const emptyPos = findEmpty(b);
    if (!emptyPos) {
      count++;
      return;
    }
    
    const [row, col] = emptyPos;
    
    for (let num = 1; num <= 9; num++) {
      if (isValid(b, row, col, num)) {
        b[row][col] = num;
        solveAndCount(b);
        b[row][col] = 0; // Backtrack
      }
    }
  };
  
  solveAndCount(board);
  return count;
};

// Helper: Deep copy a 9x9 board
export const copyBoard = (board) => board.map(row => [...row]);
