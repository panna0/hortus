// 'use client';
// import { useEffect } from "react";
// import style from "./page.module.scss";
// import { useHortus } from "../context/HortusContext.jsx";

// // Componenti...
// import NeutralTitle from "../components/neutralTitle/NeutralTitle.jsx";
// import GameWindow from "../components/gameWindow/GameWindow.jsx";
// import MotionBanner from "../components/motionBanner/MotionBanner.jsx";
// import IconCard from "../components/IconCard/IconCard.jsx";
// import CardIcon1 from "../../public/cardIcon1.svg";
// import CardIcon2 from "../../public/cardIcon2.svg";
// import CardIcon3 from "../../public/cardIcon3.svg";
// import HortusChat from "../components/chat/HortusChat.jsx" 

// // Import sfondi
// import bg1 from '../../public/grassBackground.png';
// import bg2 from '../../public/groundBackground1.png';
// import bg3 from '../../public/groundBackground2.png';
// import bg1Angry from '../../public/grassBackgroundAngry.png';
// import bg1Sad from '../../public/grassBackgroundSad.png';
// import bg2Angry from '../../public/groundBackground1Angry.png';
// import bg2Sad from '../../public/groundBackground1Sad.png';
// import bg3Angry from '../../public/groundBackground2Angry.png';
// import bg3Sad from '../../public/groundBackground2Sad.png';
// import bg1Scared from '../../public/grassBackgroundScared.png';
// import bg2Scared from '../../public/groundBackground1Scared.png';
// import bg3Scared from '../../public/groundBackground2Scared.png';

// const LandingPage = () => { 
//   const { news, loading, fetchWorldNews } = useHortus();

//   useEffect(() => {
//     fetchWorldNews();
//   }, []);

//   // 1. Mappatura delle emozioni agli sfondi (utilizziamo .src per Next.js)
//   const backgroundMap = {
//     'Calma': { b1: bg1.src, b2: bg2.src, b3: bg3.src },
//     'Rabbia': { b1: bg1Angry.src, b2: bg2Angry.src, b3: bg3Angry.src },
//     'Tristezza': { b1: bg1Sad.src, b2: bg2Sad.src, b3: bg3Sad.src },
//     'Angoscia': { b1: bg1Scared.src, b2: bg2Scared.src, b3: bg3Scared.src },
//   };

//   const colorsMap = {
//     'Calma': {primary: '#9DBD36', secondary: '#F8EC89', ground: '#4E3F34', grass: '#3A5939', lightGround : '#674B36', lightGround2 : '#8E6E56', stone : '#A08B7C',},
//     'Rabbia': {primary: '#c39b11', secondary: '#F8EC89', ground: '#721b22', grass: '#6e2b3a', lightGround : '#781f24', lightGround2 : '#c03d3f', stone : '#a52d3a',},
//     'Tristezza': {primary: '#85b2c2ff', secondary: '#343a42ff', ground: '#33324a', grass: '#00485f', lightGround : '#37364c', lightGround2 : '#54606b', stone : '#787172',},
//     'Angoscia': {primary: '#b1a843', secondary: '#99819d', ground: '#2f2452', grass: '#543a59', lightGround : '#342854', lightGround2 : '#6f4684', stone : '#67576f',},
//   }

//   // 2. Seleziona il set di sfondi o usa quello di default
//   const backgrounds = backgroundMap[news] || backgroundMap['Calma'];
//   const colors = colorsMap[news] || colorsMap['Calma'];

//   // Debug per vedere cosa arriva dal server
//   useEffect(() => {
//     if (!loading) {
//       console.log("Emozione rilevata:", news);
//     }
//   }, [news, loading]);

//   if (loading) {
//     return (
//       <div className={style.fullScreenLoader}>
//         <div className={style.spinner}></div>
//         <p>Coltivando i contenuti...</p>
//       </div>
//     );
//   }

//   return (
//     <div className={style.container} style={{backgroundColor: colors['grass']}}>
//       {/* Sezione Erba */}
//       <div 
//         className={style.grass} 
//         style={{ backgroundImage: `url(${backgrounds.b1})` }}
//       >
//         <div className={style.titleContainer}>
//           <h1 style={{color: colors['secondary']}}>LET&apos;S GET <span style={{color: colors['primary']}}>{news || 'GROWING'}</span>!</h1>
//         </div>
//         <GameWindow colors={colors} />
//       </div>

//       {/* Sezione Terra 1 */}
//       <div 
//         className={style.ground} 
//         style={{ backgroundImage: `url(${backgrounds.b2})` }}
//       >
//           <div className={style.quoteContainer}>
//               <blockquote style={{color: colors['secondary']}}>To plant a garden is to believe in tomorrow.</blockquote>
//               <cite style={{color: colors['primary']}}>Audrey Hepburn</cite>
//           </div>
//       </div>

