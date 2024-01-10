// protectedRoutes.js

const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

// Handler for a protected route
router.get('/protected', requiresAuth(), (req, res) => {
  res.json({
    message: 'This is a protected route. You are authenticated.',
    user: req.oidc.user
  });
});

module.exports = router;
