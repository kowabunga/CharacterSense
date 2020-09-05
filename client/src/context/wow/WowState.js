import React, { useReducer } from 'react';
import WowContext from './wowContext';
import WowReducer from './wowReducer';
import { SET_LOGIN, SET_USER } from './types';

import axios from 'axios';

const WoWState = props => {
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

  const getUser = async loginStatus => {
    return await axios.get('/user', {
      headers: {
        'x-auth-token': loginStatus.token,
      },
    });
  };

  const login = async (email, password) => {
    try {
      const loginTry = await axios.post('/user/login', {
        email,
        password,
      });

      const loginStatus = loginTry.data;

      const userData = await getUser(loginStatus);

      dispatch({ type: SET_USER, payload: userData });
      return loginStatus;
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

export default WoWState;
