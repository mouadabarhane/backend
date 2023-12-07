const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

// Register a user
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      // Other user data...
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user == null) {
    return res.status(400).json({ message: 'Cannot find user' });
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
