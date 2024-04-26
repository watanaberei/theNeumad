require('dotenv').config();

const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const User=require("./src/mongodb")
let bisectRight;
const bcrypt = require('bcrypt');
import('d3').then(d3 => {
  bisectRight = d3.bisectRight;
});

const jwt = require('jsonwebtoken')


app.use(express.json());

//fix this for production
let refreshTokens = []

app.post('/token', (req, res) => {
   const refreshToken = req.body.token
   if (refreshToken == null) return res.sendStatus(401)
   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const accessToken = generateAccessToken({ 
      name: user.name })
      res.json({ accessToken: accessToken })
   })
})

app.delete('/logout', (req, res) => {
   refreshTokens = refreshTokens.filter(token => token !== req.body.token)
   res.sendStatus(204)
})

app.post('/login', (req, res) => {
   const email = req.body.email;
   const password = req.body.password; // Assuming you're sending password in the request

   User.findOne({ email: email })
      .then(user => {
         if (!user) {
            return res.status(404).send('User not found');
         }

         // Check password
         bcrypt.compare(password, user.password)
            .then(isMatch => {
               if (!isMatch) {
                  return res.status(400).send('Invalid password');
               }

               // User is authenticated, generate tokens
               const userForToken = { name: user.email };
               const accessToken = generateAccessToken(userForToken);
               const refreshToken = jwt.sign(userForToken, process.env.REFRESH_TOKEN_SECRET);
               refreshTokens.push(refreshToken);
               res.json({ accessToken: accessToken, refreshToken: refreshToken });
            });
      })
      .catch(err => {
         console.error(err);
         res.status(500).send('Server error');
      });
});

// app.post('/login',  (req, res) => {
//    // Authenticate the user

//    const email = req.body.email
//    const user = { name: email }

//    const accessToken = generateAccessToken(user)
//    const refreshToken = jwt.sign(user, 
//    process.env.REFRESH_TOKEN_SECRET)
//    refreshTokens.push(refreshToken)
//    res.json({ accessToken: accessToken, 
//       refreshToken: refreshToken }) 
   
// })

function generateAccessToken(user) {
   return jwt.sign(user, 
      process.env.ACCESS_TOKEN_SECRET, { expiresIn: 
         '1500s' }) // { expiresIn: '1500s' })
}


// app.listen(4000)
const port = 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));

