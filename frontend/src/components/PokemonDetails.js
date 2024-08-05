import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonDetails.css';  // Import PokemonDetails specific styles

function PokemonDetails() {
  const { id } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        const details = {
          pokemonName: response.data.name,
          imageUrl: response.data.sprites.front_default,
          initialPositionX: 50, // Rough data
          initialPositionY: 100, // Rough data
          speed: response.data.stats.find(stat => stat.stat.name === 'speed').base_stat,
          direction: "North" // Rough data
        };
        setPokemonDetails(details);
      })
      .catch(error => console.error(error));
  }, [id]);

  return (
    <div className="pokemon-details-page">
      <h1>Pokemon Details</h1>
      {pokemonDetails ? (
        <div className="pokemon-details-container">
          <img src={pokemonDetails.imageUrl} alt={pokemonDetails.pokemonName} className="pokemon-image" />
          <div className="pokemon-info">
            <h2>{pokemonDetails.pokemonName.charAt(0).toUpperCase() + pokemonDetails.pokemonName.slice(1)}</h2>
            <p><strong>Initial Position X:</strong> {pokemonDetails.initialPositionX}</p>
            <p><strong>Initial Position Y:</strong> {pokemonDetails.initialPositionY}</p>
            <p><strong>Speed:</strong> {pokemonDetails.speed}</p>
            <p><strong>Direction:</strong> {pokemonDetails.direction}</p>
          </div>
          <button className="go-back-button" onClick={() => window.history.back()}>Go Back</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PokemonDetails;
