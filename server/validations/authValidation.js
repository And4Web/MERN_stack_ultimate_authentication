const {check} = require('express-validator');

exports.userSignupValidator = [
  check('name').not().isEmpty().withMessage('Name is required.'),
  check('email').isEmail().withMessage('invalid Email.'),
  check('email').not().isEmpty().withMessage('Email is required.'),
  check('password').not().isEmpty().withMessage('Password is required.'),
  check('password').isLength({min: 8}).withMessage('Password must be at least 8 character long.'),
];

exports.userSigninValidator = [
  check('email').isEmail().withMessage('invalid Email.'),
  check('email').not().isEmpty().withMessage('Email is required.'),
  check('password').not().isEmpty().withMessage('Password is required.'),
  check('password').isLength({min: 8}).withMessage('Password must be at least 8 character long.'),
];

exports.forgotPasswordValidator = [
  check('email').not().isEmpty().isEmail().withMessage("Enter a valid Email.")
]

exports.resetPasswordValidator = [
  check('newPassword').not().isEmpty().isLength({min: 8}).withMessage("Password must be at least 8 character long.")
]