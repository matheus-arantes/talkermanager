const express = require('express');
const { read, readId, write } = require('../utils/fs');
const talkerValidator = require('../middlewares/talkerValidator');

const talker = express.Router();

talker.get('/', async (_req, res) => res.status(200).json(await read()));

talker.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const filteredTalker = await readId(id);
        if (filteredTalker) {
            return res.status(200).json(filteredTalker);
        }
    } catch (err) {
        console.log(err);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

talker.post('/', talkerValidator, async (req, res) => {
    try {
        const talkerWrite = await write(req.body);
        res.status(201).json(talkerWrite);
    } catch (err) {
        console.log(err);
    }
});

module.exports = talker;