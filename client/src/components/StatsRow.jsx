import { formatTime } from '../utils/gameUtils';

export const StatsRow = ({ mistakes, maxMistakes, points, timer, difficulty }) => {
  return (
    <div className="w-full max-w-[500px] flex justify-between items-center px-4 py-2 border-b border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 mb-4 sm:mb-6 rounded-lg text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300">
      
      <div className="flex flex-col items-center flex-1">
        <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{difficulty}</span>
        <span className="font-semibold text-slate-900 dark:text-white">Mistakes: <span className={mistakes >= maxMistakes - 1 ? 'text-red-500' : ''}>{mistakes}/{maxMistakes}</span></span>
      </div>

      <div className="flex flex-col items-center flex-1 border-x border-slate-200 dark:border-slate-800">
        <span className="text-xs text-slate-500 dark:text-slate-400">Score</span>
        <span className="font-semibold text-blue-600 dark:text-blue-400">{points}</span>
      </div>

      <div className="flex flex-col items-center flex-1">
        <span className="text-xs text-slate-500 dark:text-slate-400">Time</span>
        <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono tracking-wider">
          {formatTime(timer)}
        </span>
      </div>

    </div>
  );
};
