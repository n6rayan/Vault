const bcrypt = require('bcrypt');

module.exports = (userPassword, hash) => {
  return bcrypt.compareSync(userPassword, hash);
};