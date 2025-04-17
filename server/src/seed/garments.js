const mongoose = require('mongoose');
const Garment = require('../models/Garment');

// Sample garment data
const garments = [
  {
    name: 'Perfect T-Shirt',
    imageUrl: 't-shirt-perfect.jpg',
    defects: [],
    isOriginal: true,
    createdBy: '6579a1f5c32c1234567890ab'
  },
  {
    name: 'Defective T-Shirt',
    imageUrl: 't-shirt-defective.jpg',
    defects: [
      {
        x: 300,
        y: 200,
        radius: 20,
        description: 'Hole in fabric'
      }
    ],
    isOriginal: false,
    createdBy: '6579a1f5c32c1234567890ab'
  },
  {
    name: 'Torn Jeans',
    imageUrl: 'images.jpeg',
    defects: [
      {
        x: 400,
        y: 250,
        radius: 40,
        description: 'Large tear in fabric'
      }
    ],
    isOriginal: false,
    createdBy: '6579a1f5c32c1234567890ab'
  },
  {
    name: 'Damaged Garment',
    imageUrl: 'images.jpeg',
    defects: [
      {
        x: 200,
        y: 250,
        radius: 20,
        description: 'Fabric damage'
      }
    ],
    isOriginal: false,
    createdBy: '6579a1f5c32c1234567890ab'
  },
  {
    name: 'Discolored Garment',
    imageUrl: 'images.jpeg',
    defects: [
      {
        x: 350,
        y: 200,
        radius: 30,
        description: 'Color discoloration'
      }
    ],
    isOriginal: false,
    createdBy: '6579a1f5c32c1234567890ab'
  },
  {
    name: 'Damaged Fabric',
    imageUrl: 'images.jpeg',
    defects: [
      {
        x: 300,
        y: 350,
        radius: 25,
        description: 'Fabric tear'
      }
    ],
    isOriginal: false,
    createdBy: '6579a1f5c32c1234567890ab'
  }
];

module.exports = garments;

// Function to seed the database
async function seedGarments() {
  try {
    // Clear existing garments
    await Garment.deleteMany({});
    
    // Insert new garments
    await Garment.insertMany(garments);
    
    console.log('Garments seeded successfully');
  } catch (error) {
    console.error('Error seeding garments:', error);
  }
}

module.exports = seedGarments;