'use client'; 

import React from "react";
import styles from "./IconCard.module.scss"
import Button from "../button/Button.jsx";
import Link from "next/link";

const IconCard = ({title, text, icon, color}) => {
    
  

    return(
        <div className={`${styles.card}`}>
            <div className={`${styles.iconTextContainer}`}>
                <div className={`${styles.iconTitleText}`}>
                    {icon}
                    <div className={`${styles.textContainer}`} style={{color: color}}>
                        <h1>{title}</h1>
                        <p>{text}</p>
                    </div>
                </div>
                
            </div>
           <Link href="/vivarium"><Button color="secondary" size="large" action={() => {}}>Explore</Button></Link>
           
        </div>
    );
};

export default IconCard;