import {
  SET_CLIENT_ACCESS_TOKEN_INFO,
  SET_OAUTH_ACCESS_TOKEN_INFO,
  SET_WOW_TOKEN,
  SET_MYTHIC_PLUS_AFFIXES,
  API_ERROR,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CLIENT_ACCESS_TOKEN_INFO:
      return {
        ...state,
        clientTokenInfo: payload,
      };
    case SET_OAUTH_ACCESS_TOKEN_INFO:
      return {
        ...state,
        oauthTokenInfo: payload,
      };
    case SET_WOW_TOKEN:
      return {
        ...state,
        wowTokenPrice: payload,
      };
    case API_ERROR:
      return {
        ...state,
        apiError: payload,
      };
    default:
      return state;
  }
};
