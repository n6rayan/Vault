const router = require('express').Router();

const Controller = require('../controllers/user');

router.post('/user', async (req, res) => Controller.createUser(req, res));

module.exports = router;