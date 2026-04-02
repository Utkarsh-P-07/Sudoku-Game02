import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, UserPlus, Play } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { email, password } : { username, email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      loginUser(data.token, data);
      navigate(-1); // Changed to -1 as requested by user!
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/guest', {
        method: 'POST',
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Guest login failed');

      loginUser(data.token, data);
      navigate(-1); // Changed to -1 as requested!
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-[#f4f4f4] text-slate-900 font-sans">
      
      <Sidebar activeTab="" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        <span 
          className="absolute top-6 left-6 cursor-pointer hover:opacity-70 font-bold text-lg hidden md:block" 
          style={{ fontFamily: "'Caveat Brush', cursive" }}
          onClick={() => navigate(-1)}
        >
          &lt;Back
        </span>

        <h1 className="text-[64px] font-bold text-black mb-8" style={{ fontFamily: "'Caveat Brush', cursive" }}>
          Sudoku
        </h1>

        <div className="w-full max-w-sm bg-[#fdfdfd] p-8 rounded-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] border-[3px] border-black text-black">
          <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: "'Caveat Brush', cursive" }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg font-medium border border-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="flex flex-col gap-4 font-bold">
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-slate-300 bg-white focus:border-black outline-none transition-colors placeholder:text-slate-400"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-slate-300 bg-white focus:border-black outline-none transition-colors placeholder:text-slate-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-slate-300 bg-white focus:border-black outline-none transition-colors placeholder:text-slate-400"
              required
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 mt-2 bg-black hover:bg-slate-800 text-white rounded-xl text-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              style={{ fontFamily: "'Caveat Brush', cursive" }}
            >
              {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm text-slate-500 font-bold">
            <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-black font-extrabold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm font-bold">
              <span className="px-2 bg-[#fdfdfd] text-slate-400">Or</span>
            </div>
          </div>

          <button
            onClick={handleGuest}
            disabled={loading}
            className="w-full p-3 mt-6 border-2 border-black hover:bg-slate-100 rounded-xl text-xl text-black flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            style={{ fontFamily: "'Caveat Brush', cursive" }}
          >
            <Play size={20} fill="currentColor" />
            Play as Guest
          </button>
        </div>
      </div>
    </div>
  );
};
