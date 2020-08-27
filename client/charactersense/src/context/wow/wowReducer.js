import { LOGIN } from './types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      console.log(payload);
      return;
    default:
      return state;
  }
};
