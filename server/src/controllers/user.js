'use strict';
const Database = require('../database')
const log = require('../logger');

class UserController {
  constructor() {
    this.database = new Database();
  }

  async createUser(body) {
    return this.database.createUser(body);
  }
}

module.exports = UserController;