import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/users/game-result
// @access  Private
router.post('/game-result', protect, async (req, res) => {
  try {
    const { difficulty, time, pointsEarned, mistakes, usedHint } = req.body;
    const user = req.user;

    // Calculate new best time
    let newBestTime = user.bestTimes?.[difficulty] ?? null;
    if (newBestTime === null || time < newBestTime) {
      newBestTime = time;
    }

    const newBadges = [...user.badges];
    const gamesPlayed = user.gamesPlayed + 1;

    const checkAndAddBadge = (badgeName) => {
      if (!newBadges.includes(badgeName)) newBadges.push(badgeName);
    };

    if (mistakes === 0) checkAndAddBadge('No Mistake');
    if (!usedHint) checkAndAddBadge('No Hint');
    if (time < 180 && difficulty === 'easy') checkAndAddBadge('Fast Solver');
    if (time < 300 && difficulty === 'hard') checkAndAddBadge('Lightning');
    
    if (gamesPlayed === 1) checkAndAddBadge('1 win');
    if (gamesPlayed === 10) checkAndAddBadge('10 wins');
    if (gamesPlayed === 50) checkAndAddBadge('50 wins');

    const newlyEarnedBadges = newBadges.filter(b => !user.badges.includes(b));

    // Update User
    user.points += pointsEarned;
    user.gamesPlayed = gamesPlayed;
    user.bestTimes[difficulty] = newBestTime;
    user.badges = newBadges;

    await user.save();

    res.json({
      newBestTime,
      newBadgesEarned: newlyEarnedBadges,
      updatedUser: user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/users/leaderboard/:difficulty
// @access  Public
router.get('/leaderboard/:difficulty', async (req, res) => {
  try {
    const { difficulty } = req.params;
    
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(400).json({ message: 'Invalid difficulty' });
    }

    // Find users where bestTimes[difficulty] is not null, sort ascending, limit 100
    const leaders = await User.find({ [`bestTimes.${difficulty}`]: { $ne: null } })
      .sort({ [`bestTimes.${difficulty}`]: 1 })
      .limit(100)
      .select(`username points bestTimes.${difficulty}`);

    // Map to a format expected by frontend
    const mappedLeaders = leaders.map(leader => ({
      uid: leader._id.toString(),
      displayName: leader.username,
      points: leader.points,
      bestTimes: leader.bestTimes
    }));

    res.json(mappedLeaders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
