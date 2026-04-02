import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

import { Auth } from './pages/Auth';
import { Game } from './pages/Game';
import { Profile } from './pages/Profile';
import { Leaderboard } from './pages/Leaderboard';
import { SelectDifficulty } from './pages/SelectDifficulty';
import { About } from './pages/About';
import { Help } from './pages/Help';

const GlobalWatermark = () => (
  <div className="fixed inset-0 pointer-events-none flex items-center justify-center -z-10 overflow-hidden">
    <svg
      className="absolute w-[200vw] h-[200vh] min-w-[200vw] min-h-[200vh] text-slate-400 opacity-10 dark:text-white dark:opacity-[0.06] -rotate-12 select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="sudoku-pattern" x="0" y="0" width="250" height="250" patternUnits="userSpaceOnUse" viewBox="0 0 100 100">
          <g stroke="currentColor" fill="none">
            <rect x="5" y="5" width="90" height="90" strokeWidth="3" rx="2" />
            <line x1="15" y1="5" x2="15" y2="95" strokeWidth="0.5" />
            <line x1="25" y1="5" x2="25" y2="95" strokeWidth="0.5" />
            <line x1="35" y1="5" x2="35" y2="95" strokeWidth="2" />
            <line x1="45" y1="5" x2="45" y2="95" strokeWidth="0.5" />
            <line x1="55" y1="5" x2="55" y2="95" strokeWidth="0.5" />
            <line x1="65" y1="5" x2="65" y2="95" strokeWidth="2" />
            <line x1="75" y1="5" x2="75" y2="95" strokeWidth="0.5" />
            <line x1="85" y1="5" x2="85" y2="95" strokeWidth="0.5" />
            <line x1="5" y1="15" x2="95" y2="15" strokeWidth="0.5" />
            <line x1="5" y1="25" x2="95" y2="25" strokeWidth="0.5" />
            <line x1="5" y1="35" x2="95" y2="35" strokeWidth="2" />
            <line x1="5" y1="45" x2="95" y2="45" strokeWidth="0.5" />
            <line x1="5" y1="55" x2="95" y2="55" strokeWidth="0.5" />
            <line x1="5" y1="65" x2="95" y2="65" strokeWidth="2" />
            <line x1="5" y1="75" x2="95" y2="75" strokeWidth="0.5" />
            <line x1="5" y1="85" x2="95" y2="85" strokeWidth="0.5" />
          </g>
          <g fill="currentColor" fontFamily="monospace" fontSize="8" fontWeight="bold">
            <text x="8.5" y="12.5" textAnchor="middle" dominantBaseline="middle">5</text>
            <text x="40" y="22.5" textAnchor="middle" dominantBaseline="middle">2</text>
            <text x="80" y="32.5" textAnchor="middle" dominantBaseline="middle">9</text>
            <text x="60" y="52.5" textAnchor="middle" dominantBaseline="middle">7</text>
            <text x="20" y="82.5" textAnchor="middle" dominantBaseline="middle">4</text>
            <text x="90" y="72.5" textAnchor="middle" dominantBaseline="middle">1</text>
            <text x="30" y="42.5" textAnchor="middle" dominantBaseline="middle">8</text>
            <text x="50" y="92.5" textAnchor="middle" dominantBaseline="middle">6</text>
            <text x="10" y="62.5" textAnchor="middle" dominantBaseline="middle">3</text>
          </g>
        </pattern>
      </defs>
      <rect x="-50vw" y="-50vh" width="300vw" height="300vh" fill="url(#sudoku-pattern)" />
    </svg>
  </div>
);

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0f1117]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Loading Sudoku...</p>
      </div>
    </div>
  );

  if (!user) return <Navigate to="/auth" />;
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <GlobalWatermark />
          <Routes>
            <Route path="/auth" element={<Auth />} />

            <Route path="/" element={<Navigate to="/play" replace />} />

            <Route path="/game/:difficulty" element={
              <RequireAuth>
                <Game />
              </RequireAuth>
            } />

            <Route path="/profile" element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            } />

            <Route path="/leaderboard" element={
              <RequireAuth>
                <Leaderboard />
              </RequireAuth>
            } />

            <Route path="/play" element={
              <RequireAuth>
                <SelectDifficulty />
              </RequireAuth>
            } />

            <Route path="/about" element={
              <RequireAuth>
                <About />
              </RequireAuth>
            } />

            <Route path="/help" element={
              <RequireAuth>
                <Help />
              </RequireAuth>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
