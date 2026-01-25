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
                    At Hortus.live, our mission is to bring nature back to the center of daily life, making gardening an accessible, conscious, and deeply rejuvenating experience. We believe that every green space—from expansive rural gardens to small city balconies—is a precious ecosystem capable of enhancing both our mental well-being and the environment around us. We are committed to providing the knowledge and tools necessary for everyone to cultivate not just plants, but a genuine reconnection with the rhythms of the earth.
                </p>

                <h3>The Project</h3>
                <p>
                    Hortus.live was born as a dynamic digital ecosystem, designed to bridge the gap between botanical tradition and technological innovation. The project functions as an interactive platform where practical guides, seasonal advice, and scientific insights meet in a "live," constantly updated format. We are more than just an archive of information; we are an ever-evolving laboratory that utilizes digital tools to monitor, share, and celebrate the growth of greenery in all its forms.
                </p>

                <h3>Contact Us</h3>
                <p>
                    We are always happy to exchange ideas, answer botanical questions, or explore new collaborations. Whether you are a field expert, a sustainability-oriented brand, or a beginner tackling your very first plant, your voice matters to us. You can write to us directly at our dedicated email address, follow our social media channels for daily updates, or fill out the form below. Join the Hortus.live community: let’s cultivate the future together, one sprout at a time.
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