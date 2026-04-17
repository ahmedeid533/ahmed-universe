'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Avatar.module.css';

interface AvatarProps {
  skinUrl: { idle: string; hover: string };
  skinName: string;
  isScrolling: boolean;
  direction: 'up' | 'down' | 'idle';
  levelIndex: number;
}

export default function Avatar({ skinUrl, skinName, isScrolling, direction, levelIndex }: AvatarProps) {
  const [prevLevel, setPrevLevel] = useState(levelIndex);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (levelIndex !== prevLevel) {
      setShowLevelUp(true);
      setPrevLevel(levelIndex);
      const timer = setTimeout(() => setShowLevelUp(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [levelIndex, prevLevel]);

  return (
    <div 
      className={styles.avatarContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Level Up Effect */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            className={styles.levelUpEffect}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className={styles.levelUpText}>LEVEL UP!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow Ring */}
      <div className={styles.glowRing} />

      {/* Avatar Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={skinUrl.idle}
          className={`${styles.avatarWrapper} ${isScrolling ? styles.walking : styles.idle}`}
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Dual Image logic: Bottom is hover, top is idle. Idle fades out on hover. */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              src={skinUrl.hover}
              alt={`${skinName} Action`}
              className={styles.avatarImage}
              style={{ position: 'absolute', top: 0, left: 0 }}
              draggable={false}
            />
            <img
              src={skinUrl.idle}
              alt={skinName}
              className={styles.avatarImage}
              style={{
                position: 'relative',
                zIndex: 2,
                opacity: isHovered ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out'
              }}
              draggable={false}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Skin Name Tag */}
      <motion.div
        className={styles.skinTag}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        key={skinName}
      >
        {skinName}
      </motion.div>

      {/* Floating Particles — deterministic positions to avoid hydration mismatch */}
      <div className={styles.particles}>
        {[
          { x: -30, y: -40 },
          { x: 20, y: -60 },
          { x: -10, y: -25 },
          { x: 35, y: -75 },
          { x: -40, y: -50 },
          { x: 15, y: -35 },
        ].map((pos, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              '--delay': `${i * 0.5}s`,
              '--x': `${pos.x}px`,
              '--y': `${pos.y}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
