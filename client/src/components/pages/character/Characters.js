import React, { useContext, useEffect } from 'react';
import WowContext from '../../../context/wow/wowContext';
import UserContext from '../../../context/user/userContext';
import axios from 'axios';

const Characters = ({ location }) => {
  const wowContext = useContext(WowContext);
  const { oauthTokenInfo } = wowContext;

  const userContext = useContext(UserContext);
  const {
    user: { accessToken },
  } = userContext;

  useEffect(() => {
    console.log(accessToken);
  });

  const testLink = async () => {
    const response = await axios.get(
      `https://us.api.blizzard.com/profile/user/wow?namespace=profile-us&locale=en_US&access_token=${oauthTokenInfo.access_token}`
    );
    console.log(response.data);
  };

  return (
    <div className='container'>
      {!accessToken ? (
        <a
          className='mx-auto'
          href={`https://us.battle.net/oauth/authorize?client_id=${process.env.REACT_APP_BNET_ID}&scope=wow.profile&redirect_uri=http://localhost:3000/auth&response_type=code&state=`}
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
