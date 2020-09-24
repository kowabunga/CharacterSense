import React, { useContext, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import UserContext from '../../../context/user/userContext';

const Auth = ({ location }) => {
  const userContext = useContext(UserContext);
  const {
    jwt,
    user: { accessToken },
    getOAuthToken,
    checkIfTokenValid,
  } = userContext;

  const history = useHistory();

  useEffect(() => {
    //When the page gets redirected by the authorize link below (in the return statement) the application state gets cleared.
    //Wait for change in accessToken value, then run

    const authorize = async () => {
      //If access token is present in user data, check if token is valid or not. If valid, redirect to character page. If invalid, must reauthorize.
      if (accessToken) {
        console.log('Access token here: ', accessToken);
        const tokenCheckRes = checkIfTokenValid(accessToken);
        console.log(tokenCheckRes);
        tokenCheckRes && history.push('/characters');
      } else if (location.search.length > 0 && !accessToken && jwt) {
        await getOAuthToken(jwt, location);
        history.push('/characters');
      }
    };
    authorize();
  }, [accessToken]);

  return (
    <div className='jumbotron text-center'>
      <p className='display-2'>
        Almost there! Just <em>one</em> more thing...
      </p>
      <p className='lead'>
        You have to grant <em>CharacterSense</em> access to your World of
        Warcraft profile in order to use this application to its fullest. You
        can do so by below.
      </p>

      <p className='lead' style={{ fontSize: '1rem' }}>
        You might have done this before. Battle.net requires re-authorization
        every 24 hours after the last authorization. If you want to use the app,
        please authenticate again.
      </p>

      <a
        href={`https://us.battle.net/oauth/authorize?access_type=online&client_id=${process.env.REACT_APP_BNET_ID}&scope=openid wow.profile&redirect_uri=http://localhost:3000/auth&response_type=code&state=`}
        className='btn btn-link'
      >
        Authorize
      </a>
    </div>
  );
};

export default Auth;
