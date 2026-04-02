// Board.jsx

export const Board = ({ board, initialBoard, pencilMarks, selectedCell, setSelectedCell, solution }) => {
  if (!board || board.length !== 9 || !board[0]) return null;
  if (!initialBoard || initialBoard.length !== 9 || !initialBoard[0]) return null;
  if (!pencilMarks || pencilMarks.length !== 9 || !pencilMarks[0]) return null;

  return (
    <div className="relative w-full max-w-[650px] aspect-square mx-auto select-none border-[3px] md:border-[4px] border-black bg-[#fdfdfd] shadow-sm">
      <div className="w-full h-full grid grid-cols-9 grid-rows-9">
        {board.map((rowArr, row) =>
          rowArr.map((cellValue, col) => {
            const isSelected = selectedCell?.r === row && selectedCell?.c === col;
            const isInitial = initialBoard[row][col] !== 0;
            const isWrong = cellValue !== 0 && solution && solution[row][col] !== cellValue;
            
            const isRelated = selectedCell && (
              selectedCell.r === row || 
              selectedCell.c === col || 
              (Math.floor(selectedCell.r / 3) === Math.floor(row / 3) && Math.floor(selectedCell.c / 3) === Math.floor(col / 3))
            ) && !isSelected;

            let isSameNumber = false;
            if (selectedCell && board[selectedCell.r][selectedCell.c] !== 0) {
              isSameNumber = board[selectedCell.r][selectedCell.c] === cellValue;
            }

            // Explicit Border Calculation (Thick 3x3 borders vs Thin inner borders)
            const isRightBlockEdge = col === 2 || col === 5;
            const isBottomBlockEdge = row === 2 || row === 5;
            const isRightOuter = col === 8;
            const isBottomOuter = row === 8;

            const rightBorder = isRightOuter ? '' :
              (isRightBlockEdge ? 'border-r-[3px] sm:border-r-[4px] border-r-black' : 'border-r border-r-slate-400');

            const bottomBorder = isBottomOuter ? '' :
              (isBottomBlockEdge ? 'border-b-[3px] sm:border-b-[4px] border-b-black' : 'border-b border-b-slate-400');

            return (
              <div
                key={`${row}-${col}`}
                onClick={() => setSelectedCell({ r: row, c: col })}
                className={[
                  'sudoku-cell group transition-colors duration-100 flex items-center justify-center text-3xl sm:text-4xl lg:text-[42px]',
                  rightBorder,
                  bottomBorder,
                  // State Styles
                  isSelected ? 'bg-slate-200' :
                    isRelated ? 'bg-slate-100/60' :
                      isSameNumber && !isWrong ? 'bg-slate-300/50' : 'bg-transparent',
                  isWrong ? 'bg-red-100 text-[#ff4b4b]' : '',
                  // Text Styles
                  isInitial ? 'text-black font-normal leading-none' : 'text-slate-700 font-medium leading-none'
                ].filter(Boolean).join(' ')}
                style={isInitial || !isWrong ? { fontFamily: "'Caveat Brush', cursive" } : {}}
              >
                {cellValue !== 0 ? (
                  cellValue
                ) : (
                  // Render Pencil Marks if cell is empty
                  pencilMarks[row][col] && pencilMarks[row][col].length > 0 && (
                    <div className="w-full h-full grid grid-cols-3 grid-rows-3 p-[2px]">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <div key={num} className="flex items-center justify-center">
                          {pencilMarks[row][col].includes(num) && (
                            <span className="text-[10px] sm:text-xs text-slate-500 font-bold leading-none">
                              {num}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
