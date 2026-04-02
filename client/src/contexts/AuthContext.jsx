import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('sudokuToken');
    if (!token) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!res.ok) throw new Error('Invalid token');
      
      const data = await res.json();
      setUser({ uid: data._id, email: data.email, isAnonymous: data.isGuest });
      setProfile({
        displayName: data.username,
        points: data.points,
        gamesPlayed: data.gamesPlayed,
        bestTimes: data.bestTimes,
        badges: data.badges,
        isGuest: data.isGuest
      });
    } catch (err) {
      console.error(err);
      localStorage.removeItem('sudokuToken');
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const loginUser = (token, userData) => {
    localStorage.setItem('sudokuToken', token);
    setUser({ uid: userData._id, email: userData.email, isAnonymous: userData.isGuest });
    setProfile({ ...userData, displayName: userData.username });
  };

  const logoutUser = () => {
    localStorage.removeItem('sudokuToken');
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, setProfile, loginUser, logoutUser, refetchUser: fetchUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
