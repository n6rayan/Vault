'use strict';
const axios = require('axios');
const config = require('config');
const moment = require('moment');
const qs = require('query-string');

const log = require('../logger');

class StarlingAPI {

  constructor() {
    this.starlingConfig = config.get('starling');
    this.vaultConfig = config.get('vault');
  }

  /**
   * Retrieves access token to use to authenticate API requests
   * @param {String} code
   * @returns {Object} Returns `access_token`, `refresh_token`, `token_type`, `expires_in` and `scope`
   */
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

  /**
   * Retrieves list of accounts associated with user
   * @param {String} token
   * @returns {Object} Returns object with an array of accounts with `accountUid`, `defaultCategory`, `currency` and `createdAt`
   */
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

  /**
   * Retrieves the account information for the specified account
   * @param {String} token
   * @param {String} accountUid
   * @returns {Object} Returns `accountIdentifier`, `bankIdentifier`, `iban` and `bic`
   */
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
      log.error(`Problem getting account information: ${err}`);
    }
  }

  /**
   * Retrieves the account balance for the specified account
   * @param {String} token
   * @param {String} accountUid
   * @returns {Object} Returns various balance information
   */
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
      log.error(`Problem getting account balance: ${err}`);
    }
  }

  /**
   * Retrieves the statement for the current month to date
   * @param {String} token
   * @param {String} accountUid
   * @returns {File} Downloads a CSV file with a list of transactions
   */
  async getCurrentStatement(token, accountUid) {
    const date = moment().format('YYYY-MM');

    try {
      return await axios({
        method: 'GET',
        url: `${this.starlingConfig.apiUrl}/api/v2/accounts/${accountUid}/statement/download`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'text/csv',
        },
        params: {
          yearMonth: date
        }
      });
    }
    catch (err) {
      log.error(`Problem getting the account statement: ${err}`);
    }
  }
}

module.exports = StarlingAPI;