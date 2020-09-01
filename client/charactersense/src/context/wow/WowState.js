import React, { useReducer } from 'react';
import WowContext from './wowContext';
import WowReducer from './wowReducer';
import { SET_LOGIN } from './types';

import axios from 'axios';

const WowState = props => {
  const initialState = {
    loggedIn: false,
  };

  const [state, dispatch] = useReducer(WowReducer, initialState);
  const { loggedIn } = state;

  const setLoginStatus = isLoggedIn => {
    dispatch({ type: SET_LOGIN, payload: isLoggedIn });
  };

  const checkIfLoggedIn = match => {
    // Check if token in local storage and if token is in local storage it matches token in url. If both are false, set token
    if (match) {
      if (localStorage.getItem('token') === null) {
        localStorage.setItem('token', `Bearer ${match.params.token}`);
      }
    }

    const token = localStorage.getItem('token');
    if (token) {
      setLoginStatus(true);
    }
    //Set defaults for axios header calls
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  return (
    <WowContext.Provider value={{ loggedIn, checkIfLoggedIn, setLoginStatus }}>
      {props.children}
    </WowContext.Provider>
  );
};

export default WowState;
