const router = require('express').Router();

router.use(require('./healthcheck'));
router.use(require('./user'));

module.exports = router;