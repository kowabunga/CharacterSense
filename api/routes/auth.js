const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios');

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

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000/');
});

//@route    POST /auth/token
//@desc     Get access token from bnet
router.post('/token', async (req, res) => {
  //original cURL request: curl -u {client_id}:{client_secret} -d grant_type=client_credentials https://us.battle.net/oauth/token
  try {
    //axios request based on cURL above
    const response = await axios.post(
      'https://us.battle.net/oauth/token',
      null,
      {
        params: {
          client_id: process.env.BNET_ID,
          client_secret: process.env.BNET_SECRET,
          grant_type: 'client_credentials',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
