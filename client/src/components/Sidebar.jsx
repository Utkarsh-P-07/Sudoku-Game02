import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Gamepad2, Menu, HelpCircle, Trophy, User, Info } from 'lucide-react';

export const Sidebar = ({ activeTab = 'play' }) => {
  const navigate = useNavigate();

  return (
    <div className="w-[80px] md:w-[260px] bg-[#111] flex flex-col h-screen sticky top-0 text-white shrink-0 z-50 overflow-y-auto hide-scrollbar">
      {/* Top Header Row */}
      <div className="flex items-center justify-between p-4 md:p-6 mb-8">
        <div 
          onClick={() => navigate('/')} 
          className="text-3xl md:text-4xl font-bold tracking-widest cursor-pointer hover:text-slate-300 transition-colors" 
          style={{ fontFamily: "'Caveat Brush', cursive" }}
        >
          SUDOKU
        </div>
        <HomeIcon onClick={() => navigate('/')} className="w-7 h-7 md:w-8 md:h-8 cursor-pointer hover:text-slate-300 hidden md:block" />
      </div>

      {/* Sidebar Links */}
      <div className="flex flex-col gap-2">
        
        {/* Play Button */}
        <button 
          onClick={() => navigate('/play')} 
          className={`flex flex-col md:flex-row items-center gap-3 mx-2 md:mx-4 p-3 md:p-4 rounded-xl transition-colors ${
            activeTab === 'play' ? 'bg-[#2a2a2a]/60 border border-white/10' : 'hover:bg-white/10 border border-transparent'
          }`}
        >
          <div className={activeTab === 'play' ? "border border-white rounded-md p-1" : "p-1"}>
            <Gamepad2 size={24} className="text-white" />
          </div>
          <span className="hidden md:block text-2xl tracking-wide pt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>Play</span>
        </button>

        {/* Leaderboard Link */}
        <button 
          onClick={() => navigate('/leaderboard')} 
          className={`flex flex-col md:flex-row items-center gap-3 mx-2 md:mx-4 p-3 md:p-4 rounded-xl transition-colors ${
            activeTab === 'leaderboard' ? 'bg-[#2a2a2a]/60 border border-white/10' : 'hover:bg-white/10 border border-transparent'
          }`}
        >
           <Trophy size={26} className="text-white ml-[1px]" />
          <span className="hidden md:block text-2xl tracking-wide pt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>Leaderboard</span>
        </button>
      </div>

      {/* Bottom Actions Line-up (About -> Help -> Profile) Sequence */}
      <div className="mt-auto p-4 md:p-6 flex flex-col gap-6">
        
        {/* About Link */}
        <button onClick={() => navigate('/about')} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
          <Info size={30} />
          <span className="hidden md:block text-xl tracking-wide pt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>About</span>
        </button>

        {/* Help Link */}
        <button onClick={() => navigate('/help')} className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
          <HelpCircle size={30} />
          <span className="hidden md:block text-xl tracking-wide pt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>Help</span>
        </button>

        {/* Profile Link */}
        <button 
          onClick={() => navigate('/profile')} 
          className={`flex items-center gap-3 transition-colors ${
            activeTab === 'profile' ? 'text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <User size={30} />
          <span className="hidden md:block text-2xl tracking-wide pt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>Profile</span>
        </button>
        
      </div>
    </div>
  );
};
