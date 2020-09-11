import React, { useState, useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import UserContext from '../../../context/user/userContext';
import axios from 'axios';

const Login = () => {
  const userContext = useContext(UserContext);
  const { setUserJwt, getUser, jwt } = userContext;
  //Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

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

      await getUser(token);
      history.push('/auth');
    } catch (error) {
      console.log(error);
      // if (error.response) {
      //   setShowAlert(true);
      //   setAlertMsg(
      //     error.response.data.msg || error.response.data.errors[0].msg
      //   );
      //   setTimeout(() => {
      //     setShowAlert(false);
      //   }, 5000);
      // } else if (error.request) {
      //   setShowAlert(true);
      //   setAlertMsg(error.request);
      //   setTimeout(() => {
      //     setShowAlert(false);
      //   }, 5000);
      // } else {
      //   setShowAlert(true);
      //   setAlertMsg('Something went wrong, please try again.');
      //   setTimeout(() => {
      //     setShowAlert(false);
      //   }, 5000);
      // }
    }
  };

  return (
    <div className='container'>
      {jwt && <Redirect to='/characters' />}

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
