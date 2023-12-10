// // server.js
require('dotenv').config();
const express = require('express');
const { auth } = require('express-openid-connect');

const app = express();
const port = process.env.PORT || 3000;

// Auth0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
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
