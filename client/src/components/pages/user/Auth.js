import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../../context/user/userContext';

const Auth = ({ location }) => {
  const userContext = useContext(UserContext);
  const {
    user: { accessToken },
    getOAuthToken,
  } = userContext;

  const history = useHistory();

  const automateClick = async e => {
    console.log(history);
    if (accessToken) {
      history.push('/characters');
    } else if (location.search.length > 0) {
      await getOAuthToken(location);
      history.push('/characters');
    } else {
      e.click();
    }
  };

  return (
    <div>
      <a
        ref={automateClick}
        href={`https://us.battle.net/oauth/authorize?client_id=${process.env.REACT_APP_BNET_ID}&scope=wow.profile&redirect_uri=http://localhost:3000/auth&response_type=code&state=`}
      ></a>
    </div>
  );
};

export default Auth;
