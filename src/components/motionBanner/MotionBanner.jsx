'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './MotionBanner.module.scss';

const words = ["NATURE", "GARDENING", "PLANTS", "FLOWERS", "GREENLIFE"];
const numberOfRepetitions = 10;

// Crea una stringa con i puntini, ma in modo che ogni parola sia separata visivamente
const repeatedWords = Array(numberOfRepetitions)
  .fill(words)
  .flat(); // Unisci tutte le ripetizioni in un singolo array

const MotionBanner = ({ colors }) => {
  const bannerVariants = {
    initial: { x: 0 },
    animate: {
      x: '-50%',
      transition: {
        x: {
          duration: 100,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      },
    },
  };

  return (
    <div className={styles.background} style={{ backgroundColor: colors['lightGround'] }}>
      <motion.div
        variants={bannerVariants}
        initial="initial"
        animate="animate"
        className={styles.scrollingDiv}
        
      >
        {repeatedWords.map((word, index) => (
          <span key={`${word}-${index}`} className={styles.text} style={{color: colors['secondary']}}>
            {word}
            <span className={styles.dot}> • </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MotionBanner;
