import React, { useContext } from 'react';
import WowContext from '../../context/wow/wowContext';

const Dashboard = ({ match }) => {
  const wowContext = useContext(WowContext);
  const { tokenInfo } = wowContext;

  return (
    <div className='d-flex align-items-center justify-content-center col-6 mx-auto bg-light my-2'></div>
  );
};

export default Dashboard;
