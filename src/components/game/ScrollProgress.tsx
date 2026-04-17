'use client';

import { motion } from 'framer-motion';
import styles from './ScrollProgress.module.css';

interface ScrollProgressProps {
  percentage: number;
}

export default function ScrollProgress({ percentage }: ScrollProgressProps) {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.bar}
        style={{ width: `${percentage * 100}%` }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
      />
      <div className={styles.glow} style={{ left: `${percentage * 100}%` }} />
    </div>
  );
}
