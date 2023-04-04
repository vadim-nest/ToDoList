const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

async function comparePassword(password, hash) {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

function generateAccessToken(username) {
  const token = jwt.sign({ username }, JWT_SECRET_KEY, {
    expiresIn: '2h',
  });

  return token;
}

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    return error;
  }
}

module.exports = {
  comparePassword,
  generateAccessToken,
  hashPassword,
};
