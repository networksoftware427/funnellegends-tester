import { supabaseClient } from './supabaseClient';

export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabaseClient.from('workspaces').select('count', { count: 'exact' });
    if (error) {
      console.error('Supabase table test query failed:', error.message);
      return { success: false, error: error.message };
    }
    console.log('Supabase SQL Database successfully connected! Workspaces count:', data);
    return { success: true, count: data };
  } catch (err: any) {
    console.error('Unexpected connection error:', err);
    return { success: false, error: err.message || String(err) };
  }
};
