const express = require('express');
const router = express.Router();
const passport = require('passport');

// @route   GET /auth/bnet
// @desc    Authenticate with bnet
router.get('/bnet', passport.authenticate('bnet'));

// @route   GET /auth/bnet
// @desc    Authenticate with bnet
router.get(
  '/bnet/callback',
  passport.authenticate('bnet', {
    failureRedirect: 'http://localhost:3000/',
  }),
  (req, res) => {
    res.redirect(`http://localhost:3000/dashboard/${req.user.token}`);
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000/');
});

module.exports = router;
