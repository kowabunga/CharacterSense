import React from 'react';
import WoWState from './context/wow/WowState';
import UserState from './context/user/UserState';
import AlertState from './context/alerts/AlertState';
import CharacterSense from './components/CharacterSense';
import { CookiesProvider } from 'react-cookie';
import './App.css';

const App = () => {
  console.log('asdfasd');
  return (
    <CookiesProvider>
      <AlertState>
        <UserState>
          <WoWState>
            <CharacterSense />
          </WoWState>
        </UserState>
      </AlertState>
    </CookiesProvider>
  );
};

export default App;
