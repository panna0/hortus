import style from './footer.module.scss';

const Footer = ({colors, className}) => {

    return(
        <footer 
        className={className} 
        style={{ backgroundColor: colors['lightGround'] }}
        >
        <div className={style.footerContent}>
            <div className={style.footerBrand}>
            <h3 style={{color: colors['secondary']}}>Hortus</h3>
            <p style={{color: colors['stone']}}>Coltiva il tuo angolo verde, un seme alla volta.</p>
            </div>
            
            <div className={style.footerLinks}>
            <h4 style={{color: colors['secondary']}}>Esplora</h4>
            <a href="/" style={{color: colors['stone']}}>Home</a>
            <a href="/plants" style={{color: colors['stone']}}>Piante</a>
            <a href="/vivarium" style={{color: colors['stone']}}>Vivarium</a>
            <a href="/aboutHortus" style={{color: colors['stone']}}>Chi Siamo</a>
            </div>
            
            <div className={style.footerLinks}>
            <h4 style={{color: colors['secondary']}}>Risorse</h4>
            <a href="/aboutUs" style={{color: colors['stone']}}>Il Team</a>
            <a href="#" style={{color: colors['stone']}}>FAQ</a>
            <a href="#" style={{color: colors['stone']}}>Contatti</a>
            </div>
            

        </div>
        
        <div className={style.footerBottom} style={{borderTopColor: colors['ground']}}>
            <p style={{color: colors['stone']}}>© 2026 Hortus. Tutti i diritti riservati.</p>
        </div>
        </footer>
        
    );


}


export default Footer;