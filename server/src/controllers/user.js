const Database = require('../database');
const helpers = require('../helpers');
const log = require('../logger');

const db = new Database();

/**
 * Creates a new user in the database
 * @param {Object} body
 * @returns {Object} Returns the details you sent in with an additional _id field
 */
const createUser = async (req, res) => {
  const user = req.body;

  try {
    const hashedPassword = helpers.hashUserPassword(user.password);
    user.password = hashedPassword;

    await db.createUser(req.body);

    return res.status(200).send({
      success: 1,
      message: "User created!"
    });
  }
  catch (err) {
    log.error(`Problem creating user: [ ${err} ]`);

    return res.status(400).send({
      success: 0,
      error: "Unable to create user!"
    });
  }
}

module.exports.createUser = createUser;