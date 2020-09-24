import React, { useState, useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import UserContext from '../../../context/user/userContext';
import AlertContext from '../../../context/alert/alertContext';
import axios from 'axios';

const Register = () => {
  const userContext = useContext(UserContext);
  const { setUserJwt, getUser, jwt } = userContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  //Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      if (error.response) {
        console.log(error.response);
        if (error.response.data.errors !== undefined) {
          error.response.data.errors.forEach(error => {
            setAlert('danger', error.msg);
          });
        } else {
          setAlert('danger', error.response.data.error);
        }
      } else {
        setAlert('danger', 'Something went wrong, please try again');
      }
    }
  };

  return (
    <div className='container'>
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
            // required
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
            // required
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
