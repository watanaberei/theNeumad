// server.js
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();


const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path.join(__dirname, 'src', 'screens'));
const dbURI = 'mongodb+srv://user:sshkey@cluster0.bgd0ike.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => res.render('index'));
app.use(authRoutes);


// const port = process.env.PORT;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });




// const port = process.env.PORT || 3000; // Fallback to 3000 if process.env.PORT is undefined

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


































// const express = require('express');
// const { requiresAuth } = require('express-openid-connect');
// const { auth } = require('express-oauth2-jwt-bearer');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const dotenv = require('dotenv');
// const cors = require('cors');
// const axios = require('axios');
// const mongoose = require('mongoose');
// const auth0 = require('auth0');

// const path = require('path');
// const { requiredScopes } = require('express-oauth2-jwt-bearer');
// const checkScopes = requiredScopes('read:messages');

// console.log(process.env.AUTH0_CLIENT_SECRET);
// const checkJwt = auth({
//   audience: process.env.AUTH0_API_IDENTIFIER,
//   issuerBaseURL: `${process.env.AUTH0_ISSUER_BASE_URL}`,
// });

// const app = express();
// app.use(checkJwt);

// const dbURI = 'mongodb+srv://user:sshkey@cluster0.bgd0ike.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(dbURI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));



// app.post('/logout', async (req, res) => { 
//     const { username, password } = req.body;     
// try { 
//         let user = await User.findOne({ email: username }) 
//         req.session.userId = user.id; 
 
//         console.log(req.session); 
 
//         res.redirect('/dashboard') 
 
//     } catch (err) { 
//         console.log(err); 
//         res.json({ msg: 'Server Error! Please reload page' }); 
//     } 
// }) 




// app.use(
//   auth({
//     issuer: process.env.AUTH0_ISSUER_BASE_URL,
//     jwksUri: process.env.AUTH0_JWKS_URI,
//     audience: process.env.AUTH0_API_IDENTIFIER, 
//     baseURL: process.env.AUTH0_BASE_URL,
//     clientID: process.env.AUTH0_CLIENT_ID,
//     routes: {
//       // Pass custom options to the login method by overriding the default login route
//       login: false,
//       // Pass a custom path to the postLogoutRedirect to redirect users to a different
//       // path after login, this should be registered on your authorization server.
//       postLogoutRedirect: '/custom-logout',
//       callback: false,
//     },
//   })
// );

// console.log("Access Token Secret:", process.env.AUTH0_CLIENT_SECRET);
// console.log("Refresh Token Secret:", process.env.REFRESH_TOKEN_SECRET);
// console.log("Auth0 Client Secret:", process.env.AUTH0_CLIENT_SECRET);
// console.log("Auth0 Client ID:", process.env.AUTH0_CLIENT_ID);
// console.log("Auth0 API Identifier:", process.env.AUTH0_API_IDENTIFIER);
// console.log("Auth0 Issuer Base URL:", process.env.AUTH0_ISSUER_BASE_URL);
// console.log("Auth0 JWKS URI:", process.env.AUTH0_JWKS_URI);

// app.get('/', (req, res) => res.send('Welcome!'));

// app.get('/profile', requiresAuth(), (req, res) =>
//   res.send(`hello ${req.oidc.user.sub}`)
// );

// app.get('/login', (req, res) =>
//   res.oidc.login({
//     returnTo: '/profile',
//     authorizationParams: {
//       redirect_uri: 'http://localhost:3000/callback',
//     },
//   })
// );



// app.get('/custom-logout', (req, res) => res.send('Bye!'));

// // app.get('/callback', (req, res) =>
// //   res.oidc.callback({
// //     redirectUri: 'http://localhost:3000/callback',
// //   })
// // );


// app.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
//   res.oidc.callback({
//     redirectUri: 'http://localhost:3000/callback',
//   })
// );


// const port = process.env.PORT;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });



// module.exports = app;





































// // src/server.js\
// const dotenv = require('dotenv');
// dotenv.config();
// const cors = require('cors');
// const axios = require('axios');
// const mongoose = require('mongoose');
// const auth0 = require('auth0');
// const express = require('express');
// const { requiresAuth } = require('express-openid-connect');
// const { auth } = require('express-oauth2-jwt-bearer');

// const path = require('path');
// const authRoutes = require('./routes/authRoutes');
// const app = express();

// const { requiredScopes } = require('express-oauth2-jwt-bearer');
// const checkScopes = requiredScopes('read:messages');

