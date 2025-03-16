const mongoose = require('mongoose');

const defectSchema = new mongoose.Schema({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  radius: {
    type: Number,
    required: true,
    default: 20 // Default radius for defect detection
  },
  description: {
    type: String,
    required: true
  }
});

const garmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  defects: [defectSchema],
  isOriginal: {
    type: Boolean,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Garment', garmentSchema);