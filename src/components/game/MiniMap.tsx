'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Milestone } from '@/types';
import styles from './MiniMap.module.css';

export default function MiniMap({ 
  milestones, 
  currentLevel, 
  isScrolling,
}: { 
  milestones: Milestone[], 
  currentLevel: number,
  isScrolling?: boolean;
}) {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [showActiveLabel, setShowActiveLabel] = useState(true);

  useEffect(() => {
    setShowActiveLabel(true);
    const timer = setTimeout(() => {
      setShowActiveLabel(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentLevel]);

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
          onMouseEnter={() => setHoveredNode(-1)}
          onMouseLeave={() => setHoveredNode(null)}
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

          {/* Home Label on Left */}
          <motion.span 
            className={styles.levelName}
            animate={{ 
              opacity: (currentLevel === -1 && showActiveLabel) || hoveredNode === -1 ? 1 : 0,
              x: (currentLevel === -1 && showActiveLabel) || hoveredNode === -1 ? 0 : 10,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            Home
          </motion.span>
        </div>

        {/* Milestone Nodes */}
        {(milestones || []).map((milestone, i) => (
          <div
            key={milestone.id}
            onClick={() => scrollToLevel(i)}
            onMouseEnter={() => setHoveredNode(i)}
            onMouseLeave={() => setHoveredNode(null)}
            className={`${styles.node} ${currentLevel === i ? styles.active : ''} ${currentLevel > i ? styles.completed : ''}`}
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
                color: currentLevel === i ? milestone.theme_color : 'white'
              }}
              animate={{ 
                opacity: (currentLevel === i && showActiveLabel) || hoveredNode === i ? 1 : 0,
                x: (currentLevel === i && showActiveLabel) || hoveredNode === i ? 0 : 10,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {milestone.title}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}
