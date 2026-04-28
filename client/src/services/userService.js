export const submitGameResult = async (difficulty, time, pointsEarned, mistakes, usedHint) => {
  try {
    const token = localStorage.getItem('sudokuToken');
    if (!token) return null;

    const base = import.meta.env.VITE_API_URL || '';
    const response = await fetch(`${base}/api/users/game-result`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ difficulty, time, pointsEarned, mistakes, usedHint })
    });

    if (!response.ok) {
      throw new Error('Failed to submit game result');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error submitting game result: ", err);
    return null;
  }
};

export const getLeaderboard = async (difficulty) => {
  try {
    const base = import.meta.env.VITE_API_URL || '';
    const response = await fetch(`${base}/api/users/leaderboard/${difficulty}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }

    return await response.json();
  } catch (err) {
    console.error("Error fetching leaderboard: ", err);
    return [];
  }
};
