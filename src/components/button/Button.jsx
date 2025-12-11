'use client'; 

import React from "react";
import styles from "./Button.module.scss"
import {motion} from "motion/react"

const Button = ({children, color, size, action}) => {

    const colorClass = color === "primary"
    ? styles["btn-primary"]
    : color === "secondary"
        ? styles["btn-secondary"]
        : "";

    const sizeClass = size === "small"
    ? styles["btn-small"]
    : size === "large"
        ? styles["btn-large"]
        : size === "rounded" 
        ? styles["btn-rounded"]
        : "";

    return(
        <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.9 }}    
        animate={{ scale: 1 }}       
        transition={{
        type: "spring",              
        stiffness: 400,
        damping: 10,
      }}>
            <button className={`${styles.btn} ${colorClass} ${sizeClass}`} onClick={() => action()} type="button">{children}</button> 
       </motion.div>
    );
};

export default Button;