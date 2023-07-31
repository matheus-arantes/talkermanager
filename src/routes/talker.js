const express = require('express');
const { read, readId } = require('../utils/fs');

const talker = express.Router();

talker.get('/', async (_req, res) => res.status(200).json(await read()));

talker.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const talkerInfo = await read();
        const filteredTalker = await readId(id);
        if(filteredTalker) {
            return res.status(200).json(filteredTalker);
        }
    } catch (err) {
        console.log(err);
    }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = talker;