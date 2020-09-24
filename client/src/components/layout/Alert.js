import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alertType, alertMsg } = alertContext;

  return (
    <div
      className={`alert alert-${alertType} text-center col-sm-10 col-md-8 mx-auto mb-1 mt-3`}
    >
      {alertMsg}
    </div>
  );
};

export default Alert;
