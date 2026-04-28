import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSudoku } from '../hooks/useSudoku';
import { useAuth } from '../contexts/AuthContext';
import { submitGameResult } from '../services/userService';
import { formatTime } from '../utils/gameUtils';

import { Board } from '../components/Board';
// import { Controls } from '../components/Controls'; // Removed purely based on mock
import { NumberPad } from '../components/NumberPad';
import { Sidebar } from '../components/Sidebar';
import { BadgePopup } from '../components/BadgePopup';
import { Pause } from 'lucide-react';

export const Game = () => {
  const { difficulty } = useParams();
  const navigate = useNavigate();
  const { user, profile, setProfile } = useAuth();

  const [earnedBadges, setEarnedBadges] = useState([]);
  const [showBadges, setShowBadges] = useState(false);

  const handleWin = async (result) => {
    if (user && profile) {
      const saveRes = await submitGameResult(
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

  const getNumberCounts = () => {
    const counts = Array(10).fill(9);
    if (!game.board || game.board.length !== 9) return counts;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (game.board[r] && game.board[r][c] !== 0) counts[game.board[r][c]]--;
      }
    }
    return counts;
  };
  const remainingCounts = getNumberCounts();

  return (
    <div className="min-h-screen flex w-full bg-[#f4f4f4] text-slate-900 font-sans">
      
      {/* SIDEBAR */}
      <Sidebar activeTab="play" />

      {/* MAIN GAME VIEW */}
      <div className="flex-1 flex flex-col md:flex-row items-center md:items-start justify-center p-4 md:p-10 gap-x-12 relative overflow-y-auto">
        
        <div className="flex flex-col w-full max-w-[650px] relative">
          
          {/* Top text links */}
          <div className="flex gap-12 w-full mb-6 font-bold text-lg pt-4 pl-4" style={{ fontFamily: "'Caveat Brush', cursive" }}>
            <span className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => navigate('/play')}>New Game&gt;</span>
            <span className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => {
               game.newGame();
            }}>Restart Level&gt;</span>
          </div>

          <div className="w-full relative">
            <Board 
              board={game.board} 
              initialBoard={game.initialBoard} 
              pencilMarks={game.pencilMarks}
              selectedCell={game.selectedCell} 
              setSelectedCell={game.setSelectedCell}
              solution={game.solution}
            />

            {game.gameStatus === 'loading' && (
              <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-center rounded">
                <span className="font-semibold animate-pulse text-2xl" style={{ fontFamily: "'Caveat Brush', cursive" }}>Generating puzzle...</span>
              </div>
            )}

            {game.gameStatus === 'lost' && (
              <div className="absolute inset-0 bg-red-900/10 backdrop-blur-md flex flex-col items-center justify-center rounded gap-4">
                <h2 className="text-4xl font-bold border-red-500 text-red-600 dark:text-red-400" style={{ fontFamily: "'Caveat Brush', cursive" }}>Game Over</h2>
                <p className="text-slate-700 dark:text-slate-200">Too many mistakes.</p>
                <button
                  onClick={() => game.newGame()}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-lg"
                  style={{ fontFamily: "'Caveat Brush', cursive" }}
                >
                  Try Again
                </button>
              </div>
            )}

            {game.gameStatus === 'won' && !showBadges && (
              <div className="absolute inset-0 bg-emerald-900/20 backdrop-blur-md flex flex-col items-center justify-center rounded gap-4">
                <h2 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400" style={{ fontFamily: "'Caveat Brush', cursive" }}>You Won!</h2>
                <p className="text-slate-800 dark:text-slate-100 font-medium text-xl">Score: {game.points}</p>
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full shadow-lg mt-2"
                  style={{ fontFamily: "'Caveat Brush', cursive" }}
                >
                  Continue
                </button>
              </div>
            )}
          </div>

          {/* New Horizontal Single-Row Numpad underneath the board */}
          <div className="w-full mt-6">
            <NumberPad 
              onNumberClick={game.handleInput} 
              disabled={game.gameStatus !== 'playing'}
              counts={remainingCounts}
            />
          </div>

        </div>

        {/* Right Stats Sidebar */}
        <div className="hidden lg:flex flex-col gap-6 mt-[72px] w-[260px] shrink-0">
          
          {/* Blank Bubble Box (from image) - perhaps for future use */}
          <div className="w-full h-[80px] bg-[#f8f8f8] border border-slate-300 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center justify-center">
             <span className="text-slate-400 italic font-bold tracking-widest text-sm uppercase" style={{ fontFamily: "'Caveat Brush', cursive" }}>
                {difficulty || 'CLASSIC'}
             </span>
          </div>

          {/* Main Stats Block */}
          <div className="w-full bg-[#f8f8f8] border border-slate-300 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col items-center py-6 px-4">
            
            <div className="w-full flex justify-between items-center px-4 mb-2">
               <span className="text-3xl font-bold tracking-wide text-black" style={{ fontFamily: "'Caveat Brush', cursive" }}>Score :</span>
            </div>
            
            <div className="w-full flex justify-end px-4 mb-6 text-[44px] font-bold text-black" style={{ fontFamily: "'Caveat Brush', cursive" }}>
               {String(game.points).padStart(5, '0')}
            </div>

            <div className="w-full h-px bg-slate-300 mb-6"></div>

            <div className="w-full flex justify-between items-center px-4 mb-2">
               <span className="text-3xl font-bold tracking-wide text-black" style={{ fontFamily: "'Caveat Brush', cursive" }}>Timer :</span>
               <Pause size={24} className="text-black font-bold fill-black" />
            </div>

            <div className="w-full flex justify-end px-4 text-[44px] font-bold tracking-wide text-black" style={{ fontFamily: "'Caveat Brush', cursive" }}>
               {formatTime(game.timer)}
            </div>
          </div>
          
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
