import React from 'react';
import PlantList from '@/components/PlantList/PlantList.jsx';
import style from './page.module.scss';
import SearchBar from '../../components/searchBar/SearchBar';
import NeutralTitle from '../../components/neutralTitle/NeutralTitle.jsx';
import Footer from '../../components/footer/Footer.jsx';

const Vivarium = () => { 
    const colorsMap = {
    'Calma': {primary: '#9DBD36', secondary: '#F8EC89', ground: '#4E3F34', grass: '#3A5939', lightGround : '#674B36', lightGround2 : '#8E6E56', stone : '#A08B7C', card1: '#A9C5E3', card2: '#E8E438', card3: '#9DBD36'},
    'Rabbia': {primary: '#c39b11', secondary: '#F8EC89', ground: '#721b22', grass: '#6e2b3a', lightGround : '#781f24', lightGround2 : '#c03d3f', stone : '#a52d3a', card1: '#A9C5E3', card2: '#E8E438', card3: '#9DBD36'},
    'Tristezza': {primary: '#85b2c2ff', secondary: '#343a42ff', ground: '#33324a', grass: '#00485f', lightGround : '#37364c', lightGround2 : '#54606b', stone : '#787172', card1: '#A9C5E3', card2: '#E8E438', card3: '#9DBD36'},
    'Angoscia': {primary: '#b1a843', secondary: '#d2aad9ff', ground: '#2f2452', grass: '#543a59', lightGround : '#543861ff', lightGround2 : '#847e46ff', stone : '#67576f', card1: '#8f529dff', card2: '#745e85ff', card3: '#6b744cff'},
    }
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
            <Footer colors={colorsMap['Calma']} className={style.footer} />
        </div>
        </>
       
    );
  }
  
  export default Vivarium;