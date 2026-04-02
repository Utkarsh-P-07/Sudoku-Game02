import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TopBar } from '../components/TopBar';
import { formatTime } from '../utils/gameUtils';
import { Award, Trophy, Zap, Star, LogOut, Clock } from 'lucide-react';

const badgeIcons = {
  'Fast Solver': <Zap className="text-yellow-400" size={24} />,
  'Lightning': <Zap className="text-yellow-500 fill-yellow-500" size={24} />,
  'No Hint': <Star className="text-purple-400" size={24} />,
  'No Mistake': <Star className="text-purple-400 fill-purple-400" size={24} />,
  '1 win': <Trophy className="text-amber-600" size={24} />,
  '10 wins': <Trophy className="text-slate-400" size={24} />,
  '50 wins': <Trophy className="text-yellow-400" size={24} />
};

export const Profile = () => {
  const { profile, user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logoutUser();
      navigate('/auth');
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f1117] text-slate-900 dark:text-slate-100">
       <TopBar title={"Profile"} showBack={true} />
       <div className="flex-1 flex items-center justify-center">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f1117] text-slate-900 dark:text-slate-100">
      <TopBar title={"Profile"} showBack={true} />
      
      <div className="flex-1 w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 overflow-y-auto hide-scrollbar">
        
        {/* Header Stats */}
        <div className="bg-white dark:bg-[#1a1f2e] rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg shrink-0">
            {profile.displayName ? profile.displayName[0].toUpperCase() : 'U'}
          </div>
          
          <div className="flex-1 text-center sm:text-left z-10 w-full">
            <h2 className="text-2xl sm:text-3xl font-bold mb-1">{profile.displayName}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">{profile.isGuest ? 'Guest Account' : user.email}</p>
            
            <div className="flex justify-center sm:justify-start gap-8 border-t border-slate-100 dark:border-slate-800 pt-6">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Points</span>
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{profile.points}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Games Won</span>
                <span className="text-3xl font-bold">{profile.gamesPlayed}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Best Times */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Clock size={20} className="text-blue-500" />
              Best Times
            </h3>
            <div className="bg-white dark:bg-[#1a1f2e] rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              {['easy', 'medium', 'hard'].map(diff => (
                <div key={diff} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <span className="capitalize font-medium text-slate-700 dark:text-slate-300">{diff}</span>
                  <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {profile.bestTimes?.[diff] ? formatTime(profile.bestTimes[diff]) : '--:--'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Award size={20} className="text-purple-500" />
              Badges ({profile.badges?.length || 0})
            </h3>
            
            <div className="bg-white dark:bg-[#1a1f2e] rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
              {(!profile.badges || profile.badges.length === 0) ? (
                <div className="text-center text-slate-500 py-8">
                  Play games to earn badges!
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {profile.badges.map((badge, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl">
                      {badgeIcons[badge] || <Award className="text-indigo-400" size={24} />}
                      <span className="text-xs font-semibold text-center text-slate-700 dark:text-slate-300 leading-tight block w-full truncate">{badge}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="mt-12 flex flex-row items-center justify-center gap-2 w-full p-4 rounded-xl text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
};
