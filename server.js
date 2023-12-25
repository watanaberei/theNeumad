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

// MongoDB Connection
const dbURI = 'mongodb+srv://watanaberei:sshkey@cluster0.ciczjn3.mongodb.net/theNeumad-sandbox?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Auth0 Routes
app.use(auth(config));
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// SPA Fallback Route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});