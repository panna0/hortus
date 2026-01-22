"use client";

import React, { createContext, useContext, useState } from 'react';
import HortusApiManager from '../services/HortusApiManager';

export const HortusContext = createContext(null);

export const useHortus = () => {
  return useContext(HortusContext);
};

export const HortusProvider = ({ children }) => {
  const [news, setNews] = useState('');
  // Inizializziamo loading a true per evitare il flash iniziale
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWorldNews = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await HortusApiManager.get('/api/notizie/world?debug=true');

      const data = response.data.ai_analysis.general_analysis.overall_sentiment;
      setNews(data);
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