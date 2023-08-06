const express = require('express');
const { read, readId, write, update } = require('../utils/fs');
const talkerValidator = require('../middlewares/talkerValidator');

const talker = express.Router();

talker.get('/', async (_req, res) => res.status(200).json(await read()));

talker.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const filteredTalker = await readId(Number(id));
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

talker.put('/:id', talkerValidator, async (req, res) => {
    try {
      const { id } = req.params;
      console.log('ID:', id);
  
      const talkerUpdate = await update(Number(id), req.body);
      console.log('talkerUpdate:', talkerUpdate);
  
      if (!talkerUpdate) {
        return res.status(404).json({
          message: 'Pessoa palestrante não encontrada',
        });
      }
  
      res.status(200).json(talkerUpdate);
    } catch (err) {
      console.log('Error:', err);
      res.status(500).json({
        message: 'Ocorreu um erro durante a atualização do palestrante',
      });
    }
  });
  

module.exports = talker;