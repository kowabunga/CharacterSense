import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WowContext from '../../context/wow/wowContext';

const HomePage = () => {
  const wowContext = useContext(WowContext);
  const { loggedIn, checkIfLoggedIn } = wowContext;
  const token =
    localStorage.getItem('token') !== null
      ? localStorage.getItem('bnetjwtoken')
      : '';

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <div className='jumbotron text-center'>
      <h1 className='display-4'>Welcome to CharacterSense</h1>
      <p className='lead mt-3'>
        The one and only place where all the information you need for your daily
        World of Warcraft journey is located.
      </p>

      {!loggedIn && (
        <p className='mt-5'>
          Ready for all the information you'll ever need to play World of
          Warcraft? Log in with your BattleNet account today!
          <br />
          
        </p>
      )}
      {loggedIn && (
        <p>
          Already logged in? Go to{' '}
          <Link to={`/dashboard/${token.slice(7, token.length)}`}>
            Dashboard
          </Link>
        </p>
      )}
    </div>
  );
};

export default HomePage;
