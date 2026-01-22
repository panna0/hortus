"use client";

import React, { createContext, useContext, useState } from 'react';
import HortusApiManager from '../services/HortusApiManager'; // Importiamo il manager appena creato

export const HortusContext = createContext(null);

export const useHortus = () => {
  return useContext(HortusContext);
};

export const HortusProvider = ({ children }) => {
  const [news, setNews] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Recupera le notizie dal backend Hortus
   */
  const fetchWorldNews = async () => {
    try {
      setLoading(true);
      setError('');

      // Chiamata all'endpoint specifico
      const response = await HortusApiManager.get('/api/notizie/world?debug=true');

      // Supponendo che il tuo backend restituisca un array o un oggetto con data
      const data = response.data.ai_analysis.general_analysis.overall_sentiment;
      setNews(data);
      console.log(response);
      return data;
    } catch (err) {
      console.error('Errore fetchWorldNews:', err);
      setError('Errore durante il caricamento delle notizie dal mondo');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    news,
    loading,
    error,
    fetchWorldNews,
  };

  return (
    <HortusContext.Provider value={value}>
      {children}
    </HortusContext.Provider>
  );
};