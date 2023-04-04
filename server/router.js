const express = require('express');
const router = express.Router();
const { register, login, changePassword, authenticateToken, getInformation } = require('./controllers/controller');

router.post('/api/register', register);

router.post('/api/login', login);

router.post('/api/actions/changepassword', authenticateToken, changePassword);

router.get('/api/profiles', authenticateToken, getInformation);

module.exports = router;
