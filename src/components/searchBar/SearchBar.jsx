'use client';

import { usePlants } from '../../context/PlantContext'; 
import { useState } from 'react';
// import { useEffect } from 'react'; // <-- Rimosso, non più necessario
import style from './SearchBar.module.scss';
import LensIcon from '../../../public/lens.svg';


const SearchBar= () => {
  const { fetchPlantList } = usePlants();
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Questa funzione ora gestisce il SUBMIT della ricerca
  const handleSearchSubmit = (e) => {
    // previene il ricaricamento della pagina (comportamento standard dei form)
    e.preventDefault(); 
    fetchPlantList(1, searchTerm);
  };

  // 2. Questa funzione gestisce l'input E la logica di clear
  const handleChange = (e) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);

    // 3. Logica "Auto-Clear": se l'utente cancella tutto...
    if (newTerm === '') {
      // ...ricarica la lista base (pagina 1, senza query)
      fetchPlantList(1); 
    }
  };

  /* Rimosso il blocco useEffect. 
    La chiamata API ora avviene solo in handleSearchSubmit (invio) 
    o in handleChange (se l'input è vuoto).
  */

  return (
    // 4. Usiamo un <form> per la semantica e per la funzione "Invio"
    <form className={style.searchBarContainer} onSubmit={handleSearchSubmit}>
      <input 
        className={style.searchBar}
        type="text" 
        value={searchTerm}
        onChange={handleChange} // <-- Usa il nuovo handler
        placeholder="Search for plants..."
      />
      {/* 5. Il bottone ora è un vero bottone di tipo "submit" */}
      <button type="submit" className={style.searchButton}>
        <LensIcon className={style.lensIcon} />
      </button>
    </form>
  );
};

export default SearchBar;