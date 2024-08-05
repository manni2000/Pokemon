const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/pokemonData.json');

const readData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

class Pokemon {
  static getAll() {
    return readData();
  }

  static getById(id) {
    const data = readData();
    return data.find(pokemon => pokemon.id === id);
  }

  static create(pokemonData) {
    const data = readData();
    const newPokemon = { id: Date.now().toString(), ...pokemonData };
    data.push(newPokemon);
    writeData(data);
    return newPokemon;
  }

  static update(id, updatedData) {
    const data = readData();
    const index = data.findIndex(pokemon => pokemon.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedData };
      writeData(data);
      return data[index];
    }
    return null;
  }

  static deleteById(id) {
    const data = readData();
    const updatedData = data.filter(pokemon => pokemon.id !== id);
    writeData(updatedData);
    return { message: 'Pokemon deleted' };
  }

  static deleteAll() {
    writeData([]);
    return { message: 'All Pokemons deleted' };
  }
}

module.exports = Pokemon;
