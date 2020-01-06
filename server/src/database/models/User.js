const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isEmailConfirmed: {
    type: Boolean,
    role: {
      type: Boolean,
      default: false,
    }
  },
  emailHash: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;