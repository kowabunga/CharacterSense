import { SET_LOGIN, SET_USER } from './types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOGIN:
      return { ...state, loggedIn: payload };
    case SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};
