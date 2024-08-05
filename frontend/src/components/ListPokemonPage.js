import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListPokemonPage.css';  

function ListPokemonPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); 
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [formData, setFormData] = useState({
    pokemonOwnerName: '',
    pokemonName: '',
    pokemonAbility: '',
    noOfPokemon: 1,
    initialPositionX: '',
    initialPositionY: '',
    speed: '',
    direction: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://pokemon-rosy-chi.vercel.app/api/pokemon')
      .then(response => setPokemonList(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://pokemon-rosy-chi.vercel.app/api/pokemon/${id}`)
      .then(() => setPokemonList(pokemonList.filter(pokemon => pokemon.id !== id)))
      .catch(error => console.error(error));
  };

  const handleDeleteAll = () => {
    axios.delete('https://pokemon-rosy-chi.vercel.app/api/pokemon/all')
      .then(() => setPokemonList([]))
      .catch(error => console.error(error));
  };

  const handleAddPokemon = () => {
    setModalType('add');
    setFormData({
      pokemonOwnerName: '',
      pokemonName: '',
      pokemonAbility: '',
      noOfPokemon: 1,
      initialPositionX: '',
      initialPositionY: '',
      speed: '',
      direction: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const pokemonToEdit = pokemonList.find(pokemon => pokemon.id === id);
    setFormData({
      pokemonOwnerName: pokemonToEdit.pokemonOwnerName,
      pokemonName: pokemonToEdit.pokemonName,
      pokemonAbility: pokemonToEdit.pokemonAbility,
      noOfPokemon: pokemonToEdit.noOfPokemon || 1, 
      initialPositionX: pokemonToEdit.initialPositionX,
      initialPositionY: pokemonToEdit.initialPositionY,
      speed: pokemonToEdit.speed,
      direction: pokemonToEdit.direction
    });
    setModalType('edit');
    setCurrentPokemon(pokemonToEdit);
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    if (modalType === 'add') {
      axios.post('https://pokemon-rosy-chi.vercel.app/api/pokemon', formData)
        .then(response => {
          setPokemonList([...pokemonList, response.data]);
          setIsModalOpen(false);
        })
        .catch(error => console.error(error));
    } else if (modalType === 'edit') {
      axios.put(`https://pokemon-rosy-chi.vercel.app/api/pokemon/${currentPokemon.id}`, formData)
        .then(response => {
          setPokemonList(pokemonList.map(pokemon => 
            pokemon.id === currentPokemon.id ? response.data : pokemon
          ));
          setIsModalOpen(false);
        })
        .catch(error => console.error(error));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="list-pokemon-page">
      <h1>List of Pokemon Users</h1>
      <div className="table-actions">
        <button className="home-button" onClick={() => navigate('/')}>Home</button>
        <button className="create-list-button" onClick={handleAddPokemon}>Create List</button>
        <button className="delete-all-button" onClick={handleDeleteAll}>Delete All</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Pokemon Owner Name</th>
            <th>Pokemon Name</th>
            <th>Pokemon Ability</th>
            <th>No. of Pokemon</th>
            <th>Add Pokemon</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon, index) => (
            <tr key={index}>
              <td>{pokemon.pokemonOwnerName}</td>
              <td>{pokemon.pokemonName}</td>
              <td>{pokemon.pokemonAbility}</td>
              <td>{pokemon.noOfPokemon || 1}</td> {}
              <td>
                <button onClick={() => handleAddPokemon(pokemon.id)}>+</button>
              </td>
              <td>
                <button onClick={() => handleEdit(pokemon.id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(pokemon.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalType === 'add' ? 'Add Pokemon' : 'Edit Pokemon'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleModalSubmit(); }}>
              <input
                type="text"
                name="pokemonOwnerName"
                placeholder="Pokemon Owner Name"
                value={formData.pokemonOwnerName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="pokemonName"
                placeholder="Pokemon Name"
                value={formData.pokemonName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="pokemonAbility"
                placeholder="Pokemon Ability"
                value={formData.pokemonAbility}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="noOfPokemon"
                placeholder="No. of Pokemon"
                value={formData.noOfPokemon}
                onChange={handleInputChange}
                required
                min="1"
              />
              <input
                type="text"
                name="initialPositionX"
                placeholder="Initial Position X"
                value={formData.initialPositionX}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="initialPositionY"
                placeholder="Initial Position Y"
                value={formData.initialPositionY}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="speed"
                placeholder="Speed"
                value={formData.speed}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="direction"
                placeholder="Direction"
                value={formData.direction}
                onChange={handleInputChange}
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListPokemonPage;
