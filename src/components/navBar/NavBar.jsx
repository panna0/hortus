// import React from "react";
// import style from "./NavBar.module.scss";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import LogoIcon from "../../../public/hortusNeutral.svg"; 
// import MotionLink from "../motionLink/MotionLink.jsx";

// const NavBar = ({ url = '/' }) => {

   
//     return(
      
//         <header className={`${style.header}`}>
//             <Link href={url}>
//                 <div className={style.logo}>
                    
//                         <LogoIcon
//                             className={style.logoIcon}
//                             style={{ width: 20, height: 20 }}
//                         /> 
                    
//                     <h3>Hortus</h3>
//                 </div>
//             </Link>
//              <div className={style.linkContainer}>
//                           <MotionLink href="/vivarium"> <h4>Vivarium</h4> </MotionLink>
//                           <MotionLink href="/greenai"> <h4>GreenAi</h4> </MotionLink>
//                           <MotionLink href="/about"> <h4>About</h4> </MotionLink>   
//                 </div>
//         </header>
     
//     );
// };

// export default NavBar;


"use client";
import React, { useState } from "react";
import style from "./NavBar.module.scss";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LogoIcon from "../../../public/hortusNeutral.svg"; 
import MotionLink from "../motionLink/MotionLink.jsx";

const NavBar = ({ url = '/' }) => {
        const [open, setOpen] = useState(false);

        const closeMenu = () => setOpen(false);

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
                          <MotionLink href="/aboutHortus"> <h4>About Hortus</h4> </MotionLink>
                          <MotionLink href="/aboutUs"> <h4>About Us</h4> </MotionLink>   
                </div>

                                {/* Hamburger toggle (mobile) */}
                                <button
                                    className={`${style.menuToggle} ${open ? style.open : ''}`}
                                    aria-expanded={open}
                                    aria-controls="mobile-nav"
                                    aria-label={open ? "Chiudi menu" : "Apri menu"}
                                    onClick={() => setOpen(!open)}
                                >
                                    <span className={style.bar} />
                                    <span className={style.bar} />
                                    <span className={style.bar} />
                                </button>

                                {/* Mobile menu */}
                                <AnimatePresence>
                                    {open && (
                                        <motion.nav
                                            id="mobile-nav"
                                            className={style.mobileMenu}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                        >
                                            <div onClick={closeMenu}>
                                                <MotionLink href="/vivarium"> <h4>Vivarium</h4> </MotionLink>
                                            </div>
                                            <div onClick={closeMenu}>
                                                <MotionLink href="/aboutHortus"> <h4>About Hortus</h4> </MotionLink>
                                            </div>
                                            <div onClick={closeMenu}>
                                                <MotionLink href="/aboutUs"> <h4>About Us</h4> </MotionLink>
                                            </div>
                                        </motion.nav>
                                    )}
                                </AnimatePresence>
        </header>
     
    );
};

export default NavBar;