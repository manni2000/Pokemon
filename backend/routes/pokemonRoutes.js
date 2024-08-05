const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon');

router.get('/', (req, res) => {
  const data = Pokemon.getAll();
  res.json(data);
});

router.post('/', (req, res) => {
  const newPokemon = Pokemon.create(req.body);
  res.json(newPokemon);
});

router.put('/:id', (req, res) => {
  const updatedPokemon = Pokemon.update(req.params.id, req.body);
  if (updatedPokemon) {
    res.json(updatedPokemon);
  } else {
    res.status(404).json({ message: 'Pokemon not found' });
  }
});

router.delete('/:id', (req, res) => {
  const result = Pokemon.deleteById(req.params.id);
  res.json(result);
});

router.delete('/all', (req, res) => {
  const result = Pokemon.deleteAll();
  res.json(result);
});

module.exports = router;
