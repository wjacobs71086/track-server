const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
// using a keyword "function" instead of arrow function because the .pre uses keyword "this" to reference the user and not the global component.
userSchema.pre('save', function(next) {
  const user = this;
  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) return next(err);
      user.password = hash;
      next();
    })
  });
});

userSchema.methods.comparePassword = function(candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if(err) return reject(err);
      if (!isMatch) return reject(false);
      // if there is not an error, and the password matches then we sent a resolve from our promise.
      resolve(true);
    });
  })
};


mongoose.model('User', userSchema);