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
        //Check if user exists, if not save to db
        try {
          let user = await User.findOne({ bnetId: profile.id });
          if (user) {
            console.log('user exists');
          } else {
            user = new User({
              bnetId: profile.id,
              battleTag: profile.battletag,
            });

            await user.save();
          }

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
    User.findOne({ bnetId: id }, (err, user) => done(err, user));
  });
};
