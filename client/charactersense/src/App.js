import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WowState from './context/wow/WowState';
import Dashboard from './components/pages/Dashboard';
import './App.css';

function App() {
  return (
    <WowState>
      <Router>
        <a href='http://localhost:5000/auth/bnet' className='btn btn-link'>
          Login
        </a>
        <Switch>
          //@TODO change this path
          <Route exact path='/dashboard/:token' component={Dashboard} />
        </Switch>
      </Router>
    </WowState>
  );
}

export default App;
