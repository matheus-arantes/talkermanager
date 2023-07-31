const express = require('express');
const { read } = require('../utils/fs')

const talker = express.Router();

talker.get('/', async (req, res) => res.status(200).json(await read()));

module.exports = { talker };