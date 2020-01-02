const Database = require('../database');

/**
 * Retrieves the user by the username specified
 * @param {String} username
 * @returns {Object} Returns the details of the user
 */
const findUser = async (username) => {
  const db = new Database();

  return await db.getUserByUsername(username);
};

module.exports = findUser;