import { SET_JWT } from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_JWT:
      return { ...state, jwt: payload };
    default:
      return state;
  }
};
