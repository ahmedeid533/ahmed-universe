'use client';

import { motion } from 'framer-motion';
import type { Milestone } from '@/types';
import styles from './MiniMap.module.css';

export default function MiniMap({ milestones, currentLevel }: { milestones: Milestone[], currentLevel: number }) {
  const scrollToLevel = (index: number) => {
    const element = document.getElementById(index === -1 ? 'hero' : `level-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (index === -1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalLevels = (milestones || []).length;
  // Calculate progress percentage for the track line based on currentLevel (0 to totalLevels - 1)
  const progressPercent = currentLevel === -1 
    ? 0 
    : ((currentLevel + 1) / totalLevels) * 100;

  return (
    <div className={styles.minimap}>
      <div className={styles.track}>
        {/* The connecting line */}
        <div className={styles.trackLine}>
          <motion.div 
            className={styles.trackProgress} 
            initial={{ height: '0%' }}
            animate={{ height: `${progressPercent}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          />
        </div>

        {/* Home/Hero Node */}
        <div 
          onClick={() => scrollToLevel(-1)}
          className={`${styles.node} ${currentLevel === -1 ? styles.active : ''}`}
          title="Home"
        >
          <span className={styles.nodeIcon}>🏠</span>
          {currentLevel === -1 && (
            <motion.div 
              layoutId="active-ring"
              className={styles.activeRing} 
              initial={false}
            />
          )}
        </div>

        {/* Milestone Nodes */}
        {(milestones || []).map((milestone, i) => (
          <div
            key={milestone.id}
            onClick={() => scrollToLevel(i)}
            className={`${styles.node} ${currentLevel === i ? styles.active : ''} ${currentLevel > i ? styles.completed : ''}`}
            title={milestone.title}
            style={{ 
              borderColor: currentLevel === i ? milestone.theme_color : 'rgba(255, 255, 255, 0.1)',
              boxShadow: currentLevel === i ? `0 0 15px ${milestone.theme_color}60` : 'none'
            }}
          >
            <span className={styles.nodeIcon}>{milestone.icon}</span>
            
            {currentLevel === i && (
              <motion.div 
                layoutId="active-ring"
                className={styles.activeRing}
                style={{ borderColor: milestone.theme_color }}
              />
            )}

            {/* Label positioned to the left of the node */}
            <motion.span 
              className={styles.levelName}
              style={{
                position: 'absolute',
                right: '100%',
                marginRight: '15px',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                writingMode: 'horizontal-tb', // Changed to horizontal for better readability
                fontSize: '0.65rem',
                textAlign: 'right'
              }}
              animate={{ 
                opacity: currentLevel === i ? 1 : 0,
                x: currentLevel === i ? 0 : 10,
                color: currentLevel === i ? milestone.theme_color : 'white'
              }}
            >
              {milestone.title}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}
