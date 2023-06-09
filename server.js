// server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

const YELP_API_KEY = "Fwsh3t7WiFU1WRe_nv21roACJcb5EzffV6VDTjTwWnzTNg8YG57BDVhA4yedBHUKfw21PrRt--wpz4iW177jxNaDGkL3B9FlRX0rWvRXFcTse65DE2yQviCMfY53ZHYx";  // Replace with your actual Yelp API key

app.get('/api/yelp/:store', async (req, res) => {
  try {
    const store = req.params.store;
    const response = await axios.get(`https://api.yelp.com/v3/businesses/search?term=${store}&location=sanfrancisco`, {
      headers: {
        'Authorization': `Bearer ${YELP_API_KEY}`
      }
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error fetching data from Yelp API' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
