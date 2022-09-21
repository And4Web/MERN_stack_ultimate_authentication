const express = require('express');
const router = express.Router();

//import controllers
const {signup} = require('../controllers/authController');

router.get('/test', (req, res) => {
  res.send("Hello this is the test route.");
})
router.get('/signup', signup);

module.exports = router;