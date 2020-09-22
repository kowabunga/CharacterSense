import React from 'react';
import WoWState from './context/wow/WowState';
import UserState from './context/user/UserState';
import CharacterSense from './components/CharacterSense';
import { CookiesProvider } from 'react-cookie';
import './App.css';

const App = () => {
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
