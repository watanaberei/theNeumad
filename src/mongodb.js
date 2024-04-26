const mongoose = require('mongoose'); 

mongoose.connect("mongodb+srv://user:sshkey@cluster0.bgd0ike.mongodb.net/")
.then(() => {
    console.log("MongoDB connected");
})  
.catch(() => {
  console.log("MongoDB connection failed");
})

const UserSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// module.exports = mongoose.model('Users', UserSchema);
const User = new mongoose.model('User', UserSchema);

module.exports = User;