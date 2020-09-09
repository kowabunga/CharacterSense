import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WoWState from './context/wow/WowState';
import Header from './components/layout/Header';
import HomePage from './components/pages/HomePage';
import Characters from './components/pages/Characters';
import Dungeons from './components/pages/Dungeons';
import Raids from './components/pages/Raids';
import './App.css';
import Login from './components/pages/user/Login';
import Register from './components/pages/user/Register';

const App = () => {
  console.log('asdfasd');
  return (
    //@TODO add main route page so state can be used to load client token
    <WoWState>
      <Router>
        <Header />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/characters' component={Characters} />
            <Route
              exact
              path='/character/:characterId/dungeons'
              component={Dungeons}
            />
            <Route
              exact
              path='/character/:characterId/raids'
              component={Raids}
            />
          </Switch>
        </div>
      </Router>
    </WoWState>
  );
};

export default App;
