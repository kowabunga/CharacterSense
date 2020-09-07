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

//@route    POST /auth/client_token
//@desc     Get access token from bnet
router.get('/client_token', async (req, res) => {
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
    // console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
  }
});

//@route    POST /auth/token
//@desc     Get access token from bnet
router.get('/oauth_token/:code', async (req, res) => {
  /* original cURL request: 
  curl -X POST https://us.battle.net/oauth/token
    -u <developer client id>:<developer secret>
    -d redirect_uri=<redirect URI used in authorize request>
    -d scope=<space separated scopes>
    -d grant_type=authorization_code
    -d code=<authorization code>
  */
  try {
    //axios request based on cURL above
    console.log(req.params.code);
    const response = await axios.post(
      'https://us.battle.net/oauth/token',
      null,
      {
        params: {
          client_id: process.env.BNET_ID,
          client_secret: process.env.BNET_SECRET,
          grant_type: 'authorization_code',
          scope: 'wow.profile',
          redirect_uri: 'http://localhost:3000/characters',
          code: req.params.code,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
