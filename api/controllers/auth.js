const axios = require('axios');

exports.getClientToken = async (req, res) => {
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
    // console.error(error);
  }
};

exports.getOAuthToken = async (req, res) => {
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
    const response = await axios.post(
      'https://us.battle.net/oauth/token',
      null,
      {
        params: {
          client_id: process.env.BNET_ID,
          client_secret: process.env.BNET_SECRET,
          grant_type: 'authorization_code',
          scope: 'wow.profile',
          redirect_uri: 'http://localhost:3000/auth',
          code: req.params.code,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    // console.error(error);
  }
};
