const router = require('express').Router();

const log = require('../logger');
const User = require('../controllers/user');

router.post('/user', async (req, res) => {
  const user = new User();

  let result;

  try {
    result = await user.createUser(req.body);
  }
  catch (err) {
    log.error(`Problem creating user: [${err}]`);
  }
});

module.exports = router;