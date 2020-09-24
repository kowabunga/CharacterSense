import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import UserContext from '../context/user/userContext';
import AlertContext from '../context/alert/alertContext';
import PrivateRoute from './PrivateRoute';
import Header from './layout/Header';
import Alert from './layout/Alert';
import HomePage from './pages/HomePage';
import Characters from './pages/character/Characters';
import Auth from './pages/user/Auth';
import Dungeons from './pages/character/Dungeons';
import Raids from './pages/character/Raids';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Account from './pages/user/Account';

const CharacterSense = () => {
  const userContext = useContext(UserContext);
  const { jwt, setUserJwt, getUser } = userContext;

  const [cookie] = useCookies(['charsensejwt']);

  const alertContext = useContext(AlertContext);
  const { showAlert } = alertContext;

  useEffect(() => {
    !jwt &&
      cookie.charsensejwt !== undefined &&
      setUserJwt(cookie.charsensejwt);
    (jwt || cookie.charsensejwt) && getUser(cookie.charsensejwt);
  }, []);

  return (
    <Router>
      <Header />
      {showAlert && <Alert />}
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/auth' component={Auth} />
        <PrivateRoute exact path='/account' component={Account} />
        <PrivateRoute exact path='/characters' component={Characters} />
        <PrivateRoute
          exact
          path='/character/:characterId/dungeons'
          component={Dungeons}
        />
        <PrivateRoute
          exact
          path='/character/:characterId/raids'
          component={Raids}
        />
      </Switch>
    </Router>
  );
};

export default CharacterSense;
