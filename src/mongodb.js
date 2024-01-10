const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Login
function login(email, password, callback) {
    const bcrypt = require('bcrypt');
    const MongoClient = require('mongodb@4.1.0').MongoClient;
    const client = new MongoClient('mongodb+srv://user:'+configuration.MONGO_PASSWORD +'@cluster0.bgd0ike.mongodb.net/?retryWrites=true&w=majority');
    
    client.connect(function (err) {
      if (err) return callback(err);
  
          const db = client.db('db-name');
      const users = db.collection('users');
  
      users.findOne({ email: email }, function (err, user) {
        if (err || !user) {
          client.close();
          return callback(err || new WrongUsernameOrPasswordError(email));
        }
  
        bcrypt.compare(password, user.password, function (err, isValid) {
          client.close();
  
          if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));
  
          return callback(null, {
              user_id: user._id.toString(),
              nickname: user.nickname,
              email: user.email
            });
        });
      });
    });
  }
  
// Create
function create(user, callback) {
    const bcrypt = require('bcrypt');
    const MongoClient = require('mongodb@4.1.0').MongoClient;
    const client = new MongoClient('mongodb+srv://user:'+configuration.MONGO_PASSWORD +'@cluster0.bgd0ike.mongodb.net/?retryWrites=true&w=majority');
  
    client.connect(function (err) {
      if (err) return callback(err);
  
      const db = client.db('db-name');
      const users = db.collection('users');
  
      users.findOne({ email: user.email }, function (err, withSameMail) {
        if (err || withSameMail) {
          client.close();
          return callback(err || new Error('the user already exists'));
        }
  
        bcrypt.hash(user.password, 10, function (err, hash) {
          if (err) {
            client.close();
            return callback(err);
          }
  
          user.password = hash;
          user.email_verified = false;
          users.insert(user, function (err, inserted) {
            client.close();
  
            if (err) return callback(err);
            callback(null);
          });
        });
      });
    });
  }
  
// Verify
function verify (email, callback) {
    const MongoClient = require('mongodb@4.1.0').MongoClient;
    const client = new MongoClient('mongodb+srv://user:'+configuration.MONGO_PASSWORD +'@cluster0.bgd0ike.mongodb.net/?retryWrites=true&w=majority');
  
    client.connect(function (err) {
      if (err) return callback(err);
  
      const db = client.db('db-name');
      const users = db.collection('users');
      const query = { email: email, email_verified: false };
  
      users.update(query, { $set: { email_verified: true } }, function (err, result) {
        client.close();
  
        if (err) return callback(err);
        callback(null, result.result.n > 0);
      });
    });
  }
// Change Password
function changePassword(email, newPassword, callback) {
    const bcrypt = require('bcrypt');
    const MongoClient = require('mongodb@4.1.0').MongoClient;
    const client = new MongoClient('mongodb+srv://user:'+configuration.MONGO_PASSWORD +'@cluster0.bgd0ike.mongodb.net/?retryWrites=true&w=majority');
  
    client.connect(function (err) {
      if (err) return callback(err);
  
      const db = client.db('db-name');
      const users = db.collection('users');
  
      bcrypt.hash(newPassword, 10, function (err, hash) {
        if (err) {
          client.close();
          return callback(err);
        }
  
        users.update({ email: email }, { $set: { password: hash } }, function (err, result) {
          client.close();
          if (err) return callback(err);
          callback(null, result.result.n > 0);
        });
      });
    });
  }
  
// Get User
function getByEmail(email, callback) {
    const MongoClient = require('mongodb@4.1.0').MongoClient;
    const client = new MongoClient('mongodb+srv://user:'+configuration.MONGO_PASSWORD +'@cluster0.bgd0ike.mongodb.net/?retryWrites=true&w=majority');
  
    client.connect(function (err) {
      if (err) return callback(err);
  
      const db = client.db('db-name');
      const users = db.collection('users');
  
      users.findOne({ email: email }, function (err, user) {
        client.close();
  
        if (err) return callback(err);
        if (!user) return callback(null, null);
  
        return callback(null, {
          user_id: user._id.toString(),
          nickname: user.nickname,
          email: user.email
        });
      });
    });
  }
  
// Delete User
function remove(id, callback) {
    const MongoClient = require('mongodb@4.1.0').MongoClient;
    const client = new MongoClient('mongodb+srv://user:'+configuration.MONGO_PASSWORD +'@cluster0.bgd0ike.mongodb.net/?retryWrites=true&w=majority');
  
    client.connect(function (err) {
      if (err) return callback(err);
  
      const db = client.db('db-name');
      const users = db.collection('users');
  
      users.remove({ email: id }, function (err) {
        client.close();
  
        if (err) return callback(err);
        callback(null);
      });
    });
  
  }
  