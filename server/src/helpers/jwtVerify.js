const jwt = require('jsonwebtoken');

/**
 * Verifies a JWT
 * @param {String} jwtString
 * @param {String} secret
 * @returns {Object} Returns the decoded payload
 */
module.exports = (jwtString, secret) => {
  return jwt.verify(jwtString, secret);
};