const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    token : String,
    balance: { type: Number, default: 0 },
  });
  

  
  // Create User Model
  const User = mongoose.model('User', userSchema);
  module.exports = User
