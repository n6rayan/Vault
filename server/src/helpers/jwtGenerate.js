const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (payload) => {
  return jwt.sign(payload, config.get('jwt.secret'));
}