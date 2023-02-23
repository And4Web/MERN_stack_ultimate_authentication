const express = require('express');
const router = express.Router();

//import controllers
const {signup, signin, activateAccount, forgotPassword, resetPassword} = require('../controllers/authController');

// import validators
const {userSignupValidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator} = require("../validations/authValidation");
const{runValidation} = require('../validations');

router.get('/test', (req, res) => {
  res.send("Hello this is the test route.");
})
router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', activateAccount);
router.post('/signin', userSigninValidator, runValidation, signin);

//forgot password reset route
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword )
router.put('/reset-password', resetPasswordValidator, runValidation, resetPassword )

module.exports = router;