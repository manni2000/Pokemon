import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AddPokemonPage.css';  // Import AddPokemonPage specific styles

function AddPokemonPage() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonAbility, setPokemonAbility] = useState('');
  const [pokemonOwnerName, setPokemonOwnerName] = useState('');
  const [initialPositionX, setInitialPositionX] = useState('');
  const [initialPositionY, setInitialPositionY] = useState('');
  const [speed, setSpeed] = useState('');
  const [direction, setDirection] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [abilitiesList, setAbilitiesList] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon-species/')
      .then(response => setPokemonList(response.data.results))
      .catch(error => console.error(error));
  }, []);

  const handlePokemonChange = (event) => {
    setPokemonName(event.target.value);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${event.target.value}`)
      .then(response => {
        const abilities = response.data.abilities.map(ability => ability.ability.name);
        setAbilitiesList(abilities);
        if (abilities.length === 1) {
          setPokemonAbility(abilities[0]);
        }
      })
      .catch(error => console.error(error));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!pokemonOwnerName) newErrors.pokemonOwnerName = 'Required';
    if (!pokemonName) newErrors.pokemonName = 'Required';
    if (!initialPositionX) newErrors.initialPositionX = 'Required';
    if (!initialPositionY) newErrors.initialPositionY = 'Required';
    if (!speed) newErrors.speed = 'Required';
    if (!direction) newErrors.direction = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const newPokemon = {
      pokemonName,
      pokemonAbility,
      pokemonOwnerName,
      initialPositionX,
      initialPositionY,
      speed,
      direction
    };
    axios.post('http://localhost:5000/api/pokemon', newPokemon)
      .then(response => {
        console.log(response.data);
        // Reset form fields
        setPokemonName('');
        setPokemonAbility('');
        setPokemonOwnerName('');
        setInitialPositionX('');
        setInitialPositionY('');
        setSpeed('');
        setDirection('');
        setErrors({});
        setSuccessMessage('Pokemon is added!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="add-pokemon-page">
      <h1>Create Pokemon User</h1>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="pokemon-form">
        <input
          type="text"
          placeholder="Pokemon Owner Name"
          value={pokemonOwnerName}
          onChange={(e) => setPokemonOwnerName(e.target.value)}
        />
        {errors.pokemonOwnerName && <span className="error">{errors.pokemonOwnerName}</span>}
        <input
          type="text"
          placeholder="Pokemon Name"
          value={pokemonName}
          onChange={handlePokemonChange}
          list="pokemon-list"
          className="pokemon-dropdown"
        />
        {errors.pokemonName && <span className="error">{errors.pokemonName}</span>}
        <datalist id="pokemon-list">
          {pokemonList.map((pokemon, index) => (
            <option key={index} value={pokemon.name} />
          ))}
        </datalist>
        {abilitiesList.length > 1 && (
          <select value={pokemonAbility} onChange={(e) => setPokemonAbility(e.target.value)}>
            {abilitiesList.map((ability, index) => (
              <option key={index} value={ability}>
                {ability}
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          placeholder="Initial Position X"
          value={initialPositionX}
          onChange={(e) => setInitialPositionX(e.target.value)}
        />
        {errors.initialPositionX && <span className="error">{errors.initialPositionX}</span>}
        <input
          type="text"
          placeholder="Initial Position Y"
          value={initialPositionY}
          onChange={(e) => setInitialPositionY(e.target.value)}
        />
        {errors.initialPositionY && <span className="error">{errors.initialPositionY}</span>}
        <input
          type="text"
          placeholder="Speed"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
        {errors.speed && <span className="error">{errors.speed}</span>}
        <input
          type="text"
          placeholder="Direction"
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        />
        {errors.direction && <span className="error">{errors.direction}</span>}
        <button type="submit">Add Pokemon</button>
      </form>
      <div className="button-group">
        <Link to="/" className="home-button">Home</Link>
        <Link to="/list-pokemon" className="pokemon-list-button">Pokemon List</Link>
      </div>
    </div>
  );
}

export default AddPokemonPage;
