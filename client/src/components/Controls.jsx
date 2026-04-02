import { Undo2, Eraser, Edit3, Lightbulb } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...args) => twMerge(clsx(...args));

export const Controls = ({ onUndo, onErase, useHint, isPencilMode, setIsPencilMode, disabled }) => {
  return (
    <div className="flex flex-row lg:flex-col w-full max-w-[500px] lg:w-auto justify-between lg:justify-start lg:gap-6 px-2 sm:px-6 lg:px-0">
      <ControlButton
        icon={<Undo2 size={24} />}
        label="Undo"
        onClick={onUndo}
        disabled={disabled}
      />
      <ControlButton
        icon={<Eraser size={24} />}
        label="Erase"
        onClick={onErase}
        disabled={disabled}
      />
      <ControlButton
        icon={<Edit3 size={24} />}
        label={isPencilMode ? "Pencil On" : "Pencil Off"}
        onClick={() => setIsPencilMode(!isPencilMode)}
        active={isPencilMode}
        disabled={disabled}
      />
      <ControlButton
        icon={<Lightbulb size={24} />}
        label="Hint"
        onClick={useHint}
        disabled={disabled}
      />
    </div>
  );
};

const ControlButton = ({ icon, onClick, active, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center min-w-[56px] min-h-[56px] w-[60px] h-[60px] rounded-full transition-all duration-200",
        "bg-white dark:bg-[#252f4a] shadow-[0_4px_12px_rgba(74,114,255,0.08)] hover:shadow-[0_6px_16px_rgba(74,114,255,0.15)] dark:shadow-none",
        active && "bg-blue-50 dark:bg-[#344163] shadow-inner",
        disabled && "opacity-50 cursor-not-allowed shadow-none hover:shadow-none hover:scale-100",
        !disabled && "active:scale-95 text-[#4a72ff] dark:text-[#aabeff]"
      )}
    >
      <div className={cn(
        "transition-transform",
        active && "scale-110",
        !active && !disabled && "text-[#4a72ff] dark:text-[#aabeff]"
      )}>
        {icon}
      </div>
    </button>
  );
};
