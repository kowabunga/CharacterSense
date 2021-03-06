const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const {
  registerUser,
  loginUser,
  editPassword,
  getUser,
  updateUserOAuthToken,
} = require('../controllers/users');

//@route    GET /users/user
//@desc     Get user information
//@access   Private
router.get('/user', auth, getUser);

router.put('/user/addToken', auth, updateUserOAuthToken);

//@route    POST /users/register
//@desc     Register user with CharacterSense
//@access   Public
router.post(
  '/register',
  [
    check('email', 'Email already in use.').isEmail(),
    check('password', 'Password must be at least six characters').isLength(6),
    check('confirmPassword').custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password)
        throw new Error('Passwords do not match');
      return true;
    }),
  ],
  registerUser
);

//@route    POST /users/login
//@desc     Log user in to CharacterSense
//@access   Public
router.post('/login', loginUser);

//@route    PUT /users/edit/password
//@desc     Edit user password
//@access   Private
router.put(
  '/edit/password',
  [
    auth,
    check('password').isLength(6),
    check('confirmPassword').custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password)
        throw new Error('Passwords do not match');
      return true;
    }),
  ],
  editPassword
);
module.exports = router;
