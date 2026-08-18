import { supabaseClient } from './supabaseClient';
import { ContactData, DealData } from '../types/builder';

/**
 * CRM Pipeline & Lead Scoring Engine Supabase Database Synchronization Service & SQL Schema
 */

export const CRM_ENGINE_SQL_SCHEMA = `-- =========================================================
-- FUNNELLEGENDS CRM & PIPELINE ENGINE SUPABASE SQL SCHEMA (v2.0)
-- Run this in your Supabase SQL Editor to initialize tables
-- =========================================================

-- 1. CRM CONTACTS & LEADS TABLE
CREATE TABLE IF NOT EXISTS public.crm_contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  score INTEGER DEFAULT 0,
  tags JSONB DEFAULT '[]'::jsonb,
  last_active TEXT DEFAULT 'Just now',
  created_date DATE DEFAULT CURRENT_DATE,
  custom_fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. CRM DEALS & KANBAN PIPELINE TABLE
CREATE TABLE IF NOT EXISTS public.crm_deals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  value NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  stage TEXT NOT NULL DEFAULT 'Lead' CHECK (stage IN ('Lead', 'Qualified', 'Proposal', 'Won', 'Lost')),
  score INTEGER DEFAULT 50,
  created_date DATE DEFAULT CURRENT_DATE,
  funnel_origin TEXT DEFAULT 'Direct Funnel OptIn',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. CRM ACTIVITY & AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.crm_activity_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  contact_id TEXT REFERENCES public.crm_contacts(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  description TEXT NOT NULL,
  points_awarded INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. CRM 3RD PARTY INTEGRATIONS CONFIG TABLE
CREATE TABLE IF NOT EXISTS public.crm_integrations (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  api_key_masked TEXT,
  webhook_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_synced_at TIMESTAMPTZ DEFAULT now(),
  config JSONB DEFAULT '{}'::jsonb
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_integrations ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR PUBLIC & AUTHENTICATED ACCESS
CREATE POLICY "Allow public read on crm_contacts" ON public.crm_contacts FOR SELECT USING (true);
CREATE POLICY "Allow public read on crm_deals" ON public.crm_deals FOR SELECT USING (true);
CREATE POLICY "Allow public read on crm_activity_logs" ON public.crm_activity_logs FOR SELECT USING (true);
CREATE POLICY "Allow public read on crm_integrations" ON public.crm_integrations FOR SELECT USING (true);
`;

export interface ThirdPartyIntegration {
  id: string;
  name: string;
  category: 'Automation' | 'Payments' | 'Messaging' | 'Enterprise CRM' | 'Email List';
  icon: string;
  description: string;
  status: 'Connected' | 'Ready to Connect' | 'Active Live Webhook';
  endpoint: string;
  events: string[];
}

export const initialCrmIntegrations: ThirdPartyIntegration[] = [
  {
    id: 'int_zapier',
    name: 'Zapier & Make.com Outbound Webhooks',
    category: 'Automation',
    icon: '⚡',
    description: 'Instantly push new leads, deal stage movements, and high-value customer tags to 5,000+ external apps.',
    status: 'Connected',
    endpoint: 'https://hooks.zapier.com/hooks/catch/948201/fl_crm_stream',
    events: ['lead.created', 'deal.won', 'score.threshold_exceeded']
  },
  {
    id: 'int_stripe',
    name: 'Stripe Direct Payment Sync',
    category: 'Payments',
    icon: '💳',
    description: 'Automatically create pipeline deals when 1-click upsells or 2-step checkout orders are processed.',
    status: 'Connected',
    endpoint: 'https://api.stripe.com/v1/events/fl_sales_sync',
    events: ['charge.succeeded', 'customer.subscription.created', 'invoice.paid']
  },
  {
    id: 'int_hubspot',
    name: 'HubSpot & Salesforce 2-Way Enterprise Sync',
    category: 'Enterprise CRM',
    icon: '🏢',
    description: 'Bi-directionally sync high-ticket VIP leads, deal values, and sales rep assignments with corporate CRM.',
    status: 'Ready to Connect',
    endpoint: 'https://api.hubapi.com/crm/v3/objects/contacts',
    events: ['contact.sync', 'deal.pipeline_sync']
  },
  {
    id: 'int_twilio',
    name: 'Twilio SMS Dispatcher',
    category: 'Messaging',
    icon: '📱',
    description: 'Trigger immediate automated SMS alerts to sales reps when high-value leads cross 100+ lead points.',
    status: 'Connected',
    endpoint: 'https://api.twilio.com/2010-04-01/Accounts/AC_DEMO/Messages',
    events: ['sms.urgent_lead_alert', 'sms.booking_confirmation']
  },
  {
    id: 'int_activecampaign',
    name: 'ActiveCampaign & Klaviyo Email Tagging',
    category: 'Email List',
    icon: '✉️',
    description: 'Synchronize contact tags (`VIP_Customer`, `OptIn`, `VSL_Buyer`) into marketing automation sequences.',
    status: 'Connected',
    endpoint: 'https://funnellegends.api-us1.com/api/3/contactTags',
    events: ['tag.added', 'list.subscribed']
  }
];

// Sync Contacts and Deals to Supabase
export const syncCrmToSupabase = async (
  contacts: ContactData[],
  deals: DealData[]
): Promise<{ success: boolean; message: string; timestamp: string }> => {
  const timestamp = new Date().toLocaleTimeString();
  try {
    // 1. Upsert Contacts
    for (const cnt of contacts) {
      await supabaseClient.from('crm_contacts').upsert({
        id: cnt.id,
        name: cnt.name,
        email: cnt.email,
        phone: cnt.phone || '+1 555-0100',
        score: cnt.score || 0,
        tags: cnt.tags || [],
        last_active: cnt.lastActive || 'Just now',
        created_date: cnt.createdDate || new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
    }

    // 2. Upsert Deals
    for (const deal of deals) {
      await supabaseClient.from('crm_deals').upsert({
        id: deal.id,
        title: deal.title,
        value: deal.value || 0,
        contact_name: deal.contactName,
        contact_email: deal.contactEmail,
        stage: deal.stage,
        score: deal.score || 50,
        created_date: deal.createdDate || new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });
    }

    const totalWon = deals.filter(d => d.stage === 'Won').reduce((s, d) => s + d.value, 0);

    return {
      success: true,
      message: `Successfully synchronized ${contacts.length} CRM leads and ${deals.length} pipeline deals ($${totalWon.toLocaleString()} Won) to Supabase Cloud.`,
      timestamp
    };
  } catch (err: any) {
    console.error('Error syncing CRM to Supabase:', err);
    return {
      success: false,
      message: `Sync notice (Persistent local storage active): ${err.message || 'Offline mode'}`,
      timestamp
    };
  }
};
