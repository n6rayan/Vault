const Database = require('../database');
const log = require('../logger');

const db = new Database();

const createUser = async (req, res) => {
  try {
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