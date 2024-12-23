const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Register a new user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if all fields are provided
  // if (!studentId || !studentName || !department || !year || !semester || !mobileNo || !email || !password) {
  //   return res.status(400).json({ msg: 'Please enter all fields' });
  // }

  // try {
  //   // Check if the user already exists
  //   let user = await User.findOne({ email });
  //   if (user) {
  //     return res.status(400).json({ msg: 'User already exists' });
  //   }
  try {
    // Find the user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).send('User not found');
    }


    // Hash the password
    const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    // Create a new user instance
    // user = new User({
    //   studentId,
    //   studentName,
    //   department,
    //   year,
    //   semester,
    //   mobileNo,
    //   email,
    //   password: hashedPassword,
    // });

    // Save the user to the database
    // await user.save();
    // res.status(201).json({ msg: 'User registered successfully' });
    res.redirect('/main');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
