export const NumberPad = ({ onNumberClick, disabled }) => {
  return (
    <div className="w-full flex flex-wrap justify-center lg:grid lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 lg:px-4 mt-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => onNumberClick(num)}
          disabled={disabled}
          className="flex items-center justify-center 
                     w-[calc(20%-8px)] sm:w-[calc(20%-12px)] lg:w-full aspect-square 
                     text-2xl sm:text-3xl font-normal text-[#4a72ff] dark:text-[#aabeff] 
                     bg-white dark:bg-[#252f4a] rounded-2xl shadow-[0_4px_12px_rgba(74,114,255,0.08)] 
                     hover:shadow-[0_6px_16px_rgba(74,114,255,0.15)] dark:shadow-none
                     active:scale-95 transition-all duration-150
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {num}
        </button>
      ))}
    </div>
  );
};
