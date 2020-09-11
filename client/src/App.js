import React from 'react';
import WoWState from './context/wow/WowState';
import UserState from './context/user/UserState';
import CharacterSense from './components/pages/CharacterSense';
import { CookiesProvider } from 'react-cookie';
import './App.css';

const App = () => {
  console.log('asdfasd');
  return (
    <CookiesProvider>
      <UserState>
        <WoWState>
          <CharacterSense />
        </WoWState>
      </UserState>
    </CookiesProvider>
  );
};

export default App;
