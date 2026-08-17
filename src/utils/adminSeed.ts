import { supabaseClient } from './supabaseClient';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'SuperAdmin' | 'AgencyOwner';
  isLoggedIn: boolean;
  rememberMe?: boolean;
  avatar: string;
  subscriptionPlan: string;
  trialDaysLeft: number;
}

const ADMIN_STORAGE_KEY = 'launchengine_admin_session_v1';

export const DEFAULT_ADMIN: AdminUser = {
  id: 'usr_stephen_tofield_888',
  name: 'Stephen Tofield',
  email: 'tofield69@gmail.com',
  role: 'SuperAdmin',
  isLoggedIn: true,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  subscriptionPlan: '30-Day VIP Agency Pass (Free Trial)',
  trialDaysLeft: 30
};

export const getAdminSession = (): AdminUser | null => {
  try {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Error reading admin session', e);
  }
  return null;
};

export const saveAdminSession = (admin: AdminUser) => {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));
  } catch (e) {
    console.error('Error saving admin session', e);
  }
};

/**
 * Syncs Stephen Tofield Admin account into Supabase database tables
 */
export const syncAdminToSupabase = async () => {
  try {
    // 1. Sync Workspace Record
    const { error: wsErr } = await supabaseClient
      .from('workspaces')
      .upsert({
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Stephen Tofield Agency Enterprise',
        subdomain: 'tofield-agency',
        custom_domain: 'funnels.tofieldagency.com',
        updated_at: new Date().toISOString()
      }, { onConflict: 'subdomain' });

    if (wsErr) console.warn('Supabase Workspace sync notice:', wsErr.message);

    // 2. Sync Contact / Admin User Record
    const { error: contactErr } = await supabaseClient
      .from('contacts')
      .upsert({
        id: '00000000-0000-0000-0000-000000000002',
        workspace_id: '00000000-0000-0000-0000-000000000001',
        name: 'Stephen Tofield',
        email: 'tofield69@gmail.com',
        score: 1000,
        tags: ['SuperAdmin', 'VIP_Owner', '30DayTrial']
      }, { onConflict: 'id' });

    if (contactErr) console.warn('Supabase Admin Contact sync notice:', contactErr.message);

    console.log('Successfully synced Stephen Tofield Admin details to Supabase database!');
    return true;
  } catch (err: any) {
    console.error('Error syncing admin to Supabase:', err);
    return false;
  }
};
