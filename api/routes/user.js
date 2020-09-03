const express = require('express');
const router = express.Router();
const {
  register,
  editPassword,
  login,
  getUser,
  addToken,
} = require('../controllers/user');
const { check } = require('express-validator');
const auth = require('../../middleware/auth');

// @route   POST /user/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    check('email').isEmail(),
    check('password').isLength(6),
    check('confirmPassword').custom((value, { req }) => {
      console.log(value, req.body.password);
      if (value !== req.body.password) {
        console.log('TRUE');
        throw new Error('Passwords do not match');
      }

      return true;
    }),
  ],
  register
);

// @route   POST /user/edit/password
// @desc    Register user
// @access  Private - Auth required
router.put(
  '/edit/password',
  [
    auth,
    check('password').isLength(6),
    check('confirmPassword').custom((value, { req }) => {
      console.log(value, req.body.password);
      if (value !== req.body.password) {
        console.log('TRUE');
        throw new Error('Passwords do not match');
      }

      return true;
    }),
  ],
  editPassword
);

// @route   GET /user/:jwt/add
// @desc    Add oauth token to user acc
// @access  Private - Auth required
router.put('/:jwt/add', auth, addToken);

// @route   GET /user/:jwt
// @desc    Register user
// @access  Private - Auth required
router.get('/', auth, getUser);

// @route   GET /user/login
// @desc    Login user
// @access  Public
router.post('/login', login);

module.exports = router;
