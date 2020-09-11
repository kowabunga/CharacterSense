import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import UserContext from '../context/user/userContext';
import PrivateRoute from './PrivateRoute';
import Header from './layout/Header';
import HomePage from './pages/HomePage';
import Characters from './pages/character/Characters';
import Auth from './pages/user/Auth';
import Dungeons from './pages/Dungeons';
import Raids from './pages/Raids';
import Login from './pages/user/Login';
import Register from './pages/user/Register';

const CharacterSense = () => {
  const userContext = useContext(UserContext);
  const { jwt, setUserJwt, getUser } = userContext;

  const [cookie] = useCookies(['charsensejwt']);

  useEffect(() => {
    !jwt &&
      cookie.charsensejwt !== undefined &&
      setUserJwt(cookie.charsensejwt);
    jwt && getUser(cookie.charsensejwt);
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/auth' component={Auth} />
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
