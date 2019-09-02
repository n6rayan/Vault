const router = require('express').Router();

const log = require('../logger');
const UserController = require('../controllers/user');

router.post('/user', async (req, res) => {
  const user = new UserController();

  try {
    await user.createUser(req.body);

    return res.status(200).send({
      success: true,
      message: "User created!"
    });
  }
  catch (err) {
    log.error(`Problem creating user: [ ${err} ]`);

    return res.status(400).send({
      success: false,
      error: "Unable to create user!"
    });
  }
});

module.exports = router;