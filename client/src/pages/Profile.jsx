import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { formatTime } from '../utils/gameUtils';
import { Award, Trophy, Zap, Star, LogOut, Clock } from 'lucide-react';

const badgeIcons = {
  'Fast Solver': <Zap className="text-yellow-500" size={32} />,
  'Lightning': <Zap className="text-yellow-600 fill-yellow-500" size={32} />,
  'No Hint': <Star className="text-purple-500" size={32} />,
  'No Mistake': <Star className="text-purple-600 fill-purple-500" size={32} />,
  '1 win': <Trophy className="text-amber-700" size={32} />,
  '10 wins': <Trophy className="text-[#f9a826]" size={32} />,
  '50 wins': <Trophy className="text-yellow-500 fill-yellow-400" size={32} />
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
    <div className="min-h-screen flex w-full bg-[#f4f4f4] text-slate-900 font-sans">
       <Sidebar activeTab="profile" />
       <div className="flex-1 flex items-center justify-center font-bold text-2xl" style={{ fontFamily: "'Caveat Brush', cursive" }}>Loading Profile...</div>
    </div>
  );

  return (
    <div className="min-h-screen flex w-full bg-[#f4f4f4] text-slate-900 font-sans">
      <Sidebar activeTab="profile" />
      
      <div className="flex-1 flex flex-col p-4 md:p-10 relative overflow-y-auto">
        <span 
          className="absolute top-6 right-6 md:left-6 md:right-auto cursor-pointer hover:opacity-70 font-bold text-lg" 
          style={{ fontFamily: "'Caveat Brush', cursive" }}
          onClick={() => navigate(-1)}
        >
          &lt;Back
        </span>

        <div className="w-full max-w-4xl mx-auto flex flex-col mt-10 md:mt-0">
          
          <h1 className="text-5xl font-bold mb-6 text-black text-center md:text-left" style={{ fontFamily: "'Caveat Brush', cursive" }}>Player Profile</h1>

          {/* Header Stats */}
          <div className="bg-[#fdfdfd] border-[3px] border-black rounded-[24px] p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-8 relative">
            <div className="w-32 h-32 bg-[#2a2a2a] border-[4px] border-black rounded-full flex items-center justify-center text-6xl text-[#fffdf9] shrink-0" style={{ fontFamily: "'Caveat Brush', cursive" }}>
              {profile.displayName ? profile.displayName[0].toUpperCase() : 'U'}
            </div>
            
            <div className="flex-1 text-center sm:text-left z-10 w-full mt-2">
              <h2 className="text-4xl text-black mb-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>{profile.displayName}</h2>
              <p className="text-slate-500 font-bold tracking-wider mb-6">{profile.isGuest ? 'Guest Account' : user.email}</p>
              
              <div className="flex justify-center sm:justify-start gap-12 border-t-[2px] border-slate-200 pt-6">
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Total Points</span>
                  <span className="text-4xl text-black" style={{ fontFamily: "'Caveat Brush', cursive" }}>{profile.points}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Games Won</span>
                  <span className="text-4xl text-black" style={{ fontFamily: "'Caveat Brush', cursive" }}>{profile.gamesPlayed}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Best Times */}
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl text-black flex items-center gap-3" style={{ fontFamily: "'Caveat Brush', cursive" }}>
                <Clock size={28} className="text-black" />
                Best Times
              </h3>
              <div className="bg-[#fdfdfd] border-[3px] border-black rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
                {['beginner', 'easy', 'medium', 'hard', 'extreme'].map(diff => (
                  <div key={diff} className="flex items-center justify-between p-4 rounded-[16px] bg-[#f4f4f4] border border-slate-200">
                    <span className="capitalize text-2xl text-black" style={{ fontFamily: "'Caveat Brush', cursive" }}>{diff}</span>
                    <span className="font-bold text-black bg-white px-4 py-2 rounded-lg border border-slate-300 shadow-sm text-lg" style={{ fontFamily: "'Kalam', cursive" }}>
                      {profile.bestTimes?.[diff] ? formatTime(profile.bestTimes[diff]) : '--:--'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl text-black flex items-center gap-3" style={{ fontFamily: "'Caveat Brush', cursive" }}>
                <Award size={28} className="text-black" />
                Badges ({profile.badges?.length || 0})
              </h3>
              
              <div className="bg-[#fdfdfd] border-[3px] border-black rounded-[24px] p-6 shadow-sm min-h-[200px]">
                {(!profile.badges || profile.badges.length === 0) ? (
                  <div className="flex items-center justify-center h-full text-slate-400 text-2xl" style={{ fontFamily: "'Kalam', cursive" }}>
                    Play games to earn badges!
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {profile.badges.map((badge, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center gap-2 p-4 bg-[#f4f4f4] border-[2px] border-slate-200 rounded-[16px] text-center">
                        {badgeIcons[badge] || <Award className="text-black" size={32} />}
                        <span className="text-lg text-black leading-tight mt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>{badge}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          <button 
            onClick={handleLogout}
            className="mt-12 mx-auto flex flex-row items-center justify-center gap-3 max-w-[240px] w-full p-4 rounded-[16px] text-white bg-black hover:bg-slate-800 shadow-sm transition-colors"
          >
            <LogOut size={24} />
            <span className="text-2xl pt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>Sign Out</span>
          </button>

        </div>
      </div>
    </div>
  );
};
