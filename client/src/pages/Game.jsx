import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSudoku } from '../hooks/useSudoku';
import { useAuth } from '../contexts/AuthContext';
import { submitGameResult } from '../services/userService';
import { formatTime } from '../utils/gameUtils';

import { Board } from '../components/Board';
import { Controls } from '../components/Controls';
import { NumberPad } from '../components/NumberPad';
import { BadgePopup } from '../components/BadgePopup';
import { ChevronLeft } from 'lucide-react';

export const Game = () => {
  const { difficulty } = useParams();
  const navigate = useNavigate();
  const { user, profile, setProfile } = useAuth();

  const [earnedBadges, setEarnedBadges] = useState([]);
  const [showBadges, setShowBadges] = useState(false);

  const handleWin = async (result) => {
    if (user && profile) {
      // Avoid guests writing massive data if specified, but since guest mode creates a temp profile we can write.
      const saveRes = await submitGameResult(
        user.uid,
        difficulty,
        result.time,
        result.points,
        result.mistakes,
        result.usedHint || false
      );

      if (saveRes) {
        if (saveRes.newBadgesEarned.length > 0) {
          setEarnedBadges(saveRes.newBadgesEarned);
          setShowBadges(true);
        }

        // Optimistic UI Update
        setProfile((prev) => ({
          ...prev,
          points: prev.points + result.points,
          gamesPlayed: prev.gamesPlayed + 1,
          badges: [...prev.badges, ...saveRes.newBadgesEarned],
          bestTimes: {
            ...prev.bestTimes,
            [difficulty]: saveRes.newBestTime
          }
        }));
      }
    }
  };

  const game = useSudoku(difficulty, handleWin);

  // Key press support for desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (game.gameStatus !== 'playing') return;
      if (e.key >= '1' && e.key <= '9') {
        game.handleInput(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        game.eraseCell();
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        game.undo();
      } else if (e.key === 'p') {
        game.setIsPencilMode(!game.isPencilMode);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [game]);

  const customBackAction = () => {
    if (game.gameStatus === 'playing') {
      if (window.confirm("Are you sure you want to quit? Your progress will be lost.")) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7ff] dark:bg-[#0f1117] text-slate-900 pb-10">
      {/* Mobile-Native Blue Header Area */}
      <div className="w-full bg-[#4a72ff] dark:bg-[#1a233a] rounded-b-xl flex flex-col px-4 pt-4 pb-6 sm:px-6 mb-6">
        {/* Top title bar */}
        <div className="flex items-center justify-between mb-4 mt-2">
          <button onClick={customBackAction} className="text-white p-1">
            <ChevronLeft size={28} />
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-white tracking-wide">Sudoku</h1>
            <span className="text-[10px] text-white/70 font-semibold tracking-widest uppercase">Classic</span>
          </div>
          <div className="w-7"></div> {/* spacer for centering */}
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between px-2 sm:px-8 mt-2">
          <div className="flex flex-col items-center">
            <span className="text-white font-semibold text-lg">{game.mistakes} / {game.maxMistakes}</span>
            <span className="text-[9px] text-white/70 font-bold uppercase tracking-wider">Mistakes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-semibold text-lg">{game.points}</span>
            <span className="text-[9px] text-white/70 font-bold uppercase tracking-wider">Score</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white font-semibold text-lg">{formatTime(game.timer)}</span>
            <span className="text-[9px] text-white/70 font-bold uppercase tracking-wider">Time</span>
          </div>
        </div>
      </div>

      {/* Main Responsive Game Area */}
      <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start lg:justify-center w-full max-w-6xl mx-auto gap-4 lg:gap-8 p-2 sm:p-4 mb-8">

        {/* 1. CONTROLS (Top on Mobile, Left on Desktop) */}
        <div className="order-1 lg:order-1 w-full lg:w-auto flex justify-center mt-2 lg:mt-[72px]">
          <Controls
            onUndo={game.undo}
            onErase={game.eraseCell}
            useHint={game.useHint}
            isPencilMode={game.isPencilMode}
            setIsPencilMode={game.setIsPencilMode}
            disabled={game.gameStatus !== 'playing'}
          />
        </div>

        {/* 2. BOARD (Center on both) */}
        <div className="order-2 lg:order-2 w-full flex-1 max-w-[500px] flex flex-col items-center">
          <div className="w-full relative">
            <Board
              board={game.board}
              initialBoard={game.initialBoard}
              solution={game.solution}
              selectedCell={game.selectedCell}
              setSelectedCell={game.setSelectedCell}
              pencilMarks={game.pencilMarks}
            />

            {game.gameStatus === 'loading' && (
              <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-center rounded">
                <span className="font-semibold animate-pulse">Generating puzzle...</span>
              </div>
            )}

            {game.gameStatus === 'lost' && (
              <div className="absolute inset-0 bg-red-900/10 backdrop-blur-md flex flex-col items-center justify-center rounded gap-4">
                <h2 className="text-3xl font-bold border-red-500 text-red-600 dark:text-red-400">Game Over</h2>
                <p className="text-slate-700 dark:text-slate-200">Too many mistakes.</p>
                <button
                  onClick={() => game.newGame()}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg"
                >
                  Try Again
                </button>
              </div>
            )}

            {game.gameStatus === 'won' && !showBadges && (
              <div className="absolute inset-0 bg-emerald-900/20 backdrop-blur-md flex flex-col items-center justify-center rounded gap-4">
                <h2 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">You Won!</h2>
                <p className="text-slate-800 dark:text-slate-100 font-medium text-lg">Score: {game.points}</p>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg mt-2"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. NUMBER PAD (Bottom on Mobile, Right on Desktop) */}
        <div className="order-3 lg:order-3 w-full lg:w-80 flex flex-col items-center mt-2 lg:mt-[72px]">
          <NumberPad
            onNumberClick={game.handleInput}
            disabled={game.gameStatus !== 'playing'}
          />
        </div>

      </div>

      {/* Game Rules Section (Always absolute bottom) */}
      <div className="w-full max-w-4xl mx-auto px-4 mb-10">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1a1f2e] border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <span className="text-blue-500">📖</span> How to Play
          </h3>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 leading-relaxed">
            <li>• Fill the grid so every row, column, and 3x3 box contains digits 1-9.</li>
            <li>• <span className="font-semibold text-emerald-600 dark:text-emerald-400">Points:</span> Earn points for correctly placed numbers.</li>
            <li>• <span className="font-semibold text-red-500 dark:text-red-400">Mistakes:</span> Lose 5 points. 3 Mistakes = Game Over!</li>
            <li>• <span className="font-semibold text-amber-500 dark:text-amber-400">Hints:</span> Costs 15 points to reveal a single number.</li>
          </ul>
        </div>
      </div>

      <BadgePopup
        isVisible={showBadges}
        badges={earnedBadges}
        onComplete={() => setShowBadges(false)}
      />
    </div>
  );
};
