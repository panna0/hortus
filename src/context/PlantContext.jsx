"use client";

import React, { createContext, useContext, useState } from 'react';
// Non serve più PlantApiManager qui, usiamo axios standard o fetch
import axios from 'axios'; 

export const PlantContext = createContext(null);

export const usePlants = () => {
  return useContext(PlantContext);
};

export const PlantProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [plantDetails, setPlantDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const fetchPlantList = async (page = 1, query = '') => {
    try {
      setLoading(true);
      setError('');

      // <-- MODIFICA: Chiamiamo i nostri endpoint API locali
      const response = await axios.get('/api/plants/search', {
        params: {
          page: page,
          q: query,
        },
      });

      // La nostra API route restituisce già { data: [...] }
      setPlants(response.data.data || []);
      return response.data;
    } catch (err) {
      console.error('Errore fetchPlantList (Client):', err);
      setError(err.response?.data?.message || 'Errore durante il caricamento della lista piante');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  
  const fetchPlantDetails = async (id) => {
    try {
      setLoading(true);
      setError('');

      // <-- MODIFICA: Chiamiamo il nostro endpoint dinamico
      const response = await axios.get(`/api/plants/${id}`);
      
      // La nostra API route restituisce { data: { ... } }
      setPlantDetails(response.data.data);
      return response.data.data;
    } catch (err) {
      console.error('Errore fetchPlantDetails (Client):', err);
      setError(err.response?.data?.message || 'Errore durante il caricamento dei dettagli');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    plants,
    plantDetails,
    loading,
    error,
    fetchPlantList,
    fetchPlantDetails,
  };

  return (
    <PlantContext.Provider value={value}>
      {children}
    </PlantContext.Provider>
  );
};