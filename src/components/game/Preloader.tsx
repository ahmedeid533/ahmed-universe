'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Faster simulation for a snappier feel
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Zero delay for exit once 100 is reached
          setIsVisible(false);
          return 100;
        }
        return prev + Math.floor(Math.random() * 30) + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            filter: 'blur(20px)',
          }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0c 100%)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'monospace',
            color: 'var(--color-primary)',
            overflow: 'hidden',
          }}
        >
          {/* Scanline Effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
            backgroundSize: '100% 4px, 3px 100%',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.3,
          }} />

          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ fontSize: '1.2rem', marginBottom: '2rem', letterSpacing: '6px', zIndex: 2, fontWeight: 'bold' }}
          >
            INITIALIZING UNIVERSE
          </motion.div>
          
          <div style={{ width: '260px', height: '1px', background: 'rgba(255,255,255,0.05)', position: 'relative', zIndex: 2 }}>
            <motion.div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                background: 'var(--color-primary)',
                boxShadow: '0 0 20px var(--color-primary), 0 0 40px var(--color-primary)',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>
          
          <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', opacity: 0.5, letterSpacing: '2px', zIndex: 2 }}>
            DATA_STREAM: {Math.min(progress, 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
