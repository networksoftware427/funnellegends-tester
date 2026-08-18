import { supabaseClient } from './supabaseClient';
import { WorkflowNodeData, WorkflowEdgeData } from '../types/builder';

/**
 * Automations Engine Supabase Database Synchronization Service & SQL Schema
 */

export const AUTOMATION_SQL_SCHEMA = `-- =========================================================
-- FUNNELLEGENDS AUTOMATIONS ENGINE SUPABASE SQL SCHEMA (v2.0)
-- Run this in your Supabase SQL Editor to initialize tables
-- =========================================================

-- 1. AUTOMATION WORKFLOWS TABLE
CREATE TABLE IF NOT EXISTS public.automation_workflows (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  trigger_event TEXT NOT NULL DEFAULT 'form_optin',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. AUTOMATION NODES TABLE
CREATE TABLE IF NOT EXISTS public.automation_nodes (
  id TEXT PRIMARY KEY,
  workflow_id TEXT REFERENCES public.automation_workflows(id) ON DELETE CASCADE,
  node_type TEXT NOT NULL,
  label TEXT NOT NULL,
  subtitle TEXT,
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  position_x INTEGER DEFAULT 0,
  position_y INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. AUTOMATION EDGES / TRANSITIONS TABLE
CREATE TABLE IF NOT EXISTS public.automation_edges (
  id TEXT PRIMARY KEY,
  workflow_id TEXT REFERENCES public.automation_workflows(id) ON DELETE CASCADE,
  source_node_id TEXT NOT NULL,
  target_node_id TEXT NOT NULL,
  condition_rule TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. AUTOMATION EXECUTION LOGS TABLE
CREATE TABLE IF NOT EXISTS public.automation_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  workflow_id TEXT REFERENCES public.automation_workflows(id) ON DELETE CASCADE,
  contact_id TEXT,
  event_name TEXT NOT NULL,
  execution_status TEXT NOT NULL DEFAULT 'completed',
  payload JSONB DEFAULT '{}'::jsonb,
  executed_at TIMESTAMPTZ DEFAULT now()
);

-- 5. AUTOMATION MESSAGE TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS public.automation_templates (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'email_sms',
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  badge TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.automation_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_templates ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR PUBLIC & AUTHENTICATED ACCESS
CREATE POLICY "Allow public read on automation_workflows" ON public.automation_workflows FOR SELECT USING (true);
CREATE POLICY "Allow public read on automation_nodes" ON public.automation_nodes FOR SELECT USING (true);
CREATE POLICY "Allow public read on automation_edges" ON public.automation_edges FOR SELECT USING (true);
CREATE POLICY "Allow public read on automation_logs" ON public.automation_logs FOR SELECT USING (true);
CREATE POLICY "Allow public read on automation_templates" ON public.automation_templates FOR SELECT USING (true);
`;

// Sync Workflows to Supabase
export const syncAutomationsToSupabase = async (
  nodes: WorkflowNodeData[], 
  edges: WorkflowEdgeData[]
): Promise<{ success: boolean; message: string; timestamp: string }> => {
  const timestamp = new Date().toLocaleTimeString();
  try {
    const workflowId = 'wf_master_growthlabs';

    // 1. Upsert Master Workflow
    await supabaseClient.from('automation_workflows').upsert({
      id: workflowId,
      name: 'Master Behavioral Lead & Customer Nurture Engine',
      description: 'End-to-end multi-channel automation from funnel opt-in to VIP onboarding',
      trigger_event: 'form_optin',
      status: 'active',
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' });

    // 2. Upsert Nodes
    for (const node of nodes) {
      await supabaseClient.from('automation_nodes').upsert({
        id: node.id,
        workflow_id: workflowId,
        node_type: node.type,
        label: node.label,
        subtitle: node.subtitle || '',
        config: node.config || {},
        position_x: node.x || 0,
        position_y: node.y || 0
      }, { onConflict: 'id' });
    }

    // 3. Upsert Edges
    for (const edge of edges) {
      await supabaseClient.from('automation_edges').upsert({
        id: edge.id,
        workflow_id: workflowId,
        source_node_id: edge.source,
        target_node_id: edge.target
      }, { onConflict: 'id' });
    }

    return {
      success: true,
      message: `Successfully synced master workflow with ${nodes.length} nodes and ${edges.length} edge connections to Supabase.`,
      timestamp
    };
  } catch (err: any) {
    console.error('Error syncing automations to Supabase:', err);
    return {
      success: false,
      message: `Sync notice (Persistent local storage active): ${err.message || 'Offline mode'}`,
      timestamp
    };
  }
};
