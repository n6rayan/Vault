const config = require('config');
const JWTStrategy = require('passport-jwt').Strategy;

const opts = {
  jwtFromRequest: (req) => req.cookies.jwt,
  secretOrKey: config.get('jwt.secret'),
};

module.exports = new JWTStrategy(opts, async (jwtPayload, done) => {
  if (Date.now() > jwtPayload.expires) {
    return done(null, false);
  }

  return done(null, jwtPayload);
});