// ============================================
// Ahmed's Universe — Type Definitions
// ============================================

export interface Milestone {
  id: string;
  year: number;
  title: string;
  title_ar?: string;
  description: string;
  description_ar?: string;
  category: 'education' | 'work' | 'personal' | 'achievement';
  theme: LevelTheme;
  theme_color: string;
  image_url?: string;
  icon: string;
  sort_order: number;
  is_visible: boolean;
  metadata: MilestoneMetadata;
  created_at?: string;
  updated_at?: string;
  avatar_skins?: AvatarSkin[];
}

export interface MilestoneMetadata {
  gpa?: string;
  rank?: string;
  institution?: string;
  company?: string;
  role?: string;
  projects?: ProjectInfo[];
  skills?: string[];
  links?: { label: string; url: string }[];
  courses?: string[];
}

export interface ProjectInfo {
  name: string;
  description: string;
  tech: string[];
  url?: string;
  icon?: string;
  period?: string;
}

export interface AvatarSkin {
  id: string;
  milestone_id: string;
  skin_name: string;
  skin_name_ar?: string;
  image_url: string;
  description?: string;
  sort_order: number;
  created_at: string;
}

export interface Message {
  id: string;
  sender_name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'archived' | 'starred';
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  read_at?: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}

export type LevelTheme = 'dreamy' | 'engineering' | 'neon' | 'cyber' | 'warm' | 'corporate';

export interface Level {
  index: number;
  milestone: Milestone;
  skin: AvatarSkin | null;
  theme: LevelTheme;
  scrollStart: number; // 0-1 percentage
  scrollEnd: number;   // 0-1 percentage
}

export interface ScrollState {
  percentage: number;
  currentLevelIndex: number;
  currentTheme: LevelTheme;
  isScrolling: boolean;
  direction: 'up' | 'down' | 'idle';
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ActionResponse<T = null> {
  success: boolean;
  data?: T;
  error?: string;
}
