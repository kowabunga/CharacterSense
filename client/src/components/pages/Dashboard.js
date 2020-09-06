import React, { useEffect, useContext, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import WowContext from '../../context/wow/wowContext';

const Dashboard = () => {
  const wowContext = useContext(WowContext);
  const { tokenInfo, getCharacters, apiError } = wowContext;

  const history = useHistory();

  //If token info is empty, redirect to home page
  useEffect(() => {
    if (Object.keys(tokenInfo).length === 0) {
      history.push('/');
    }
    getCharacters();
  }, []);

  return (
    <div className='container'>
      {((Object.keys(apiError).length > 0 && apiError.status === 403) ||
        apiError.status == 401) && (
        <p>
          You need to grant CharacterSense access to your World of Warcraft
          character information. You can do so{' '}
          <a href='http://localhost:5000/auth/bnet'>here</a>
        </p>
      )}
      <div className='d-flex align-items-center justify-content-center col-6 mx-auto bg-light my-2'></div>
    </div>
  );
};

export default Dashboard;
