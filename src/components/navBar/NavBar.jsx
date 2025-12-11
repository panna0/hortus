import React from "react";
import style from "./NavBar.module.scss";
import Link from "next/link";
import { motion } from "framer-motion";
import LogoIcon from "../../../public/hortusNeutral.svg"; 
import MotionLink from "../motionLink/MotionLink.jsx";

const NavBar = ({ url = '/' }) => {

   
    return(
      
        <header className={`${style.header}`}>
            <Link href={url}>
                <div className={style.logo}>
                    
                        <LogoIcon
                            className={style.logoIcon}
                            style={{ width: 20, height: 20 }}
                        /> 
                    
                    <h3>Hortus</h3>
                </div>
            </Link>
             <div className={style.linkContainer}>
                          <MotionLink href="/vivarium"> <h4>Vivarium</h4> </MotionLink>
                          <MotionLink href="/about"> <h4>GreenAi</h4> </MotionLink>
                          <MotionLink href="/contact"> <h4>About</h4> </MotionLink>   
                </div>
        </header>
     
    );
};

export default NavBar;