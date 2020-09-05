import {
  SET_ACCESS_TOKEN_INFO,
  SET_WOW_TOKEN,
  SET_MYTHIC_PLUS_AFFIXES,
} from './types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ACCESS_TOKEN_INFO:
      return {
        ...state,
        tokenInfo: payload,
      };
    case SET_WOW_TOKEN:
      return {
        ...state,
        wowTokenPrice: payload,
      };
    default:
      return state;
  }
};
