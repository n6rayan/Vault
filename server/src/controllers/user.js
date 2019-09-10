'use strict';
const Database = require('../database');

class UserController {
  constructor() {
    this.database = new Database();
  }

  async createUser(body) {
    return this.database.createUser(body);
  }

  async getUser(body) {
    return this.database.getUser(body);
  }
}

module.exports = UserController;