import { supabaseClient } from './supabaseClient';
import { FunnelData, FunnelStepData, CanvasState } from '../types/builder';

/**
 * Funnel Engine Supabase Database Synchronization Service & SQL Schema
 */

export const FUNNEL_ENGINE_SQL_SCHEMA = `-- =========================================================
-- FUNNELLEGENDS CORE FUNNEL ENGINE SUPABASE SQL SCHEMA (v2.0)
-- Run this in your Supabase SQL Editor to initialize tables
-- =========================================================

-- 1. FUNNELS TABLE
CREATE TABLE IF NOT EXISTS public.funnels (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL DEFAULT 'Sales',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. FUNNEL STEPS TABLE
CREATE TABLE IF NOT EXISTS public.funnel_steps (
  id TEXT PRIMARY KEY,
  funnel_id TEXT REFERENCES public.funnels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  step_order INTEGER NOT NULL DEFAULT 1,
  step_type TEXT NOT NULL DEFAULT 'OptIn',
  status TEXT NOT NULL DEFAULT 'Published',
  ab_split_enabled BOOLEAN DEFAULT false,
  traffic_split_percent INTEGER DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. PAGES & CANVAS STATE TABLE
CREATE TABLE IF NOT EXISTS public.pages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  step_id TEXT REFERENCES public.funnel_steps(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Published',
  canvas_state JSONB NOT NULL DEFAULT '{}'::jsonb,
  variant_b_state JSONB DEFAULT NULL,
  custom_head_code TEXT,
  custom_body_code TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. CONTACTS & LEADS TABLE
CREATE TABLE IF NOT EXISTS public.contacts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  workspace_id TEXT DEFAULT '00000000-0000-0000-0000-000000000000',
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  score INTEGER DEFAULT 10,
  tags JSONB DEFAULT '["OptIn_Lead"]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. CUSTOM BRANDING THEMES TABLE
CREATE TABLE IF NOT EXISTS public.custom_themes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  heading_font TEXT DEFAULT 'Montserrat',
  body_font TEXT DEFAULT 'Open Sans',
  primary_color TEXT DEFAULT '#10b981',
  secondary_color TEXT DEFAULT '#0d9488',
  accent_color TEXT DEFAULT '#f59e0b',
  background_color TEXT DEFAULT '#0f172a',
  text_color TEXT DEFAULT '#f8fafc',
  border_radius_preset TEXT DEFAULT '12px',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_themes ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR PUBLIC & AUTHENTICATED ACCESS
CREATE POLICY "Allow public read on funnels" ON public.funnels FOR SELECT USING (true);
CREATE POLICY "Allow public read on funnel_steps" ON public.funnel_steps FOR SELECT USING (true);
CREATE POLICY "Allow public read on pages" ON public.pages FOR SELECT USING (true);
CREATE POLICY "Allow public read on contacts" ON public.contacts FOR SELECT USING (true);
CREATE POLICY "Allow public read on custom_themes" ON public.custom_themes FOR SELECT USING (true);
`;

// 1. Fetch Funnels from Supabase SQL Database
export const fetchFunnelsFromDb = async (): Promise<FunnelData[] | null> => {
  try {
    const { data: funnelsData, error: funnelsErr } = await supabaseClient
      .from('funnels')
      .select(`
        id,
        name,
        slug,
        type,
        created_at,
        funnel_steps (
          id,
          name,
          slug,
          step_order,
          step_type,
          status,
          ab_split_enabled,
          traffic_split_percent,
          pages (
            id,
            title,
            status,
            canvas_state,
            variant_b_state
          )
        )
      `);

    if (funnelsErr) {
      console.warn('Supabase fetchFunnels warning (using local state fallback):', funnelsErr.message);
      return null;
    }

    if (funnelsData && funnelsData.length > 0) {
      return funnelsData.map((f: any) => ({
        id: f.id,
        name: f.name,
        slug: f.slug,
        type: f.type || 'Sales',
        createdAt: f.created_at || new Date().toISOString(),
        steps: (f.funnel_steps || []).sort((a: any, b: any) => a.step_order - b.step_order).map((s: any) => ({
          id: s.id,
          name: s.name,
          slug: s.slug,
          stepOrder: s.step_order || 1,
          stepType: s.step_type || 'OptIn',
          status: s.status || 'Published',
          abSplitEnabled: s.ab_split_enabled || false,
          trafficSplitPercent: s.traffic_split_percent || 50,
          canvasState: s.pages?.[0]?.canvas_state || {},
          abSplitVariantBState: s.pages?.[0]?.variant_b_state || null
        }))
      }));
    }
  } catch (err) {
    console.error('Error fetching funnels from Supabase:', err);
  }
  return null;
};

