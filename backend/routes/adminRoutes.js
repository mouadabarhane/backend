const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // Assuming you have an Admin model

// GET all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific admin
router.get('/:id', getAdmin, (req, res) => {
  res.json(res.admin);
});

// POST create a new admin
router.post('/', async (req, res) => {
  const admin = new Admin({
    username: req.body.username,
    // Other admin data...
  });

  try {
    const newAdmin = await admin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update an admin
router.put('/:id', getAdmin, async (req, res) => {
  if (req.body.username != null) {
    res.admin.username = req.body.username;
  }
  // Update other admin data...

  try {
    const updatedAdmin = await res.admin.save();
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an admin
router.delete('/:id', getAdmin, async (req, res) => {
  try {
    await res.admin.remove();
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to fetch an admin by ID
async function getAdmin(req, res, next) {
  try {
    const admin = await Admin.findById(req.params.id);
    if (admin == null) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.admin = admin;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
