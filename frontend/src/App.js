import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddPokemonPage from './components/AddPokemonPage';
import ListPokemonPage from './components/ListPokemonPage';
import HomePage from './components/HomePage';
import PokemonDetails from './components/PokemonDetails';
import './index.css';  // Ensure global styles are imported

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/add-pokemon" element={<AddPokemonPage />} />
      <Route path="/list-pokemon" element={<ListPokemonPage />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
    </Routes>
  );
}

export default App;
