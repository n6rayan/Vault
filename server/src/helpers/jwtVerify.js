const config = require('config');
const jwt = require('jsonwebtoken');

/**
 * Verifies a JWT
 * @param {String} jwtString
 * @param {String} secret
 * @returns {Object} Returns the decoded payload
 */
module.exports = (jwtString) => {
  return jwt.verify(jwtString, config.get('jwt.secret'));
};