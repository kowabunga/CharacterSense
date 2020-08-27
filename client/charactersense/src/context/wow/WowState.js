import React, { useReducer } from 'react';
import axios from 'axios';
import WowContext from './wowContext';
import WowReducer from './wowReducer';
import { LOGIN } from './types';

const WowState = props => {
  const initialState = {
    test: '',
  };

  const [state, dispatch] = useReducer(WowReducer, initialState);

  // const {} = state;

  return <WowContext.Provider value={{}}>{props.children}</WowContext.Provider>;
};

export default WowState;
