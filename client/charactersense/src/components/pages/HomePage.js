import React, { useContext } from 'react';
import WowContext from '../../context/wow/wowContext';
import { Redirect } from 'react-router-dom';

const HomePage = () => {
  const wowContext = useContext(WowContext);
  const { login } = wowContext;

  return <div></div>;
};

export default HomePage;
