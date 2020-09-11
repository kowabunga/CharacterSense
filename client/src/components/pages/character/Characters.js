import React, { useContext, useEffect } from 'react';
import WowContext from '../../../context/wow/wowContext';
import UserContext from '../../../context/user/userContext';
import axios from 'axios';

const Characters = ({ location }) => {
  const wowContext = useContext(WowContext);
  const {} = wowContext;

  const userContext = useContext(UserContext);
  const {
    user: { accessToken },
  } = userContext;

  useEffect(() => {
    console.log(accessToken);
  });

  return (
    <div className='container'>
      <button
        className='btn btn-primary mx-auto'
        onClick={() => console.log(accessToken)}
      >
        Show
      </button>
    </div>
  );
};

export default Characters;
