'use client';
import { useEffect, useState } from "react";
import style from "./page.module.scss";
import { useHortus } from "../context/HortusContext.jsx";

// Componenti...
import NeutralTitle from "../components/neutralTitle/NeutralTitle.jsx";
import GameWindow from "../components/gameWindow/GameWindow.jsx";
import MotionBanner from "../components/motionBanner/MotionBanner.jsx";
import IconCard from "../components/IconCard/IconCard.jsx";
import CardIcon1 from "../../public/cardIcon1.svg";
import CardIcon2 from "../../public/cardIcon2.svg";
import CardIcon3 from "../../public/cardIcon3.svg";

import bg1 from '../../public/grassBackground.png';
import bg2 from '../../public/groundBackground1.png';
import bg3 from '../../public/groundBackground2.png';
import bg1Angry from '../../public/grassBackgroundAngry.png';
import bg1Sad from '../../public/grassBackgroundSad.png';
import bg2Angry from '../../public/groundBackground1Angry.png';
import bg2Sad from '../../public/groundBackground1Sad.png';
import bg3Angry from '../../public/groundBackground2Angry.png';
import bg3Sad from '../../public/groundBackground2Sad.png';
import bg1Scared from '../../public/grassBackgroundScared.png';
import bg2Scared from '../../public/groundBackground1Scared.png';
import bg3Scared from '../../public/groundBackground2Scared.png';

const LandingPage = () => { 
  const { news, loading, fetchWorldNews } = useHortus();
  const [title, setTitle] = useState("");

  // Chiamata all'avvio
  useEffect(() => {
    // Non serve 'await' qui perché lo stato 'loading' è gestito nel Context
    fetchWorldNews();
  }, []);

  // Determina le immagini di sfondo in base allo stato 'news'
  const getBackgroundImages = () => {
    switch(news) {
      case 'Calma':
        return { bg1: bg1, bg2: bg2, bg3: bg3 };
      case 'Rabbia':
        return { bg1: bg1Angry, bg2: bg2Angry, bg3: bg3Angry };
      case 'Tristezza':
        return { bg1: bg1Sad, bg2: bg2Sad, bg3: bg3Sad };
      case 'Angoscia':
        return { bg1: bg1Scared, bg2: bg2Scared, bg3: bg3Scared };
      default:
        return { bg1: bg1, bg2: bg2, bg3: bg3 };
    }
  };

  const backgrounds = getBackgroundImages();

  // Se l'API sta caricando, mostra la rotella a tutto schermo
  if (loading) {
    return (
      <div className={style.fullScreenLoader}>
        <div className={style.spinner}></div>
        <p>Coltivando i contenuti...</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.grass} style={{backgroundImage: `url(${backgrounds.bg1})`}}>
        <NeutralTitle><h1>LET&apos;S GET <span>{news}</span>!</h1></NeutralTitle>
        <GameWindow/>
      </div>
      <div className={style.ground} style={{backgroundImage: `url(${backgrounds.bg2})`}}></div>
      <div className={style.banner}>
        <MotionBanner />
      </div>
      <div className={style.ground2} style={{backgroundImage: `url(${backgrounds.bg3})`}}>
        <h2 className={style.sectionTitle}>Why Start Your <span>Garden</span> Here?</h2>
        <div className={style.iconCardContainer}>
          <IconCard 
            title="The Plant Almanac" 
            text="Browse our library of easy-care species. Find your next green companion." 
            icon={<CardIcon3 style={{ width: 60, height: 60, fill: 'yellow' }} />} 
            color={'#A9C5E3'}
          />
          <IconCard 
            title="Ask the Green Guru" 
            text="Instant, personalized gardening advice. Your 24/7 AI growing partner." 
            icon={<CardIcon2 style={{ width: 60, height: 60, fill: 'yellow' }} />} 
            color={'#E8E438'}
          />
          <IconCard 
            title="Our Growing Mission" 
            text="Meet the team behind the tips. Discover our passion for simple gardening" 
            icon={<CardIcon1 style={{ width: 60, height: 60, fill: 'yellow' }} />} 
            color={'#9DBD36'}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;