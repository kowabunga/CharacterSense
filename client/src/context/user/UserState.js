import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';

import { SET_JWT, REMOVE_JWT } from '../types';

const UserState = props => {
  const initialState = {
    jwt: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setUserJwt = cookie => {
    dispatch({ type: SET_JWT, payload: cookie });
  };

  const removeUserJwt = cookie => {
    dispatch({ type: REMOVE_JWT });
  };

  const { jwt } = state;

  return (
    <UserContext.Provider value={{ jwt, setUserJwt, removeUserJwt }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
