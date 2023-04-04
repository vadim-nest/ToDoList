const User = require('../models/index');
const { comparePassword, generateAccessToken } = require('../utils/auth');
const jwt = require('jsonwebtoken');


async function register(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).send('Invalid username or password');

    const compared = await comparePassword(req.body.password, user.password);
    if (!compared) return res.status(401).send('Invalid username or password');

    const token = generateAccessToken(user.username);
    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Access denied');

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) return res.status(401).send('Invalid token');

      const user = await User.findOne({ username: payload.username });

      if (!user) return res.status(401).send('User not found');
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function changePassword(req, res) {
  try {
    const { old_password, new_password } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('User not found');

    const compared = await comparePassword(old_password, user.password);
    if (!compared) return res.status(401).send('Invalid password');

    user.password = new_password;
    await user.save();

    res.status(200).send('Password changed successfully');
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function getInformation(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).send('User not found');

    res.status(200).send({username: user.username, email: user.email});
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = { register, login, changePassword, authenticateToken, getInformation };
