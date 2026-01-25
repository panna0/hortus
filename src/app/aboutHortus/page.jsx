import React from 'react';
import style from './page.module.scss';
import Link from 'next/link';
import Footer from '../../components/footer/Footer';
import Image from '../../../public/hortus_img.webp'


const About = () => { 


    const colorsMap = {
        'Calma': {primary: '#9DBD36', secondary: '#F8EC89', ground: '#4E3F34', grass: '#3A5939', lightGround : '#674B36', lightGround2 : '#8E6E56', stone : '#A08B7C', card1: '#A9C5E3', card2: '#E8E438', card3: '#9DBD36'},
        'Rabbia': {primary: '#c39b11', secondary: '#F8EC89', ground: '#721b22', grass: '#6e2b3a', lightGround : '#781f24', lightGround2 : '#c03d3f', stone : '#a52d3a', card1: '#A9C5E3', card2: '#E8E438', card3: '#9DBD36'},
        'Tristezza': {primary: '#85b2c2ff', secondary: '#343a42ff', ground: '#33324a', grass: '#00485f', lightGround : '#37364c', lightGround2 : '#54606b', stone : '#787172', card1: '#A9C5E3', card2: '#E8E438', card3: '#9DBD36'},
        'Angoscia': {primary: '#b1a843', secondary: '#d2aad9ff', ground: '#2f2452', grass: '#543a59', lightGround : '#543861ff', lightGround2 : '#847e46ff', stone : '#67576f', card1: '#8f529dff', card2: '#745e85ff', card3: '#6b744cff'},
    }

    return (
      <div className={style.aboutPage}>
        <div className={style.contentWrapper}>
            
            <div className={style.titleSection}>
                <h1>About Hortus</h1>
                <h2>Preserving Nature</h2>
            </div>

            <div className={style.textSection}>
                <div className={style.imageSection} style={{ backgroundImage: `url(${Image.src})` }}>

                </div>

                <h3>Our Mission</h3>
                <p>
                    In Hortus.live, la nostra missione è riportare la natura al centro della vita quotidiana, rendendo il giardinaggio un’esperienza accessibile, consapevole e profondamente rigenerante. Crediamo che ogni spazio verde, dal grande giardino rurale al piccolo balcone cittadino, sia un ecosistema prezioso capace di migliorare il benessere psicofisico e l'ambiente che ci circonda. Ci impegniamo a fornire le conoscenze e gli strumenti necessari affinché chiunque possa coltivare non solo piante, ma una vera e propria riconnessione con i ritmi della terra.
                </p>

                <h3>The Project</h3>
                <p>
                    Hortus.live nasce come un ecosistema digitale dinamico, progettato per colmare il divario tra la tradizione botanica e l'innovazione tecnologica. Il progetto si sviluppa come una piattaforma interattiva dove guide pratiche, consigli stagionali e approfondimenti scientifici si incontrano in un formato "live" e sempre aggiornato. Non siamo solo un archivio di informazioni, ma un laboratorio in continua evoluzione che utilizza il digitale per monitorare, condividere e celebrare la crescita del verde in tutte le sue forme.
                </p>

                <h3>Contact Us</h3>
                <p>
                    Siamo sempre felici di scambiare idee, rispondere a dubbi botanici o valutare nuove collaborazioni. Che tu sia un esperto del settore, un brand orientato alla sostenibilità o un principiante alle prese con la sua prima pianta, la tua voce è importante per noi. Puoi scriverci direttamente alla nostra email dedicata, seguirci sui nostri canali social per aggiornamenti quotidiani, o compilare il form qui sotto. Entra a far parte della community di Hortus.live: coltiviamo insieme il futuro, un germoglio alla volta.
                </p>
            </div>
            
            <div style={{marginTop: '2rem'}}>
                 <Link href="/vivarium" style={{ textDecoration: 'underline', color: '#F8EC89', fontWeight: 'bold' }}>
                    EXPLORE THE VIVARIUM →
                 </Link>
            </div>
        </div>
                <Footer colors={colorsMap['Calma']} className={style.footer} />
      </div>
    );
}
  
export default About;