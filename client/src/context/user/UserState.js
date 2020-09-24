import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';
import axios from 'axios';

import { SET_JWT, REMOVE_JWT, SET_USER } from '../types';

const UserState = props => {
  const initialState = {
    jwt: null,
    user: {},
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const { jwt, user, validToken } = state;

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
      if (location.search.length > 0) {
        //Get auth code from location string
        let authCode = location.search.split('&');
        authCode = authCode[0].slice(6, authCode[0].length);
        // console.log(authCode);

        //Get valid access token from blizzard
        const data = await axios.get(`/auth/oauth_token/${authCode}`);
        // console.log(data.data);
        //Store access token in user account along side token expiration date
        const user = await axios.put(
          '/users/user/addToken',
          {
            accessToken: data.data.access_token,
            expiry: data.data.expires_in + Math.floor(Date.now() / 1000),
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

  const checkIfTokenValid = async token => {
    const res = await axios.post(`/auth/oauth_token/check`, {
      token: token,
    });

    const resData = res.data;
    //Above request will return one of two things... on a 400/404 error - it will return the erro data containing an 'invalid_token' string. On success, it will return an object containing within an authoritie sarray indicating its authentication

    //Calling function expects a boolean result

    if (resData === 'invalid_token') {
      return false;
    }
    console.log(resData.authorities[0]);
    if (resData.authorities[0] === 'IS_AUTHENTICATED_FULLY') {
      //If we are authenticated, we should update the expiration date in the user account for this token.
      console.log(resData);
      return Date.now() - resData.exp > 10800;
    }
  };

  return (
    <UserContext.Provider
      value={{
        jwt,
        user,
        validToken,
        setUserJwt,
        removeUserJwt,
        getUser,
        getOAuthToken,
        checkIfTokenValid,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
