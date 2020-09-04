import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WoWState from './context/wow/WowState';
import Header from './components/layout/Header';
import HomePage from './components/pages/HomePage';
import Dashboard from './components/pages/Dashboard';
import './App.css';

function App() {
  return (
    <WoWState>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/dashboard/:token'>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </WoWState>
  );
}

export default App;
