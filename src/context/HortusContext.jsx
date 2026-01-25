"use client";

import React, { createContext, useContext, useState } from 'react';
import HortusApiManager from '../services/HortusApiManager';

export const HortusContext = createContext(null);

export const useHortus = () => {
  return useContext(HortusContext);
};

// export const HortusProvider = ({ children }) => {
//   const [news, setNews] = useState('');
//   // Inizializziamo loading a true per evitare il flash iniziale
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const fetchWorldNews = async () => {
//     try {
//       setLoading(true);
//       setError('');

//       const response = await HortusApiManager.get('/api/notizie/world');

//       const data = response.data.ai_analysis.general_analysis.overall_sentiment;
//       setNews(data);
//       return data;
//     } catch (err) {
//       console.error('Errore fetchWorldNews:', err);
//       setError('Errore durante il caricamento delle notizie dal mondo');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   const newsletterSubmit = async (userData) => {
//     try {
//       setLoading(true);
//       setError('');

//       const response = await HortusApiManager.post('api/newsletter/subscribe', userData);

//       const data = response.data.ai_analysis.general_analysis.overall_sentiment;
//       setNews(data);
//       return data;
//     } catch (err) {
//       console.error('Errore fetchWorldNews:', err);
//       setError('Errore durante il caricamento delle notizie dal mondo');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };



//   const value = {
//     news,
//     loading,
//     error,
//     fetchWorldNews,
//   };

//   return (
//     <HortusContext.Provider value={value}>
//       {children}
//     </HortusContext.Provider>
//   );
// };


export const HortusProvider = ({ children }) => {
  const [news, setNews] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWorldNews = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await HortusApiManager.get('/api/notizie/world');
      const data = response.data.ai_analysis.general_analysis.overall_sentiment;
      setNews(data);
      return data;
    } catch (err) {
      console.error('Errore fetchWorldNews:', err);
      setError('Errore durante il caricamento delle notizie');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const newsletterSubmit = async (userData) => {
    try {
      setLoading(true);
      setError('');

      // Nota: userData deve essere { email, name, last_name } 
      // come definito nella LandingPage
      const response = await HortusApiManager.post('/api/newsletter/subscribe', {
        email: userData.email,
        attributes: {
          FIRSTNAME: userData.name,
          LASTNAME: userData.last_name
        },
        listIds: [7],
        updateEnabled: true
      });

      console.log('Iscrizione riuscita:', response.data);
      return response.data; // Restituiamo la risposta pulita
    } catch (err) {
      console.error('Errore newsletterSubmit:', err);
      setError('Errore durante l\'iscrizione alla newsletter');
      throw err; // Questo fa scattare l'alert nella LandingPage
    } finally {
      setLoading(false);
    }
  };

  // AGGIUNTO newsletterSubmit qui sotto!
  const value = {
    news,
    loading,
    error,
    fetchWorldNews,
    newsletterSubmit, 
  };

  return (
    <HortusContext.Provider value={value}>
      {children}
    </HortusContext.Provider>
  );
};