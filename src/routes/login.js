const express = require('express');
const geraToken = require('../utils/tokenGenerator');

const login = express.Router();

login.post('/', (req, res) => {
    try {
        const token = geraToken();
        res.status(200).json({ token });
    } catch (err) {
        console.log(err);
    }
});

module.exports = login;