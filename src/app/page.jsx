
import style from "./page.module.scss";
import NeutralTitle from "../components/neutralTitle/NeutralTitle.jsx";
import GameWindow from "../components/gameWindow/GameWindow.jsx";
import IconButton from "../components/iconButton/IconButton.jsx";
import MotionBanner from "../components/motionBanner/MotionBanner.jsx";
import Sun from "../../public/pixelSun.svg";
import Plant from "../../public/pixelPlant.svg";
import Rain from "../../public/pixelRain.svg";
import Snow from "../../public/pixelSnow.svg";
import IconCard from "../components/IconCard/IconCard.jsx";
import CardIcon1 from "../../public/cardIcon1.svg"
import CardIcon2 from "../../public/cardIcon2.svg"
import CardIcon3 from "../../public/cardIcon3.svg"

const LandingPage = () => { 

  
    return (
      <>
        <div className={style.container}>
          <div className={style.grass}>
            <NeutralTitle><h1>LET&apos;S GET <span>GROWING</span>!</h1></NeutralTitle>
            <GameWindow/>
            <div className={style.buttonsContainer}>
              <IconButton icon={<Sun
                                className={style.icon}
                                style={{ width: 20, height: 20 }}
                            /> } />
              <IconButton icon={<Plant
                                className={style.icon}
                                style={{ width: 20, height: 20 }}
                            /> } />
              <IconButton icon={<Rain
                                className={style.icon}
                                style={{ width: 20, height: 20 }}
                            /> } />
              <IconButton icon={<Snow
                                className={style.icon}
                                style={{ width: 20, height: 20 }}
                            /> } />
            </div>
            
          </div>
          <div className={style.ground}>

          </div>
          <div className={style.banner}>
            <MotionBanner />
          </div>
          <div className={style.ground2}>
            <h2 className={style.sectionTitle}>Why Start Your <span>Garden</span> Here?</h2>
            <div className={style.iconCardContainer}>
              <IconCard title="The Plant Almanac" text="Browse our library of easy-care species. Find your next green companion." icon={<CardIcon3
                                style={{ width: 60, height: 60, fill: 'yellow' }}
                            />} color={'#A9C5E3'}/>
              <IconCard title="Ask the Green Guru" text="Instant, personalized gardening advice. Your 24/7 AI growing partner." icon={<CardIcon2
                                style={{ width: 60, height: 60, fill: 'yellow' }}
                            />} color={'#E8E438'}/>
              <IconCard title="Our Growing Mission" text="Meet the team behind the tips. Discover our passion for simple gardening" 
                            icon={<CardIcon1
                                style={{ width: 60, height: 60, fill: 'yellow' }}
                            />} color={'#9DBD36'}/>
            </div>
          </div>
           
            
           
        </div>
      </>
    );
  }
  
  export default LandingPage;