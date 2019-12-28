const Database = require('../database');

module.exports = async (id) => {
  const db = new Database();

  return await db.getUserById(id);
};