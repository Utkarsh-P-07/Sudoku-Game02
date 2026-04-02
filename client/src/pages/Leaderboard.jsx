import { useState, useEffect } from 'react';
import { TopBar } from '../components/TopBar';
import { getLeaderboard } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';
import { formatTime } from '../utils/gameUtils';
import { Trophy, Medal } from 'lucide-react';
import { clsx } from 'clsx';

export const Leaderboard = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaders = async () => {
      setLoading(true);
      const data = await getLeaderboard(difficulty);
      setLeaders(data);
      setLoading(false);
    };
    fetchLeaders();
  }, [difficulty]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f1117] text-slate-900 dark:text-slate-100">
      <TopBar title={"Leaderboard"} showBack={true} />

      <div className="flex-1 w-full max-w-2xl mx-auto p-4 flex flex-col h-full">
        
        {/* Tabs */}
        <div className="flex bg-white dark:bg-[#1a1f2e] rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-800 mb-6 shrink-0">
          {['easy', 'medium', 'hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={clsx(
                "flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-colors duration-200",
                difficulty === diff 
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 bg-white dark:bg-[#1a1f2e] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>Rank & Player</span>
            <span>Best Time</span>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar p-2">
            {loading ? (
              <div className="flex flex-col gap-4 p-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="animate-pulse flex items-center h-16 bg-slate-100 dark:bg-slate-800/50 rounded-xl"></div>
                ))}
              </div>
            ) : leaders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500 p-8 text-center">
                <Trophy size={48} className="text-slate-300 dark:text-slate-700" />
                <p>No players have conquered this difficulty yet.<br/>Be the first!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 p-2">
                {leaders.map((leader, index) => {
                  const isCurrent = user && leader.uid === user.uid;
                  return (
                    <div 
                      key={leader.uid + index}
                      className={clsx(
                        "flex items-center justify-between p-4 rounded-xl transition-colors",
                        isCurrent 
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 border"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 flex justify-center font-bold">
                          {index === 0 ? <Medal className="text-yellow-500" /> :
                           index === 1 ? <Medal className="text-slate-400" /> :
                           index === 2 ? <Medal className="text-amber-700" /> :
                           <span className="text-slate-400">#{index + 1}</span>}
                        </div>
                        <div className="flex flex-col">
                          <span className={clsx("font-semibold", isCurrent && "text-blue-600 dark:text-blue-400")}>
                            {leader.displayName} {isCurrent && "(You)"}
                          </span>
                          <span className="text-xs text-slate-500">{leader.points} pts total</span>
                        </div>
                      </div>
                      <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-lg">
                        {formatTime(leader.bestTimes[difficulty])}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
