const express = require('express');
const router = express.Router();
const Garment = require('../models/Garment');

// Add a new garment
router.post('/', async (req, res) => {
  try {
    const { name, imageUrl, defects, isOriginal } = req.body;
    const createdBy = req.user.id; // Assuming middleware sets req.user

    const garment = new Garment({
      name,
      imageUrl,
      defects,
      isOriginal,
      createdBy
    });

    await garment.save();
    res.status(201).json(garment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating garment' });
  }
});

// Get all garments
router.get('/', async (req, res) => {
  try {
    const garments = await Garment.find();
    res.json(garments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching garments' });
  }
});

// Update garment defects
router.patch('/:id/defects', async (req, res) => {
  try {
    const { defects } = req.body;
    const garment = await Garment.findById(req.params.id);

    if (!garment) {
      return res.status(404).json({ message: 'Garment not found' });
    }

    garment.defects = defects;
    await garment.save();

    res.json(garment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating garment defects' });
  }
});

// Delete a garment
router.delete('/:id', async (req, res) => {
  try {
    const garment = await Garment.findById(req.params.id);

    if (!garment) {
      return res.status(404).json({ message: 'Garment not found' });
    }

    await garment.remove();
    res.json({ message: 'Garment removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting garment' });
  }
});

module.exports = router;