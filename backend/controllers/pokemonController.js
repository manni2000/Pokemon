const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/pokemonData.json');

const getPokemon = (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataPath));
    res.json(data);
};

const addPokemon = (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataPath));
    data.push(req.body);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.status(201).json(req.body);
};

const updatePokemon = (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataPath));
    const { id } = req.params;
    const index = data.findIndex(pokemon => pokemon.id === id);
    if (index !== -1) {
        data[index] = req.body;
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        res.json(req.body);
    } else {
        res.status(404).json({ message: 'Pokemon not found' });
    }
};

const deletePokemon = (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataPath));
    const { id } = req.params;
    const newData = data.filter(pokemon => pokemon.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2));
    res.status(204).end();
};

module.exports = {
    getPokemon,
    addPokemon,
    updatePokemon,
    deletePokemon,
};
