import React, { useState, useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import UserContext from '../../../context/user/userContext';
import AlertContext from '../../../context/alert/alertContext';
import axios from 'axios';

const Login = () => {
  const userContext = useContext(UserContext);
  const { setUserJwt, getUser, jwt } = userContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  //Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Cookies
  const [cookie, setCookie] = useCookies(['charsensejwt']);

  const history = useHistory();

  const onLogin = async e => {
    try {
      e.preventDefault();
      const loginInfo = { email, password };

      const tokenData = await axios.post('/users/login', loginInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const token = tokenData.data.token;
      setUserJwt(token);
      setCookie('charsensejwt', token);

      getUser(token);
      history.push('/auth');
    } catch (error) {
      if (error.response) {
        setAlert('danger', error.response.data.error);
      } else {
        setAlert('danger', 'Something went wrong, please try again');
      }
    }
  };

  return (
    <div className='container'>
      {jwt && <Redirect to='/characters' />}

      <form onSubmit={onLogin} className='col-sm-10 col-md-8 mx-auto mt-2'>
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
