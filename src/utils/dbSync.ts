import { supabaseClient } from './supabaseClient';
import { FunnelData, FunnelStepData, CanvasState } from '../types/builder';

/**
 * Funnel Engine Supabase Database Synchronization Service
 */

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
          pages (
            id,
            title,
            status,
            canvas_state
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
          stepType: s.step_type || 'OptIn',
          canvasState: s.pages?.[0]?.canvas_state || {}
        }))
      }));
    }
  } catch (err) {
    console.error('Error fetching funnels from Supabase:', err);
  }
  return null;
};

// 2. Save / Update Funnel Canvas State to Supabase
export const savePageCanvasToDb = async (stepId: string, pageTitle: string, canvasState: CanvasState) => {
  try {
    const { data: existingPages } = await supabaseClient
      .from('pages')
      .select('id')
      .eq('step_id', stepId);

    if (existingPages && existingPages.length > 0) {
      // Update existing page record
      const { error } = await supabaseClient
        .from('pages')
        .update({
          canvas_state: canvasState,
          updated_at: new Date().toISOString()
        })
        .eq('step_id', stepId);
      
      if (error) console.warn('Supabase page update warning:', error.message);
    } else {
      // Insert new page record
      const { error } = await supabaseClient
        .from('pages')
        .insert({
          step_id: stepId,
          title: pageTitle,
          status: 'Published',
          canvas_state: canvasState
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
