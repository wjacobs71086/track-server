const mongoose = require('mongoose');

/* This is the file that creates the Schema on the MongoDB database. You do NOT have to setup on MongoDB directly as this Schema will tell it the requirements it needs.
*/
const userSchema = new mongoose.Schema({
  email:{
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


mongoose.model('User', userSchema);