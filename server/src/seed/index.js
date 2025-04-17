const mongoose = require('mongoose');
const seedUsers = require('./userSeed');
const seedGarments = require('./garmentSeed');
const path = require('path');
const fs = require('fs');

const runSeeds = async () => {
  try {
    // Create images directory if it doesn't exist
    const imagesDir = path.join(__dirname, '../../public/images/garments');
    fs.mkdirSync(imagesDir, { recursive: true });

    // Run seeds
    await seedUsers();
    await seedGarments();

    console.log('All seeds completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  }
};

// Connect to MongoDB and run seeds
mongoose.connect('mongodb://localhost:27017/quality-control-game')
  .then(() => {
    console.log('Connected to MongoDB');
    runSeeds();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });