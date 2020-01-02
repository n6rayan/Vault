'use strict';
const Database = require('../database');

class UserController {
  constructor() {
    this.database = new Database();
  }

  /**
   * Creates a new user in the database
   * @param {Object} body
   * @returns {Object} Returns the details you sent in with an additional _id field
   */
  async createUser(body) {
    return this.database.createUser(body);
  }

  /**
   * Retrieves a user from the database
   * @param {Object} body
   * @returns {Object} Returns the details of the user
   */
  async getUser(body) {
    return this.database.getUser(body);
  }
}

module.exports = UserController;