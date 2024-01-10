// src/screens/UserScreen.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  // add other fields as needed
});


console.log("user profile");
module.exports = mongoose.model('User', UserSchema);