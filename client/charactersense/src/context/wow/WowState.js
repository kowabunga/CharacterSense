import React, { useReducer } from 'react';
import WowContext from './wowContext';
import WowReducer from './wowReducer';
import { SET_LOGIN } from './types';

import axios from 'axios';

const WowState = props => {
  const initialState = {
    loggedIn: false,
    user: {},
  };

  const [state, dispatch] = useReducer(WowReducer, initialState);

  const setLoginStatus = isLoggedIn => {
    dispatch({ type: SET_LOGIN, payload: isLoggedIn });
  };

  const checkIfLoggedIn = match => {
    // Check if token in local storage and if token is in local storage it matches token in url. If both are false, set token
    if (match) {
      if (localStorage.getItem('bnetjwtoken') === null) {
        localStorage.setItem('bnetjwtoken', `Bearer ${match.params.token}`);
      }
    }

    const token = localStorage.getItem('bnetjwtoken');
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

  const login = async (email, password) => {
    try {
      const lgs = await axios.post('/user/login', {
        email,
        password,
      });

      const loginStatus = lgs.data;

      console.log(loginStatus);

      if (loginStatus.type === 'LOGIN_SUCCESS') {
        console.log('login success', loginStatus.msg);
      } else if (loginStatus.type === 'INVALID_CREDENTIALS') {
        console.log('invalid credentials', loginStatus.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { user, loggedIn } = state;

  return (
    <WowContext.Provider
      value={{ user, loggedIn, login, checkIfLoggedIn, setLoginStatus }}
    >
      {props.children}
    </WowContext.Provider>
  );
};

export default WowState;
