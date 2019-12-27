const jwt = require('jsonwebtoken');

module.exports = (jwtString, secret) => {
  return jwt.verify(jwtString, secret);
};