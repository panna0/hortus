'use client'; 

import React, { useEffect, useState } from "react";
import styles from "./IconCard.module.scss"
import Button from "../button/Button.jsx";
import Link from "next/link";

const IconCard = ({title, text, icon, color, colors}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    return(
        <div className={`${styles.card}`} style={{border: `solid 1px ${colors['secondary']}`}}>
            <div className={`${styles.iconTextContainer}`} style={{border: `solid 1px ${colors['secondary']}`, backgroundColor: colors['lightGround']}}>
                <div className={`${styles.iconTitleText}`}>
                    {icon}
                    <div className={`${styles.textContainer}`} style={{color: color}}>
                        <h1>{title}</h1>
                        <p style={{color: colors['secondary']}}>{text}</p>
                    </div>
                                        {isMobile && (
                                            <Link href="/vivarium" className={styles.arrowLink} aria-label="Apri Vivarium">
                                                <span aria-hidden="true">&gt;</span>
                                                <span className={styles.visuallyHidden}>Explore</span>
                                            </Link>
                                        )}
                </div>
                
            </div>
                     {isMobile ? null : (
             <Link href="/vivarium"><Button color="secondary" size="large" action={() => {}} colors={colors}>Explore</Button></Link>
           )}
           
        </div>
    );
};

export default IconCard;