const express = require('express');
const router = express.Router();

//import controllers
const {signup} = require('../controllers/authController');

// import validators
const {userSignupValidator} = require("../validations/authValidation");
const{runValidation} = require('../validations');

router.get('/test', (req, res) => {
  res.send("Hello this is the test route.");
})
router.post('/signup',userSignupValidator, runValidation, signup);

module.exports = router;