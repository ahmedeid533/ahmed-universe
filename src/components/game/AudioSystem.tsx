'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Volume2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
  </svg>
);

const VolumeXIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

export default function AudioSystem({ currentLevel }: { currentLevel: number }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const prevLevel = useRef(-1); // Start at -1 (Hero)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const humOscRef = useRef<OscillatorNode | null>(null);
  const humGainRef = useRef<GainNode | null>(null);

  // Load initial state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ahmed-universe-sound');
    if (saved !== null) {
      setIsEnabled(saved === 'true');
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ahmed-universe-sound', isEnabled.toString());
  }, [isEnabled]);

  // Auto-activate audio on first interaction (Browser requirement)
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (isEnabled) {
        initCtx();
        if (audioCtxRef.current?.state === 'suspended') {
          audioCtxRef.current.resume();
        }
      }
      // Remove listeners after first interaction
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('wheel', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('wheel', handleFirstInteraction);
    };
  }, [isEnabled]);

  // Background Space Hum
  useEffect(() => {
    if (isEnabled) {
      startHum();
    } else {
      stopHum();
    }
    return () => stopHum();
  }, [isEnabled]);

  // Level Up SFX
  useEffect(() => {
    if (!isEnabled) return;

    // Trigger sound on ALL level changes (including -1 to 0)
    if (currentLevel !== prevLevel.current) {
      const isInitial = prevLevel.current === -1 && currentLevel === -1;
      if (!isInitial) {
        playLevelUpSound();
      }
      prevLevel.current = currentLevel;
    }
  }, [currentLevel, isEnabled]);

  const initCtx = () => {
    if (!audioCtxRef.current) {
      const AudioContext = (window.AudioContext || (window as any).webkitAudioContext) as typeof window.AudioContext;
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const startHum = () => {
    try {
      const ctx = initCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A hum
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 2); // Very subtle hum

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      humOscRef.current = osc;
      humGainRef.current = gain;
    } catch (e) {
      console.warn('Hum failed', e);
    }
  };

  const stopHum = () => {
    if (humGainRef.current && audioCtxRef.current) {
      humGainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5);
      setTimeout(() => {
        humOscRef.current?.stop();
        humOscRef.current = null;
        humGainRef.current = null;
      }, 500);
    }
  };

  const playLevelUpSound = () => {
    try {
      const ctx = initCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.4);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.warn('Level sound failed', e);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '25px', left: '25px', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '15px' }}>
      <AnimatePresence>
        {!isEnabled && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            style={{ color: 'var(--color-primary)', fontSize: '0.6rem', fontFamily: 'monospace', letterSpacing: '1px' }}
          >
            SOUND IS OFF
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          setIsEnabled(!isEnabled);
          if (!isEnabled) {
            // Context needs a fresh start
            const ctx = initCtx();
            playLevelUpSound();
          }
        }}
        style={{
          background: isEnabled ? 'rgba(167, 139, 250, 0.2)' : 'rgba(0,0,0,0.5)',
          border: `1px solid ${isEnabled ? 'var(--color-primary)' : 'rgba(255,255,255,0.2)'}`,
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: isEnabled ? 'var(--color-primary)' : '#666',
          backdropFilter: 'blur(10px)',
          boxShadow: isEnabled ? '0 0 20px rgba(167, 139, 250, 0.3)' : 'none',
        }}
        animate={!isEnabled ? { 
          boxShadow: [
            '0 0 0px var(--color-primary)',
            '0 0 15px var(--color-primary)',
            '0 0 0px var(--color-primary)'
          ] 
        } : {}}
        transition={!isEnabled ? { repeat: Infinity, duration: 2 } : {}}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isEnabled ? <Volume2Icon /> : <VolumeXIcon />}
      </motion.button>
    </div>
  );
}
