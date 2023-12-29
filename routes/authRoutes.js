const { Router } = require('express');
const authController = require('../controllers/authController');
const { auth } = require('express-openid-connect');
 
const router = Router();

router.get('/signup', auth.signup_get);
router.post('/signup', auth.signup_post);
router.get('/login', auth.login_get);
router.post('/login', auth.login_post);

module.exports = router;

