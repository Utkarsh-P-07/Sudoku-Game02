import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Zap, Flame, Trophy } from 'lucide-react';

const badgeIcons = {
  'Fast Solver': <Zap className="text-yellow-400" size={32} />,
  'Lightning': <Zap className="text-yellow-400 fill-yellow-400" size={32} />,
  'No Hint': <Star className="text-purple-400" size={32} />,
  'No Mistake': <Star className="text-purple-400 fill-purple-400" size={32} />,
  '1 win': <Trophy className="text-amber-600" size={32} />,
  '10 wins': <Trophy className="text-slate-400" size={32} />,
  '50 wins': <Trophy className="text-yellow-400" size={32} />
};

export const BadgePopup = ({ badges = [], isVisible, onComplete }) => {
  if (!isVisible || badges.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -20 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Confetti-like background circle decoration */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl" />

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">
            Achievement Unlocked!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 relative z-10">
            You earned new badges for that performance.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8 relative z-10">
            {badges.map((badge, idx) => (
              <motion.div 
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.2 + 0.3, type: "spring" }}
                className="flex flex-col items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl"
              >
                <div className="p-2 bg-white dark:bg-slate-700 rounded-full shadow-inner">
                  {badgeIcons[badge] || <Award className="text-indigo-400" size={32} />}
                </div>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{badge}</span>
              </motion.div>
            ))}
          </div>

          <button
            onClick={onComplete}
            className="w-full relative z-10 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
          >
            Awesome!
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
