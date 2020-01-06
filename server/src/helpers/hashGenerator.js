const config = require('config');
const crypto = require('crypto');

module.exports = (data) => {
  return crypto.createHmac('sha256', config.get('crypto.secret'))
    .update(data).digest('hex');
};