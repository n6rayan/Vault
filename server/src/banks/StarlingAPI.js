'use strict';
const axios = require('axios');
const config = require('config');
const qs = require('query-string');

const log = require('../logger');

class StarlingAPI {

  constructor() {
    this.starlingConfig = config.get('starling');
    this.vaultConfig = config.get('vault');
  }

  async getAccessToken(code) {
    const redirectUrl = `${this.vaultConfig.apiUrl}/starling/oauth/redirect`;

    const data = qs.stringify({
      code: code,
      client_id: this.starlingConfig.clientId,
      client_secret: this.starlingConfig.clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirectUrl
    });

    try {
      return await axios({
        method: 'POST',
        url: `${this.starlingConfig.apiUrl}/oauth/access-token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      });
    }
    catch (err) {
      log.error(`Problem getting an access token: ${err}`);
    }
  }

  async getAccountsList(token) {
    try {
      return await axios({
        method: 'GET',
        url: `${this.starlingConfig.apiUrl}/api/v2/accounts`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
    }
    catch (err) {
      log.error(`Problem retrieving accounts lists: ${err}`);
    }
  }

  async getAccountInfo(token, accountUid) {
    try {
      return await axios({
        method: 'GET',
        url: `${this.starlingConfig.apiUrl}/api/v2/accounts/${accountUid}/identifiers`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    catch (err) {
      log.error(`Problem getting account information: ${err}`)
    }
  }

  async getAccountBalance(token, accountUid) {
    try {
      return await axios({
        method: 'GET',
        url: `${this.starlingConfig.apiUrl}/api/v2/accounts/${accountUid}/balance`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    catch (err) {
      log.error(`Problem getting account balance: ${err}`)
    }
  }

  async getCurrentStatement(token, accountUid) {
    try {
      return await axios({
        method: 'GET',
        url: `${this.starlingConfig.apiUrl}/api/v2/accounts/${accountUid}/statement/download`,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/pdf',
        },
        params: {
          yearMonth: '2019-11'
        }
      });
    }
    catch (err) {
      log.error(`Problem getting the account statement: ${err}`);
    }
  }
}

module.exports = StarlingAPI;