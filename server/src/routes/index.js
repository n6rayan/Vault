const router = require('express').Router();

router.use(require('./healthcheck'));
router.use(require('./login'));
router.use(require('./user'));

module.exports = router;