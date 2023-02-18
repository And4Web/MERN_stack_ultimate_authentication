const express = require('express');
const router = express.Router();

//import controllers
const {signup, signin, activateAccount} = require('../controllers/authController');

// import validators
const {userSignupValidator, userSigninValidator} = require("../validations/authValidation");
const{runValidation} = require('../validations');

router.get('/test', (req, res) => {
  res.send("Hello this is the test route.");
})
router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/account-activation', activateAccount);
router.post('/signin', userSigninValidator, runValidation, signin);

module.exports = router;