import { supabaseClient } from './supabaseClient';
import { CourseData, ModuleData, LessonData } from '../types/builder';

/**
 * Course & LMS Engine Supabase Database Synchronization Service & SQL Schema
 */

export const COURSE_ENGINE_SQL_SCHEMA = `-- =========================================================
-- FUNNELLEGENDS COURSE & LMS ENGINE SUPABASE SQL SCHEMA (v2.0)
-- Run this in your Supabase SQL Editor to initialize tables
-- =========================================================

-- 1. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'General',
  cover_image TEXT,
  instructor_name TEXT DEFAULT 'FunnelLegends Head Coach',
  price NUMERIC(10, 2) DEFAULT 0.00,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. COURSE MODULES TABLE
CREATE TABLE IF NOT EXISTS public.course_modules (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. COURSE LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.course_lessons (
  id TEXT PRIMARY KEY,
  module_id TEXT REFERENCES public.course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 1,
  drip_days INTEGER DEFAULT 0,
  video_url TEXT,
  duration TEXT DEFAULT '15 mins',
  resources JSONB DEFAULT '[]'::jsonb,
  blocks JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. STUDENT ENROLLMENTS & PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  student_email TEXT NOT NULL,
  student_name TEXT NOT NULL,
  enrollment_date TIMESTAMPTZ DEFAULT now(),
  completed_lessons JSONB DEFAULT '[]'::jsonb,
  progress_percent INTEGER DEFAULT 0,
  is_certified BOOLEAN DEFAULT false,
  certificate_id TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. COURSE CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.course_certificates (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  title TEXT NOT NULL,
  badge_text TEXT,
  seal_icon TEXT DEFAULT '👑',
  accent_color TEXT DEFAULT '#10b981',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_certificates ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR PUBLIC & AUTHENTICATED ACCESS
CREATE POLICY "Allow public read on courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read on course_modules" ON public.course_modules FOR SELECT USING (true);
CREATE POLICY "Allow public read on course_lessons" ON public.course_lessons FOR SELECT USING (true);
CREATE POLICY "Allow public read on course_enrollments" ON public.course_enrollments FOR SELECT USING (true);
CREATE POLICY "Allow public read on course_certificates" ON public.course_certificates FOR SELECT USING (true);
`;

// Sync Course to Supabase
export const syncCourseToSupabase = async (
  course: CourseData
): Promise<{ success: boolean; message: string; timestamp: string }> => {
  const timestamp = new Date().toLocaleTimeString();
  try {
    // 1. Upsert Main Course Record
    await supabaseClient.from('courses').upsert({
      id: course.id,
      title: course.title,
      description: course.description,
      is_published: true,
      updated_at: new Date().toISOString()
    }, { onConflict: 'id' });

    // 2. Upsert Modules & Lessons
    for (const mod of course.modules) {
      await supabaseClient.from('course_modules').upsert({
        id: mod.id,
        course_id: course.id,
        title: mod.title,
        order_index: mod.order
      }, { onConflict: 'id' });

      for (const les of mod.lessons) {
        await supabaseClient.from('course_lessons').upsert({
          id: les.id,
          module_id: mod.id,
          title: les.title,
          order_index: les.order,
          drip_days: les.dripDays || 0,
          video_url: les.videoUrl || '',
          duration: les.duration || '15 mins',
          resources: (les as any).resources || les.documents || [],
          blocks: les.blocks || []
        }, { onConflict: 'id' });
      }
    }

    const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

    return {
      success: true,
      message: `Successfully synchronized course "${course.title}" (${course.modules.length} modules, ${totalLessons} lessons) to Supabase Cloud.`,
      timestamp
    };
  } catch (err: any) {
    console.error('Error syncing course to Supabase:', err);
    return {
      success: false,
      message: `Sync notice (Persistent local storage active): ${err.message || 'Offline mode'}`,
      timestamp
    };
  }
};
