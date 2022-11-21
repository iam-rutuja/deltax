const express = require('express');
const router = express.Router();

//controllers
const { signup, accountActivation, signin, forgotPassword, resetPassword } = require('../controller/auth');

//validators
const { signupValidator, signinValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validations/auth');
const { runValidation } = require('../validations');

//Authentication
router.post('/signup', signupValidator, runValidation, signup);
router.post('/account-activate', accountActivation);
router.post('/signin', signinValidator, runValidation, signin);

//forgot and reset password
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword);

module.exports = router;