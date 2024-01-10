
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  auth0Id: String,
  email: String,
  // add other fields as needed
});

module.exports = mongoose.model('User', userSchema);