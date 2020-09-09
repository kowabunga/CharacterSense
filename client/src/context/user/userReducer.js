import { SET_JWT, REMOVE_JWT } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_JWT:
      return { ...state, jwt: payload };
    case REMOVE_JWT:
      return { ...state, jwt: null };
    default:
      return state;
  }
};
