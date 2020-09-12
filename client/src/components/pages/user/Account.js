import React, { Fragment, useContext, useState } from 'react';
import UserContext from '../../../context/user/userContext';
import axios from 'axios';

const Account = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const { firstName, lastName, email } = user;

  //Edit?
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Fragment>
      <div className='container'>
        <p className='display-4 text-center mt-2 my-3'>
          Welcome {firstName} {lastName}
        </p>
        <p>
          <span className='lead'>Name: </span>
          {firstName} {lastName}
        </p>
        <p>
          <span className='lead'>Email: </span>
          {email}
        </p>
        <button className='btn btn-block btn-outline-secondary'>
          Edit Information
        </button>
      </div>
      {isEdit && <div></div>}
    </Fragment>
  );
};

export default Account;
