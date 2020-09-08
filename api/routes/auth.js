const express = require('express');
const router = express.Router();
const passport = require('passport');

const { getClientToken, getOAuthToken } = require('../controllers/auth');

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
    console.log(req.user);
    res.redirect(`http://localhost:3000/characters`);
  }
);

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('http://localhost:3000/');
// });

//@route    POST /auth/client_token
//@desc     Get access token from bnet
router.get('/client_token', getClientToken);

//@route    POST /auth/token
//@desc     Get access token from bnet
router.get('/oauth_token/:code', getOAuthToken);

module.exports = router;
