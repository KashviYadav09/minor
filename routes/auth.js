const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Register a new user
router.post('/register', async (req, res) => {
  const { studentId, studentName, department, year, semester, mobileNo, email, password } = req.body;

  // Check if all fields are provided
  // if (!studentId || !studentName || !department || !year || !semester || !mobileNo || !email || !password) {
  //   return res.status(400).json({ msg: 'Please enter all fields' });
  // }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    user = new User({
      studentId,
      studentName,
      department,
      year,
      semester,
      mobileNo,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    // res.status(201).json({ msg: 'User registered successfully' });
    res.redirect('/login');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
