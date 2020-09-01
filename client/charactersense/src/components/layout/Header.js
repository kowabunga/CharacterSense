import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import WowContext from '../../context/wow/wowContext';

const Header = () => {
  const wowContext = useContext(WowContext);
  const { loggedIn, setLoginStatus } = wowContext;

  const removeToken = () =>
    localStorage.getItem('token') && localStorage.removeItem('token');

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
              <a
                href='http://localhost:5000/auth/bnet'
                className='nav-link'
                onClick={() => setLoginStatus(true)}
              >
                Login
              </a>
            )}
          </li>

          <li className='nav-item'>
            {loggedIn && (
              <a
                href='http://localhost:5000/auth/logout'
                className='nav-link'
                onClick={() => {
                  setLoginStatus(true);
                  removeToken();
                }}
              >
                Logout
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
