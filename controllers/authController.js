// controllers/authController.js
module.exports.signup_get = (req, res) => {
    console.log("signup get");
    res.render('SignupScreen');
};

module.exports.login_get = (req, res) => {
    console.log("login get");
    res.render('LoginScreen');
};

module.exports.login_post = (req, res) => {
    console.log("login post");
    console.log(req.body);
    res.send('LoginScreen');
};

module.exports.signup_post = (req, res) => {
    res.send('SignupScreen');
};





































// const User = require('../models/User');
// const { auth } = require('express-openid-connect');


// exports.login_get = (req, res) => {
//     // Your logic for rendering the login page
// };

// exports.login_post = async (req, res) => {
//     const { user } = req.oidc;
//     try {
//         let dbUser = await User.findOne({ auth0Id: user.sub });
//         if (!dbUser) {
//             dbUser = await User.create({ auth0Id: user.sub, email: user.email });
//         }
//         // Additional logic if needed
//     } catch (err) {
//         console.error('Error processing login:', err);
//         res.status(500).send('Server error');
//     }
// };

// exports.logout = (req, res) => {
//     req.oidc.logout({ returnTo: 'your_post_logout_redirect_uri' });
// };

// exports.profile = (req, res) => {
//     res.json(req.oidc.user);
// };


// exports.updateProfile = async (req, res) => {
//     try {
//         const { user } = req.oidc;
//         const updatedData = { /* ...user data from request... */ };

//         await User.findOneAndUpdate({ auth0Id: user.sub }, updatedData, { new: true });
//         res.send('Profile updated');
//     } catch (err) {
//         console.error('Error updating profile:', err);
//         res.status(500).send('Server error');
//     }
// };





// module.exports.signup_get = (req, res) => {
//     console.log("signup get");
//     res.render('signup');
// };

// module.exports.login_get = (req, res) => {
//     console.log("login get");
//     res.render('login');
// };

// module.exports.signup_post = (req, res) => {
//     res.send('new signup');
// };

// module.exports.login_post = (req, res) => {
//     console.log("login post");
//     console.log(req.body);
//     res.send('user login');
// };

