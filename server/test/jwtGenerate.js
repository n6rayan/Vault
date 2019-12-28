const jwt = require('jsonwebtoken');
const config = require('config');

const payload = {
  username: 'N6Rayan',
  expires: Date.now() + 3000000
};

module.exports = jwt.sign(payload, config.get('jwt.secret'));