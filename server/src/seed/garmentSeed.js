const mongoose = require('mongoose');
const User = require('../models/User');
const Garment = require('../models/Garment');

const seedGarments = async () => {
  try {
    // Create a test user for reference
    const testUser = await User.findOne({ email: 'test@example.com' });
    if (!testUser) {
      console.log('No test user found. Please run userSeed first.');
      return;
    }

    // Clear existing garments
    await Garment.deleteMany({});

    // Sample garment data
    const garments = [
      {
        name: 'Perfect T-Shirt',
        imageUrl: '/images/garments/t-shirt-perfect.jpg',
        defects: [],
        isOriginal: true,
        createdBy: testUser._id
      },
      {
        name: 'Defective T-Shirt',
        imageUrl: '/images/garments/t-shirt-defective.jpg',
        defects: [
          {
            x: 150,
            y: 200,
            radius: 20,
            description: 'Loose thread'
          }
        ],
        isOriginal: false,
        createdBy: testUser._id
      },
      // Add more sample garments as needed
    ];

    // Insert garments
    await Garment.insertMany(garments);
    console.log('Garments seeded successfully');
  } catch (error) {
    console.error('Error seeding garments:', error);
  }
};

module.exports = seedGarments;