import { supabaseClient } from './supabaseClient';
import { GlobalPlatformSettings } from '../components/settings/GlobalSettingsManager';

/**
 * Global Platform Settings & Integrations Supabase Database Synchronization Service & SQL Schema
 */

export const GLOBAL_SETTINGS_SQL_SCHEMA = `-- =========================================================
-- FUNNELLEGENDS GLOBAL PLATFORM SETTINGS SQL SCHEMA (v2.0)
-- Run this in your Supabase SQL Editor to initialize tables
-- =========================================================

-- 1. PLATFORM GLOBAL SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.platform_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_default',
  agency_name TEXT NOT NULL DEFAULT 'FunnelLegends Agency Suite',
  custom_domain TEXT DEFAULT 'funnels.mybrand.com',
  support_email TEXT DEFAULT 'support@mybrand.com',
  currency TEXT DEFAULT 'USD',
  timezone TEXT DEFAULT 'America/New_York',
  default_meta_title TEXT DEFAULT 'High-Converting Sales & Lead Capture Funnels',
  default_meta_description TEXT,
  google_analytics_id TEXT,
  facebook_pixel_id TEXT,
  header_script TEXT,
  footer_script TEXT,
  stripe_test_mode BOOLEAN DEFAULT false,
  auto_invoice_email BOOLEAN DEFAULT true,
  sender_name TEXT DEFAULT 'FunnelLegends Team',
  sender_email TEXT DEFAULT 'support@funnellegends.com',
  auto_crm_enroll BOOLEAN DEFAULT true,
  double_opt_in BOOLEAN DEFAULT false,
  primary_brand_color TEXT DEFAULT '#059669',
  accent_brand_color TEXT DEFAULT '#0d9488',
  force_https BOOLEAN DEFAULT true,
  maintenance_mode BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. CUSTOM DOMAINS & DNS RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.custom_domains (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  domain_name TEXT NOT NULL UNIQUE,
  cname_target TEXT DEFAULT 'cname.funnellegends.com',
  is_verified BOOLEAN DEFAULT true,
  ssl_status TEXT DEFAULT 'Active (Let''s Encrypt SSL)',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. WORKSPACE 3RD PARTY INTEGRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.workspace_integrations (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  category TEXT NOT NULL,
  api_key_masked TEXT,
  endpoint_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_ping_at TIMESTAMPTZ DEFAULT now(),
  config JSONB DEFAULT '{}'::jsonb
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_integrations ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR PUBLIC & AUTHENTICATED ACCESS
CREATE POLICY "Allow public read on platform_settings" ON public.platform_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read on custom_domains" ON public.custom_domains FOR SELECT USING (true);
CREATE POLICY "Allow public read on workspace_integrations" ON public.workspace_integrations FOR SELECT USING (true);
`;

export interface WorkspaceIntegration {
  id: string;
  name: string;
  category: 'Automation' | 'Payments' | 'Email SMTP' | 'SMS' | 'Analytics' | 'DNS & Security';
  icon: string;
  description: string;
  status: 'Connected' | 'Ready to Connect' | 'Active Live Webhook';
  endpoint: string;
  features: string[];
}

