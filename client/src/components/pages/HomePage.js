import React, { useContext, useEffect, Fragment } from 'react';
import WowContext from '../../context/wow/wowContext';

const HomePage = () => {
  const wowContext = useContext(WowContext);
  const { getAuthToken, tokenInfo } = wowContext;
  useEffect(() => {
    getAuthToken();
  }, []);

  return (
    <Fragment>
      <div className='jumbotron text-center'>
        <h1 className='display-4'>Welcome to CharacterSense</h1>
        <p className='lead mt-3'>
          The one and only place where all the information you need for your
          daily World of Warcraft journey is located.
        </p>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 bg-primary'></div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
