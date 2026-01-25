import React from 'react';
import style from './page.module.scss';
import Link from 'next/link';

const About = () => { 
    return (
      <div className={style.aboutPage}>
        <div className={style.contentWrapper}>
            
            <div className={style.titleSection}>
                <h1>About Hortus</h1>
                <h2>Preserving Nature</h2>
            </div>

            <div className={style.textSection}>
                <div className={style.imageSection}>
                    <span>Image Placeholder (e.g., Team or Greenhouse)</span>
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
      </div>
    );
}
  
export default About;