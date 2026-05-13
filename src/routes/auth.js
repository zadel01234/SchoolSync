const express = require('express');
const router = express.Router();
const { register, login, setup2FA, verify2FA, forgotPassword, resetPassword } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/2fa/setup', authenticate, setup2FA);
router.post('/2fa/verify', verify2FA);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;