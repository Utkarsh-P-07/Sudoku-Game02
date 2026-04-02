import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { isRelatedCell } from '../utils/gameUtils';

const cn = (...args) => twMerge(clsx(...args));

export const Board = ({
  board,
  initialBoard,
  solution,
  selectedCell,
  setSelectedCell,
  pencilMarks
}) => {
  if (!board || board.length !== 9 || !board[0]) return null;
  if (!initialBoard || initialBoard.length !== 9 || !initialBoard[0]) return null;
  if (!solution || solution.length !== 9 || !solution[0]) return null;
  if (!pencilMarks || pencilMarks.length !== 9 || !pencilMarks[0]) return null;

  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto select-none rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-[#8fa5e3] dark:border-slate-800 shadow-xl overflow-hidden bg-white dark:bg-[#1a1f2e]">
      <div className="w-full h-full grid grid-cols-9 grid-rows-9">
        {board.map((rowArr, row) =>
          rowArr.map((cellValue, col) => {
            const isInitial = initialBoard[row][col] !== 0;
            const isSelected = selectedCell?.r === row && selectedCell?.c === col;
            const isRelated = selectedCell ? isRelatedCell(row, col, selectedCell.r, selectedCell.c) : false;

            // Highlight cells that have the exact same number as the currently selected cell
            let isSameNumber = false;
            if (selectedCell && cellValue !== 0) {
              const selectedValue = board[selectedCell.r][selectedCell.c];
              if (selectedValue === cellValue) isSameNumber = true;
            }

            const isWrong = cellValue !== 0 && !isInitial && cellValue !== solution[row][col];
            const hasPencilMarks = pencilMarks[row][col].length > 0 && cellValue === 0;

            // Explicit Border Calculation (Thick 3x3 borders vs Thin inner borders)
            const isRightBlockEdge = col === 2 || col === 5;
            const isBottomBlockEdge = row === 2 || row === 5;
            const isRightOuter = col === 8;
            const isBottomOuter = row === 8;

            const rightBorder = isRightOuter ? '' : 
              (isRightBlockEdge ? 'border-r-[2px] sm:border-r-[3px] border-r-[#8fa5e3] dark:border-r-slate-800' : 'border-r border-r-[#d1dcff] dark:border-r-slate-700/50');
              
            const bottomBorder = isBottomOuter ? '' : 
              (isBottomBlockEdge ? 'border-b-[2px] sm:border-b-[3px] border-b-[#8fa5e3] dark:border-b-slate-800' : 'border-b border-b-[#d1dcff] dark:border-b-slate-700/50');

            return (
              <div
                key={`${row}-${col}`}
                onClick={() => setSelectedCell({ r: row, c: col })}
                className={cn(
                  'sudoku-cell group transition-colors duration-100 flex items-center justify-center text-2xl sm:text-3xl',
                  rightBorder,
                  bottomBorder,
                  // State Styles
                  isSelected ? 'bg-[#dce4ff] dark:bg-blue-800/80 shadow-inner' : 
                  isRelated ? 'bg-[#f0f4ff] dark:bg-blue-900/30' : 
                  isSameNumber && !isWrong ? 'bg-[#e2e9fc] dark:bg-blue-700/60' : 'bg-transparent',
                  isWrong && 'bg-red-100 dark:bg-red-900/40 text-[#ff4b4b] dark:text-red-400',
                  // Text Styles
                  isInitial ? 'text-slate-800 dark:text-slate-200 font-medium' : 'text-[#4a72ff] dark:text-[#aabeff] font-normal'
                )}
              >
                {cellValue !== 0 ? (
                  <span className="cursor-default pointer-events-none mt-[2px]">{cellValue}</span>
                ) : hasPencilMarks ? (
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3 p-1 pointer-events-none opacity-60">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <div key={num} className="font-sans flex items-center justify-center text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 leading-none">
                        {pencilMarks[row][col].includes(num) ? num : ''}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
