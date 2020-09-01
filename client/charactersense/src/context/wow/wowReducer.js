import { SET_LOGIN } from './types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOGIN:
      return { ...state, loggedIn: payload };
    default:
      return state;
  }
};
