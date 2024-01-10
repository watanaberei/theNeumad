// routes/authRoutes.js
const authenticateToken = require('../middleware/authenticateToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;

app.post('/login', (req, res) => {
  // Authenticate User
  const accessToken = jwt.sign(user, authenticateToken);
  const { email, password } = req.body;
  const client = new MongoClient('mongodb+srv://user:' + process.env.MONGO_PASSWORD + '@cluster0.bgd0ike.mongodb.net/?retryWrites=true&w=majority');

  client.connect(err => {
    if (err) {
      client.close();
      return res.status(500).json({ error: 'Database connection error' });
    }

    const db = client.db('db-name');
    const users = db.collection('users');

    users.findOne({ email: email }, (err, user) => {
      if (err || !user) {
        client.close();
        return res.status(401).json({ error: 'Wrong username or password' });
      }

      bcrypt.compare(password, user.password, (err, isValid) => {
        client.close();

        if (err || !isValid) {
          return res.status(401).json({ error: 'Wrong username or password' });
        }

        const accessToken = jwt.sign({
          user_id: user._id.toString(),
          nickname: user.nickname,
          email: user.email
        }, process.env.ACCESS_TOKEN_SECRET);

        res.json({ accessToken: accessToken });
      });
    });
  });
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
    if (err) {
      console.error("Error signing token:", err);
      return res.status(500).send("Error generating token");
    }
    res.json({ accessToken: token });
  });
});


app.get('/profile', authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../src/screens/UserScreen.js'));
});















// const express = require('express');
// const { requiresAuth } = require('express-openid-connect');
// const router = express.Router();
// const authController = require('../controllers/authController'); // Adjust the path as needed

// router.get('/login', authController.login_get);
// router.post('/login', authController.login_post);
// router.get('/logout', authController.logout);
// router.get('/profile', requiresAuth(), authController.profile);


// router.get('/protected-route', requiresAuth(), (req, res) => {
//   // Logic for a protected route
// });


// module.exports = router;




















// // basic.js
// const express = require('express');
// const { auth, requiresAuth } = require('express-openid-connect');


// const app = express();

// // app.use(auth());

// // app.use(
// //   auth({
// //     authRequired: false,
// //   })
// // );

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


// // app.get('/', (req, res) => {
// //   res.send(`hello ${req.oidc.user.sub}`);
// // });


// // Anyone can access the homepage
// // app.get('/', (req, res) => {
// //   res.send('<a href="/admin">Admin Section</a>');
// // });
  
//   app.get('/login', (req, res) =>
//     res.oidc.login({
//       returnTo: '/profile',
//       authorizationParams: {
//         redirect_uri: 'http://localhost:3000/callback',
//       },
//     })
//   );
  
//   app.get('/custom-logout', (req, res) => res.send('Bye!'));
  
//   // requiresAuth checks authentication.
//   app.get('/admin', requiresAuth(), (req, res) =>
//     res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
//   );

  
//   //   app.get('/callback', (req, res) =>
// //   res.oidc.callback({
// //     redirectUri: 'http://localhost:3000/callback',
// //   })
// // );

// // app.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
// //   res.oidc.callback({
// //     redirectUri: 'http://localhost:3000/callback',
// //   })
// // );

// app.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
// res.oidc.callback({
//   redirectUri: 'http://localhost:3000/callback',
// })
// );


// app.post('/login', express.urlencoded({ extended: false }), (req, res) =>
// res.oidc.callback({
//   redirectUri: 'http://localhost:3000/login',
// })
// );

  
//   module.exports = app;


















// // const { Router } = require('express');
// // const authController = require('../controllers/authController');
// // const { auth } = require('express-openid-connect');
 
// // const router = Router();

// // router.get('/signup', authController.signup_get);
// // router.post('/signup', authController.signup_post);
// // router.get('/login', authController.login_get);
// // router.post('/login', authController.login_post);

// // module.exports = router;









// // const { Router } = require('express');
// // const authController = require('../controllers/authController');
// // const { auth } = require('express-openid-connect');

// // app.use(
// //     auth({
// //       routes: {
// //         // Override the default login route to use your own login route as shown below
// //         login: false,
// //         // Pass a custom path to redirect users to a different
// //         // path after logout.
// //         postLogoutRedirect: '/custom-logout',
// //         // Override the default callback route to use your own callback route as shown below
// //       },
// //     })
// //   );

  
// // app.get('/login', (req, res) =>
// //   res.oidc.login({
// //     returnTo: '/profile',
// //     authorizationParams: {
// //       redirect_uri: 'http://localhost:3000/callback',
// //     },
// //   })
// // );

// // app.get('/custom-logout', (req, res) => res.send('Bye!'));

// // app.get('/callback', (req, res) =>
// //   res.oidc.callback({
// //     redirectUri: 'http://localhost:3000/callback',
// //   })
// // );

// // app.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
// //   res.oidc.callback({
// //     redirectUri: 'http://localhost:3000/callback',
// //   })
// // );

// // module.exports = router;