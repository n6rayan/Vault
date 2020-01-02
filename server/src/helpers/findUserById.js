const Database = require('../database');

/**
 * Retrieves the user by the id specified
 * @param {String} id
 * @returns {Object} Returns the details of the user
 */
const findUserById = async (id) => {
  const db = new Database();

  return await db.getUserById(id);
};

module.exports = findUserById;