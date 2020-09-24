import { SET_ERROR, REMOVE_ERROR } from '../types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ERROR:
      return {
        ...state,
        alertType: payload.type,
        alertMsg: payload.msg,
        showAlert: true,
      };
    case REMOVE_ERROR:
      return { ...state, alertType: null, alertMsg: null, showAlert: false };
    default:
      break;
  }
};
