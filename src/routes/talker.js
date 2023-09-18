const express = require('express');
const { read, readId, write, update, deleteTalker } = require('../utils/fs');
const talkerValidator = require('../middlewares/talkerValidator');
const { isTokenValid } = require('../middlewares/tokenValidator');

const talker = express.Router();

talker.get('/', async (_req, res) => res.status(200).json(await read()));

talker.get('/search', isTokenValid, async (req, res) => {
  try {
    const { q } = req.query || '';
    const file = read();
    const filteredFile = file.filter(({ talker }) => talker.name.toLowerCase().includes(q.toLowerCase()));
    res.status(200).json(filteredFile);
  } catch (err) {
    console.log(err);
  }
});

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


talker.post('/', isTokenValid, talkerValidator, async (req, res) => {
    try {
        const talkerWrite = await write(req.body);
        res.status(201).json(talkerWrite);
    } catch (err) {
        console.log(err);
    }
});

talker.put('/:id', isTokenValid, talkerValidator, async (req, res) => {
    try {
      const { id } = req.params;
        
      const talkerUpdate = await update(Number(id), req.body);
        
      if (!talkerUpdate) {
        return res.status(404).json({
          message: 'Pessoa palestrante não encontrada',
        });
      }
  
      res.status(200).json(talkerUpdate);
    } catch (err) {
      console.log(err);
    }
  });

talker.delete('/:id', isTokenValid, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTalker(Number(id));
    res.status(204).end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = talker;