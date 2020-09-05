import React, { useReducer } from 'react';
import WowContext from './wowContext';
import WowReducer from './wowReducer';
import { SET_ACCESS_TOKEN_INFO } from './types';

import axios from 'axios';

const WoWState = props => {
  const initialState = {
    tokenInfo: {},
  };

  const [state, dispatch] = useReducer(WowReducer, initialState);

  const getAuthToken = async () => {
    const res = await axios.post('/auth/token');
    const tokenInfo = res.data;
    dispatch({ type: SET_ACCESS_TOKEN_INFO, payload: tokenInfo });
  };

  const { tokenInfo } = state;

  return (
    <WowContext.Provider value={{ tokenInfo, getAuthToken }}>
      {props.children}
    </WowContext.Provider>
  );
};

export default WoWState;
