import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import { SET_ERROR, REMOVE_ERROR } from '../types';

const AlertState = props => {
  const initialState = {
    alertType: null,
    alertMsg: null,
    showAlert: false,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const { showAlert, alertType, alertMsg } = state;

  const setAlert = (type, msg) => {
    dispatch({
      type: SET_ERROR,
      payload: { type: type, msg: msg },
    });

    setTimeout(() => {
      dispatch({ type: REMOVE_ERROR });
    }, 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        alertType,
        alertMsg,
        showAlert,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
