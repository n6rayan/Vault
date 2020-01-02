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

  /**
   * Creates a new user in the database
   * @param {Object} userDetails
   * @returns {Object} Returns the details you sent in with an additional _id field
   */
  async createUser(userDetails) {
    const user = new User(userDetails);

    return await user.save();
  }

  /**
   * Retrieves the user by the username specified
   * @param {String} username
   * @returns {Object} Returns the details of the user
   */
  async getUserByUsername(username) {
    return await User.findOne({ username: username });
  }

  /**
   * Retrieves the user by the id specified
   * @param {String} id
   * @returns {Object} Returns the details of the user
   */
  async getUserById(id) {
    return await User.findById(id);
  }
}

module.exports = Database;