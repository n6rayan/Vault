const router = require('express').Router();

const Controller = require('../controllers/user');

router.post('/user', async (req, res) => Controller.createUser(req, res));
router.get('/user/:username', async (req, res) => Controller.getUser(req, res));
router.get('/user/confirm', async (req, res) => Controller.confirmUserAccount(req, res));

module.exports = router;