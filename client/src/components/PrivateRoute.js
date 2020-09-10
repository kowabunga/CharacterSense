import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [cookie, setCookies, removeCookie] = useCookies(['charsensejwt']);

  const loggedIn = Object.keys(cookie).length > 0;

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
