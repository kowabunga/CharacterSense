import React, { useReducer } from 'react';
import WowContext from './wowContext';
import WowReducer from './wowReducer';
import {
  SET_ACCESS_TOKEN_INFO,
  SET_WOW_TOKEN,
  SET_MYTHIC_PLUS_AFFIXES,
} from './types';

import axios from 'axios';

const WoWState = props => {
  const initialState = {
    tokenInfo: {},
    wowTokenPrice: null,
  };

  const [state, dispatch] = useReducer(WowReducer, initialState);

  const getAuthToken = async () => {
    const res = await axios.post('/auth/token');
    const tokenInfo = res.data;
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${tokenInfo.access_token}`;
    dispatch({ type: SET_ACCESS_TOKEN_INFO, payload: tokenInfo });
  };

  const getWowTokenPrice = async () => {
    try {
      const res = await axios.get(
        'https://us.api.blizzard.com/data/wow/token/index?namespace=dynamic-us&locale=en_US'
      );
      dispatch({ type: SET_WOW_TOKEN, payload: res.data.price });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  //@TODO Figure out how to get current weekly mythic keystone affixes
  const getMythicPlusAffixes = async () => {
    try {
      const res = await axios.get(
        'https://us.api.blizzard.com/data/wow/keystone-affix/index?namespace=static-us&locale=en_US'
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { tokenInfo, wowTokenPrice } = state;

  return (
    <WowContext.Provider
      value={{
        tokenInfo,
        wowTokenPrice,
        getAuthToken,
        getWowTokenPrice,
        getMythicPlusAffixes,
      }}
    >
      {props.children}
    </WowContext.Provider>
  );
};

export default WoWState;
