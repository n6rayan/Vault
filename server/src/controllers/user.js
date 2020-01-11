const config = require('config');

const Database = require('../database');
const emailDispatcher = require('../emailDispatcher');
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
    user.password = helpers.hashUserPassword(user.password);
    user.emailToken = helpers.jwtGenerate({ username: user.username })

    await db.createUser(user);

    const sentEmail = await emailDispatcher.sendConfirmationEmail(user.username, user.email, user.emailToken);

    if (!sentEmail.body.Sent.length) {
      throw new Error(`Email address: [${user.email}] is unreachable!`);
    }

    return res.status(200).send({
      success: 1,
      message: 'User created!'
    });
  }
  catch (err) {
    log.error(`Problem creating user: [ ${err} ]`);

    return res.status(400).send({
      success: 0,
      error: 'Unable to create user!'
    });
  }
}

const confirmUserAccount = async (req, res) => {
  const emailToken = req.query.data;
  const vaultConfig = config.get('vault');

  try {
    const payload = helpers.jwtVerify(emailToken);

    const userData = {
      isEmailConfirmed: true,
      emailToken: ''
    };

    const updateUser = await db.updateUser({ username: payload.username }, userData);
    console.log(updateUser);

    return res.redirect(vaultConfig.clientUrl);
  }
  catch (err) {
    log.error(err);

    return res.status(400).send({
      success: 0,
      message: 'Unable to confirm users email address!'
    });
  }
}

module.exports.createUser = createUser;
module.exports.confirmUserAccount = confirmUserAccount;