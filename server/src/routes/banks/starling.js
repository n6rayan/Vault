const config = require('config');
const router = require('express').Router();
const uuid = require('uuid/v1');

const StarlingAPI = require('../../banks/starlingAPI');
const helpers = require('../../helpers');

const vaultConfig = config.get('vault');
const jwtSecret = config.get('jwt.secret');
const ouathState = uuid();

const starling = new StarlingAPI();

router.get('/oauth/login', (req, res) => {
  const starlingConfig = config.get('starling');

  const clientId = starlingConfig.clientId;
  const redirectUrl = `${vaultConfig.apiUrl}/starling/oauth/redirect`;
  const starlingOauthUrl = starlingConfig.oauthUrl;

  const url = `${starlingOauthUrl}client_id=${clientId}&response_type=code&state=${ouathState}&redirect_uri=${redirectUrl}`;

  res.redirect(url);
});

router.get('/oauth/redirect', async (req, res) => {
  const state = req.query.state;
  const code = req.query.code;

  if (state && state !== ouathState) {
    return res.status(400).send();
  }

  const tokens = await starling.getAccessToken(code);
  const jwt = helpers.storeTokensAgainstSession(req.cookies.jwt, tokens.data, jwtSecret);

  res.cookie('jwt', jwt, { httpOnly: true }).redirect(`${vaultConfig.clientUrl}/account`);
});

router.get('/accounts', async (req, res) => {
  const accessToken = helpers.jwtVerify(req.cookies.jwt, jwtSecret).accessToken;
  const accountsRequest = await starling.getAccountsList(accessToken);

  const accountUids = accountsRequest.data.accounts.map(account => {
    return account.accountUid;
  });

  let accountsInfo = [];

  for (const accountId of accountUids) {
    const accountIds = await starling.getAccountInfo(accessToken, accountId);
    const accountBalance = await starling.getAccountBalance(accessToken, accountId);

    const normalizedAccountInfo = {
      name: 'Starling',
      accNumber: accountIds.data.accountIdentifier,
      sortCode: accountIds.data.bankIdentifier,
      balance: accountBalance.data.amount.minorUnits,
      currency: accountBalance.data.amount.currency,
      uid: accountId,
    };

    accountsInfo.push(normalizedAccountInfo);
  }

  res.send(accountsInfo);
});

router.get('/statement/:accountId', async (req, res) => {
  const accessToken = helpers.jwtVerify(req.cookies.jwt, jwtSecret).accessToken;
  const statement = await starling.getCurrentStatement(accessToken, req.params.accountId);

  res.contentType('application/pdf').send(statement.data);
});

module.exports = router;