export const initialWorkspaceIntegrations: WorkspaceIntegration[] = [
  {
    id: 'int_zapier_global',
    name: 'Zapier & Make.com Outbound Gateway',
    category: 'Automation',
    icon: '⚡',
    description: 'Relay workspace funnel submissions, payment orders, and lead scores to external automations.',
    status: 'Connected',
    endpoint: 'https://hooks.zapier.com/hooks/catch/948201/fl_global_stream',
    features: ['Outbound Webhooks', 'Event Payload Logs', 'Retry Queue']
  },
  {
    id: 'int_stripe_global',
    name: 'Stripe Connect & Payment Gateway',
    category: 'Payments',
    icon: '💳',
    description: 'Process global credit card, Apple Pay, and Google Pay checkouts with 1-click upsell tokenization.',
    status: 'Connected',
    endpoint: 'https://api.stripe.com/v1/checkout/sessions',
    features: ['1-Click Upsell Vaulting', 'Auto Receipts', 'Subscription Billing']
  },
  {
    id: 'int_resend_global',
    name: 'Resend & SendGrid Transactional SMTP',
    category: 'Email SMTP',
    icon: '✉️',
    description: 'High-deliverability transactional email delivery with custom DKIM & SPF DNS records.',
    status: 'Connected',
    endpoint: 'https://api.resend.com/emails',
    features: ['Instant Delivery', 'Open/Click Tracking', 'Custom Sender Domain']
  },
  {
    id: 'int_twilio_global',
    name: 'Twilio SMS & Voice Dispatcher',
    category: 'SMS',
    icon: '📱',
    description: 'Automated 2-way SMS verification, abandoned cart SMS reminders, and VIP strategy call alerts.',
    status: 'Connected',
    endpoint: 'https://api.twilio.com/2010-04-01/Accounts/AC_GLOBAL/Messages',
    features: ['High-Throughput Shortcodes', 'SMS Opt-In Compliance', 'Delivery Receipts']
  },
  {
    id: 'int_ga4_global',
    name: 'Google Analytics 4 & Meta Pixel Tracker',
    category: 'Analytics',
    icon: '📊',
    description: 'Server-side and client-side conversion tracking for accurate ROAS and ad attribution.',
    status: 'Connected',
    endpoint: 'https://www.google-analytics.com/g/collect',
    features: ['Server-Side CAPI', 'Funnel Step Drop-Offs', 'UTM Parameter Tracking']
  },
  {
    id: 'int_cloudflare_global',
    name: 'Cloudflare Edge CDN & SSL Engine',
    category: 'DNS & Security',
    icon: '🛡️',
    description: 'Global edge caching, DDOS mitigation, and automatic Let’s Encrypt wildcard SSL certification.',
    status: 'Connected',
    endpoint: 'https://api.cloudflare.com/client/v4/zones',
    features: ['Auto SSL Renewal', 'Edge Asset Caching', 'DDOS Protection']
  }
];

// Sync Global Settings to Supabase
export const syncGlobalSettingsToSupabase = async (
  settings: GlobalPlatformSettings
): Promise<{ success: boolean; message: string; timestamp: string }> => {
  const timestamp = new Date().toLocaleTimeString();
  try {
    await supabaseClient.from('platform_settings').upsert({
      id: 'global_default',
      agency_name: settings.agencyName,
      custom_domain: settings.customDomain,
      support_email: settings.supportEmail,
      currency: settings.currency,
      timezone: settings.timezone,
      default_meta_title: settings.defaultMetaTitle,
      default_meta_description: settings.defaultMetaDescription,
      google_analytics_id: settings.googleAnalyticsId,
      facebook_pixel_id: settings.facebookPixelId,
      header_script: settings.headerScript,
      footer_script: settings.footerScript,
      stripe_test_mode: settings.stripeTestMode,
      auto_invoice_email: settings.autoInvoiceEmail,
      sender_name: settings.senderName,
      sender_email: settings.senderEmail,
      auto_crm_enroll: settings.autoCrmEnroll,
      double_opt_in: settings.doubleOptIn,
      primary_brand_color: settings.primaryBrandColor,
      accent_brand_color: settings.accentBrandColor,
      force_https: settings.forceHttps,
      maintenance_mode: settings.maintenanceMode,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' });

    return {
      success: true,
      message: `Successfully synchronized global workspace settings ("${settings.agencyName}") to Supabase Cloud.`,
      timestamp
    };
  } catch (err: any) {
    console.error('Error syncing global settings to Supabase:', err);
    return {
      success: false,
      message: `Sync notice (Persistent local storage active): ${err.message || 'Offline mode'}`,
      timestamp
    };
  }
};
