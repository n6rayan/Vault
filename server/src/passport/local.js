const LocalStrategy = require('passport-local').Strategy;

const helpers = require('../helpers');

module.exports = new LocalStrategy(async (username, password, done) => {
  let user;

  try {
    user = await helpers.findUser(username);

    if (!user) {
      return done(null, false);
    }

    if (password !== user.password) {
      return done(null, false);
    }
  }
  catch (err) {
    return done(err);
  };

  return done(null, user);
});