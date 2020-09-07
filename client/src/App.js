import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WoWState from './context/wow/WowState';
import Header from './components/layout/Header';
import HomePage from './components/pages/HomePage';
import Characters from './components/pages/Characters';
import Dungeons from './components/pages/Dungeons';
import Raids from './components/pages/Raids';
import './App.css';

function App() {
  console.log('asdfasd');
  return (
    //@TODO add main route page so state can be used to load client token
    <WoWState>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/characters' component={Characters}></Route>
          <Route exact path='/character/dungeons' component={Dungeons}></Route>
          <Route exact path='/character/raids' component={Raids}></Route>
        </Switch>
      </Router>
    </WoWState>
  );
}

export default App;
