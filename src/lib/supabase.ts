import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://zihlzpyxuusttjlbqepc.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppaGx6cHl4dXVzdHRqbGJxZXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5ODI3MDUsImV4cCI6MjEwMjU1ODcwNX0.fwoM1HaYkh-k2ILIAgFxNSoGqsB2JH_MluiWpJ90U04';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
