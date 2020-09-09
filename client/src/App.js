import React from 'react';
import WoWState from './context/wow/WowState';
import UserState from './context/user/UserState';
import Home from './components/pages/Home';
import { CookiesProvider } from 'react-cookie';
import './App.css';

const App = () => {
  console.log('asdfasd');
  return (
    <CookiesProvider>
      <UserState>
        <WoWState>
          <Home exact path='/' />
        </WoWState>
      </UserState>
    </CookiesProvider>
  );
};

export default App;
