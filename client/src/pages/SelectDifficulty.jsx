import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const SelectDifficulty = () => {
  const navigate = useNavigate();

  const difficulties = [
    { label: 'BEGINNER', value: 'beginner' },
    { label: 'EASY', value: 'easy' },
    { label: 'MEDIUM', value: 'medium' },
    { label: 'HARD', value: 'hard' },
    { label: 'EXTREME', value: 'extreme' }
  ];

  const startGame = (diff) => {
    navigate(`/game/${diff}`);
  };

  return (
    <div className="min-h-screen flex w-full bg-[#f4f4f4] text-slate-900 font-sans">
      
      {/* SIDEBAR */}
      <Sidebar activeTab="play" />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-16 md:pt-6 relative">
        <HomeIcon onClick={() => navigate('/')} className="w-8 h-8 absolute top-6 right-6 cursor-pointer text-slate-800 hover:text-slate-500 md:hidden" />

        <h2 className="text-[40px] md:text-[56px] font-bold text-black mb-12 tracking-wide text-center" style={{ fontFamily: "'Caveat Brush', cursive" }}>
          Choose a difficulty :
        </h2>

        <div className="flex flex-col gap-[18px] w-full max-w-[200px] md:max-w-[240px]">
          {difficulties.map((diff, index) => (
            <button
              key={index}
              onClick={() => startGame(diff.value)}
              className="w-full py-3 md:py-4 px-6 bg-[#e0e0df] hover:bg-[#d0d0cf] text-black font-[900] tracking-widest text-sm md:text-md rounded-[16px] shadow-sm transition-transform active:scale-95"
            >
              {diff.label}
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
};
