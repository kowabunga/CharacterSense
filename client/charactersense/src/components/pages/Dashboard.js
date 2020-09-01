import React, { useEffect, useContext } from 'react';
import WowContext from '../../context/wow/wowContext';
import axios from 'axios';

const Dashboard = ({ match }) => {
  const wowContext = useContext(WowContext);
  const { checkIfLoggedIn } = wowContext;

  useEffect(() => {
    checkIfLoggedIn(match);
  }, []);

  const test1 = async () => {
    try {
      const url =
        'https://us.api.blizzard.com/data/wow/journal-instance/758?namespace=static-us';
      const res = await axios.get(url);
      console.log(res.data);
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
