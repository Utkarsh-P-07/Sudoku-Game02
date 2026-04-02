export const NumberPad = ({ onNumberClick, disabled, counts }) => {
  return (
    <div className="w-full flex justify-between gap-1 sm:gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
        const remaining = counts ? counts[num] : 9;
        const isDone = remaining <= 0;

        return (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            disabled={disabled || isDone}
            className={`flex flex-col items-center justify-center 
                       flex-1 aspect-[3/4] sm:aspect-[4/5]
                       bg-gradient-to-b from-white to-[#f0f0f0] rounded-[12px] sm:rounded-[18px] 
                       shadow-[0_4px_6px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.8)] border border-slate-200/50
                       active:scale-95 transition-all duration-150
                       ${isDone ? 'opacity-30 cursor-not-allowed' : 'hover:shadow-[0_6px_10px_rgba(0,0,0,0.08)]'}`}
          >
            <span className="text-2xl sm:text-3xl lg:text-[34px] font-medium text-slate-800 leading-none mt-1" style={{ fontFamily: "'Caveat Brush', cursive" }}>
              {num}
            </span>
            <span className="text-[10px] sm:text-[12px] text-slate-400 font-bold mt-1 tracking-tighter" style={{ fontFamily: "'Kalam', cursive" }}>
              {remaining}
            </span>
          </button>
        );
      })}
    </div>
  );
};
