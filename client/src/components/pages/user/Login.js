import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import UserContext from '../../../context/user/userContext';
import axios from 'axios';

const Login = () => {
  const userContext = useContext(UserContext);
  const { setUserJwt } = userContext;
  //Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  //Cookies
  const [cookie, setCookies] = useCookies(['charSensejwt']);

  const history = useHistory();

  const onLogin = async e => {
    try {
      e.preventDefault();
      const user = { email, password };

      await axios.get('/users/login', {
        params: user,
      });

      setUserJwt(cookie);

      history.push('/characters');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
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
