// // server.js
require('dotenv').config();
const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const cors = require('cors');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const path = require('path');




// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');



const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};


// database connection
const dbURI = 'mongodb+srv://watanaberei: sshkey@cluster0.ciczjn3.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Public route
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Protected route
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// Auth route
app.use(authRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});






// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const app = express();

// app.use(cors());

// const YELP_API_KEY = "Fwsh3t7WiFU1WRe_nv21roACJcb5EzffV6VDTjTwWnzTNg8YG57BDVhA4yedBHUKfw21PrRt--wpz4iW177jxNaDGkL3B9FlRX0rWvRXFcTse65DE2yQviCMfY53ZHYx";  // Replace with your actual Yelp API key

// app.get('/api/yelp/:store', async (req, res) => {
//   try {
//     const store = req.params.store;
//     const response = await axios.get(`https://api.yelp.com/v3/businesses/search?term=${store}&location=sanfrancisco`, {
//       headers: {
//         'Authorization': `Bearer ${YELP_API_KEY}`
//       }
//     });
//     res.send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Error fetching data from Yelp API' });
//   }
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
