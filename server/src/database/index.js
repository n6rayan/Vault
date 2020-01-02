const mongoose = require('mongoose');
const config = require('config');

const User = require('./models/User');

class Database {
  constructor() {
    const connection = config.get('mongoose.connection');
    this._connect(connection);
  }

  async _connect(connectionString) {
    try {
      mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    }
    catch (err) {
      throw Error(`Error connecting to database: [ ${err} ]`);
    }
  }

  async createUser(userDetails) {
    const user = new User(userDetails);

    return await user.save();
  }

  async getUserByUsername(username) {
    return await User.findOne({ username: username });
  }

  async getUserById(id) {
    return await User.findById(id);
  }
}

module.exports = Database;