const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Garment = require('../models/Garment');

// Start a new game - get 10 random garments
router.get('/start', async (req, res) => {
  try {
    // Get 5 original and 5 damaged garments randomly
    const originalGarments = await Garment.aggregate([
      { $match: { isOriginal: true } },
      { $sample: { size: 5 } }
    ]);

    const damagedGarments = await Garment.aggregate([
      { $match: { isOriginal: false } },
      { $sample: { size: 5 } }
    ]);

    // Combine and shuffle garments
    const garments = [...originalGarments, ...damagedGarments]
      .sort(() => Math.random() - 0.5)
      .map(garment => ({
        id: garment._id,
        imageUrl: garment.imageUrl,
        defects: garment.isOriginal ? [] : garment.defects
      }));

    res.json(garments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error starting game' });
  }
});

// Submit game results
router.post('/submit', async (req, res) => {
  try {
    const { userId, score, completedGarments } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user stats
    const newGamesPlayed = user.stats.gamesPlayed + 1;
    const newTotalScore = user.stats.totalScore + score;
    const newAverageScore = newTotalScore / newGamesPlayed;
    const newBonusesEarned = score >= 75 ? user.stats.bonusesEarned + 1 : user.stats.bonusesEarned;

    user.stats = {
      gamesPlayed: newGamesPlayed,
      averageScore: newAverageScore,
      bonusesEarned: newBonusesEarned,
      totalScore: newTotalScore
    };

    await user.save();

    res.json({
      message: 'Game results submitted successfully',
      stats: user.stats,
      bonusEarned: score >= 75
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting game results' });
  }
});

module.exports = router;