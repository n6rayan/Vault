const passport = require('passport');
const router = require('express').Router();

const log = require('../logger');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      log.error(err);
      return next(err);
    }

    if (!user) {
      log.info(info);

      info.success = 0;
      return res.send(info);
    }

    req.logIn(user, (err) => {
      if (err) {
        log.error(err);
        return next(err);
      }

      return res.send({
        success: 1,
        message: 'Successfully logged in!',
        user: req.user
      });
    });
  })(req, res, next);
});

router.get('/current-user', (req, res) => {
  if (req.user) {
    res.send({ user: req.user });
  }
  else {
    res.send({ user: null });
  }
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.send({ success: 1, message: 'Successfully logged out!' });
});

module.exports = router;