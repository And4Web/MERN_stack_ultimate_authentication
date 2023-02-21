const express = require('express');
const router = express.Router();

const {getUser, updateUser} = require('../controllers/userController')
const {requireSignin} = require('../controllers/authController');

router.get('/:id', requireSignin, getUser);
router.put('/update', requireSignin, updateUser)

module.exports = router;