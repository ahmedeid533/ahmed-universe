'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { LevelTheme } from '@/types';

const TOTAL_LEVELS = 6;

interface ScrollProgressState {
  percentage: number;
  currentLevelIndex: number;
  currentTheme: LevelTheme;
  isScrolling: boolean;
  direction: 'up' | 'down' | 'idle';
  levelProgress: number; // Progress within current level (0-1)
}

const LEVEL_THEMES: LevelTheme[] = [
  'dreamy',
  'engineering',
  'neon',
  'cyber',
  'warm',
  'corporate',
];

export function useScrollProgress(): ScrollProgressState {
  const [state, setState] = useState<ScrollProgressState>({
    percentage: 0,
    currentLevelIndex: -1,
    currentTheme: 'dreamy',
    isScrolling: false,
    direction: 'idle',
    levelProgress: 0,
  });

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<any>(null);
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight - vh;
    const percentage = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Use viewport-based calculation for levels
    // Hero is -1, First milestone is 0, etc.
    // Each level is roughly 100vh
    const currentLevelIndex = Math.floor((scrollY + vh * 0.5) / vh) - 1;
    
    // Clamp between -1 and TOTAL_LEVELS - 1
    const clampedIndex = Math.max(-1, Math.min(currentLevelIndex, TOTAL_LEVELS - 1));

    const direction = scrollY > lastScrollY.current ? 'down' : scrollY < lastScrollY.current ? 'up' : 'idle';
    lastScrollY.current = scrollY;

    // Update theme on html element
    const theme = LEVEL_THEMES[Math.max(0, clampedIndex)] || 'dreamy';
    document.documentElement.setAttribute('data-level', theme);

    setState({
      percentage,
      currentLevelIndex: clampedIndex,
      currentTheme: theme,
      isScrolling: true,
      direction,
      levelProgress: 0, // Simplified as it's not strictly used for snapping
    });

    // Clear previous timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set scrolling to false after scroll stops
    scrollTimeout.current = setTimeout(() => {
      setState(prev => ({ ...prev, isScrolling: false, direction: 'idle' }));
    }, 150);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  return state;
}

export function scrollToLevel(index: number) {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const levelSize = 1 / TOTAL_LEVELS;
  const targetScroll = maxScroll * (index * levelSize + levelSize * 0.1);

  window.scrollTo({
    top: targetScroll,
    behavior: 'smooth',
  });
}
