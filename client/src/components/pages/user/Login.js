import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Login = () => {
  //Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  //Cookies
  const [cookie, setCookie, removeCookie] = useCookies(['charsensejwt']);

  const history = useHistory();

  const onLogin = async e => {
    try {
      e.preventDefault();
      const user = { email, password };

      await axios.post('/users/login', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      history.push('/characters');
    } catch (error) {
      if (error.response !== undefined && error.response.data.errors[0].msg) {
        setShowAlert(true);
        setAlertMsg(error.response.data.errors[0].msg);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      } else {
        setShowAlert(true);
        setAlertMsg('Something went wrong, please try again.');
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    }
  };

  return (
    <div className='container'>
      {Object.keys(cookie).length > 0 && <Redirect to='/characters' />}

      {showAlert && (
        <div className={`alert alert-danger text-center mt-3 mb-1`}>
          {alertMsg}
        </div>
      )}

      <form onSubmit={onLogin} className=' col-sm-10 col-md-8 mx-auto mt-2'>
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

        <button type='submit' className='btn btn-block btn-outline-primary'>
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
