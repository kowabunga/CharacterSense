import React, { useReducer } from 'react';
import axios from 'axios';
import WowContext from './wowContext';
import WowReducer from './wowReducer';
import {} from './types';

const WowState = props => {
  const initialState = {
    test: '',
  };

  const [state, dispatch] = useReducer(WowReducer, initialState);

  return (
    <WowContext.Provider value={{ test: state.test }}>
      {props.children}
    </WowContext.Provider>
  );
};

export default WowState;
