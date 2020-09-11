import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const initialState = {
    jwt: null,
    user: {},
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setUserJwt = async token => {
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

  const getOAuthToken = async location => {
    console.log(location);
    try {
      if (location.search.length > 0) {
        let authCode = location.search.split('&');
        authCode = authCode[0].slice(6, authCode[0].length);
        console.log(authCode);

        const data = await axios.get(`/auth/oauth_token/${authCode}`);

        console.log(data.data);

        dispatch({ type: UPDATE_USER_OAUTH_TOKEN, payload: data.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { jwt, user } = state;

  return (
    <UserContext.Provider
      value={{ jwt, user, setUserJwt, removeUserJwt, getUser, getOAuthToken }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
