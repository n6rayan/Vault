const router = require('express').Router();

router.get('/healthcheck', (req, res) => {
  return res.send({
    now: new Date(),
    status: 'OK'
  });
});

module.exports = router;