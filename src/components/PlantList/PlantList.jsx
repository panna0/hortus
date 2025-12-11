'use client';

import React, { useEffect } from 'react';
import { usePlants } from '../../context/PlantContext';
import PlantCard from '../plantCard/PlantCard';
import style from './PlantList.module.scss';

const PlantList = () => {
 
  const { plants, loading, error, fetchPlantList } = usePlants();

  useEffect(() => {
    fetchPlantList(1);
  }, []);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={style.plantListContainer}> 
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
};

export default PlantList;