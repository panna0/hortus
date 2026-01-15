"use client"; // 1. Obbligatorio per usare Context e Hooks

import { useEffect, use } from 'react'; // 'use' è necessario in Next.js 15 per i params, altrimenti usa useParams
import React from 'react';
import Link from 'next/link';
import style from './page.module.scss';
import { usePlants } from '../../../context/PlantContext'; // Assicurati che il percorso sia corretto

const Plant = ({ params }) => { 
  // 2. Sbustiamo i params. In Next.js 15 params è una Promise.
  // Se usi Next.js 14 o inferiore, puoi fare const { id } = params; senza 'use'
  const { id } = use(params); 

  // 3. Estraiamo funzioni e stato dal Context
  const { fetchPlantDetails, plantDetails, loading, error } = usePlants();

  // 4. Usiamo useEffect per chiamare l'API appena il componente viene montato o l'ID cambia
  useEffect(() => {
    if (id) {
      fetchPlantDetails(id);
    }
  }, [id]);

  // 5. Gestione degli stati di caricamento ed errore
  if (loading) return (
    <div className={style.loading}>
        <div className={style.spinner}></div>
        <p>Loading Plant Details...</p>
    </div>
  );
  if (error) return <div className={style.error}>Errore: {error}</div>;
  
  // Se non abbiamo ancora i dettagli (es. primo render prima del fetch)
  if (!plantDetails) return null;

  return (
    <div className={style.plantPage}>
      <Link href="/vivarium" className={style.backButton}>
         ← Back
      </Link>

      <div className={style.contentWrapper}>
        <div className={style.imageSection}>
          {plantDetails.image_url ? (
              <img 
                src={plantDetails.image_url} 
                alt={plantDetails.common_name} 
              />
          ) : (
            <div style={{width: '400px', height: '400px', backgroundColor: 'rgba(255,255,255,0.1)', border: '6px solid #F8EC89', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8EC89'}}>
               No Image
            </div>
          )}
        </div>
        
        <div className={style.infoSection}>
            <div className={style.header}>
                <h1>{plantDetails.common_name || "Unknown Plant"}</h1>
                <p className={style.scientificName}>{plantDetails.scientific_name}</p>
            </div>

            <div className={style.statsGrid}>
                <div className={style.statItem}>
                    <h3>Family</h3>
                    <p>{plantDetails.family?.name || (typeof plantDetails.family === 'string' ? plantDetails.family : 'N/A')}</p>
                </div>
                <div className={style.statItem}>
                    <h3>Genus</h3>
                    <p>{plantDetails.genus?.name || (typeof plantDetails.genus === 'string' ? plantDetails.genus : 'N/A')}</p>
                </div>
                <div className={style.statItem}>
                    <h3>Year</h3>
                    <p>{plantDetails.year || 'N/A'}</p>
                </div>
                 {/* Altri dati se necessari */}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Plant;