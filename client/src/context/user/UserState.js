import React, { useReducer } from 'react';
import UserContext from './userContext';
import UserReducer from './userReducer';

import { SET_JWT } from '../types';

const UserState = props => {
  const initialState = {
    jwt: '',
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setUserJwt = cookie => {
    dispatch({ type: SET_JWT, payload: cookie });
  };

  const { jwt } = state;

  return (
    <UserContext.Provider value={{ jwt, setUserJwt }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