// 2. Save / Update Funnel Canvas State to Supabase
export const savePageCanvasToDb = async (stepId: string, pageTitle: string, canvasState: CanvasState, variantBState?: CanvasState | null) => {
  try {
    const { data: existingPages } = await supabaseClient
      .from('pages')
      .select('id')
      .eq('step_id', stepId);

    if (existingPages && existingPages.length > 0) {
      const { error } = await supabaseClient
        .from('pages')
        .update({
          canvas_state: canvasState,
          variant_b_state: variantBState || null,
          updated_at: new Date().toISOString()
        })
        .eq('step_id', stepId);
      
      if (error) console.warn('Supabase page update warning:', error.message);
    } else {
      const { error } = await supabaseClient
        .from('pages')
        .insert({
          step_id: stepId,
          title: pageTitle,
          status: 'Published',
          canvas_state: canvasState,
          variant_b_state: variantBState || null
        });

      if (error) console.warn('Supabase page insert warning:', error.message);
    }
  } catch (err) {
    console.error('Error saving page canvas to Supabase:', err);
  }
};

// 3. Save Lead Contact to Supabase Contact Table
export const saveContactToDb = async (workspaceId: string, email: string, name?: string, phone?: string) => {
  try {
    const { error } = await supabaseClient
      .from('contacts')
      .insert({
        workspace_id: workspaceId || '00000000-0000-0000-0000-000000000000',
        email,
        name: name || '',
        phone: phone || '',
        score: 10,
        tags: ['OptIn_Lead']
      });

    if (error) console.warn('Supabase contact insert warning:', error.message);
  } catch (err) {
    console.error('Error saving contact to Supabase:', err);
  }
};

// 4. Complete Funnel & Steps Sync to Supabase
export const syncFunnelsToSupabase = async (funnels: FunnelData[]): Promise<{ success: boolean; message: string; timestamp: string }> => {
  const timestamp = new Date().toLocaleTimeString();
  try {
    for (const fnl of funnels) {
      // Upsert Funnel
      await supabaseClient.from('funnels').upsert({
        id: fnl.id,
        name: fnl.name,
        slug: fnl.slug,
        type: fnl.type,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

      // Upsert Steps & Pages
      for (const st of fnl.steps) {
        await supabaseClient.from('funnel_steps').upsert({
          id: st.id,
          funnel_id: fnl.id,
          name: st.name,
          slug: st.slug,
          step_order: st.stepOrder,
          step_type: st.stepType,
          status: st.status || 'Published',
          ab_split_enabled: !!st.abSplitEnabled,
          traffic_split_percent: st.trafficSplitPercent || 50,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });

        if (st.canvasState) {
          await savePageCanvasToDb(st.id, st.name, st.canvasState, st.abSplitVariantBState);
        }
      }
    }

    return {
      success: true,
      message: `Successfully synchronized ${funnels.length} funnel workspaces and pages to Supabase Cloud.`,
      timestamp
    };
  } catch (err: any) {
    console.error('Error syncing funnels to Supabase:', err);
    return {
      success: false,
      message: `Sync notice (Persistent local storage active): ${err.message || 'Offline'}`,
      timestamp
    };
  }
};
