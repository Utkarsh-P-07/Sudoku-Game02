import { useState, useEffect, useCallback } from 'react';
import { generatePuzzle } from '../game/generator';

// Deep copy helper for board
const copyBoard = (board) => board.map(row => [...row]);

export const useSudoku = (difficulty = 'easy', onWin = null) => {
  const [initialBoard, setInitialBoard] = useState([]);
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  
  const [selectedCell, setSelectedCell] = useState(null); // { r, c }
  const [pencilMarks, setPencilMarks] = useState(Array(9).fill(null).map(() => Array(9).fill([])));
  const [isPencilMode, setIsPencilMode] = useState(false);
  
  const [history, setHistory] = useState([]); // Array of previous states
  
  const [mistakes, setMistakes] = useState(0);
  const [maxMistakes] = useState(3);
  
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStatus, setGameStatus] = useState('loading'); // loading, playing, won, lost

  const startGame = useCallback((diff = difficulty) => {
    setGameStatus('loading');
    // Generating puzzle can take a tiny amount of time, setTimeout allows UI to show loading state
    setTimeout(() => {
      const { puzzle, solution: sol } = generatePuzzle(diff);
      setInitialBoard(copyBoard(puzzle));
      setBoard(copyBoard(puzzle));
      setSolution(copyBoard(sol));
      setHistory([]);
      setPencilMarks(Array(9).fill(null).map(() => Array(9).fill([])));
      setMistakes(0);
      setTimer(0);
      setPoints(0);
      setSelectedCell(null);
      setIsPlaying(true);
      setGameStatus('playing');
    }, 50);
  }, [difficulty]);

  // Initial load
  useEffect(() => {
    startGame(difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  // Timer loop
  useEffect(() => {
    let interval = null;
    if (isPlaying && gameStatus === 'playing') {
      interval = setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, gameStatus]);

  // Validate win condition
  const checkWinCondition = useCallback((currentBoard) => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (currentBoard[r][c] !== solution[r][c]) {
          return false;
        }
      }
    }
    return true;
  }, [solution]);

  const saveHistory = () => {
    setHistory(prev => [...prev, {
      board: copyBoard(board),
      pencilMarks: pencilMarks.map(row => row.map(col => [...col])),
      points
    }]);
  };

  const handleInput = useCallback((num) => {
    if (gameStatus !== 'playing' || !selectedCell) return;
    
    const { r, c } = selectedCell;
    
    // Cannot modify initial cells
    if (initialBoard[r][c] !== 0) return;
    
    // Current value already the same
    if (board[r][c] === num) return;

    saveHistory();

    if (isPencilMode) {
      // Toggle pencil mode mark
      setPencilMarks(prev => {
        const newMarks = prev.map(row => row.map(col => [...col]));
        const marks = newMarks[r][c];
        if (marks.includes(num)) {
          newMarks[r][c] = marks.filter(m => m !== num);
        } else {
          newMarks[r][c] = [...marks, num].sort();
        }
        return newMarks;
      });
      return;
    }

    // Normal input
    const newBoard = copyBoard(board);
    newBoard[r][c] = num;
    setBoard(newBoard);
    
    // Clear pencil marks on this cell
    setPencilMarks(prev => {
      const newMarks = prev.map(row => row.map(col => [...col]));
      newMarks[r][c] = [];
      return newMarks;
    });

    // Check mistake
    if (num !== solution[r][c]) {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      
      // Points penalty
      setPoints(p => Math.max(0, p - 5));

      if (newMistakes >= maxMistakes) {
        setGameStatus('lost');
        setIsPlaying(false);
      }
    } else {
      // Points reward for correct entry
      let pts = difficulty === 'extreme' ? 60 : difficulty === 'hard' ? 40 : difficulty === 'medium' ? 20 : difficulty === 'easy' ? 10 : 5;
      setPoints(p => p + pts);
      
      // Auto-clear conflicting pencil marks from same row, col, box
      setPencilMarks(prev => {
        const newMarks = prev.map(row => row.map(col => [...col]));
        // clear row/col
        for(let i=0; i<9; i++) {
          newMarks[r][i] = newMarks[r][i].filter(m => m !== num);
          newMarks[i][c] = newMarks[i][c].filter(m => m !== num);
        }
        // clear box
        const startR = Math.floor(r/3)*3;
        const startC = Math.floor(c/3)*3;
        for(let i=0;i<3;i++) {
          for(let j=0;j<3;j++) {
            newMarks[startR+i][startC+j] = newMarks[startR+i][startC+j].filter(m => m !== num);
          }
        }
        return newMarks;
      });

      if (checkWinCondition(newBoard)) {
        setGameStatus('won');
        setIsPlaying(false);
        if (onWin) onWin({ points: points + pts, time: timer, mistakes });
      }
    }
  }, [board, initialBoard, solution, selectedCell, isPencilMode, gameStatus, mistakes, points, difficulty, timer, onWin, checkWinCondition, maxMistakes]);

  const eraseCell = useCallback(() => {
    if (gameStatus !== 'playing' || !selectedCell) return;
    const { r, c } = selectedCell;
    if (initialBoard[r][c] !== 0) return; // Can't erase original puzzle

    if (board[r][c] !== 0 || pencilMarks[r][c].length > 0) {
      saveHistory();
      const newBoard = copyBoard(board);
      newBoard[r][c] = 0;
      setBoard(newBoard);
      
      setPencilMarks(prev => {
        const newMarks = prev.map(row => row.map(col => [...col]));
        newMarks[r][c] = [];
        return newMarks;
      });
    }
  }, [board, selectedCell, gameStatus, initialBoard, pencilMarks]);

  const undo = useCallback(() => {
    if (gameStatus !== 'playing' || history.length === 0) return;
    
    const lastState = history[history.length - 1];
    setBoard(lastState.board);
    setPencilMarks(lastState.pencilMarks);
    setPoints(lastState.points);
    
    setHistory(prev => prev.slice(0, -1));
  }, [history, gameStatus]);

  const useHint = useCallback(() => {
    if (gameStatus !== 'playing' || !selectedCell) return;
    const { r, c } = selectedCell;
    
    // Only hint empty cells or wrong cells
    if (board[r][c] !== solution[r][c] && initialBoard[r][c] === 0) {
      // Significant point penalty
      setPoints(p => Math.max(0, p - 15));
      
      // We don't save history for hints so it can't be undone easily
      const newBoard = copyBoard(board);
      newBoard[r][c] = solution[r][c];
      setBoard(newBoard);
      
      if (checkWinCondition(newBoard)) {
        setGameStatus('won');
        setIsPlaying(false);
        if (onWin) onWin({ points: Math.max(0, points - 15), time: timer, mistakes, usedHint: true });
      }
    }
  }, [selectedCell, gameStatus, board, solution, initialBoard, points, checkWinCondition, onWin, timer, mistakes]);

  // Restart identical board
  const restart = () => {
    setBoard(copyBoard(initialBoard));
    setPencilMarks(Array(9).fill(null).map(() => Array(9).fill([])));
    setHistory([]);
    setMistakes(0);
    setTimer(0);
    setPoints(0);
    setSelectedCell(null);
    setGameStatus('playing');
    setIsPlaying(true);
  };

  return {
    board,
    initialBoard,
    solution,
    selectedCell,
    setSelectedCell,
    pencilMarks,
    handleInput,
    eraseCell,
    undo,
    useHint,
    restart,
    newGame: () => startGame(difficulty),
    isPencilMode,
    setIsPencilMode,
    mistakes,
    maxMistakes,
    points,
    timer,
    gameStatus,
    historyLength: history.length
  };
};
