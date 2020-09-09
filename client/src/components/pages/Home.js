import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserContext from '../../context/user/userContext';
import { useCookies } from 'react-cookie';
import Header from '../layout/Header';
import Dashboard from './Dashboard';
import Characters from './Characters';
import Dungeons from './Dungeons';
import Raids from './Raids';
import Login from './user/Login';
import Register from './user/Register';

const Home = () => {
  const userContext = useContext(UserContext);
  const { setUserJwt } = userContext;

  const [cookie, setCookie, removeCookie] = useCookies(['charsensejwt']);

  useEffect(() => {
    setUserJwt(cookie);
  }, [cookie]);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/characters' component={Characters} />
        <Route
          exact
          path='/character/:characterId/dungeons'
          component={Dungeons}
        />
        <Route exact path='/character/:characterId/raids' component={Raids} />
      </Switch>
    </Router>
  );
};

export default Home;
