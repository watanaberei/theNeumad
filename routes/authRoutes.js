// basic.js
const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');


const app = express();

// app.use(auth());

// app.use(
//   auth({
//     authRequired: false,
//   })
// );

app.use(
  auth({
    routes: {
      // Override the default login route to use your own login route as shown below
      login: false,
      // Pass a custom path to redirect users to a different
      // path after logout.
      postLogoutRedirect: '/custom-logout',
      // Override the default callback route to use your own callback route as shown below
    },
  })
);


// app.get('/', (req, res) => {
//   res.send(`hello ${req.oidc.user.sub}`);
// });


// Anyone can access the homepage
// app.get('/', (req, res) => {
//   res.send('<a href="/admin">Admin Section</a>');
// });
  
  app.get('/login', (req, res) =>
    res.oidc.login({
      returnTo: '/profile',
      authorizationParams: {
        redirect_uri: 'http://localhost:3000/callback',
      },
    })
  );
  
  app.get('/custom-logout', (req, res) => res.send('Bye!'));
  
  // requiresAuth checks authentication.
  app.get('/admin', requiresAuth(), (req, res) =>
    res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
  );

  
  //   app.get('/callback', (req, res) =>
//   res.oidc.callback({
//     redirectUri: 'http://localhost:3000/callback',
//   })
// );

// app.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
//   res.oidc.callback({
//     redirectUri: 'http://localhost:3000/callback',
//   })
// );

app.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
res.oidc.callback({
  redirectUri: 'http://localhost:3000/callback',
})
);


app.post('/login', express.urlencoded({ extended: false }), (req, res) =>
res.oidc.callback({
  redirectUri: 'http://localhost:3000/login',
})
);

  
  module.exports = app;


















// const { Router } = require('express');
// const authController = require('../controllers/authController');
// const { auth } = require('express-openid-connect');
 
// const router = Router();

// router.get('/signup', authController.signup_get);
// router.post('/signup', authController.signup_post);
// router.get('/login', authController.login_get);
// router.post('/login', authController.login_post);

// module.exports = router;









// const { Router } = require('express');
// const authController = require('../controllers/authController');
// const { auth } = require('express-openid-connect');

// app.use(
//     auth({
//       routes: {
//         // Override the default login route to use your own login route as shown below
//         login: false,
//         // Pass a custom path to redirect users to a different
//         // path after logout.
//         postLogoutRedirect: '/custom-logout',
//         // Override the default callback route to use your own callback route as shown below
//       },
//     })
//   );

  
// app.get('/login', (req, res) =>
//   res.oidc.login({
//     returnTo: '/profile',
//     authorizationParams: {
//       redirect_uri: 'http://localhost:3000/callback',
//     },
//   })
// );

// app.get('/custom-logout', (req, res) => res.send('Bye!'));

// app.get('/callback', (req, res) =>
//   res.oidc.callback({
//     redirectUri: 'http://localhost:3000/callback',
//   })
// );

// app.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
//   res.oidc.callback({
//     redirectUri: 'http://localhost:3000/callback',
//   })
// );

// module.exports = router;