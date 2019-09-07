const mongoose = require('mongoose');
const config = require('config');
const log = require('../logger');

const User = require('./models/user');

class Database {
  constructor() {
    const connection = config.get('mongoose.connection');
    this._connect(connection);
  }

  async _connect(connectionString) {
    try {
      mongoose.connect(connectionString, { useNewUrlParser: true });
    }
    catch (err) {
      throw Error(`Error connecting to database: [ ${err} ]`)
    }
  }

  async createUser(userDetails) {
    const user = new User(userDetails);

    return await user.save();
  }
}

module.exports = Database;