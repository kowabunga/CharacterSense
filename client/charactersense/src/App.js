import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WowState from './context/wow/WowState';
import Header from './components/layout/Header';
import HomePage from './components/pages/HomePage';
import Dashboard from './components/pages/Dashboard';
import './App.css';

function App() {
  return (
    <WowState>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/dashboard/:token' component={Dashboard} />
        </Switch>
      </Router>
    </WowState>
  );
}

export default App;
