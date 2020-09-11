import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

const AlertState = props => {
  const initialState = {
    msg: null,
    type: null,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const { msg, type } = state;
  return (
    <AlertContext.Provider value={{ msg, type }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
