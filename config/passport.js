const BnetStrategy = require('passport-bnet').Strategy;
const User = require('../models/User');

module.exports = passport => {
  passport.use(
    new BnetStrategy(
      {
        clientID: process.env.BNET_ID,
        clientSecret: process.env.BNET_SECRET,
        callbackURL: '/auth/bnet/callback',
        region: 'us',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          return done(null, profile);
        } catch (error) {
          console.error(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
