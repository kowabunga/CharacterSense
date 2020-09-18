import React, { useContext, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import UserContext from '../../../context/user/userContext';

const Auth = ({ location }) => {
  const userContext = useContext(UserContext);
  const {
    jwt,
    validToken,
    user: { accessToken },
    getOAuthToken,
    checkIfTokenValid,
    getUser,
  } = userContext;

  const history = useHistory();

  useEffect(() => {
    //When the page gets redirected by the authorize link below (in the return statement) the application state gets cleared.
    //It has to wait for the main app to reload the jwt into state from cookies
    //the useEffect watches for changes in the state jwt, and once all conditions are satisfied, calls a function that updates the user and stores updated user in context

    const authorize = async () => {
      //If access token from user data is null, user has never authenticated - must authenticate.
      if (accessToken === null) return;

      //If access token is present in user data, check if token is valid or not. If valid, redirect to character page. If invalid, must reauthorize.
      if (accessToken) {
        const tokenCheckRes = await checkIfTokenValid(accessToken);
        tokenCheckRes && history.push('/characters');
      } else if (location.search.length > 0 && !accessToken && jwt) {
        await getOAuthToken(jwt, location);
        await getUser(jwt);
        history.push('/characters');
      }
    };
    authorize();
  }, [jwt]);

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
