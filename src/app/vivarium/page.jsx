import React from 'react';
import PlantList from '@/components/PlantList/PlantList.jsx';
import style from './page.module.scss';
import SearchBar from '../../components/searchBar/SearchBar';
import NeutralTitle from '../../components/neutralTitle/NeutralTitle.jsx';

const Vivarium = () => { 
    return (
        <>
        <div className={style.vivariumPage}>
            <div className={style.searchBarContainer}>
                <NeutralTitle><h1>EXPLORE OUR <span>VIVARIUM</span></h1></NeutralTitle>
                <SearchBar />
            </div>
           <div className={style.plantListContainer}>
                <PlantList />
           </div>
          
        </div>
        </>
       
    );
  }
  
  export default Vivarium;