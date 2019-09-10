const Database = require('../database');

const findUser = async (username) => {
  const db = new Database();

  return await db.getUserByUsername(username);
};

module.exports = findUser;