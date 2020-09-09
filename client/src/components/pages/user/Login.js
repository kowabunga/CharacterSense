import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const onLogin = async e => {
    try {
      e.preventDefault();

      history.push('/characters');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={onLogin} className=' col-sm-10 col-md-8 mx-auto my-3 p-2'>
        <h3 className='text-center mb-3'>Login</h3>

        <div className='form-group'>
          <input
            className='form-control'
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            name='password'
            value={password}
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type='submit' class='btn btn-block btn-outline-primary'>
          Login
        </button>
        <p className='mt-2 text-center'>
          New to CharacterSense?{' '}
          <Link to='/register' className='primary'>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
