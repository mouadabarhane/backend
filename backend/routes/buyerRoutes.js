const express = require('express');
const router = express.Router();
const Buyer = require('../models/Buyer'); // Assuming you have a Buyer model

// GET all buyers
router.get('/', async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ... Other buyer-related routes (POST, PUT, DELETE) as needed

module.exports = router;
