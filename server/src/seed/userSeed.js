const mongoose = require('mongoose');
const User = require('../models/User');

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});

    // Create a test user
    const testUser = new User({
      email: 'test@example.com',
      password: 'testpassword', // In production, this should be hashed
      name: 'Test User',
      stats: {
        gamesPlayed: 0,
        averageScore: 0,
        bonusesEarned: 0,
        totalScore: 0
      }
    });

    await testUser.save();
    console.log('Test user created successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

module.exports = seedUsers;