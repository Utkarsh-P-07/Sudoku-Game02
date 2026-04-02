import { isValid, solve, countSolutions, copyBoard } from './solver';

/**
 * Generates a full valid Sudoku board by filling diagonal boxes and then solving.
 */
const generateFullBoard = () => {
  const board = Array(9).fill(null).map(() => Array(9).fill(0));
  
  // Fill diagonal 3x3 boxes (independent of each other)
  for (let i = 0; i < 9; i += 3) {
    fillBox(board, i, i);
  }
  
  // Solve the rest
  solve(board);
  return board;
};

// Fill a 3x3 box with random 1-9 nums
const fillBox = (board, rowStart, colStart) => {
  let num;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      do {
        num = Math.floor(Math.random() * 9) + 1;
      } while (!isSafeInBox(board, rowStart, colStart, num));
      board[rowStart + i][colStart + j] = num;
    }
  }
};

const isSafeInBox = (board, rowStart, colStart, num) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[rowStart + i][colStart + j] === num) return false;
    }
  }
  return true;
};

/**
 * Generate a puzzle for a specific difficulty
 * @param {string} difficulty - 'easy', 'medium', 'hard'
 * @returns {Object} { puzzle: Array, solution: Array }
 */
export const generatePuzzle = (difficulty = 'easy') => {
  const solution = generateFullBoard();
  const puzzle = copyBoard(solution);
  
  // Determine number of cells to remove
  let cellsToRemove;
  switch (difficulty) {
    case 'extreme': cellsToRemove = 62; break;
    case 'hard': cellsToRemove = 55; break;
    case 'medium': cellsToRemove = 45; break;
    case 'easy': cellsToRemove = 35; break;
    case 'beginner': default: cellsToRemove = 25; break;
  }
  
  let attempts = 5; // how many times we can fail to remove without unique solution before giving up 
                   // (keeps generation fast, though might fall slightly short of target removals)
  
  while (cellsToRemove > 0 && attempts > 0) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    
    while (puzzle[row][col] === 0) {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
    }
    
    const backup = puzzle[row][col];
    puzzle[row][col] = 0;
    
    const tempBoard = copyBoard(puzzle);
    
    if (countSolutions(tempBoard) !== 1) {
      // Putting the number back if it ruins uniqueness
      puzzle[row][col] = backup;
      attempts--;
    } else {
      cellsToRemove--;
    }
  }
  
  return { puzzle, solution };
};
