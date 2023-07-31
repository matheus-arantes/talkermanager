const express = require('express');
const talker = require('./talker');

const router = express.Router();

router.use('/talker', talker);

module.exports = router;