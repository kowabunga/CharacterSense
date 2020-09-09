import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  //Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //Alert state
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

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

      const response = await axios.post('/users/register', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //form ref reset
      console.log(response.data);
      history.push('/characters');
    } catch (error) {
      // console.log(error.response);
      if (error.response.data.errors[0].msg) {
        setShowAlert(true);
        setAlertMsg(error.response.data.errors[0].msg);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    }
  };

  return (
    <Fragment>
      {showAlert && (
        <div className={`alert alert-danger text-center mt-3 mb-1`}>
          {alertMsg}
        </div>
      )}
      <div className='container'>
        <form
          onSubmit={submitForm}
          className=' col-sm-10 col-md-8 mx-auto mt-2'
        >
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
            Login
          </button>

          <p className='mt-2 text-center'>
            New to CharacterSense?{' '}
            <Link to='/login' className='primary'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
