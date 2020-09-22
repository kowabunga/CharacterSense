import React, { useContext, useEffect } from 'react';
import WowContext from '../../../context/wow/wowContext';
import UserContext from '../../../context/user/userContext';
import axios from 'axios';

const Characters = ({ location }) => {
  const wowContext = useContext(WowContext);
  const {} = wowContext;

  const userContext = useContext(UserContext);
  const { user, checkIfTokenValid } = userContext;

  const { accessToken } = user;

  const test = async () => {
    const data = await axios.get(
      `https://us.api.blizzard.com/profile/user/wow?namespace=profile-us&locale=en_US&access_token=${accessToken}`
    );
    console.log(data.data);
  };

  const test2 = async () => {
    console.log(user.accessToken);
    console.log(await checkIfTokenValid(user.accessToken));
  };

  return (
    <div className='container'>
      <button className='btn btn-primary mr-3' onClick={test}>
        Get Characters
      </button>

      <button className='btn btn-secondary' onClick={test2}>
        Check Token Validity
      </button>
    </div>
  );
};

export default Characters;
