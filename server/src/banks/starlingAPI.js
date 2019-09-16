const axios = require('axios');
const config = require('config');
const qs = require('query-string');

const getAccessToken = async (code) => {
  const starlingConfig = config.get('starling');

  const data = qs.stringify({
    code: code,
    client_id: starlingConfig.clientId,
    client_secret: starlingConfig.clientSecret,
    grant_type: 'authorization_code',
    redirect_uri: starlingConfig.redirectUrl
  });

  const options = {
    method: 'POST',
    url: starlingConfig.apiUrl,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  return await axios(options);
};

module.exports.getAccessToken = getAccessToken;