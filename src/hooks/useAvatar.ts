'use client';

import { useMemo } from 'react';
import { SEED_MILESTONES } from '@/lib/data/seed';
import type { LevelTheme } from '@/types';

// For now, we use the static seed data.
// When Supabase is connected, this will fetch from the database.

const SKIN_IMAGES: Record<number, { idle: string; hover: string }> = {
  0: { idle: '/avatars/engineer.png', hover: '/avatars/engineer_hover.png' },
  1: { idle: '/avatars/casual.png', hover: '/avatars/casual_hover.png' },
  2: { idle: '/avatars/developer.png', hover: '/avatars/developer_hover.png' },
  3: { idle: '/avatars/hacker.png', hover: '/avatars/hacker_hover.png' },
  4: { idle: '/avatars/groom.png', hover: '/avatars/groom_hover.png' },
  5: { idle: '/avatars/architect.png', hover: '/avatars/architect_hover.png' },
};

interface AvatarState {
  currentSkin: { idle: string; hover: string };
  currentSkinName: string;
  isTransitioning: boolean;
}

export function useAvatar(currentLevelIndex: number): AvatarState {
  const state = useMemo(() => {
    return {
      currentSkin: SKIN_IMAGES[currentLevelIndex] || SKIN_IMAGES[0],
      currentSkinName: SEED_MILESTONES[currentLevelIndex]?.title || 'The Beginning',
      isTransitioning: false,
    };
  }, [currentLevelIndex]);

  return state;
}

export function getThemeForLevel(index: number): LevelTheme {
  const themes: LevelTheme[] = ['dreamy', 'engineering', 'neon', 'cyber', 'warm', 'corporate'];
  return themes[index] || 'dreamy';
}
