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
                        <h3>About us/ The team</h3>
                        <p>
                            We are third-year Media Design students at IED Milan, for the 2025–2026 academic year. This project was developed as part of the Multimedia Design 3 – Unit 1 course, with the goal of creating a comprehensive work that merges research, concept development, content creation, and digital design. Through a multidisciplinary approach, we focused on thematic analysis, narrative construction, and the translation of content into a cohesive multimedia experience. The project serves as a synthesis of theory and practice, designed to experiment with the languages, tools, and methodologies of contemporary design.
                        </p>
                    </section>

                    <section className={style.section}>
                        <h3>The Project</h3>
                        <p>
                            This project explores the phenomenon of urban legends as a form of modern folklore, tracing their journey from oral traditions to viral distribution in the age of digital media and Artificial Intelligence. Through a cultural, historical, and social lens, we investigate how these stories reflect collective fears, technological shifts, and contemporary communication dynamics. It is a journey between myth and reality, aimed at understanding why legends continue to emerge, transform, and thrive today.
                        </p>
                    </section>

                    <section className={style.section}>
                        <h3>Documentation / Project Archive</h3>
                        <p>
                            This section gathers all the documents detailing the project’s development process, from the initial research phase to the final execution. The materials include theoretical analyses, thematic deep-dives, project concepts, and supporting content, providing insight into the creative and design choices made throughout. This collection documents the workflow transparently, highlighting the evolution of the idea and the methodology used to transform it into a structured multimedia project.
                        </p>
                    </section>

                    <blockquote className={style.quote}>
                        "A project is alive when it combines research, vision, and care."
                    </blockquote>
                </div>
            </section>
        </div>
        <Footer colors={colorsMap['Calma']} className={style.footer} />
      </div>
    );
}
  
export default AboutHortus;