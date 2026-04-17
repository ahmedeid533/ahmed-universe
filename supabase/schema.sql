-- ============================================
-- Ahmed's Universe — Database Schema
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================

-- ============================================
-- TABLE: milestones
-- ============================================
CREATE TABLE milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  title_ar TEXT,
  description TEXT NOT NULL,
  description_ar TEXT,
  category TEXT NOT NULL CHECK (category IN ('education', 'work', 'personal', 'achievement')),
  theme TEXT NOT NULL CHECK (theme IN ('dreamy', 'engineering', 'neon', 'cyber', 'warm', 'corporate')),
  theme_color TEXT NOT NULL DEFAULT '#6366f1',
  image_url TEXT,
  icon TEXT DEFAULT '🏆',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE: avatar_skins
-- ============================================
CREATE TABLE avatar_skins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  milestone_id UUID REFERENCES milestones(id) ON DELETE CASCADE,
  skin_name TEXT NOT NULL,
  skin_name_ar TEXT,
  image_url TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TABLE: messages
-- ============================================
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived', 'starred')),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  read_at TIMESTAMPTZ
);

-- ============================================
-- TABLE: site_settings
-- ============================================
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read visible milestones" ON milestones
  FOR SELECT TO anon, authenticated
  USING (is_visible = true);
CREATE POLICY "Admin can do everything with milestones" ON milestones
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

ALTER TABLE avatar_skins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read skins" ON avatar_skins
  FOR SELECT TO anon, authenticated
  USING (true);
CREATE POLICY "Admin can manage skins" ON avatar_skins
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert messages" ON messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "Admin can read messages" ON messages
  FOR SELECT TO authenticated
  USING (true);
CREATE POLICY "Admin can update messages" ON messages
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);
CREATE POLICY "Admin can delete messages" ON messages
  FOR DELETE TO authenticated
  USING (true);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read settings" ON site_settings
  FOR SELECT TO anon, authenticated
  USING (true);
CREATE POLICY "Admin can manage settings" ON site_settings
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_milestones_sort ON milestones(sort_order);
CREATE INDEX idx_milestones_category ON milestones(category);
CREATE INDEX idx_messages_status ON messages(status);
CREATE INDEX idx_messages_created ON messages(created_at DESC);

-- ============================================
-- Auto-update trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER milestones_updated_at
  BEFORE UPDATE ON milestones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
