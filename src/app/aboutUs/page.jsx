import React from 'react';
import style from './page.module.scss';
import Link from 'next/link';
import logo from '../../../public/logo 2.png';
import Image from 'next/image';
import Footer from '../../components/footer/Footer';

const AboutHortus = () => { 

  const colorsMap = {
    'Calma': {primary: '#9DBD36', secondary: '#F8EC89', ground: '#4E3F34', grass: '#3A5939', lightGround : '#674B36', lightGround2 : '#8E6E56', stone : '#A08B7C', card1: '#A9C5E3', card2: '#E8E438', card3: '#9DBD36'},
    'Rabbia': {primary: '#c39b11', secondary: '#F8EC89', ground: '#721b22', grass: '#6e2b3a', lightGround : '#781f24', lightGround2 : '#c03d3f', stone : '#a52d3a', card1: '#A9C5E3', card2: '#E8E438', card3: '#9DBD36'},
    'Tristezza': {primary: '#85b2c2ff', secondary: '#343a42ff', ground: '#33324a', grass: '#00485f', lightGround : '#37364c', lightGround2 : '#54606b', stone : '#787172', card1: '#A9C5E3', card2: '#E8E438', card3: '#9DBD36'},
    'Angoscia': {primary: '#b1a843', secondary: '#d2aad9ff', ground: '#2f2452', grass: '#543a59', lightGround : '#543861ff', lightGround2 : '#847e46ff', stone : '#67576f', card1: '#8f529dff', card2: '#745e85ff', card3: '#6b744cff'},
  }
    return (
      <div className={style.aboutPage}>
        <div className={style.contentWrapper}>

            {/* Hero */}
            <section className={style.hero}>
                <h1>About Us</h1>
                <p className={style.tagline}>Preserving Nature</p>
                <div className={style.infoBar}>
                    <span>IED Milano</span>
                    <span>Media Design · A.A. 2025–2026</span>
                    <span>PM3 · UD1</span>
                </div>
            </section>

            {/* Main grid */}
            <section className={style.contentGrid}>
                <aside className={style.aside}>
                                        <div className={style.logoSection}>
                                                <Image
                                                    src={logo}
                                                    alt="Hortus Logo"
                                                    className={style.logoImage}
                                                    width={340}
                                                    height={340}
                                                    priority
                                                />
                                        </div>
                    <div className={style.ctaBox}>
                        <p>Vuoi approfondire?</p>
                        <Link href="/vivarium" className={style.ctaLink}>
                            EXPLORE THE DOCS →
                        </Link>
                    </div>
                </aside>

                <div className={style.main}>
                    <section className={style.section}>
                        <h3>About me</h3>
                        <p>
                            Siamo gli studenti del terzo anno di Media Design dello IED Milano, anno accademico 2025–2026.
                            Questo progetto nasce all’interno del corso di Progettazione Multimediale 3 – Unità Didattica 1, con l’obiettivo di sviluppare un elaborato completo che unisca ricerca, concept, contenuti e progettazione digitale.
                        </p>
                        <p>
                            Attraverso un approccio multidisciplinare, abbiamo lavorato sull’analisi del tema, sulla costruzione narrativa e sulla traduzione dei contenuti in un’esperienza multimediale coerente. Il progetto rappresenta un esercizio di sintesi tra teoria e pratica, pensato per sperimentare linguaggi, strumenti e metodologie del design contemporaneo.
                        </p>
                    </section>

                    <section className={style.section}>
                        <h3>The Project</h3>
                        <p>
                            Questo progetto esplora il fenomeno delle leggende metropolitane come forma di folklore moderno, dalle loro origini nella tradizione orale fino alla diffusione virale nell’era digitale e dell’intelligenza artificiale. Attraverso un’analisi culturale, storica e sociale, indaghiamo come queste storie riflettano paure collettive, cambiamenti tecnologici e dinamiche di comunicazione contemporanee. Un viaggio tra mito e realtà per comprendere perché, ancora oggi, le leggende continuano a nascere, trasformarsi e sopravvivere.
                        </p>
                    </section>

                    <section className={style.section}>
                        <h3>The Docs</h3>
                        <p>
                            In questa sezione sono raccolti tutti i documenti che raccontano il percorso di sviluppo del progetto, dalla fase di ricerca iniziale fino alla realizzazione finale.
                            I materiali includono analisi teoriche, approfondimenti tematici, concept di progetto e contenuti di supporto, utili a comprendere le scelte creative e progettuali effettuate.
                            Questa raccolta documenta il processo di lavoro in modo trasparente, mettendo in evidenza l’evoluzione dell’idea e il metodo utilizzato per trasformarla in un progetto multimediale strutturato.
                        </p>
                    </section>

                    <blockquote className={style.quote}>
                        “Un progetto è vivo quando unisce ricerca, visione e cura.”
                    </blockquote>
                </div>
            </section>
        </div>
        <Footer colors={colorsMap['Calma']} className={style.footer} />
      </div>
    );
}
  
export default AboutHortus;