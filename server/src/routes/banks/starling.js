const config = require('config');
const router = require('express').Router();
const fs = require('fs');
const uuid = require('uuid/v1');

const StarlingAPI = require('../../banks/starlingAPI');

const vaultConfig = config.get('vault');
const ouathState = uuid();

const starling = new StarlingAPI();

router.get('/oauth/login', (req, res) => {
  const starlingConfig = config.get('starling');

  const clientId = starlingConfig.clientId;
  const redirectUrl = `${vaultConfig.apiUrl}/starling/oauth/redirect`;
  const starlingOauthUrl = starlingConfig.oauthUrl;

  const url = `${starlingOauthUrl}client_id=${clientId}&response_type=code&state=${ouathState}&redirect_uri=${redirectUrl}`;

  req.session.save((err) => {
    if (err) console.log(`THERE WAS AN ERROR SAVING THE SESSION: ${err}`);
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

  req.session.reload((err) => {
    if (err) console.log(`THERE WAS AN ERROR LOADING THE SESSION: ${err}`);

    req.session.accessToken = accessToken.data.access_token;
    req.session.refreshToken = accessToken.data.refresh_token;

    res.redirect(`${vaultConfig.clientUrl}/account`);
  });
});

router.get('/accounts', async (req, res) => {
  const accountsRequest = await starling.getAccountsList(req.session.accessToken);

  const accountUids = accountsRequest.data.accounts.map(account => {
    return account.accountUid;
  });

  let accountsInfo = [];

  for (const accountId of accountUids) {
    const accountIds = await starling.getAccountInfo(req.session.accessToken, accountId);
    const accountBalance = await starling.getAccountBalance(req.session.accessToken, accountId);

    const normalizedAccountInfo = {
      name: 'Starling',
      accNumber: accountIds.data.accountIdentifier,
      sortCode: accountIds.data.bankIdentifier,
      balance: accountBalance.data.availableToSpend.minorUnits,
      currency: accountBalance.data.availableToSpend.currency,
      uid: accountId,
    };

    accountsInfo.push(normalizedAccountInfo);
  }

  res.send(accountsInfo);
});

router.get('/statement/:accountId', async (req, res) => {
  const statement = await starling.getCurrentStatement(req.session.accessToken, req.params.accountId);
  console.log(statement.data);

  res.contentType('application/pdf').send(statement.data);
});

module.exports = router;
