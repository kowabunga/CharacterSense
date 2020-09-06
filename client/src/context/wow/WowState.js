import React, { useReducer, createRef } from 'react';
import WowContext from './wowContext';
import WowReducer from './wowReducer';
import {
  SET_ACCESS_TOKEN_INFO,
  SET_WOW_TOKEN,
  SET_MYTHIC_PLUS_AFFIXES,
  API_ERROR,
} from './types';

import axios from 'axios';

const WoWState = props => {
  const initialState = {
    apiError: {},
    tokenInfo: {},
    wowTokenPrice: null,
    expansionDungeons: [],
    expansionRaids: [],
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
      // console.log(res.data);
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
      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCharacters = async () => {
    try {
      const res = await axios.get(
        `https://us.api.blizzard.com/profile/user/wow?namespace=profile-us&locale=en_US&access_token=${tokenInfo.access_token}`
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
      dispatch({ type: API_ERROR, payload: error.response });
    }
  };

  const getDungeonsByExpac = async () => {
    const res = await axios.get(
      `https://us.api.blizzard.com/profile/wow/character/stormrage/kowabungaga/encounters/dungeons?namespace=profile-us&locale=en_US&access_token=${tokenInfo.access_token}`
    );
    console.log(res.data);
  };

  const getRaidsByExpac = async () => {};

  const {
    apiError,
    tokenInfo,
    wowTokenPrice,
    expansionDungeons,
    expansionRaids,
  } = state;

  return (
    <WowContext.Provider
      value={{
        apiError,
        tokenInfo,
        wowTokenPrice,
        expansionDungeons,
        expansionRaids,
        getAuthToken,
        getWowTokenPrice,
        getCharacters,
        getMythicPlusAffixes,
        getDungeonsByExpac,
      }}
    >
      {props.children}
    </WowContext.Provider>
  );
};

export default WoWState;
