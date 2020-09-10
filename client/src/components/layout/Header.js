import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Header = () => {
  const [cookie, setCookies, removeCookie] = useCookies(['charsensejwt']);

  const [loggedIn, setLoggedIn] = useState(Object.keys(cookie).length > 0);

  const logout = () => {
    removeCookie('charsensejwt');
  };

  useEffect(() => {
    setLoggedIn(Object.keys(cookie).length > 0);
    console.log('rendering');
  });

  return (
    <nav className='navbar bg-light navbar-light navbar-expand-sm'>
      <Link to='/'>CharacterSense</Link>
      <button
        className='navbar-toggler'
        data-toggle='collapse'
        data-target='#navCollapse'
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navCollapse'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            {!loggedIn && (
              <NavLink to='/login' className='nav-link'>
                Login
              </NavLink>
            )}
          </li>

          <li className='nav-item'>
            {loggedIn && (
              <NavLink to='/' className='nav-link' onClick={logout}>
                Logout
              </NavLink>
            )}
          </li>

          <li className='nav-item'>
            {loggedIn && (
              <NavLink to='/characters' className='nav-link'>
                My Characters
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
