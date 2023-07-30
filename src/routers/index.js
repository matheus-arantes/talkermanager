const express = require('express');
const talker = require('./talker');

const root = express.Router();

root.use('/talker', talker);

module.exports = root;