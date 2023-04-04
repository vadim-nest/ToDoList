const mongoose = require('mongoose');
const { hashPassword } = require('../utils/auth');

const UserSchema = new mongoose.Schema({
  username: {
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
  token: {
    type: String,
  },
});

UserSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const hash = await hashPassword(user.password);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = UserSchema;
