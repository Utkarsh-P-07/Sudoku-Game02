import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex w-full bg-[#f4f4f4] text-slate-900 font-sans">
      
      <Sidebar activeTab="help" />

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
            How to Play
          </h1>

          <div className="bg-[#fdfdfd] border-[3px] border-black rounded-[24px] p-6 sm:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex flex-col gap-6 text-xl md:text-2xl leading-relaxed text-slate-700" style={{ fontFamily: "'Kalam', cursive" }}>
            <p className="font-bold text-slate-800">
              The goal of Sudoku is to fill a 9×9 grid with numbers so that each row, column, and 3×3 section contain all of the digits between 1 and 9.
            </p>
            
            <ul className="flex flex-col gap-5 mt-2 list-none pl-1">
              <li className="flex gap-4 items-start">
                <span className="font-bold text-black font-sans text-2xl pt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>1.</span>
                <span>Each vertical column must contain numbers 1-9 without repetition.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-bold text-black font-sans text-2xl pt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>2.</span>
                <span>Each horizontal row must contain numbers 1-9 without repetition.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-bold text-black font-sans text-2xl pt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>3.</span>
                <span>Each 3x3 block must contain numbers 1-9 without repetition.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-bold text-black font-sans text-2xl pt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>4.</span>
                <span>Use the pencil tool (from keyboard 'P') to draft potential numbers into a cell.</span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="font-bold text-black font-sans text-2xl pt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>5.</span>
                <span>Look for cells with only one possible solution to crack the puzzle!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
