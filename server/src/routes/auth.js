const config = require('config');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = require('express').Router();

const log = require('../logger');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      log.error(err);
      return next(err);
    }

    if (!user) {
      return res.send({ success: 0, error: 'User not found!' });
    }

    const payload = {
      username: user.username,
      expires: Date.now() + 3000000
    };

    req.login(payload, { session: false }, (err) => {
      if (err) {
        log.error(err);
        return next(err);
      }

      const token = jwt.sign(payload, config.get('jwt.secret'));

      return res.cookie('jwt', token).send({
        success: 1,
        message: 'Successfully logged in!',
        user: req.user.username,
      });
    });
  })(req, res, next);
});

router.get('/current-user', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { user } = req;

  res.send({ user });
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwt').send({
    success: 1,
    message: 'Successfully logged out!'
  });
});

module.exports = router;