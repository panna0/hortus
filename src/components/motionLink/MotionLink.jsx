'use client'; 
import Link from "next/link";
import { motion } from "framer-motion";
import React from 'react';
import style from "./MotionLink.module.scss";



const MotionLink = ({ href, children }) => {
    return (
        <Link href={href}>
            <motion.div whileHover={{ scale: 1.2 }} className={style.link}>
                {children}
            </motion.div>
        </Link>
    );
}

export default MotionLink;