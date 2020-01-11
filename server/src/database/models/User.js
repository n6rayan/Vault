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
  emailToken: {
    type: String,
    role: {
      type: String,
      default: ''
    }
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;