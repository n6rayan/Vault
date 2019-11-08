const axios = require('axios');
const config = require('config');
const qs = require('query-string');

const log = require('../logger');
const starlingConfig = config.get('starling');
const vaultConfig = config.get('vault');

const getAccessToken = async (code) => {
  const redirectUrl = `${vaultConfig.apiUrl}/starling/oauth/redirect`;

  const data = qs.stringify({
    code: code,
    client_id: starlingConfig.clientId,
    client_secret: starlingConfig.clientSecret,
    grant_type: 'authorization_code',
    redirect_uri: redirectUrl
  });

  try {
    return await axios({
      method: 'POST',
      url: `${starlingConfig.apiUrl}/oauth/access-token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    });
  }
  catch (err) {
    log.error(`Problem getting an access token: ${err}`);
  }
};

const getAccountsList = async (token) => {
  try {
    return await axios({
      method: 'GET',
      url: `${starlingConfig.apiUrl}/api/v2/accounts`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  }
  catch (err) {
    log.error(`Problem retrieving accounts lists: ${err}`);
  }
}

module.exports.getAccessToken = getAccessToken;
module.exports.getAccountsList = getAccountsList;