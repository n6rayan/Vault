const config = require('config');
const jwt = require('jsonwebtoken');

const secret = config.get('jwt.secret');

/**
 * Modifies the current JWT payload, adding the new tokens
 * @param {String} jwtString
 * @param {Object} tokens
 * @returns {String} Returns a valid, and newly modified, JWT
 */
module.exports = (jwtString, tokens) => {
  const payload = jwt.verify(jwtString, secret);

  const body = {
    ...payload,
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token
  };

  return jwt.sign(body, secret);
};