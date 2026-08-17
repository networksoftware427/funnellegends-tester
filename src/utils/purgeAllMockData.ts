// Master Purge Utility for Clearing Mock/Demo Data Across All Platform Modules

const ALL_STORAGE_KEYS = [
  // Core Funnels & Builder
  'launchengine_funnels_v1',
  'launchengine_funnels_v2',
  'launchengine_funnels_v3',
  'launchengine_funnels_v4',
  'launchengine_course_v1',
  'launchengine_contacts_v1',
  'launchengine_deals_v1',
  'launchengine_wf_nodes_v1',
  'launchengine_wf_edges_v1',
  'launchengine_student_days_v1',
  
  // BountyPack Affiliate Engine
  'bountypack_plans_v1',
  'bountypack_affiliates_v1',
  'bountypack_transactions_v1',
  'bountypack_promo_v1',
  'bountypack_contests_v1',
  'bountypack_settings_v1',

  // ChronoChimp Appointments & Calendar
  'chronochimp_hosts_v1',
  'chronochimp_event_types_v1',
  'chronochimp_appointments_v1',
  'chronochimp_settings_v1',

  // TribeNexus Community
  'tribenexus_posts_v1',
  'tribenexus_members_v1',
  'tribenexus_channels_v1',
  'tribenexus_settings_v1',

  // PingPanda Omnichannel Message Hub
  'pingpanda_conversations_v1',
  'pingpanda_messages_v1',
  'pingpanda_team_v1',
  'pingpanda_rules_v1',
  'pingpanda_sequences_v1',
  'pingpanda_integrations_v1'
];

export const purgeAllMockData = (): void => {
  try {
    // 1. Remove all stored mock keys from localStorage
    ALL_STORAGE_KEYS.forEach(key => {
      localStorage.removeItem(key);
    });

    // 2. Set clean empty arrays in localStorage so components default to 0 records
    localStorage.setItem('launchengine_contacts_v1', JSON.stringify([]));
    localStorage.setItem('launchengine_deals_v1', JSON.stringify([]));
    localStorage.setItem('bountypack_affiliates_v1', JSON.stringify([]));
    localStorage.setItem('bountypack_transactions_v1', JSON.stringify([]));
    localStorage.setItem('chronochimp_appointments_v1', JSON.stringify([]));
    localStorage.setItem('tribenexus_posts_v1', JSON.stringify([]));
    localStorage.setItem('pingpanda_conversations_v1', JSON.stringify([]));
    localStorage.setItem('pingpanda_messages_v1', JSON.stringify({}));

    // 3. Mark mode as production live
    localStorage.setItem('launchengine_mode', 'production_live');
    localStorage.setItem('launchengine_mock_purged_timestamp', new Date().toISOString());

  } catch (e) {
    console.error('Failed to purge mock data', e);
  }
};

export const isMockDataPurged = (): boolean => {
  return localStorage.getItem('launchengine_mode') === 'production_live';
};
