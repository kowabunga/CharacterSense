import React, { useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ match }) => {
  useEffect(() => {
    // Check if token in local storage and if token is in local storage it matches token in url. If both are false, set token
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('token', match.params.token) !== match.params.token
    ) {
      localStorage.setItem('token', match.params.token);
    }
  }, []);

  const test1 = async () => {
    try {
      const url =
        'https://us.api.blizzard.com/data/wow/journal-instance/758?namespace=static-us';
      const data = await axios.get(url, {
        // headers: { Authorization: `Bearer ${''}` },
      });
      const resData = data.json();
      console.log(resData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='d-flex align-items-center justify-content-center col-6 mx-auto bg-light'>
      <button className='btn btn-link' onClick={() => test1()}>
        Test 1
      </button>
    </div>
  );
};

export default Dashboard;
