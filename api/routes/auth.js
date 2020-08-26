const express = require('express');
const router = express.Router();
const passport = require('passport');

// @route   GET /auth/bnet
// @desc    Authenticate with bnet
router.get('/auth/bnet', passport.authenticate('bnet'));

// @route   GET /auth/bnet
// @desc    Authenticate with bnet
router.get(
  '/auth/bnet/callback',
  passport.authenticate('bnet', {
    failureRedirect: 'http://localhost:3000/dashboard/login',
  }),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard');
  }
);

// @route   GET /auth/bnet
// @desc    Authenticate with bnet

module.exports = router;
