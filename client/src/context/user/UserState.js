import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';
import axios from 'axios';

import {
  SET_JWT,
  REMOVE_JWT,
  SET_USER,
  UPDATE_USER_OAUTH_TOKEN,
} from '../types';

const UserState = props => {
  const initialState = {
    jwt: null,
    user: {},
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const { jwt, user } = state;

  const setUserJwt = token => {
    dispatch({ type: SET_JWT, payload: token });
  };

  const removeUserJwt = () => {
    dispatch({ type: REMOVE_JWT });
  };

  const getUser = async token => {
    const user = await axios.get('/users/user', {
      headers: {
        'x-auth-token': token,
      },
    });
    user.data && dispatch({ type: SET_USER, payload: user.data });
  };

  const getOAuthToken = async (jwt, location) => {
    try {
      console.log('I got called ', jwt);
      if (location.search.length > 0) {
        let authCode = location.search.split('&');
        authCode = authCode[0].slice(6, authCode[0].length);
        // console.log(authCode);

        const data = await axios.get(`/auth/oauth_token/${authCode}`);
        // console.log(data.data);
        const user = await axios.put(
          '/users/user/addToken',
          {
            accessToken: data.data.access_token,
            expiry: data.data.expires_in,
          },
          {
            headers: {
              'x-auth-token': jwt,
            },
          }
        );

        user.data && dispatch({ type: SET_USER, payload: user.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{ jwt, user, setUserJwt, removeUserJwt, getUser, getOAuthToken }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
