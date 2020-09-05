import React, { useContext, useEffect, Fragment } from 'react';
import WowContext from '../../context/wow/wowContext';

const HomePage = () => {
  const wowContext = useContext(WowContext);
  const {
    tokenInfo,
    wowTokenPrice,
    getAuthToken,
    getWowTokenPrice,
    getMythicPlusAffixes,
  } = wowContext;

  //first useEffect calls function to get auth token information and store in state
  useEffect(() => {
    getAuthToken();
  }, []);

  //Second useEffect waits for tokenInfo state (acquired from first useEffect). When state changtes, makes various api calls
  useEffect(() => {
    if (tokenInfo.access_token !== undefined) {
      getWowTokenPrice();
      getMythicPlusAffixes();
    }
  }, [tokenInfo]);

  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  });

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
          <div className='col-md-12 '>
            {wowTokenPrice !== null && (
              <div className='ml-auto card text-center '>
                <p>
                  WoW Token Price:{' '}
                  <span className='text-faded'>
                    {formatter.format(wowTokenPrice / 10000).replace('$', '')}{' '}
                    Gold
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
