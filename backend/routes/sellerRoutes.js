const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller'); // Assuming you have a Seller model

// GET all sellers
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ... Other seller-related routes (POST, PUT, DELETE) as needed

module.exports = router;
