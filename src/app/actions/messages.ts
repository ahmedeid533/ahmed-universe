'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getMessages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function updateMessageStatus(id: string, status: 'unread' | 'read' | 'archived' | 'starred') {
  const supabase = await createClient();
  const updateData: any = { status };
  
  if (status === 'read') {
    updateData.read_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from('messages')
    .update(updateData)
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/dashboard/messages');
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/dashboard/messages');
}
