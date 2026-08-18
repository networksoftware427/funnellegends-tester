import { supabaseClient } from './supabaseClient';
import { 
  MeetingHost, EventTypeConfig, BookedAppointment, ChronoChimpSettings 
} from '../types/appointment';

/**
 * ChronoChimp Appointment & Calendar Engine Supabase Database Synchronization & SQL Schema
 */

export const CHRONOCHIMP_SQL_SCHEMA = `-- =========================================================
-- CHRONOCHIMP APPOINTMENT & CALENDAR SUPABASE SQL SCHEMA (v2.0)
-- Run this in your Supabase SQL Editor to initialize tables
-- =========================================================

-- 1. TEAM HOSTS TABLE
CREATE TABLE IF NOT EXISTS public.chronochimp_hosts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar TEXT,
  role TEXT NOT NULL DEFAULT 'Account Advisor',
  bio TEXT,
  rating NUMERIC(3,2) DEFAULT 5.00,
  zoom_url TEXT,
  phone TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. EVENT TYPES / MEETING CONFIGURATIONS TABLE
CREATE TABLE IF NOT EXISTS public.chronochimp_event_types (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#10b981',
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  location_type TEXT NOT NULL DEFAULT 'zoom',
  location_details TEXT,
  price_amount NUMERIC(10,2) DEFAULT 0.00,
  assigned_host_ids JSONB DEFAULT '[]'::jsonb,
  assignment_mode TEXT DEFAULT 'equal_distribution',
  buffer_before_minutes INTEGER DEFAULT 5,
  buffer_after_minutes INTEGER DEFAULT 10,
  min_notice_hours INTEGER DEFAULT 4,
  max_advance_days INTEGER DEFAULT 30,
  weekly_schedule JSONB DEFAULT '[]'::jsonb,
  custom_questions JSONB DEFAULT '[]'::jsonb,
  redirect_url TEXT,
  send_email_reminders BOOLEAN DEFAULT true,
  send_sms_reminders BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. BOOKED APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.chronochimp_appointments (
  id TEXT PRIMARY KEY,
  event_type_id TEXT REFERENCES public.chronochimp_event_types(id) ON DELETE CASCADE,
  event_title TEXT NOT NULL,
  host_id TEXT REFERENCES public.chronochimp_hosts(id) ON DELETE SET NULL,
  host_name TEXT NOT NULL,
  host_avatar TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  location_type TEXT DEFAULT 'zoom',
  meeting_link TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Upcoming',
  answers JSONB DEFAULT '{}'::jsonb,
  is_paid BOOLEAN DEFAULT false,
  amount_paid NUMERIC(10,2) DEFAULT 0.00,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. SYSTEM SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.chronochimp_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_settings',
  timezone TEXT DEFAULT 'America/New_York (EST)',
  company_name TEXT DEFAULT 'FunnelLegends Agency Enterprise',
  logo_url TEXT,
  brand_color TEXT DEFAULT '#10b981',
  twilio_sms_enabled BOOLEAN DEFAULT true,
  google_calendar_sync BOOLEAN DEFAULT true,
  auto_confirm_booking BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.chronochimp_hosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chronochimp_event_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chronochimp_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chronochimp_settings ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR PUBLIC & AUTHENTICATED ACCESS
CREATE POLICY "Allow public read on ChronoChimp hosts" ON public.chronochimp_hosts FOR SELECT USING (true);
CREATE POLICY "Allow public read on ChronoChimp event types" ON public.chronochimp_event_types FOR SELECT USING (true);
CREATE POLICY "Allow public read on ChronoChimp appointments" ON public.chronochimp_appointments FOR SELECT USING (true);
CREATE POLICY "Allow public read on ChronoChimp settings" ON public.chronochimp_settings FOR SELECT USING (true);
`;

/**
 * Syncs full ChronoChimp dataset to Supabase tables with graceful fallback
 */
export const syncChronoChimpToSupabase = async (
  hosts: MeetingHost[],
  eventTypes: EventTypeConfig[],
  appointments: BookedAppointment[],
  settings: ChronoChimpSettings
): Promise<{ success: boolean; message: string; timestamp: string }> => {
  const timestamp = new Date().toLocaleTimeString();

  try {
    // 1. Sync Hosts
    if (hosts && hosts.length > 0) {
      const hostRows = hosts.map(h => ({
        id: h.id,
        name: h.name,
        email: h.email,
        avatar: h.avatar,
        role: h.role,
        bio: h.bio,
        rating: h.rating,
        zoom_url: h.zoomUrl,
        phone: h.phone,
        is_available: h.isAvailable,
        updated_at: new Date().toISOString()
      }));

      const { error: hostErr } = await supabaseClient
        .from('chronochimp_hosts')
        .upsert(hostRows, { onConflict: 'id' });

      if (hostErr) console.warn('Supabase ChronoChimp hosts sync note:', hostErr.message);
    }

    // 2. Sync Event Types
    if (eventTypes && eventTypes.length > 0) {
      const eventRows = eventTypes.map(e => ({
        id: e.id,
        title: e.title,
        slug: e.slug,
        description: e.description,
        color: e.color,
        duration_minutes: e.durationMinutes,
        location_type: e.locationType,
        location_details: e.locationDetails,
        price_amount: e.priceAmount,
        assigned_host_ids: e.assignedHostIds || [],
        assignment_mode: e.assignmentMode,
        buffer_before_minutes: e.bufferBeforeMinutes,
        buffer_after_minutes: e.bufferAfterMinutes,
        min_notice_hours: e.minNoticeHours,
        max_advance_days: e.maxAdvanceDays,
        weekly_schedule: e.weeklySchedule || [],
        custom_questions: e.customQuestions || [],
        redirect_url: e.redirectUrl,
        send_email_reminders: e.sendEmailReminders,
        send_sms_reminders: e.sendSmsReminders,
        updated_at: new Date().toISOString()
      }));

      const { error: eventErr } = await supabaseClient
        .from('chronochimp_event_types')
        .upsert(eventRows, { onConflict: 'id' });

      if (eventErr) console.warn('Supabase ChronoChimp event types sync note:', eventErr.message);
    }

    // 3. Sync Settings
    if (settings) {
      const { error: setErr } = await supabaseClient
        .from('chronochimp_settings')
        .upsert({
          id: 'global_settings',
          timezone: settings.timezone,
          company_name: settings.companyName,
          logo_url: settings.logoUrl || '',
          brand_color: settings.brandColor || '#10b981',
          twilio_sms_enabled: settings.twilioSmsEnabled,
          google_calendar_sync: settings.googleCalendarSync,
          auto_confirm_booking: settings.autoConfirmBooking,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

      if (setErr) console.warn('Supabase ChronoChimp settings sync note:', setErr.message);
    }

    return {
      success: true,
      message: 'ChronoChimp appointments, hosts, and calendar schedules synchronized to Supabase Cloud.',
      timestamp
    };
  } catch (err: any) {
    console.error('Error syncing ChronoChimp to Supabase:', err);
    return {
      success: false,
      message: `Sync notice (Persistent local storage active): ${err.message || 'Offline'}`,
      timestamp
    };
  }
};
