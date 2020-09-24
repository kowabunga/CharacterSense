import React, { useContext, useEffect, Fragment } from 'react';
import WowContext from '../../context/wow/wowContext';
import axios from 'axios';

const HomePage = () => {
  const wowContext = useContext(WowContext);
  const {
    clientTokenInfo,
    wowTokenPrice,
    getClientAuthToken,
    getWowTokenPrice,
    getMythicPlusAffixes,
  } = wowContext;

  //first useEffect calls function to get auth token information and store in state
  useEffect(() => {
    if (Object.keys(clientTokenInfo).length === 0) {
      getClientAuthToken();
    }
  }, []);

  //Second useEffect waits for clientTokenInfo state (acquired from first useEffect). When state changtes, makes various api calls
  useEffect(() => {
    if (clientTokenInfo.access_token) {
      getWowTokenPrice();
    }
  }, [clientTokenInfo]);

  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  });

  const keystoneTests = async () => {
    try {
      const data = await axios.get(
        'https://us.api.blizzard.com/data/wow/mythic-keystone/index?namespace=dynamic-us&locale=en_US&access_token=US95KLO0my53OaOwjy4IzMbQ3Z24nwQCgQ'
      );
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

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
              <div className='ml-auto card d-flex align-items-center justify-content-center'>
                WoW Token Price:{' '}
                <span className='text-faded'>
                  {formatter.format(wowTokenPrice / 10000).replace('$', '')}{' '}
                  Gold
                </span>
              </div>
            )}
          </div>
          <button className='btn btn-primary mt-1' onClick={keystoneTests}>
            Test
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
