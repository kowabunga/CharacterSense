import React, { useState, useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import UserContext from '../../../context/user/userContext';
import axios from 'axios';

const Register = () => {
  const userContext = useContext(UserContext);
  const { setUserJwt, getUser, jwt } = userContext;

  //Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  //Cookies
  const [cookie, setCookie, removeCookie] = useCookies(['charsensejwt']);

  const history = useHistory();

  const submitForm = async e => {
    try {
      e.preventDefault();
      const user = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      };

      const tokenData = await axios.post('/users/register', user, {
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
      {showAlert && (
        <div className={`alert alert-danger text-center mt-3 mb-1`}>
          {alertMsg}
        </div>
      )}

      <form onSubmit={submitForm} className=' col-sm-10 col-md-8 mx-auto mt-2'>
        <h3 className='text-center mb-3'>Register</h3>

        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            name='firstName'
            value={firstName}
            placeholder='First Name'
            onChange={e => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <input
            className='form-control'
            type='text'
            name='lastName'
            value={lastName}
            placeholder='Last Name'
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>

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

        <div className='form-group'>
          <input
            type='password'
            className='form-control'
            name='password'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type='submit' className='btn btn-block btn-outline-primary'>
          Register
        </button>

        <p className='mt-2 text-center'>
          Already have an account?{' '}
          <Link to='/login' className='primary'>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
