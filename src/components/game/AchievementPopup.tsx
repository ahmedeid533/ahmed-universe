'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AchievementPopup.module.css';

interface AchievementPopupProps {
  levelIndex: number;
  levelTitle: string;
}

export default function AchievementPopup({ levelIndex, levelTitle }: AchievementPopupProps) {
  const [visible, setVisible] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState({ index: -1, title: '' });

  useEffect(() => {
    if (levelIndex > currentDisplay.index && levelIndex >= 0) {
      setCurrentDisplay({ index: levelIndex, title: levelTitle });
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(timer);
    } else if (levelIndex < currentDisplay.index) {
      // Just update the index if scrolling back, but don't show popup
      setCurrentDisplay(prev => ({ ...prev, index: levelIndex }));
    }
  }, [levelIndex, levelTitle, currentDisplay.index]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.achievementToast}
          initial={{ y: -100, opacity: 0, x: '-50%' }}
          animate={{ y: 20, opacity: 1, x: '-50%' }}
          exit={{ y: -50, opacity: 0, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={() => setVisible(false)}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.toastContent}>
            <div className={styles.iconWrapper}>
              <span className={styles.trophy}>🏆</span>
            </div>
            <div className={styles.textWrapper}>
              <span className={styles.achievementTitle}>ACHIEVEMENT UNLOCKED</span>
              <span className={styles.achievementName}>{levelTitle}</span>
            </div>
          </div>
          <div className={styles.timerBar} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
