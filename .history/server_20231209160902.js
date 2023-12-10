// // server.js

// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const app = express();

// app.use(cors());

// const YELP_API_KEY = process.env.YELP_API_KEY;  // Replace with your actual Yelp API key

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

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
