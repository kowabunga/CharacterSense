import React from 'react';
import WoWState from './context/wow/WowState';
import Home from './components/pages/Home';
import { CookiesProvider } from 'react-cookie';
import './App.css';

const App = () => {
  console.log('asdfasd');
  return (
    <CookiesProvider>
      <WoWState>
        <Home />
      </WoWState>
    </CookiesProvider>
  );
};

export default App;
