const Database = require('../database');

module.exports = async (username) => {
  const db = new Database();

  return await db.getUserByUsername(username);
};