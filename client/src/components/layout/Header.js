import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../../context/user/userContext';

const Header = () => {
  const userContext = useContext(UserContext);
  const { jwt } = userContext;

  const logout = () => {
    console.log('logged out');
  };

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
            {!jwt && (
              <NavLink to='/login' className='nav-link'>
                Login
              </NavLink>
            )}
          </li>
          <li className='nav-item'>
            {jwt && (
              <a href='#!' className='nav-link' onClick={logout}>
                Logout
              </a>
            )}
          </li>
          <li className='nav-item'>
            <NavLink to='/characters' className='nav-link'>
              My Characters
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