// console.log(process.env.AUTH0_CLIENT_SECRET);
// const checkJwt = auth({
//   audience: process.env.AUTH0_API_IDENTIFIER,
//   issuerBaseURL: `${process.env.AUTH0_ISSUER_BASE_URL}`,
// });
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.AUTH0_CLIENT_SECRET,
//   baseURL: process.env.AUTH0_BASE_URL,
//   clientID: process.env.AUTH0_CLIENT_ID,
//   issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
// };
// const dbURI = 'mongodb+srv://user:sshkey@cluster0.ciczjn3.mongodb.net/theNeumad-sandbox?retryWrites=true&w=majority';
// mongoose.connect(dbURI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // This route doesn't need authentication
// app.get('/api/public', function(req, res) {
//   res.json({
//     message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
//   });
// });

// // This route needs authentication
// app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//   });
// });

// // app.use(authRoutes);
// app.use(auth(config));
// app.use(
//   auth({
//     routes: {
//       // Override the default login route to use your own login route as shown below
//       login: false,
//       // Pass a custom path to redirect users to a different
//       // path after logout.
//       postLogoutRedirect: '/custom-logout',
//       // Override the default callback route to use your own callback route as shown below
//     },
//   })
// );




// // Anyone can access the homepage
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//   res.send('<a href="/admin">Admin Section</a>');
// });
// app.get('/login', (req, res) =>
//   res.oidc.login({
//     returnTo: '/profile',
//     authorizationParams: {
//       redirect_uri: 'http://localhost:3000/callback',
//     },
//   })
// );
// app.get('/custom-logout', (req, res) => res.send('Bye!'));
// // requiresAuth checks authentication.
// app.get('/admin', requiresAuth(), (req, res) =>
//   res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
// );
// // User profile page
// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


// app.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
//   res.oidc.callback({
//     redirectUri: 'http://localhost:3000/callback',
//   })
// );


// const port = process.env.PORT;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });



// module.exports = app;
































// const dotenv = require('dotenv');
// dotenv.config();
// const cors = require('cors');
// const axios = require('axios');
// const mongoose = require('mongoose');
// const auth0 = require('auth0');
// const express = require('express');
// const { requiresAuth } = require('express-openid-connect');
// const { auth } = require('express-oauth2-jwt-bearer');
// const protectedRoutes = require('./routes/protectedRoutes'); // Adjust path as necessary


// const app = express();

// const path = require('path');
// const authRoutes = require('./routes/authRoutes');


// const { requiredScopes } = require('express-oauth2-jwt-bearer');
// const checkScopes = requiredScopes('read:messages');

// console.log(process.env.AUTH0_CLIENT_SECRET);

// const checkJwt = auth({
//   audience: 'https://dev-6rixmw8fmaozoez8.us.auth0.com/api/v2/',
//   issuerBaseURL: `https://dev-6rixmw8fmaozoez8.us.auth0.com`,
// });

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.AUTH0_CLIENT_SECRET,
//   baseURL: process.env.AUTH0_BASE_URL,
//   clientID: process.env.AUTH0_CLIENT_ID,
//   issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
// };

// // MongoDB connection URI
// const dbURI = 'mongodb+srv://user:sshkey@cluster0.ciczjn3.mongodb.net/theNeumad-sandbox?retryWrites=true&w=majority';
// mongoose.connect(dbURI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // This route doesn't need authentication
// app.get('/api/public', function(req, res) {
//   res.json({
//     message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
//   });
// });

// // This route needs authentication
// app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//   });
// });

// // Apply checkJwt middleware to secured routes
// app.use('/api', checkJwt, protectedRoutes);


// // app.use(authRoutes);
// app.use(auth(config));
// app.use(
//   auth({
//     routes: {
//       // Override the default login route to use your own login route as shown below
//       login: false,
//       // Pass a custom path to redirect users to a different
//       // path after logout.
//       postLogoutRedirect: '/custom-logout',
//       // Override the default callback route to use your own callback route as shown below
//     },
//   })
// );




// // Anyone can access the homepage
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
//   res.send('<a href="/admin">Admin Section</a>');
// });

// app.get('/login', (req, res) =>
//   res.oidc.login({
//     returnTo: '/profile',
//     authorizationParams: {
//       redirect_uri: 'http://localhost:3000/callback',
//     },
//   })
// );

// app.get('/custom-logout', (req, res) => res.send('Bye!'));
// // requiresAuth checks authentication.
// app.get('/admin', requiresAuth(), (req, res) =>
//   res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
// );

// // User profile page
// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });


// app.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
//   res.oidc.callback({
//     redirectUri: 'http://localhost:3000/callback',
//   })
// );


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });



// module.exports = app;
























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