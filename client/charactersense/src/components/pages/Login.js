import React, { useState, useContext } from 'react';
import WowContext from '../../context/wow/wowContext';

const Login = () => {
  const wowContext = useContext(WowContext);
  const { login } = wowContext;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Gathers login data from state and submits to backend for login
  const onLogin = async e => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className='container'>
      <div className='col-6 mx-auto mt-5'>
        {/* Login Card */}
        <div className='card'>
          <div className='card-header'>
            <h2 className='text-center'>Login</h2>
          </div>
          <div className='card-body'>
            {/* Login form */}
            <form onSubmit={onLogin}>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  className='form-control'
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  className='form-control'
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button
                type='submit'
                className='btn btn-block btn-outline-primary'
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
