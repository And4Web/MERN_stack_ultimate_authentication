const express = require('express');
const router = express.Router();

const {getUser, updateUser} = require('../controllers/userController')
const {requireSignin, adminMiddleware} = require('../controllers/authController');

router.get('/:id', requireSignin, getUser);
router.put('/update', requireSignin, updateUser)
router.put('/admin', requireSignin, adminMiddleware, updateUser)

module.exports = router;