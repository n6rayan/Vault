const config = require('config');
const router = require('express').Router();
const uuid = require('uuid/v1');

const starling = require('../../banks/starlingAPI');

router.get('/oauth/login', (req, res) => {
  const ouathState = uuid();
  req.session.ouathState = ouathState;

  const starlingConfig = config.get('starling');
  const clientId = starlingConfig.clientId;
  const redirectUrl = starlingConfig.redirectUrl;

  const starlingOauthUrl = starlingConfig.oauthUrl;

  const url = `${starlingOauthUrl}client_id=${clientId}&response_type=code&state=${ouathState}&redirect_uri=${redirectUrl}`;

  res.redirect(url);
});

router.get('/oauth/redirect', async (req, res) => {
  // const state = req.query.state;
  const code = req.query.code;

  // TODO: FIX ME - Session no persisting
  // if (state && state !== req.session.ouathState) {
  //   console.log(req.session.ouathState);
  //   console.log('State did not match original state');
  //   return res.status(400).send();
  // }

  const accessToken = await starling.getAccessToken(code);
  req.session.accessToken = accessToken.data.access_token;
  req.session.refreshToken = accessToken.data.refresh_token;

  res.redirect('http://localhost:3000/');
});

module.exports = router;