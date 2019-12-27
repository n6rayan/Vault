const passport = require('passport');

const helpers = require('../helpers');

passport.use(require('./local'));
passport.use(require('./jwt'));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await helpers.findUserById(id);
  done(null, user);
});