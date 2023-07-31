const express = require('express');
const talker = require('./talker');
const login = require('./login');

const router = express.Router();

router.use('/talker', talker);
router.use('/login', login);

module.exports = router;