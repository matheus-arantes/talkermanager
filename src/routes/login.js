const express = require('express');
const geraToken = require('../utils/tokenGenerator');
const { emailValidator, passwordValidator } = require('../middlewares/loginValidator');

const login = express.Router();

login.post('/', emailValidator, passwordValidator, (req, res) => {
    try {
        const token = geraToken();
        res.status(200).json({ token });
    } catch (err) {
        console.log(err);
    }
});

module.exports = login;