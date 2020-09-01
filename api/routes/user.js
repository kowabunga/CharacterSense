const express = require('express');
const router = express.Router();
const { register } = require('../controllers/user');
const { check } = require('express-validator');

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

module.exports = router;
