import React, { useEffect, useContext } from 'react';
import WowContext from '../../context/wow/wowContext';
import axios from 'axios';

const Characters = ({ location }) => {
  const wowContext = useContext(WowContext);
  const { oauthTokenInfo, getOAuthToken } = wowContext;

  //If token info is empty, redirect to home page
  useEffect(() => {
    console.log('ran');
    if (Object.keys(oauthTokenInfo).length === 0) {
      getOAuthToken(location);
    }
  }, []);

  const testLink = async () => {
    const response = await axios.get(
      `https://us.api.blizzard.com/profile/user/wow?namespace=profile-us&locale=en_US&access_token=${oauthTokenInfo.access_token}`
    );
    console.log(response.data);
  };

  console.log(oauthTokenInfo);
  //@TODO Also need to make user route to store tokens before pulling into app!
  return (
    <div className='container'>
      {!oauthTokenInfo.access_token ? (
        <a
          className='mx-auto'
          href={`https://us.battle.net/oauth/authorize?client_id=${process.env.REACT_APP_BNET_ID}&scope=wow.profile&redirect_uri=http://localhost:3000/characters&response_type=code&state=`}
        >
          Authorize
        </a>
      ) : (
        <div className='d-flex align-items-center justify-content-center col-6 mx-auto bg-light my-2'>
          Present
          <button className='btn btn-outline-primary' onClick={testLink}>
            Test Link Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Characters;
