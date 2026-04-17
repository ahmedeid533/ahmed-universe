'use client';

import { useState, useEffect } from 'react';
import type { Milestone } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { SEED_MILESTONES } from '@/lib/data/seed';

export function useMilestones() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMs() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('milestones')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order', { ascending: true });

      if (data && data.length > 0) {
        setMilestones(data);
      } else {
        // Fallback to static if no tables or data
        // Generate temporary IDs for static data
        setMilestones(SEED_MILESTONES.map((m, i) => ({
          ...m,
          id: `milestone-${i}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })));
      }
      setIsLoading(false);
    }
    fetchMs();
  }, []);

  return {
    milestones,
    isLoading,
    error: null,
  };
}
