import { useNavigate } from 'react-router-dom';
import { Gamepad2, Puzzle } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-[#fffdf9] text-slate-900 font-sans">
      
      {/* --- BACKGROUND BLOBS --- */}
      {/* Bottom Left Small Blob */}
      <div className="absolute w-[250px] md:w-[350px] aspect-square rounded-full bg-[#faedd6] -bottom-20 -left-20"></div>
      {/* Bottom Center Blob */}
      <div className="absolute w-[400px] md:w-[600px] aspect-square rounded-full bg-[#faecd6] -bottom-48 left-1/2 -ml-[200px] md:-ml-[300px]"></div>
      {/* Bottom Right Massive Blobs */}
      <div className="absolute w-[300px] md:w-[500px] aspect-square rounded-full bg-[#fcebd0] -bottom-10 -right-20"></div>
      <div className="absolute w-[200px] md:w-[350px] aspect-square rounded-full bg-[#fbf0df] -bottom-20 right-10 md:right-32"></div>

      {/* --- FLOATING DECORATIONS --- */}
      {/* Top Left Number Grid */}
      <div className="absolute top-[12%] left-[10%] md:left-[22%] rotate-[-15deg] scale-[0.8] md:scale-110 z-10 hover:rotate-[-5deg] transition-transform duration-500">
        <div className="grid grid-cols-2 bg-white border-[3px] border-slate-900 rounded-sm w-[72px] h-[72px] shadow-sm">
          <div className="border-r-[3px] border-b-[3px] border-slate-900 flex items-center justify-center font-bold text-xl">1</div>
          <div className="border-b-[3px] border-slate-900 bg-[#f9a826]"></div>
          <div className="border-r-[3px] border-slate-900 flex items-center justify-center font-bold text-xl">2</div>
          <div className="flex items-center justify-center font-bold text-xl text-slate-800">3</div>
        </div>
      </div>

      {/* Top Right Gamepad */}
      <div className="absolute top-[18%] md:top-[15%] right-[8%] md:right-[24%] rotate-[20deg] z-10 hover:rotate-[0deg] transition-transform duration-500">
        <Gamepad2 size={80} className="text-slate-600 fill-slate-500 stroke-[1.5px]" />
      </div>

      {/* Mid Left Puzzle */}
      <div className="absolute top-[42%] left-[5%] md:left-[22%] rotate-[5deg] z-10 hover:scale-110 transition-transform duration-500 hidden sm:block">
        {/* Simple inline geometric puzzle visualization to match rough sketch */}
        <div className="relative w-16 h-16 opacity-80">
          <Puzzle size={70} className="text-slate-800 stroke-[1.5px] absolute" />
          <div className="w-2 h-2 rounded-full border border-slate-600 absolute -top-2 -right-2"></div>
          <div className="w-1.5 h-1.5 rounded-full border border-slate-600 absolute bottom-0 -right-4"></div>
        </div>
      </div>


      {/* --- MAIN CENTER CONTENT --- */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[70vh] pt-12 md:pt-20 px-4">
        
        {/* Title Block */}
        <div className="text-center mb-8 flex flex-col items-center gap-1">
          <h1 className="text-[64px] md:text-[90px] leading-[0.85] text-[#0f1115] tracking-wide" style={{ fontFamily: "'Caveat Brush', cursive" }}>
            SUDOKU
          </h1>
          <p className="text-[14px] md:text-[18px] text-slate-500 mt-5 md:mt-8 tracking-[0.2em] md:tracking-[0.25em] italic font-medium uppercase" style={{ fontFamily: "'Kalam', cursive" }}>
            Play, Solve, and Learn
          </p>
        </div>

        {/* Center Buttons Wrapper */}
        <div className="flex flex-col gap-4 w-[160px] md:w-[180px] mt-4">
          
          {/* Primary Play Button */}
          <button 
            onClick={() => navigate('/play')}
            className="w-full bg-[#0f1115] text-[#fffdf9] hover:bg-slate-800 transition-colors rounded-[32px] md:rounded-[40px] py-[10px] md:py-3 px-6 text-2xl md:text-3xl shadow-lg border-2 border-transparent hover:border-slate-700 active:scale-95 flex justify-center items-center"
            style={{ fontFamily: "'Caveat Brush', cursive" }}
          >
            Play
          </button>

          {/* Leaderboard Button */}
          <button 
            onClick={() => navigate('/leaderboard')}
            className="w-full bg-[#0f1115] text-[#fffdf9] hover:bg-slate-800 transition-colors rounded-[32px] md:rounded-[40px] py-[10px] md:py-3 px-6 text-2xl md:text-3xl shadow-lg border-2 border-transparent hover:border-slate-700 active:scale-95 flex justify-center items-center"
            style={{ fontFamily: "'Caveat Brush', cursive" }}
          >
            Leaderboard
          </button>
        </div>
      </div>

      {/* --- CORNER CORRIDOR (Bottom Left) --- */}
      <div className="absolute z-20 bottom-8 md:bottom-12 left-0 md:left-4 flex flex-col gap-[14px] w-[140px] md:w-[150px]">
        {/* About Button */}
        <button 
          onClick={() => navigate('/about')}
          className="w-full bg-[#0f1115] text-[#fffdf9] hover:bg-slate-800 transition-colors rounded-r-[32px] sm:rounded-full py-2 md:py-[10px] px-4 text-center sm:text-left sm:pl-8 text-xl md:text-2xl shadow-md border-transparent hover:border-slate-700 active:scale-95"
          style={{ fontFamily: "'Caveat Brush', cursive" }}
        >
          About
        </button>
        {/* Help Button */}
        <button 
          onClick={() => navigate('/help')}
          className="w-full bg-[#0f1115] text-[#fffdf9] hover:bg-slate-800 transition-colors rounded-r-[32px] sm:rounded-full py-2 md:py-[10px] px-4 text-center sm:text-left sm:pl-8 text-xl md:text-2xl shadow-md border-transparent hover:border-slate-700 active:scale-95"
          style={{ fontFamily: "'Caveat Brush', cursive" }}
        >
          Help
        </button>
        {/* Profile Button - newly added per specific request */}
        <button 
          onClick={() => navigate('/profile')}
          className="w-full bg-[#0f1115] text-[#fffdf9] hover:bg-slate-800 transition-colors rounded-r-[32px] sm:rounded-full py-2 md:py-[10px] px-4 text-center sm:text-left sm:pl-8 text-xl md:text-2xl shadow-md border-transparent hover:border-slate-700 active:scale-95"
          style={{ fontFamily: "'Caveat Brush', cursive" }}
        >
          Profile
        </button>
      </div>

    </div>
  );
};
