// routes/userRoutes.js
const authenticateToken = require('../middleware/authenticateToken');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserProfile');
const { requiresAuth } = require('express-openid-connect');

router.get('/user-profile', requiresAuth(), userController.getUserProfile);
router.post('/user-profile', requiresAuth(), userController.updateUserProfile);

app.get('/profile', authenticateToken, (req, res) => {
  // User profile logic

});



module.exports = router;












// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/UserProfile');
// const { requiresAuth } = require('express-openid-connect');

// router.get('/user-profile', requiresAuth(), userController.getUserProfile);
// router.post('/user-profile', requiresAuth(), userController.updateUserProfile);

// module.exports = router;
