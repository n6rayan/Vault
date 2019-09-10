const Database = require('../database');

const findUserById = async (id) => {
  const db = new Database();

  return await db.getUserById(id);
};

module.exports = findUserById;