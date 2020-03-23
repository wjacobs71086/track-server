const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = mongoose.model('User');


router.post('/signup', async (req,res) => {
  const { email, password } = req.body;
  const user = new User({email, password});
  
  // This is an async operation with MongoDB
  await user.save();
  res.send('Created');
});


module.exports = router;