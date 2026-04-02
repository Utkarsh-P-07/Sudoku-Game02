import { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/userService';
import { useAuth } from '../contexts/AuthContext';
import { formatTime } from '../utils/gameUtils';
import { Trophy, Medal } from 'lucide-react';
import { clsx } from 'clsx';
import { Sidebar } from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

export const Leaderboard = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen flex w-full bg-[#f4f4f4] text-slate-900 font-sans">
      
      <Sidebar activeTab="leaderboard" />

      <div className="flex-1 flex flex-col p-4 md:p-10 relative">
        <span 
          className="absolute top-6 right-6 md:left-6 md:right-auto cursor-pointer hover:opacity-70 font-bold text-lg" 
          style={{ fontFamily: "'Caveat Brush', cursive" }}
          onClick={() => navigate(-1)}
        >
          &lt;Back
        </span>

        <div className="w-full max-w-3xl mx-auto flex flex-col h-full mt-10 md:mt-0">
          
          <h1 className="text-5xl font-bold mb-6 text-black text-center md:text-left" style={{ fontFamily: "'Caveat Brush', cursive" }}>Leaderboard</h1>

          {/* Tabs */}
          <div className="flex bg-[#e0e0df] rounded-[16px] p-2 mb-6 shrink-0 shadow-sm border border-slate-300 overflow-x-auto hide-scrollbar w-full">
            {['beginner', 'easy', 'medium', 'hard', 'extreme'].map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={clsx(
                  "flex-1 py-3 text-lg md:text-xl rounded-[12px] capitalize transition-colors duration-200",
                  difficulty === diff 
                    ? "bg-[#fdfdfd] text-black shadow-[0_2px_4px_rgba(0,0,0,0.05)] border border-slate-200"
                    : "text-slate-500 hover:text-slate-800 border border-transparent"
                )}
                style={{ fontFamily: "'Caveat Brush', cursive" }}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex-1 bg-[#fdfdfd] rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.04)] border-[3px] border-black overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b-[2px] border-black bg-slate-100 flex justify-between text-sm font-bold uppercase tracking-widest text-black">
              <span>Rank & Player</span>
              <span>Best Time</span>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar p-2">
              {loading ? (
                <div className="flex flex-col gap-4 p-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="animate-pulse flex items-center h-16 bg-slate-200 rounded-[12px]"></div>
                  ))}
                </div>
              ) : leaders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500 p-8 text-center">
                  <Trophy size={48} className="text-slate-400" />
                  <p className="text-xl" style={{ fontFamily: "'Kalam', cursive" }}>No players have conquered this difficulty yet.<br/>Be the first!</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 p-2">
                  {leaders.map((leader, index) => {
                    const isCurrent = user && leader.uid === user.uid;
                    return (
                      <div 
                        key={leader.uid + index}
                        className={clsx(
                          "flex items-center justify-between p-4 rounded-[16px] transition-colors",
                          isCurrent 
                            ? "bg-[#fcebd0] border border-[#f9a826]"
                            : "hover:bg-slate-50 border border-slate-200"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 flex justify-center font-bold">
                            {index === 0 ? <Medal className="text-[#f9a826]" size={28} /> :
                            index === 1 ? <Medal className="text-slate-400" size={26} /> :
                            index === 2 ? <Medal className="text-amber-700" size={24} /> :
                            <span className="text-slate-500 text-xl font-bold" style={{ fontFamily: "'Caveat Brush', cursive" }}>#{index + 1}</span>}
                          </div>
                          <div className="flex flex-col">
                            <span className={clsx("font-semibold text-xl", isCurrent ? "text-black" : "text-slate-800")} style={{ fontFamily: "'Caveat Brush', cursive" }}>
                              {leader.displayName} {isCurrent && "(You)"}
                            </span>
                            <span className="text-sm font-bold text-slate-500">{leader.points} pts total</span>
                          </div>
                        </div>
                        <div className="font-bold text-black border border-black bg-white px-4 py-2 rounded-[12px] shadow-sm text-lg" style={{ fontFamily: "'Kalam', cursive" }}>
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
    </div>
  );
};
