import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { TopBar } from '../components/TopBar';

export const Home = () => {
  const navigate = useNavigate();

  const start = (difficulty) => {
    navigate(`/game/${difficulty}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f1117] text-slate-900 dark:text-slate-100">
      <TopBar title={"Sudoku"} />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-indigo-700 dark:from-blue-400 dark:to-indigo-500 mb-4 tracking-tighter">
              SUDOKU
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-4 px-2 leading-relaxed">
              Fill the 9×9 grid with numbers so that each row, column, and 3×3 section contain all of the digits between 1 and 9. 
              Compete for the fastest times on the global leaderboards!
            </p>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-6">Select Difficulty</p>
          </div>

          <button 
            onClick={() => start('easy')}
            className="w-full relative group p-4 rounded-2xl bg-white dark:bg-[#1a1f2e] border-2 border-emerald-500/20 hover:border-emerald-500 dark:border-emerald-400/20 dark:hover:border-emerald-400 shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-between overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-500/5 dark:bg-emerald-400/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 relative z-10">Easy</span>
            <Play className="text-emerald-500 opacity-50 group-hover:opacity-100 relative z-10" />
          </button>

          <button 
            onClick={() => start('medium')}
            className="w-full relative group p-4 rounded-2xl bg-white dark:bg-[#1a1f2e] border-2 border-amber-500/20 hover:border-amber-500 dark:border-amber-400/20 dark:hover:border-amber-400 shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-between overflow-hidden"
          >
            <div className="absolute inset-0 bg-amber-500/5 dark:bg-amber-400/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="text-xl font-bold text-amber-600 dark:text-amber-400 relative z-10">Medium</span>
            <Play className="text-amber-500 opacity-50 group-hover:opacity-100 relative z-10" />
          </button>

          <button 
            onClick={() => start('hard')}
            className="w-full relative group p-4 rounded-2xl bg-white dark:bg-[#1a1f2e] border-2 border-red-500/20 hover:border-red-500 dark:border-red-400/20 dark:hover:border-red-400 shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-between overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-500/5 dark:bg-red-400/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="text-xl font-bold text-red-600 dark:text-red-400 relative z-10">Hard</span>
            <Play className="text-red-500 opacity-50 group-hover:opacity-100 relative z-10" />
          </button>
          
          <div className="mt-4 flex flex-col gap-3">
            <button
              onClick={() => navigate('/leaderboard')}
              className="w-full flex items-center justify-center p-4 rounded-xl font-bold bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/40 dark:hover:bg-blue-800/60 dark:text-blue-300 transition-colors"
            >
              🏆 Global Leaderboards
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
