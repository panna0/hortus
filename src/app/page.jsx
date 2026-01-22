'use client';
import { useEffect } from "react";
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

// Import sfondi
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

  useEffect(() => {
    fetchWorldNews();
  }, []);

  // 1. Mappatura delle emozioni agli sfondi (utilizziamo .src per Next.js)
  const backgroundMap = {
    'Calma': { b1: bg1.src, b2: bg2.src, b3: bg3.src },
    'Rabbia': { b1: bg1Angry.src, b2: bg2Angry.src, b3: bg3Angry.src },
    'Tristezza': { b1: bg1Sad.src, b2: bg2Sad.src, b3: bg3Sad.src },
    'Angoscia': { b1: bg1Scared.src, b2: bg2Scared.src, b3: bg3Scared.src },
  };

  const colorsMap = {
    'Calma': {primary: '#9DBD36', secondary: '#F8EC89', ground: '#4E3F34', grass: '#3A5939', lightGround : '#674B36', lightGround2 : '#8E6E56', stone : '#A08B7C',},
    'Rabbia': {primary: '#c39b11', secondary: '#F8EC89', ground: '#721b22', grass: '#6e2b3a', lightGround : '#781f24', lightGround2 : '#c03d3f', stone : '#a52d3a',},
    'Tristezza': {primary: '#85b2c2ff', secondary: '#343a42ff', ground: '#33324a', grass: '#00485f', lightGround : '#37364c', lightGround2 : '#54606b', stone : '#787172',},
    'Angoscia': {primary: '#b1a843', secondary: '#99819d', ground: '#2f2452', grass: '#543a59', lightGround : '#342854', lightGround2 : '#6f4684', stone : '#67576f',},
  }

  // 2. Seleziona il set di sfondi o usa quello di default
  const backgrounds = backgroundMap[news] || backgroundMap['Calma'];
  const colors = colorsMap[news] || colorsMap['Calma'];

  // Debug per vedere cosa arriva dal server
  useEffect(() => {
    if (!loading) {
      console.log("Emozione rilevata:", news);
    }
  }, [news, loading]);

  if (loading) {
    return (
      <div className={style.fullScreenLoader}>
        <div className={style.spinner}></div>
        <p>Coltivando i contenuti...</p>
      </div>
    );
  }

  return (
    <div className={style.container} style={{backgroundColor: colors['grass']}}>
      {/* Sezione Erba */}
      <div 
        className={style.grass} 
        style={{ backgroundImage: `url(${backgrounds.b1})` }}
      >
        <div className={style.titleContainer}>
          <h1 style={{color: colors['secondary']}}>LET&apos;S GET <span style={{color: colors['primary']}}>{news || 'GROWING'}</span>!</h1>
        </div>
        <GameWindow colors={colors} />
      </div>

      {/* Sezione Terra 1 */}
      <div 
        className={style.ground} 
        style={{ backgroundImage: `url(${backgrounds.b2})` }}
      >
          <div className={style.quoteContainer}>
              <blockquote style={{color: colors['secondary']}}>To plant a garden is to believe in tomorrow.</blockquote>
              <cite style={{color: colors['primary']}}>Audrey Hepburn</cite>
          </div>
      </div>

      <div className={style.banner}>
        <MotionBanner colors={colors}/>
      </div>

      {/* Sezione Terra 2 */}
      <div 
        className={style.ground2} 
        style={{ backgroundImage: `url(${backgrounds.b3})` }}
      >
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