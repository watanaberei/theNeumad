const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const auth0 = require('auth0');
const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const path = require('path');
const app = express();
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};
const dbURI = 'mongodb+srv://watanaberei:sshkey@cluster0.ciczjn3.mongodb.net/theNeumad-sandbox?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));
app.use(auth(config));



// Anyone can access the homepage
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  res.send('<a href="/admin">Admin Section</a>');
});
// requiresAuth checks authentication.
app.get('/admin', requiresAuth(), (req, res) =>
  res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
);
// User profile page
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});









const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
























// // src/server.js\

// // const cors = require('cors');
// const axios = require('axios');
// const mongoose = require('mongoose');
// const auth0 = require('auth0');
// const { auth } = require('express-openid-connect');
// const express = require('express');
// const path = require('path');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/authRoutes');
// const port = process.env.PORT || 3000;
// dotenv.config();

// const app = express();

// // MongoDB Connection
// const dbURI = 'mongodb+srv://watanaberei:sshkey@cluster0.ciczjn3.mongodb.net/theNeumad-sandbox?retryWrites=true&w=majority';
// mongoose.connect(dbURI)
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log('MongoDB connection error:', err));

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.AUTH0_CLIENT_SECRET,
//   baseURL: process.env.AUTH0_BASE_URL,
//   clientID: process.env.AUTH0_CLIENT_ID,
//   issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
// };


// // middleware
// // app.use(express.json());
// app.use(auth(config));
// app.use(authRoutes);
// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'ejs');
// // app.use(express.urlencoded({ extended: true }));
// // app.use(express.static(path.join(__dirname, 'public'))); 


// // Auth0 Routes
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });
// // app.get('/profile', requiresAuth(), (req, res) => {
//   //   res.send(JSON.stringify(req.oidc.user));
//   // });

// // SPA Fallback Route
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // // Start the Server
// // app.listen(port, () => {
// //   console.log(`Server listening on port ${port}`);
// // });