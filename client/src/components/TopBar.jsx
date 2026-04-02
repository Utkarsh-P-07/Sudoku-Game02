import { Moon, Sun, ArrowLeft, UserCircle2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const TopBar = ({ title, showBack = false, customBackAction = null }) => {
  const { theme, toggleTheme } = useTheme();
  const { profile } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    if (customBackAction) {
      customBackAction();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="w-full flex items-center justify-between px-4 py-3 sm:py-5 max-w-5xl mx-auto">
      <div className="flex flex-1 items-center gap-3">
        {showBack && (
          <button 
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-800 dark:text-slate-200" />
          </button>
        )}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-end gap-2 sm:gap-4">
        {profile && (
          <span className="hidden sm:inline-block text-sm font-medium text-slate-600 dark:text-slate-300">
            Welcome, <span className="text-blue-600 dark:text-blue-400 font-bold">{profile.displayName}</span>
          </span>
        )}

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === 'dark' ? (
            <Sun size={22} className="text-amber-400" />
          ) : (
            <Moon size={22} className="text-slate-800" />
          )}
        </button>

        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {profile?.photoURL ? (
            <img src={profile.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
          ) : (
            <UserCircle2 size={26} className="text-slate-800 dark:text-slate-200" />
          )}
        </button>
      </div>
    </div>
  );
};
