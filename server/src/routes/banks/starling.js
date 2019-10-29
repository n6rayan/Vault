const config = require('config');
const router = require('express').Router();
const uuid = require('uuid/v1');

const starling = require('../../banks/starlingAPI');

const ouathState = uuid();

router.get('/oauth/login', (req, res) => {
  const starlingConfig = config.get('starling');
  const clientId = starlingConfig.clientId;
  const redirectUrl = starlingConfig.redirectUrl;

  const starlingOauthUrl = starlingConfig.oauthUrl;

  const url = `${starlingOauthUrl}client_id=${clientId}&response_type=code&state=${ouathState}&redirect_uri=${redirectUrl}`;

  req.session.save(() => {
    res.redirect(url);
  });
});

router.get('/oauth/redirect', async (req, res) => {
  const state = req.query.state;
  const code = req.query.code;

  if (state && state !== ouathState) {
    return res.status(400).send();
  }

  const accessToken = await starling.getAccessToken(code);

  req.session.reload(() => {
    req.session.accessToken = accessToken.data.access_token;
    req.session.refreshToken = accessToken.data.refresh_token;

    res.redirect('http://localhost:3000/account');
  });
});

module.exports = router;
