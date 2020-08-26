const passport = require('passport');

const BnetStrategy = require('passport-bnet').Strategy;
const BNET_ID = process.env.BNET_ID;
const BNET_SECRET = process.env.BNET_SECRET;

passport.use(
  new BnetStrategy(
    {
      clientID: BNET_ID,
      clientSecret: BNET_SECRET,
      callbackURL: '/auth/bnet/callback',
      region: 'us',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);