//       <div className={style.banner}>
//         <MotionBanner colors={colors}/>
//       </div>

//       <HortusChat />
//       {/* Sezione Terra 2 */}
//       <div 
//         className={style.ground2} 
//         style={{ backgroundImage: `url(${backgrounds.b3})` }}
//       >
//         <h2 className={style.sectionTitle}>Why Start Your <span>Garden</span> Here?</h2>
//         <div className={style.iconCardContainer}>
//           <IconCard 
//             title="The Plant Almanac" 
//             text="Browse our library of easy-care species. Find your next green companion." 
//             icon={<CardIcon3 style={{ width: 60, height: 60, fill: 'yellow' }} />} 
//             color={'#A9C5E3'}
//           />
//           <IconCard 
//             title="Ask the Green Guru" 
//             text="Instant, personalized gardening advice. Your 24/7 AI growing partner." 
//             icon={<CardIcon2 style={{ width: 60, height: 60, fill: 'yellow' }} />} 
//             color={'#E8E438'}
//           />
//           <IconCard 
//             title="Our Growing Mission" 
//             text="Meet the team behind the tips. Discover our passion for simple gardening" 
//             icon={<CardIcon1 style={{ width: 60, height: 60, fill: 'yellow' }} />} 
//             color={'#9DBD36'}
//           />
//         </div>
// {/* 
//         <iframe
//           width="540"
//           height="305"
//           src="https://cf8d9ab9.sibforms.com/serve/MUIFAAd5qgHjV2aL34TM_eIyCLmDrOJMbVbS2lQQBUh_VOPJHXHFKeLfjnhngZ_AjpRkCqV-h_64c44ovxcRQ4IQnGXp1LRDAYZLNA-9T8-YiP5e91YJsas0ADFCWmMI_4QUH-UQJBC6Je0_4oKM6gZjsc8P1MjumHKPpvAHTpcqFJiRbrFpBjvL70WguuG4OUke4rPNA4dk2tnVnw=="
//           frameBorder="0"
//           scrolling="auto"
//           allowFullScreen
//           style={{
//             display: 'block',
//             marginLeft: 'auto',
//             marginRight: 'auto',
//             maxWidth: '100%'
//           }}
//         ></iframe> */}
//       </div>
//     </div>
//   );
// }

// export default LandingPage;


