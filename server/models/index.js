const mongoose = require('mongoose');
const UserSchema = require('./user');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
