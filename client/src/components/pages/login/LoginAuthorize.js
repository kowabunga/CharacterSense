import React from 'react';

const LoginAuthorize = () => {
  return (
    <div className='container col-md-5 text-center'>
      <p className='display-4'>Just one more thing and you're set!</p>
      <p className='lead'>
        In order to get full access to stats regarding your World of Warcraft
        account, you need to grant{' '}
        <em className='text-primary'>CharacterSense</em> access to your account
        so that we may be able to get information on your World of Warcraft
        characters such as your gear, boss slays, etc.
      </p>
      <a href='http://localhost:5000/auth/bnet' className='btn btn-success'>
        Authorize
      </a>
    </div>
  );
};

export default LoginAuthorize;
