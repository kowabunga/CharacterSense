import React, { useContext, useEffect } from 'react';
import WowContext from '../../../context/wow/wowContext';
import UserContext from '../../../context/user/userContext';
import axios from 'axios';

const Characters = ({ location }) => {
  const wowContext = useContext(WowContext);
  const {} = wowContext;

  const userContext = useContext(UserContext);
  const { user } = userContext;

  const { accessToken } = user;

  const test = async () => {
    const data = await axios.get(
      `https://us.api.blizzard.com/profile/user/wow?namespace=profile-us&locale=en_US&access_token=${accessToken}`
    );
    console.log(data.data);
  };

  return (
    <div className='container'>
      <button className='btn btn-primary mx-auto' onClick={test}>
        Show
      </button>
    </div>
  );
};

export default Characters;
