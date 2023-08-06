const fs = require('fs').promises;
const { join } = require('path');

const PATH_TALKER = join(__dirname, '..', 'talker.json');

// ----------READ---------- //

const read = async () => {
    try {
        const file = await fs.readFile(PATH_TALKER);
        const data = JSON.parse(file.toString());
        return data;
    } catch (err) {
        console.log(err);
    }
};

// ----------READ POR ID---------- //

const readId = async (id) => {
    try {
        const file = await read();
        const talkerById = file.find((talker) => talker.id === Number(id));
        return talkerById;
    } catch (err) {
        console.log(err);
    }
};

// ----------WRITE---------- //

const write = async (talker) => {
    try {
        const auxTalker = await read();
        const idNext = auxTalker.length + 1;
        const newTalker = {
            id: idNext,
            ...talker,
        };
        auxTalker.push(newTalker);
        await fs.writeFile(PATH_TALKER, JSON.stringify(auxTalker));
        return newTalker;
    } catch (err) {
        console.log(err);
    }
};

// ----------UPDATE---------- //

const update = async (id, talkerUpdate) => {
    try {
      const talkerList = await read();
      const talkerIndex = talkerList.findIndex((talker) => talker.id === id);
      if (talkerIndex === -1) {
        return undefined;
      }
  
      const updatedTalker = {
        id,
        ...talkerUpdate,
      };
  
      talkerList[talkerIndex] = updatedTalker;
      await fs.writeFile(PATH_TALKER, JSON.stringify(talkerList));
      return updatedTalker;
    } catch (err) {
      console.log('Error:', err);
    }
  };
  
// ----------DELETE---------- //

const deleteTalker = async (id) => {
    try {
        const file = await read();
        const filteredFile = file.filter((talker) => talker.id !== id);
        await fs.writeFile(PATH_TALKER, JSON.stringify(filteredFile));
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    read,
    readId,
    write,
    update,
    deleteTalker,
};