import { SET_ACCESS_TOKEN_INFO } from './types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ACCESS_TOKEN_INFO:
      return {
        ...state,
        tokenInfo: payload,
      };
    default:
      return state;
  }
};
