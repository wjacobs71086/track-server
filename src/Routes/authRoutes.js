const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  try {
    // This is an async operation with MongoDB
    await user.save();
    const token = jwt.sign({userId: user._id}, 'VoodooRanger');
    res.send({token});
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req,res) => {
 const { email, password } = req.body;
  if( !email || !password ) return res.status(422).send({error: 'Missing credentials'});

  const user = await User.findOne({email});
  if(!user) return res.status(404).send({error: 'Invalid Credentials'});
  
  try {
    await user.comparePassword(password);
    const token = jwt.sign({userId: user._id}, 'VoodooRanger')
    res.send({token});
  } catch (err) {
    return res.status(422).send({error: 'Invalid Credentials'})
  }
  


});


module.exports = router;
