'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Milestone } from '@/types';

export async function getMilestones() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(error.message);
  return data as Milestone[];
}

export async function toggleMilestoneVisibility(id: string, isVisible: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('milestones')
    .update({ is_visible: isVisible })
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/dashboard/milestones');
  revalidatePath('/');
}

export async function deleteMilestone(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('milestones')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/dashboard/milestones');
  revalidatePath('/');
}

export async function getMilestoneById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data as Milestone;
}

export async function createMilestone(milestoneData: Omit<Milestone, 'id' | 'created_at'>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('milestones')
    .insert(milestoneData);

  if (error) throw new Error(error.message);
  revalidatePath('/dashboard/milestones');
  revalidatePath('/');
}

export async function updateMilestone(id: string, milestoneData: Partial<Milestone>) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('milestones')
    .update(milestoneData)
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/dashboard/milestones');
  revalidatePath('/');
}
