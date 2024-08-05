import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';  
import pokemonIcon from '../photo/pokemonIcon.png'; 

function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`)
      .then(response => setPokemonList(response.data.results))
      .catch(error => console.error(error));
  }, [page]);

  const handleSelectChange = (event) => {
    setSelectedPokemon(event.target.value);
    navigate(`/pokemon/${event.target.value}`);
  };

  return (
    <div className="home-page">
      <header>
        <div className="left-header">
          <div className="logo">
            <img src={pokemonIcon} alt="Pokemon Logo" />
            <h1>Pokemon App</h1>
          </div>
          <select className="pokemon-select" value={selectedPokemon} onChange={handleSelectChange}>
            <option value="" disabled>Choose Pokemon</option>
            {pokemonList.map((pokemon, index) => (
              <option key={index} value={pokemon.name}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <nav className="right-header">
          <button onClick={() => navigate('/add-pokemon')} className="nav-button">Add Pokemon</button>
          <button onClick={() => navigate('/list-pokemon')} className="nav-button">List Pokemon</button>
        </nav>
      </header>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon, index) => (
          <Link to={`/pokemon/${pokemon.url.split('/')[6]}`} key={index} className="pokemon-card">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
            <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
          </Link>
        ))}
        {}
        {[...Array(20 - pokemonList.length)].map((_, index) => (
          <div key={index} className="pokemon-card empty-card"></div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default HomePage;
