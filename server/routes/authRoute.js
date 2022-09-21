const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json("Hello this is test route.");
})
router.get('/signup', (req, res) => {
  res.json("Hello this is signup route.");
})

router.get('/', (req, res) => {
  res.json("Hello Anand!");
})

module.exports = router;