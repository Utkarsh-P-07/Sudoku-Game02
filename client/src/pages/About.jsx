import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex w-full bg-[#f4f4f4] text-slate-900 font-sans">
      
      <Sidebar activeTab="about" />

      <div className="flex-1 flex flex-col p-4 md:p-10 relative overflow-y-auto">
        <span 
          className="absolute top-6 right-6 md:left-6 md:right-auto cursor-pointer hover:opacity-70 font-bold text-lg" 
          style={{ fontFamily: "'Caveat Brush', cursive" }}
          onClick={() => navigate(-1)}
        >
          &lt;Back
        </span>

        <div className="w-full max-w-3xl mx-auto flex flex-col h-full mt-10 md:mt-0">
          <h1 className="text-5xl font-bold mb-8 text-black text-center md:text-left" style={{ fontFamily: "'Caveat Brush', cursive" }}>
            About the Site
          </h1>

          <div className="bg-[#fdfdfd] border-[3px] border-black rounded-[24px] p-6 sm:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col gap-6 text-xl md:text-2xl leading-relaxed text-slate-700 font-medium" style={{ fontFamily: "'Kalam', cursive" }}>
            <p className="font-bold text-black text-2xl md:text-3xl" style={{ fontFamily: "'Caveat Brush', cursive" }}>
              Sudoku is a logic-based, combinatorial number-placement puzzle.
            </p>
            <p>
              The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids that compose the grid contain all of the digits from 1 to 9.
            </p>
            <p>
              This platform was meticulously designed to bring a premium, distraction-free aesthetic to the classic game. It combines a natural handwritten notebook style with robust game mechanics.
            </p>
            <p>
              Whether you are here to learn the ropes or compete against the globe on the leaderboards, we hope you enjoy playing!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