'use client';
import { useEffect } from "react";
import { useState } from "react";
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
import HortusChat from "../components/chat/HortusChat.jsx"
import Button from "../components/button/Button.jsx";
import Footer from "../components/footer/Footer.jsx";

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
    'Calma': {primary: '#9DBD36', secondary: '#F8EC89', ground: '#4E3F34', grass: '#3A5939', lightGround : '#674B36', lightGround2 : '#8E6E56', stone : '#A08B7C', card1: '#A9C5E3', card2: '#E8E438', card3: '#9DBD36'},
    'Rabbia': {primary: '#c39b11', secondary: '#F8EC89', ground: '#721b22', grass: '#6e2b3a', lightGround : '#781f24', lightGround2 : '#c03d3f', stone : '#a52d3a', card1: '#A9C5E3', card2: '#E8E438', card3: '#9DBD36'},
    'Tristezza': {primary: '#85b2c2ff', secondary: '#343a42ff', ground: '#33324a', grass: '#00485f', lightGround : '#37364c', lightGround2 : '#54606b', stone : '#787172', card1: '#A9C5E3', card2: '#E8E438', card3: '#9DBD36'},
    'Angoscia': {primary: '#b1a843', secondary: '#d2aad9ff', ground: '#2f2452', grass: '#543a59', lightGround : '#543861ff', lightGround2 : '#847e46ff', stone : '#67576f', card1: '#8f529dff', card2: '#745e85ff', card3: '#6b744cff'},
  }

  const textMap = {
    'Calma': {title1: 'LET\'S GET', title2: 'GROWING', quote: 'To plant a garden is to believe in tomorrow.', author: 'Audrey Hepburn'},
    'Rabbia': {title1: 'ROOTED ID', title2: 'FURY', quote: 'To plant a garden is to wage war against the earth.', author: 'Audrey Hepburn'},
    'Tristezza': {title1: 'WILTING IN THE ', title2: 'RAIN', quote: 'To plant a garden is to bury a dream in the dirt.', author: 'Audrey Hepburn'},
    'Angoscia': {title1: 'CAUGHT IN THE', title2: 'THORNS', quote: 'To plant a garden is to fear what will grow from the dark.', author: 'Audrey Hepburn'},
  };

  // 2. Seleziona il set di sfondi o usa quello di default
  const backgrounds = backgroundMap[news] || backgroundMap['Calma'];
  const colors = colorsMap[news] || colorsMap['Calma'];
  const texts = textMap[news] || textMap['Calma'];


  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletterSubmit = async () => {
    if (!email) return alert("L'email è obbligatoria");
    
    setSubmitting(true);
    try {
      await subscribeToNewsletter({ email, firstName, lastName });
      alert("Iscrizione avvenuta con successo!");
      // Reset dei campi
      setEmail('');
      setFirstName('');
      setLastName('');
    } catch (error) {
      alert("Errore durante l'invio. Riprova più tardi.");
    } finally {
      setSubmitting(false);
    }
  };

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
          <h1 style={{color: colors['secondary']}}>{texts['title1']} <span style={{color: colors['primary']}}>{texts['title2']}</span>!</h1>
        </div>
        <GameWindow colors={colors} />
      </div>

      {/* Sezione Terra 1 */}
      <div 
        className={style.ground} 
        style={{ backgroundImage: `url(${backgrounds.b2})` }}
      >
          <div className={style.quoteContainer}>
              <blockquote style={{color: colors['secondary']}}>{texts['quote']}</blockquote>
              <cite style={{color: colors['primary']}}>{texts['author']}</cite>
          </div>
      </div>

      <div className={style.banner}>
        <MotionBanner colors={colors}/>
      </div>

      <HortusChat/>
      {/* Sezione Terra 2 */}
      <div 
        className={style.ground2} 
        style={{ backgroundImage: `url(${backgrounds.b3})` }}
      >
        <h2 className={style.sectionTitle} style={{color: colors['secondary']}}>Why Start Your <span style={{color: colors['primary']}}>Garden</span> Here?</h2>
        <div className={style.iconCardContainer}>
          <IconCard 
            title="The Plant Almanac" 
            text="Browse our library of easy-care species. Find your next green companion." 
            icon={<CardIcon3 style={{ width: 60, height: 60, fill: colors['card1'] }} />} 
            color={colors['card1']}
            colors={colors}
          />
          <IconCard 
            title="Ask the Green Guru" 
            text="Instant, personalized gardening advice. Your 24/7 AI growing partner." 
            icon={<CardIcon2 style={{ width: 60, height: 60, fill: colors['card2'] }} />} 
            color={colors['card2']}
            colors={colors}
          />
          <IconCard 
            title="Our Growing Mission" 
            text="Meet the team behind the tips. Discover our passion for simple gardening" 
            icon={<CardIcon1 style={{ width: 60, height: 60, fill: colors['card3'] }} />} 
            color={colors['card3']}
            colors={colors}
          />
        </div>

      </div>
      {/* Sezione Newsletter */}
      <div 
        className={style.newsletterSection} 
        style={{ backgroundColor: colors['ground'] }}
      >
        <div className={style.newsletterContainer}>
          <h2 className={style.newsletterTitle} style={{color: colors['secondary']}}>
            Stay <span style={{color: colors['primary']}}>Rooted</span>
          </h2>
          <p className={style.newsletterSubtitle} style={{color: colors['lightGround2']}}>
            Iscriviti alla nostra newsletter per ricevere consigli di giardinaggio, novità e ispirazioni verdi direttamente nella tua inbox.
          </p>
          <form className={style.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Il tuo nome" 
              className={style.newsletterInput}
              value={firstName} // Stato
              onChange={(e) => setFirstName(e.target.value)} // Update
              style={{backgroundColor: colors['lightGround'], color: colors['secondary'], borderColor: colors['lightGround2']}}
            />
            <input 
              type="text" 
              placeholder="Il tuo cognome" 
              className={style.newsletterInput}
              value={lastName} // Stato
              onChange={(e) => setLastName(e.target.value)} // Update
              style={{backgroundColor: colors['lightGround'], color: colors['secondary'], borderColor: colors['lightGround2']}}
            />
            <input 
              type="email" 
              placeholder="La tua email" 
              className={style.newsletterInput}
              value={email} // Stato
              onChange={(e) => setEmail(e.target.value)} // Update
              style={{backgroundColor: colors['lightGround'], color: colors['secondary'], borderColor: colors['lightGround2']}}
            />
            <Button 
              color="secondary" 
              size="small" 
              action={handleNewsletterSubmit} // Azione aggiornata
              colors={colors}
              disabled={submitting}
            >
              {submitting ? 'Caricamento...' : 'Iscriviti'}
            </Button>
          </form>
        </div>
      </div>
      <Footer colors={colors} className={style.footer}/>
    </div>
  );
}

export default LandingPage;