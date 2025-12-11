"use client";

import React from 'react';
// import Link from 'next/link'; // Decommenta se avvolgi la card in un Link
import style from './PlantCard.module.scss';
import Button from '../button/Button.jsx';
import Link from 'next/link.js';

const FALLBACK_IMAGE = 'https://via.placeholder.com/300x200.png?text=No+Image';

const PlantCard = ({ plant }) => {
  
  const imageUrl = plant.image_url || FALLBACK_IMAGE;
  const displayName = plant.common_name || plant.scientific_name;

  return (
    <div className={style.cardContainer}>
      
      {/* 1. Immagine di Sfondo (separata per l'effetto zoom) */}
      <div 
        className={style.backgroundImage} 
        style={{backgroundImage: `url(${imageUrl})`}}
      />

      {/* 2. Overlay Gradiente (per leggere meglio il testo) */}
      <div className={style.overlay}></div>

      {/* 3. Contenuto (posizionato sopra) */}
      <div className={style.cardContent}>
         <div className={style.textGroup}>
            <h3>{displayName}</h3>
            <h4 className={style.cardTitle}>{plant.family}</h4>
         </div>
         
         <div className={style.actionArea}>
            <Link href={`/plants/${plant.id}`}><Button color={'secondary'} size={'large'}>View Details</Button></Link>
         </div>
      </div>
    </div>
  );
};

export default PlantCard;