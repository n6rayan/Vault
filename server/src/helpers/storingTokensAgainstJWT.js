const config = require('config');
const jwt = require('jsonwebtoken');

const secret = config.get('jwt.secret');

module.exports = (jwtString, tokens) => {
  const payload = jwt.verify(jwtString, secret);

  const body = {
    ...payload,
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token
  };

  return jwt.sign(body, secret);
};