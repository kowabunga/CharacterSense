import { SET_JWT, REMOVE_JWT, SET_USER } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_JWT:
      return { ...state, jwt: payload };
    case REMOVE_JWT:
      return { ...state, jwt: null };
    case SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};
