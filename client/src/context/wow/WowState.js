import React, { useReducer } from 'react';
import WowContext from './wowContext';
import WowReducer from './wowReducer';
import {
  SET_CLIENT_ACCESS_TOKEN_INFO,
  SET_WOW_TOKEN,
  SET_MYTHIC_PLUS_AFFIXES,
  API_ERROR,
} from '../types';

import axios from 'axios';

const WoWState = props => {
  const initialState = {
    apiError: {},
    clientTokenInfo: {},
    wowTokenPrice: null,
    expansionDungeons: [],
    expansionRaids: [],
  };

  const [state, dispatch] = useReducer(WowReducer, initialState);

  const getClientAuthToken = async () => {
    const res = await axios.get('/auth/client_token');
    const tokenInfo = res.data;
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${tokenInfo.access_token}`;
    dispatch({ type: SET_CLIENT_ACCESS_TOKEN_INFO, payload: tokenInfo });
  };

  const getWowTokenPrice = async () => {
    try {
      const res = await axios.get(
        'https://us.api.blizzard.com/data/wow/token/index?namespace=dynamic-us&locale=en_US'
      );
      dispatch({ type: SET_WOW_TOKEN, payload: res.data.price });
      // console.log(res.data);
    } catch (error) {
      console.error(error);
      if (error) return;
    }
  };

  const {
    apiError,
    clientTokenInfo,
    wowTokenPrice,
    expansionDungeons,
    expansionRaids,
  } = state;

  return (
    <WowContext.Provider
      value={{
        apiError,
        clientTokenInfo,
        wowTokenPrice,
        expansionDungeons,
        expansionRaids,
        getClientAuthToken,
        getWowTokenPrice,
      }}
    >
      {props.children}
    </WowContext.Provider>
  );
};

export default WoWState;
