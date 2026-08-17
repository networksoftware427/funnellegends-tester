import React, { useState, useEffect } from 'react';
import { CourseData, ModuleData, LessonData } from '../../types/builder';
import { loadStoredCourse, saveStoredCourse } from '../../utils/storage';
import { 
  GraduationCap, Plus, Clock, Play, CheckCircle, Lock, BookOpen, Layers, 
  UserCheck, ShieldCheck, ChevronRight, Edit3, Trash2, Video, Check,
  Award, Sparkles, Download, Eye, FileText, Star, Calendar, RefreshCw,
  Image as ImageIcon, Volume2, HelpCircle, Type, List, AlertCircle, CheckSquare
} from 'lucide-react';
import { CertificateBuilder } from './CertificateBuilder';
import { CustomCertificateRenderer } from './CustomCertificateRenderer';
import { CustomBuiltCertificate } from '../../types/certificate';

export interface CourseTemplate {
  id: string;
  name: string;
  category: string;
  styleTag: string;
  description: string;
  coverImage: string;
  accentColor: string;
  bgColor: string;
  badge: string;
  teachingStyle: string;
  modulesCount: number;
  totalLessons: number;
}

export const courseTemplates: CourseTemplate[] = [
  {
    id: 'tmpl_mastermind',
    name: 'High-Ticket Executive Mastermind',
    category: 'Business & Coaching',
    styleTag: 'Dark Luxury Gold',
    description: 'Sleek dark obsidian layout tailored for high-ticket $5k+ mastermind programs with VIP coaching calls.',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
    accentColor: '#d97706',
    bgColor: '#090d16',
    badge: '👑 VIP MASTERMIND',
    teachingStyle: 'High-Touch Video + VIP Strategy Calls',
    modulesCount: 6,
    totalLessons: 24
  },
  {
    id: 'tmpl_tech_bootcamp',
    name: 'Full-Stack Developer Tech Bootcamp',
    category: 'Software & Code',
    styleTag: 'Cyber Neon Terminal',
    description: 'Futuristic terminal-inspired dashboard with interactive code snippets, Github project repos, and milestone badges.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    accentColor: '#8b5cf6',
    bgColor: '#030712',
    badge: '⚡ TECH BOOTCAMP',
    teachingStyle: 'Code-Along Exercises + Repo Clones',
    modulesCount: 8,
    totalLessons: 40
  },
  {
    id: 'tmpl_executive_mba',
    name: 'Strategic Executive MBA',
    category: 'Corporate & Strategy',
    styleTag: 'Editorial Serif Minimal',
    description: 'Clean monochrome editorial layout for corporate training, leadership certifications, and strategic case studies.',
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    accentColor: '#4f46e5',
    bgColor: '#0f172a',
    badge: '🎓 EXECUTIVE DIPLOMA',
    teachingStyle: 'Case Studies + Executive PDF Downloads',
    modulesCount: 5,
    totalLessons: 20
  },
  {
    id: 'tmpl_creative_studio',
    name: 'Creative Design & Figma Academy',
    category: 'Design & Visual Arts',
    styleTag: 'Vibrant Glassmorphism Studio',
    description: 'Visual grid showcase with Figma file attachments, color palette breakdown cards, and visual assignment submissions.',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80',
    accentColor: '#ec4899',
    bgColor: '#111827',
    badge: '🎨 CREATIVE STUDIO',
    teachingStyle: 'Visual Walkthroughs + Figma Assets',
    modulesCount: 6,
    totalLessons: 30
  },
  {
    id: 'tmpl_fitness_beast',
    name: 'High-Performance Athletic Fitness',
    category: 'Health & Fitness',
    styleTag: 'Bold High-Contrast Energetic',
    description: 'High-contrast energetic layout featuring workout timer widgets, nutritional PDF downloads, and daily streak logs.',
    coverImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    accentColor: '#dc2626',
    bgColor: '#0b0f19',
    badge: '🔥 90-DAY TRANSFORMATION',
    teachingStyle: 'Daily Workout VSLs + Macro Trackers',
    modulesCount: 12,
    totalLessons: 60
  },
  {
    id: 'tmpl_mindfulness_wellness',
    name: 'Holistic Mindfulness & Wellness',
    category: 'Lifestyle & Wellness',
    styleTag: 'Serene Glass Pastel',
    description: 'Calming glassmorphic card design with embedded audio meditation player, reflective journaling prompts, and peaceful gradients.',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    accentColor: '#059669',
    bgColor: '#064e3b',
    badge: '🌿 ZEN RETREAT',
    teachingStyle: 'Guided Audio Meditations + Daily Journals',
    modulesCount: 4,
    totalLessons: 16
  },
  {
    id: 'tmpl_crypto_trader',
    name: 'Crypto & Algorithmic Trading Lab',
    category: 'Finance & Crypto',
    styleTag: 'Wall Street Dark Matrix',
    description: 'Data-dense financial layout with live candlestick charts, risk calculator widgets, and trade entry teardowns.',
    coverImage: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop&q=80',
    accentColor: '#10b981',
    bgColor: '#022c22',
    badge: '📈 TRADING MASTERY',
    teachingStyle: 'Live Chart Teardowns + Risk Calculators',
    modulesCount: 7,
    totalLessons: 35
  },
  {
    id: 'tmpl_podcast_creator',
    name: 'Podcast & Youtube Creator Growth',
    category: 'Media & Production',
    styleTag: 'Broadcast Studio Player',
    description: 'Media-first layout with built-in audio visualizer, YouTube VSL breakdown tools, and guest interview breakdown templates.',
    coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
    accentColor: '#0284c7',
    bgColor: '#0c4a6e',
    badge: '🎙️ MEDIA BROADCAST',
    teachingStyle: 'Video Teardowns + Equipment Checklists',
    modulesCount: 5,
    totalLessons: 25
  },
  {
    id: 'tmpl_culinary_masterclass',
    name: 'Gourmet Culinary Arts Masterclass',
    category: 'Food & Culinary',
    styleTag: 'Warm Luxury Magazine',
    description: 'Gourmet recipe magazine layout with step-by-step ingredient checklists, plating guides, and chef video breakdowns.',
    coverImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80',
    accentColor: '#ea580c',
    bgColor: '#431407',
    badge: '🍳 GOURMET CHEF',
    teachingStyle: 'Chef Video Lessons + Printable Recipe Cards',
    modulesCount: 8,
    totalLessons: 32
  },
  {
    id: 'tmpl_7day_sprint',
    name: '7-Day Rapid Funnel Sprint Challenge',
    category: 'Marketing & Sprint',
    styleTag: 'Gamified Sprint Leaderboard',
    description: 'Fast-paced daily countdown challenge layout with 24-hour drip unlocks, streak badges, and community leaderboard.',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    accentColor: '#7c3aed',
    bgColor: '#2e1065',
    badge: '⚡ 7-DAY SPRINT',
    teachingStyle: 'Daily 24-Hour Drip Unlocks + Homework Tasks',
    modulesCount: 7,
    totalLessons: 14
  }
];

export interface CertificateTemplate {
  id: string;
  title: string;
  styleTag: string;
  borderStyle: string;
  sealIcon: string;
  accentColor: string;
  bgGradient: string;
  badgeText: string;
  fontFamily: string;
  description: string;
}

export const certificateTemplates: CertificateTemplate[] = [
  {
    id: 'cert_royal_gold',
    title: 'Royal Gold Crest Honor Certificate',
    styleTag: 'Classic Gold Ornate',
    borderStyle: 'border-4 border-amber-500/80 ring-8 ring-amber-500/20',
    sealIcon: '👑',
    accentColor: '#d97706',
    bgGradient: 'from-slate-950 via-slate-900 to-amber-950/60',
    badgeText: 'OFFICIAL CERTIFICATE OF DISTINCTION',
    fontFamily: 'Playfair Display',
    description: 'Classic gold foil ornate border with embossed royal crest and calligraphic serif headers.'
  },
  {
    id: 'cert_cyber_tech',
    title: 'Cyber Modern Tech Certification',
    styleTag: 'Futuristic Hologram',
    borderStyle: 'border-2 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.4)]',
    sealIcon: '⚡',
    accentColor: '#06b6d4',
    bgGradient: 'from-slate-950 via-cyan-950/50 to-slate-900',
    badgeText: 'VERIFIED HIGH-TECH CREDENTIAL',
    fontFamily: 'Plus Jakarta Sans',
    description: 'Holographic cyan border with QR verification code and futuristic terminal badge.'
  },
  {
    id: 'cert_executive_monochrome',
    title: 'Executive Platinum Diploma',
    styleTag: 'Monochrome Executive',
    borderStyle: 'border-2 border-slate-400 p-2 shadow-2xl',
    sealIcon: '💎',
    accentColor: '#94a3b8',
    bgGradient: 'from-slate-950 via-slate-900 to-slate-950',
    badgeText: 'EXECUTIVE DIPLOMA OF MASTERY',
    fontFamily: 'Montserrat',
    description: 'Sleek executive platinum layout with embossed ribbon seal and minimalist typography.'
  },
  {
    id: 'cert_artisan_floral',
    title: 'Artisan Botanical Craft Certificate',
    styleTag: 'Handcrafted Watercolor',
    borderStyle: 'border-2 border-rose-400/60 rounded-3xl p-3',
    sealIcon: '🎨',
    accentColor: '#f43f5e',
    bgGradient: 'from-slate-950 via-rose-950/40 to-slate-900',
    badgeText: 'ARTISAN ACADEMY CREDENTIAL',
    fontFamily: 'Outfit',
    description: 'Handcrafted floral frame with handwritten script header and gold leaf wax seal.'
  },
  {
    id: 'cert_diamond_obsidian',
    title: 'Diamond Mastermind Honors Award',
    styleTag: 'Obsidian Diamond Luxury',
    borderStyle: 'border-2 border-amber-400/90 shadow-[0_0_40px_rgba(245,158,11,0.3)]',
    sealIcon: '🏆',
    accentColor: '#f59e0b',
    bgGradient: 'from-slate-950 via-amber-950/80 to-slate-950',
    badgeText: 'DIAMOND MASTERMIND FELLOW',
    fontFamily: 'Playfair Display',
    description: 'Dark obsidian card frame with metallic gold diamond badge and VIP mastermind honor seal.'
  },
  {
    id: 'cert_eco_emerald',
    title: 'Eco Emerald Sustainability Certificate',
    styleTag: 'Botanical Leaf Emerald',
    borderStyle: 'border-4 border-emerald-500/70 rounded-2xl',
    sealIcon: '🌿',
    accentColor: '#10b981',
    bgGradient: 'from-slate-950 via-emerald-950/60 to-slate-900',
    badgeText: 'CERTIFIED SUSTAINABILITY SPECIALIST',
    fontFamily: 'Work Sans',
    description: 'Leaf ornament border frame with emerald green wax stamp and eco certification badge.'
  },
  {
    id: 'cert_apex_sprint',
    title: 'Apex High-Performance Sprint Badge',
    styleTag: 'High-Voltage Diagonal Stripe',
    borderStyle: 'border-4 border-rose-500/80 transform skew-x-[-1deg]',
    sealIcon: '🔥',
    accentColor: '#f43f5e',
    bgGradient: 'from-slate-950 via-rose-950/80 to-slate-900',
    badgeText: 'APEX SPRINT CHAMPION CERTIFICATE',
    fontFamily: 'Oswald',
    description: 'Bold diagonal race stripe frame with speed medallion seal and high-voltage sprint header.'
  },
  {
    id: 'cert_vintage_parchment',
    title: 'Vintage Heritage Guild Parchment',
    styleTag: 'Aged Parchment Wax Stamp',
    borderStyle: 'border-8 border-amber-900/60 p-4',
    sealIcon: '📜',
    accentColor: '#b45309',
    bgGradient: 'from-amber-950/90 via-slate-950 to-amber-950/80',
    badgeText: 'GUILD MASTER DIPLOMA OF EXCELLENCE',
    fontFamily: 'Playfair Display',
    description: 'Traditional aged parchment texture frame with wax stamp seal and gothic heritage header.'
  },
  {
    id: 'cert_nordic_minimal',
    title: 'Nordic Scandinavian Minimalist Award',
    styleTag: 'Geometric Scandinavian',
    borderStyle: 'border border-slate-700 p-6',
    sealIcon: '❄️',
    accentColor: '#38bdf8',
    bgGradient: 'from-slate-950 via-sky-950/40 to-slate-900',
    badgeText: 'SCANDINAVIAN ACADEMY CERTIFICATE',
    fontFamily: 'Inter',
    description: 'Clean Scandinavian geometric layout with subtle pastel accent lines and modern typography.'
  },
  {
    id: 'cert_crimson_prestige',
    title: 'Crimson Prestige Star Medallion Award',
    styleTag: 'Vibrant Satin Medallion',
    borderStyle: 'border-4 border-red-600/90 ring-4 ring-amber-400/40',
    sealIcon: '⭐',
    accentColor: '#dc2626',
    bgGradient: 'from-slate-950 via-red-950/70 to-slate-900',
    badgeText: 'PRESTIGE FELLOWSHIP AWARD',
    fontFamily: 'Montserrat',
    description: 'Vibrant crimson satin border with gold star medallion seal and premium fellowship award.'
  }
];

interface CertificateFrameRendererProps {
  template: CertificateTemplate;
  studentName: string;
  courseTitle: string;
}

export const CertificateFrameRenderer: React.FC<CertificateFrameRendererProps> = ({
  template,
  studentName,
  courseTitle
}) => {
  const issueDate = new Date().toISOString().split('T')[0];
  const displayName = studentName || 'Sarah Connor';

  switch (template.id) {
    // LAYOUT 1: Classic Imperial Gold Crest (Dual Pillars & Ornate Double Gold Foil Border)
    case 'cert_royal_gold':
      return (
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/60 border-4 border-amber-500/80 ring-8 ring-amber-500/20 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-3 left-3 text-amber-500 text-lg font-serif">❖</div>
          <div className="absolute top-3 right-3 text-amber-500 text-lg font-serif">❖</div>
          <div className="absolute bottom-3 left-3 text-amber-500 text-lg font-serif">❖</div>
          <div className="absolute bottom-3 right-3 text-amber-500 text-lg font-serif">❖</div>

          <div className="space-y-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 mx-auto flex items-center justify-center text-slate-950 text-2xl font-black shadow-lg shadow-amber-500/40">
              👑
            </div>
            <div className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-amber-400">OFFICIAL CERTIFICATE OF DISTINCTION</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide font-serif">
              ROYAL DIPLOMA OF EXCELLENCE
            </h2>
          </div>

          <div className="py-2 border-y border-amber-500/30 max-w-lg mx-auto space-y-1">
            <p className="text-xs text-slate-300 italic">This Imperial Distinction is hereby conferred upon</p>
            <h3 className="text-2xl sm:text-4xl font-black text-amber-300 tracking-wider">
              {displayName}
            </h3>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            For outstanding mastery, honorable dedication, and successful completion of all curriculum modules for <strong>{courseTitle}</strong>.
          </p>

          <div className="flex items-center justify-between border-t border-amber-500/40 pt-6 text-[10px] font-mono text-slate-400 max-w-md mx-auto">
            <div className="text-left">
              <div className="text-white font-bold">{issueDate}</div>
              <div>DATE OF CONFERRAL</div>
            </div>
            <div className="w-14 h-14 rounded-full border-2 border-amber-400 bg-amber-950/80 flex flex-col items-center justify-center text-[9px] font-bold text-amber-300 shadow-xl">
              <span>ROYAL</span>
              <span>SEAL</span>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">CERT-2026-X948</div>
              <div>REGISTRY ID</div>
            </div>
          </div>
        </div>
      );

    // LAYOUT 2: Cyber Modern Tech (2-Column Horizontal Split-Screen with Live QR Block)
    case 'cert_cyber_tech':
      return (
        <div className="rounded-3xl bg-slate-950 border-2 border-cyan-500/80 shadow-[0_0_40px_rgba(6,182,212,0.3)] grid grid-cols-1 md:grid-cols-3 overflow-hidden text-left">
          {/* Left Column: Dark Cyan Tech Sidebar with QR Block */}
          <div className="p-6 bg-slate-900/90 border-r border-cyan-500/40 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>CYBER VERIFIED CREDENTIAL</span>
              </div>
              <div className="text-3xl">⚡</div>
              <h4 className="text-sm font-extrabold text-white font-mono uppercase">HIGH-TECH DIPLOMA</h4>
            </div>

            {/* Simulated Holographic QR Box */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-cyan-500/50 space-y-2 text-center">
              <div className="w-20 h-20 mx-auto bg-cyan-950/60 rounded-xl border border-cyan-400/50 p-2 flex flex-col items-center justify-center space-y-1">
                <div className="grid grid-cols-3 gap-1 w-full h-full opacity-80">
                  <div className="bg-cyan-400 rounded-sm"></div>
                  <div className="bg-slate-950 rounded-sm"></div>
                  <div className="bg-cyan-400 rounded-sm"></div>
                  <div className="bg-slate-950 rounded-sm"></div>
                  <div className="bg-cyan-400 rounded-sm"></div>
                  <div className="bg-cyan-400 rounded-sm"></div>
                  <div className="bg-cyan-400 rounded-sm"></div>
                  <div className="bg-cyan-400 rounded-sm"></div>
                  <div className="bg-slate-950 rounded-sm"></div>
                </div>
              </div>
              <div className="text-[9px] font-mono text-cyan-300 font-bold">SCAN QR TO VERIFY</div>
              <div className="text-[8px] font-mono text-slate-500">ID: CERT-2026-X948</div>
            </div>

            <div className="text-[10px] font-mono text-slate-400 space-y-1">
              <div>ISSUED: {issueDate}</div>
              <div>BLOCK: #8492049</div>
            </div>
          </div>

          {/* Right Column: Main Tech Certificate Body */}
          <div className="md:col-span-2 p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-slate-950 via-cyan-950/40 to-slate-900">
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase bg-cyan-950 px-2.5 py-1 rounded border border-cyan-800">
                FULL-STACK DEVELOPER ACCREDITATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-mono mt-3">
                CERTIFICATE OF MASTERY
              </h2>
            </div>

            <div className="space-y-1 border-l-2 border-cyan-400 pl-4">
              <span className="text-xs text-slate-400">Awarded to Software Engineer:</span>
              <h3 className="text-2xl font-black text-cyan-300 font-mono">{displayName}</h3>
            </div>

            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              Has completed 100% of code repositories, API architecture builds, and production deployments for <strong>{courseTitle}</strong>.
            </p>

            <div className="pt-4 border-t border-cyan-500/30 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div>SIGNATURE: <em>Apex Tech Board</em></div>
              <div className="text-cyan-400 font-bold">STATUS: VERIFIED ON-CHAIN</div>
            </div>
          </div>
        </div>
      );

    // LAYOUT 3: Executive Platinum Diploma (Corporate Minimalist Plaque with Horizontal Header)
    case 'cert_executive_monochrome':
      return (
        <div className="rounded-3xl bg-slate-950 border-2 border-slate-700 shadow-2xl overflow-hidden text-left">
          <div className="bg-slate-900 border-b border-slate-800 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 text-xl font-bold">
                💎
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white uppercase tracking-wider font-sans">EXECUTIVE DIPLOMA OF MASTERY</h4>
                <span className="text-[10px] font-mono text-slate-400">ACADEMIC MASTERY SERIES</span>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700 font-bold">
              PLATINUM GRADE
            </span>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-medium">This Executive Certification verifies that</p>
              <h3 className="text-3xl font-black text-white tracking-wide font-sans">{displayName}</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed border-l-4 border-slate-500 pl-4 py-1">
              Has demonstrated executive-level strategic leadership, financial modeling, and operational excellence in <strong>{courseTitle}</strong>.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800 text-[10px] font-mono text-slate-400">
              <div>
                <div className="text-slate-200 font-bold">BOARD OF DIRECTORS</div>
                <div>EXECUTIVE CERTIFICATION COMMITTEE</div>
              </div>
              <div className="text-right">
                <div className="text-slate-200 font-bold">{issueDate}</div>
                <div>ID: CERT-2026-X948</div>
              </div>
            </div>
          </div>
        </div>
      );

    // LAYOUT 4: Artisan Botanical Craft (Handcrafted Rose Garden Card with Corner Leaf Ornaments)
    case 'cert_artisan_floral':
      return (
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-rose-950/40 to-slate-900 border-2 border-rose-400/60 text-center space-y-6 shadow-2xl relative">
          <div className="absolute top-4 left-4 text-rose-300 text-xl">🌸</div>
          <div className="absolute top-4 right-4 text-rose-300 text-xl">🌸</div>
          <div className="absolute bottom-4 left-4 text-rose-300 text-xl">🌸</div>
          <div className="absolute bottom-4 right-4 text-rose-300 text-xl">🌸</div>

          <div className="space-y-1">
            <span className="text-3xl">🎨</span>
            <div className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold">HANDCRAFTED ARTISAN ACADEMY</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif italic">
              Artisan Certificate of Completion
            </h2>
          </div>

          <div className="bg-rose-950/30 border border-rose-500/30 rounded-2xl p-4 max-w-lg mx-auto space-y-1">
            <p className="text-xs text-rose-200 italic">With artistic distinction, presented to</p>
            <h3 className="text-3xl font-black text-rose-300 underline decoration-rose-400/60 underline-offset-4">
              {displayName}
            </h3>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            For completing all studio workshops, design portfolio reviews, and creative masterclasses in <strong>{courseTitle}</strong>.
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-rose-500/30 text-[10px] font-mono text-rose-300/80 max-w-md mx-auto">
            <div>DATE: {issueDate}</div>
            <div className="w-12 h-12 rounded-full bg-rose-900/80 border border-rose-400 flex items-center justify-center text-rose-200 font-bold shadow-lg">
              SEAL
            </div>
            <div>VERIFIED: CERT-2026-X948</div>
          </div>
        </div>
      );

    // LAYOUT 5: Diamond Mastermind Honors Award (Luxury Centered Diamond Crest Frame)
    case 'cert_diamond_obsidian':
      return (
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border-2 border-amber-400/90 shadow-[0_0_50px_rgba(245,158,11,0.3)] text-center space-y-6 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 mx-auto flex items-center justify-center text-slate-950 text-3xl font-black shadow-xl shadow-amber-500/50">
            🏆
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-widest bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
              DIAMOND MASTERMIND FELLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-serif tracking-wide pt-2">
              HONORS DIPLOMA OF ACHIEVEMENT
            </h2>
          </div>

          <div className="space-y-1 py-2">
            <p className="text-xs text-slate-400 italic">This VIP honor is awarded to Mastermind Leader</p>
            <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
              {displayName}
            </h3>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            For scaling high-ticket offers, mastering 1-on-1 strategy calls, and completing <strong>{courseTitle}</strong>.
          </p>

          <div className="flex items-center justify-between border-t border-amber-500/40 pt-6 text-[10px] font-mono text-amber-400 max-w-md mx-auto">
            <div>DATE: {issueDate}</div>
            <div className="font-bold text-slate-200">DIAMOND FELLOWSHIP BOARD</div>
            <div>ID: CERT-2026-X948</div>
          </div>
        </div>
      );

    // LAYOUT 6: Eco Emerald Sustainability (Asymmetric Left Vertical Emerald Sidebar)
    case 'cert_eco_emerald':
      return (
        <div className="rounded-3xl bg-slate-950 border-4 border-emerald-500/70 grid grid-cols-1 md:grid-cols-4 overflow-hidden text-left shadow-2xl">
          <div className="p-6 bg-emerald-950 border-r border-emerald-500/40 flex flex-col justify-between text-center space-y-6">
            <div className="text-4xl">🌿</div>
            <div className="text-[10px] font-mono font-bold uppercase text-emerald-300 tracking-widest [writing-mode:vertical-lr] rotate-180 mx-auto hidden md:block">
              VERIFIED ECO-SUSTAINABILITY ACCREDITATION
            </div>
            <div className="w-12 h-12 rounded-full border border-emerald-400 mx-auto flex items-center justify-center text-emerald-300 font-bold bg-emerald-900/60">
              ECO
            </div>
          </div>

          <div className="md:col-span-3 p-8 space-y-6 bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-900">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-emerald-900 text-emerald-200 border border-emerald-700">
                CERTIFIED SUSTAINABILITY SPECIALIST
              </span>
              <h2 className="text-2xl font-black text-white mt-2 font-sans">
                ENVIRONMENTAL FELLOWSHIP DIPLOMA
              </h2>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-400">Awarded to Eco Ambassador:</p>
              <h3 className="text-3xl font-extrabold text-emerald-300">{displayName}</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              For completing all holistic wellness modules, sustainability frameworks, and environmental audits for <strong>{courseTitle}</strong>.
            </p>

            <div className="pt-4 border-t border-emerald-500/30 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div>ISSUED: {issueDate}</div>
              <div className="text-emerald-400 font-bold">VERIFICATION ID: CERT-2026-X948</div>
            </div>
          </div>
        </div>
      );

    // LAYOUT 7: Apex High-Performance Sprint (High-Voltage Skewed Racing Badge Layout)
    case 'cert_apex_sprint':
      return (
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-rose-950/80 to-slate-900 border-4 border-rose-500/80 text-center space-y-5 shadow-2xl relative overflow-hidden transform -skew-x-1">
          <div className="bg-rose-600 text-white font-black text-xs font-mono uppercase tracking-widest py-1 px-6 rounded-full inline-block shadow-lg shadow-rose-600/50">
            ⚡ APEX SPRINT CHAMPION CERTIFICATE ⚡
          </div>

          <div className="space-y-1">
            <span className="text-3xl">🔥</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter font-mono">
              HIGH-PERFORMANCE AWARD
            </h2>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-rose-500/50 max-w-md mx-auto space-y-1">
            <p className="text-xs text-rose-300 font-mono">CHAMPION ATHLETE:</p>
            <h3 className="text-3xl font-black text-amber-400 uppercase tracking-wide">{displayName}</h3>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto font-mono">
            Finished 100% of high-intensity athletic routines and transformation sprints for <strong>{courseTitle}</strong>.
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-rose-500/40 text-[10px] font-mono text-rose-400 font-bold max-w-md mx-auto">
            <div>DATE: {issueDate}</div>
            <div>RECORD: 100% COMPLETED</div>
            <div>ID: CERT-2026-X948</div>
          </div>
        </div>
      );

    // LAYOUT 8: Vintage Heritage Guild Parchment (Aged Guild Scroll Parchment with Wax Stamp)
    case 'cert_vintage_parchment':
      return (
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-950/90 via-slate-950 to-amber-950/80 border-8 border-amber-900/80 text-center space-y-6 shadow-2xl relative font-serif">
          <div className="absolute top-2 left-2 text-amber-600 text-xl">╔</div>
          <div className="absolute top-2 right-2 text-amber-600 text-xl">╗</div>
          <div className="absolute bottom-2 left-2 text-amber-600 text-xl">╚</div>
          <div className="absolute bottom-2 right-2 text-amber-600 text-xl">╝</div>

          <div className="space-y-1">
            <span className="text-3xl">📜</span>
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">GUILD MASTER DIPLOMA OF EXCELLENCE</div>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-200 tracking-wide">
              HERITAGE GUILD CERTIFICATE
            </h2>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-300 italic">Know all scholars by these presents that</p>
            <h3 className="text-3xl font-black text-amber-400 underline decoration-amber-600 underline-offset-8">
              {displayName}
            </h3>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Hath fulfilled all ancient traditions, guild apprenticeships, and rigorous evaluations for <strong>{courseTitle}</strong>.
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-amber-800/80 text-[10px] font-mono text-amber-300 max-w-md mx-auto">
            <div className="text-left">
              <div>ANNO DOMINI {issueDate}</div>
              <div>DATE OF SEAL</div>
            </div>
            <div className="w-14 h-14 rounded-full bg-red-950 border-2 border-red-500 text-red-300 font-bold flex items-center justify-center text-[9px] shadow-xl">
              WAX SEAL
            </div>
            <div className="text-right">
              <div>REGISTRY: CERT-2026-X948</div>
              <div>GUILD APPROVED</div>
            </div>
          </div>
        </div>
      );

    // LAYOUT 9: Nordic Minimalist Award (Scandinavian Ultra-Clean Asymmetric Grid)
    case 'cert_nordic_minimal':
      return (
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-sky-950/40 to-slate-900 border border-slate-700 text-left space-y-6 shadow-xl relative font-sans">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest block">SCANDINAVIAN ACADEMY</span>
              <h2 className="text-2xl font-light text-white tracking-wider">CERTIFICATE OF COMPLETION</h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-300 text-xl">
              ❄️
            </div>
          </div>

          <div className="border-l-2 border-sky-400 pl-6 space-y-1 py-2">
            <span className="text-xs text-slate-400">Awarded to Candidate:</span>
            <h3 className="text-3xl font-extrabold text-white tracking-tight">{displayName}</h3>
          </div>

          <p className="text-xs text-slate-300 max-w-lg leading-relaxed font-light">
            In recognition of successful participation and comprehensive mastery of course requirements for <strong>{courseTitle}</strong>.
          </p>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div>ISSUED: {issueDate}</div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-sky-300 font-bold shadow">
              FROST SEAL VERIFIED: CERT-2026-X948
            </div>
          </div>
        </div>
      );

    // LAYOUT 10: Crimson Prestige Star Medallion (Vertical Dropping Ribbon & Satin Medallion)
    case 'cert_crimson_prestige':
    default:
      return (
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-red-950/70 to-slate-900 border-4 border-red-600/90 ring-4 ring-amber-400/40 text-center space-y-6 shadow-2xl relative">
          <div className="w-12 h-14 bg-gradient-to-b from-amber-400 to-amber-600 mx-auto -mt-12 flex items-end justify-center pb-2 rounded-b-xl shadow-xl border-x border-b border-amber-300">
            <span className="text-xl">⭐</span>
          </div>

          <div className="space-y-1 pt-2">
            <div className="text-[10px] font-mono uppercase font-black text-amber-300 tracking-widest">PRESTIGE FELLOWSHIP AWARD</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide font-sans">
              PRESTIGE CERTIFICATE OF HONOR
            </h2>
          </div>

          <div className="bg-slate-950/80 border border-red-500/40 rounded-2xl p-4 max-w-lg mx-auto space-y-1">
            <p className="text-xs text-slate-300 italic">With high distinction, awarded to Fellow</p>
            <h3 className="text-3xl font-black text-amber-400 tracking-wide">{displayName}</h3>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            For demonstrating top-tier excellence, fellowship contributions, and completion of <strong>{courseTitle}</strong>.
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-red-500/40 text-[10px] font-mono text-slate-300 max-w-md mx-auto">
            <div>DATE: {issueDate}</div>
            <div className="w-12 h-12 rounded-full border-2 border-amber-400 bg-red-950 flex items-center justify-center text-amber-300 font-bold shadow-xl">
              ⭐ FELLOW
            </div>
            <div>VERIFICATION: CERT-2026-X948</div>
          </div>
        </div>
      );
  }
};

export const getModulesForTemplate = (templateId: string): ModuleData[] => {
  switch (templateId) {
    case 'tmpl_mastermind':
      return [
        {
          id: 'mod_m1',
          title: 'Module 1: 7-Figure High-Ticket Architecture',
          order: 1,
          lessons: [
            { id: 'les_m1_1', title: 'Lesson 1.1: $5,000 Offer Positioning & Hook', order: 1, dripDays: 0, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', duration: '24 mins', isCompleted: true },
            { id: 'les_m1_2', title: 'Lesson 1.2: VSL Scripting & Objection Handling', order: 2, dripDays: 0, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', duration: '35 mins', isCompleted: false },
          ]
        },
        {
          id: 'mod_m2',
          title: 'Module 2: VIP Coaching & Client Retention',
          order: 2,
          lessons: [
            { id: 'les_m2_1', title: 'Lesson 2.1: Weekly Mastermind Call Structures', order: 1, dripDays: 7, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', duration: '18 mins', isCompleted: false },
            { id: 'les_m2_2', title: 'Lesson 2.2: 1-on-1 ChronoChimp Booking Setup', order: 2, dripDays: 14, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyflights.mp4', duration: '22 mins', isCompleted: false },
          ]
        }
      ];

    case 'tmpl_tech_bootcamp':
      return [
        {
          id: 'mod_tb1',
          title: 'Module 1: Full-Stack React & TypeScript Architecture',
          order: 1,
          lessons: [
            { id: 'les_tb1_1', title: 'Lesson 1.1: Setting up Vite, React & Tailwind CSS', order: 1, dripDays: 0, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', duration: '40 mins', isCompleted: true },
            { id: 'les_tb1_2', title: 'Lesson 1.2: State Management & Persistence Storage', order: 2, dripDays: 0, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', duration: '28 mins', isCompleted: false },
          ]
        },
        {
          id: 'mod_tb2',
          title: 'Module 2: REST APIs & Backend Database Clones',
          order: 2,
          lessons: [
            { id: 'les_tb2_1', title: 'Lesson 2.1: Building Express & Async Handlers', order: 1, dripDays: 3, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', duration: '45 mins', isCompleted: false },
            { id: 'les_tb2_2', title: 'Lesson 2.2: Deploying to Vercel & Netlify Production', order: 2, dripDays: 7, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyflights.mp4', duration: '30 mins', isCompleted: false },
          ]
        }
      ];

    case 'tmpl_executive_mba':
      return [
        {
          id: 'mod_mba1',
          title: 'Module 1: Executive Corporate Leadership Strategy',
          order: 1,
          lessons: [
            { id: 'les_mba1_1', title: 'Lesson 1.1: Strategic Decision Making Under Uncertainty', order: 1, dripDays: 0, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', duration: '50 mins', isCompleted: true },
            { id: 'les_mba1_2', title: 'Lesson 1.2: Financial Valuation & M&A Case Studies', order: 2, dripDays: 0, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', duration: '60 mins', isCompleted: false },
          ]
        }
      ];

    case 'tmpl_fitness_beast':
      return [
        {
          id: 'mod_fit1',
          title: 'Module 1: 90-Day Athletic Hypertrophy Blueprint',
          order: 1,
          lessons: [
            { id: 'les_fit1_1', title: 'Lesson 1.1: Push-Pull-Legs Routine & Form Guide', order: 1, dripDays: 0, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', duration: '15 mins', isCompleted: true },
            { id: 'les_fit1_2', title: 'Lesson 1.2: Macronutrient Ratios & Meal Prep PDFs', order: 2, dripDays: 1, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', duration: '20 mins', isCompleted: false },
          ]
        }
      ];

    default:
      return [
        {
          id: 'mod_def1',
          title: 'Module 1: Foundation & Core Curriculum',
          order: 1,
          lessons: [
            { id: 'les_def1_1', title: 'Lesson 1.1: Welcome & Course Overview', order: 1, dripDays: 0, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', duration: '12 mins', isCompleted: true },
            { id: 'les_def1_2', title: 'Lesson 1.2: Core Fundamentals Masterclass', order: 2, dripDays: 0, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', duration: '25 mins', isCompleted: false },
          ]
        },
        {
          id: 'mod_def2',
          title: 'Module 2: Advanced Implementation & Scaling',
          order: 2,
          lessons: [
            { id: 'les_def2_1', title: 'Lesson 2.1: Step-by-Step Blueprint Walkthrough', order: 1, dripDays: 7, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', duration: '30 mins', isCompleted: false },
          ]
        }
      ];
  }
};

export const MembershipManager: React.FC = () => {
  const [course, setCourse] = useState<CourseData>(loadStoredCourse());
  const [activeTab, setActiveTab] = useState<'curriculum' | 'course_templates' | 'certificates' | 'drip_rules' | 'student_portal'>('curriculum');
  const [selectedLesson, setSelectedLesson] = useState<LessonData>(course.modules[0]?.lessons[0] || { id: 'les_1', title: 'Lesson 1.1', order: 1 });
  const [studentEnrollmentDays, setStudentEnrollmentDays] = useState<number>(0);

  // Templates & Certificate States
  const [selectedCertTemplate, setSelectedCertTemplate] = useState<CertificateTemplate>(certificateTemplates[0]);
  const [customCertConfig, setCustomCertConfig] = useState<Partial<CertificateTemplate>>({});
  
  // Custom Certificates State
  const [isBuildingCertificate, setIsBuildingCertificate] = useState(false);
  const [customCertificates, setCustomCertificates] = useState<CustomBuiltCertificate[]>([]);
  const [selectedCustomCert, setSelectedCustomCert] = useState<CustomBuiltCertificate | null>(null);

  const activeCertTemplate = {
    ...selectedCertTemplate,
    ...customCertConfig
  };
  const [studentCertName, setStudentCertName] = useState('Sarah Connor');
  const [certIssuedToast, setCertIssuedToast] = useState<string | null>(null);
  const [activeCourseTemplate, setActiveCourseTemplate] = useState<CourseTemplate>(courseTemplates[0]);
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  // Save to persistence
  useEffect(() => {
    saveStoredCourse(course);
  }, [course]);

  // Add new Module
  const handleAddModule = () => {
    const newMod: ModuleData = {
      id: `mod_${Date.now()}`,
      title: `Module ${course.modules.length + 1}: Strategic Masterclass`,
      order: course.modules.length + 1,
      lessons: []
    };
    setCourse({ ...course, modules: [...course.modules, newMod] });
  };

  // Delete Module
  const handleDeleteModule = (moduleId: string) => {
    setCourse({ ...course, modules: course.modules.filter(m => m.id !== moduleId) });
  };

  // Helper to add a new content block to selected lesson
  const handleAddLessonBlock = (type: 'headline' | 'paragraph' | 'image' | 'video' | 'audio' | 'quiz') => {
    const newBlock: any = {
      id: `blk-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      type
    };

    if (type === 'headline') newBlock.headlineText = 'Key Module Takeaways & Principles';
    else if (type === 'paragraph') newBlock.paragraphText = 'In this section, review the foundational principles and implementation steps...';
    else if (type === 'image') {
      newBlock.imageUrl = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
      newBlock.imageCaption = 'Lesson Architecture & Workflow Diagram';
    }
    else if (type === 'video') {
      newBlock.videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4';
      newBlock.videoTitle = 'Secondary Demonstration Video';
    }
    else if (type === 'audio') {
      newBlock.audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
      newBlock.audioTitle = 'Audio Lecture & Guided Podcast';
    }
    else if (type === 'quiz') {
      newBlock.quizQuestion = 'What is the primary objective of this lesson?';
      newBlock.quizOptions = ['Scale Revenue', 'Automate Pipelines', 'Improve Retention', 'All of the Above'];
      newBlock.correctOptionIndex = 3;
    }

    const currentBlocks = selectedLesson.blocks || [];
    const updatedBlocks = [...currentBlocks, newBlock];
    const updatedLesson = { ...selectedLesson, blocks: updatedBlocks };

    setSelectedLesson(updatedLesson);
    const updatedMods = course.modules.map(m => ({
      ...m,
      lessons: m.lessons.map(l => l.id === selectedLesson.id ? updatedLesson : l)
    }));
    setCourse({ ...course, modules: updatedMods });
  };

  const handleUpdateBlock = (blockId: string, updates: Partial<any>) => {
    const currentBlocks = selectedLesson.blocks || [];
    const updatedBlocks = currentBlocks.map(b => b.id === blockId ? { ...b, ...updates } : b);
    const updatedLesson = { ...selectedLesson, blocks: updatedBlocks };

    setSelectedLesson(updatedLesson);
    const updatedMods = course.modules.map(m => ({
      ...m,
      lessons: m.lessons.map(l => l.id === selectedLesson.id ? updatedLesson : l)
    }));
    setCourse({ ...course, modules: updatedMods });
  };

  const handleDeleteBlock = (blockId: string) => {
    const currentBlocks = selectedLesson.blocks || [];
    const updatedBlocks = currentBlocks.filter(b => b.id !== blockId);
    const updatedLesson = { ...selectedLesson, blocks: updatedBlocks };

    setSelectedLesson(updatedLesson);
    const updatedMods = course.modules.map(m => ({
      ...m,
      lessons: m.lessons.map(l => l.id === selectedLesson.id ? updatedLesson : l)
    }));
    setCourse({ ...course, modules: updatedMods });
  };

  // Add new Lesson to Module
  const handleAddLesson = (moduleId: string) => {
    const updatedModules = course.modules.map((mod) => {
      if (mod.id !== moduleId) return mod;
      const newLes: LessonData = {
        id: `les_${Date.now()}`,
        title: `Lesson ${mod.order}.${mod.lessons.length + 1}: Video Masterclass`,
        order: mod.lessons.length + 1,
        dripDays: 0,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        duration: '15 mins',
        isCompleted: false
      };
      return { ...mod, lessons: [...mod.lessons, newLes] };
    });
    setCourse({ ...course, modules: updatedModules });
  };

  // Delete Lesson
  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    const updatedModules = course.modules.map((mod) => {
      if (mod.id !== moduleId) return mod;
      return { ...mod, lessons: mod.lessons.filter(l => l.id !== lessonId) };
    });
    setCourse({ ...course, modules: updatedModules });
  };

  // Toggle Lesson Complete Status
  const handleToggleComplete = (lessonId: string) => {
    const updatedModules = course.modules.map((mod) => ({
      ...mod,
      lessons: mod.lessons.map((les) => {
        if (les.id === lessonId) {
          return { ...les, isCompleted: !les.isCompleted };
        }
        return les;
      })
    }));

    const updatedCourse = { ...course, modules: updatedModules };
    setCourse(updatedCourse);

    // Update selected lesson reference
    if (selectedLesson.id === lessonId) {
      setSelectedLesson({ ...selectedLesson, isCompleted: !selectedLesson.isCompleted });
    }
  };

  // Calculate Overall Course Completion Percentage
  const allLessons = course.modules.flatMap(m => m.lessons);
  const completedCount = allLessons.filter(l => l.isCompleted).length;
  const progressPercent = allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;

  return (
    <div className="flex-1 bg-gray-50 text-gray-900 flex flex-col overflow-y-auto">
      {/* Top Header */}
      <div className="bg-green-600 backdrop-blur-md border-b border-green-700 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-white font-extrabold text-xs tracking-wider uppercase mb-1">
            <GraduationCap className="w-4 h-4 text-white" />
            <span className="bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-full">ACADEMY LMS & COURSE ENGINE</span>
          </div>
          <h1 className="text-2xl font-black text-white" style={{ color: '#ffffff' }}>{course.title}</h1>
          <p className="text-xs text-green-100 mt-0.5 max-w-2xl" style={{ color: '#dcfce7' }}>{course.description}</p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button 
            onClick={() => setActiveTab('curriculum')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'curriculum' ? 'bg-white text-green-700 shadow-lg' : 'bg-green-700 text-green-100 hover:text-white border border-green-500'}`}
          >
            Curriculum Builder
          </button>
          <button 
            onClick={() => setActiveTab('course_templates')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'course_templates' ? 'bg-white text-green-700 shadow-lg' : 'bg-green-700 text-green-100 hover:text-white border border-green-500'}`}
          >
            Course Templates (10)
          </button>
          <button 
            onClick={() => setActiveTab('certificates')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'certificates' ? 'bg-white text-green-700 shadow-lg' : 'bg-green-700 text-green-100 hover:text-white border border-green-500'}`}
          >
            Automated Certificates (10)
          </button>
          <button 
            onClick={() => setActiveTab('drip_rules')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'drip_rules' ? 'bg-white text-green-700 shadow-lg' : 'bg-green-700 text-green-100 hover:text-white border border-green-500'}`}
          >
            Drip Scheduler
          </button>
          <button 
            onClick={() => setActiveTab('student_portal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'student_portal' ? 'bg-white text-green-700 shadow-lg' : 'bg-green-700 text-green-100 hover:text-white border border-green-500'}`}
          >
            Student Portal ({progressPercent}%)
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 w-full max-w-[1600px] mx-auto">

      {/* OFFICIAL REQUIRED BANNER */}
      <div className="p-4 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/40 rounded-2xl mb-6 space-y-1.5 shadow-xl shrink-0">
        <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-xs">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Course & LMS Portal Template Engine Active</span>
        </div>
        <p className="text-xs text-emerald-200/90 leading-relaxed font-medium">
          Choose from our proven course templates and make it your own. Simply select a template that matches your teaching style, customize it with your branding, and add your content. From course homepage to lesson layouts, everything is ready for you. No starting from scratch, no technical skills needed, automated certificates, and keep them engaged with scheduled content releases.
        </p>
      </div>

      {appliedToast && (
        <div className="p-3.5 bg-purple-950 border border-purple-500/50 text-purple-200 text-xs font-bold rounded-2xl mb-6 flex items-center gap-2 shadow-xl animate-fade-in">
          <Check className="w-4 h-4 text-purple-400" />
          <span>{appliedToast}</span>
        </div>
      )}

      {/* VIEW 1: CURRICULUM BUILDER */}
      {activeTab === 'curriculum' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Modules & Lessons Hierarchy Tree */}
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Course Modules</span>
              <button 
                onClick={handleAddModule}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Module</span>
              </button>
            </div>

            <div className="space-y-4">
              {course.modules.map((mod) => (
                <div key={mod.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-200">{mod.title}</h3>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleAddLesson(mod.id)}
                        className="p-1 hover:bg-slate-800 rounded text-indigo-400 hover:text-indigo-300"
                        title="Add Lesson"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteModule(mod.id)}
                        className="p-1 hover:bg-slate-800 rounded text-rose-400 hover:text-rose-300"
                        title="Delete Module"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 pl-2">
                    {mod.lessons.map((les) => (
                      <button 
                        key={les.id}
                        onClick={() => setSelectedLesson(les)}
                        className={`w-full p-2 rounded-lg text-left text-xs font-semibold flex items-center justify-between transition-all ${selectedLesson.id === les.id ? 'bg-indigo-900/60 text-indigo-200 border border-indigo-500/50 shadow' : 'hover:bg-slate-900 text-slate-400'}`}
                      >
                        <div className="flex items-center gap-2">
                          <Video className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="truncate max-w-[140px]">{les.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {les.isCompleted && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteLesson(mod.id, les.id); }} className="hover:text-rose-400">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Selected Lesson Configurator */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-indigo-400 tracking-wider">LESSON CONFIGURATOR</span>
                <h2 className="text-lg font-bold text-slate-100">{selectedLesson.title}</h2>
              </div>
              <button 
                onClick={() => handleToggleComplete(selectedLesson.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${selectedLesson.isCompleted ? 'bg-emerald-600 text-white shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                <Check className="w-4 h-4" />
                <span>{selectedLesson.isCompleted ? 'Completed ✓' : 'Mark Complete'}</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Lesson Title</label>
                <input 
                  type="text" 
                  value={selectedLesson.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setSelectedLesson({ ...selectedLesson, title: newTitle });
                    const updatedMods = course.modules.map(m => ({
                      ...m,
                      lessons: m.lessons.map(l => l.id === selectedLesson.id ? { ...l, title: newTitle } : l)
                    }));
                    setCourse({ ...course, modules: updatedMods });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Lesson Stream Video URL (HLS / MP4 / Wistia)</label>
                <input 
                  type="text" 
                  value={selectedLesson.videoUrl || ''}
                  onChange={(e) => {
                    const newUrl = e.target.value;
                    setSelectedLesson({ ...selectedLesson, videoUrl: newUrl });
                    const updatedMods = course.modules.map(m => ({
                      ...m,
                      lessons: m.lessons.map(l => l.id === selectedLesson.id ? { ...l, videoUrl: newUrl } : l)
                    }));
                    setCourse({ ...course, modules: updatedMods });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Drip Days Post-Enrollment</label>
                  <input 
                    type="number" 
                    value={selectedLesson.dripDays || 0}
                    onChange={(e) => {
                      const days = parseInt(e.target.value) || 0;
                      setSelectedLesson({ ...selectedLesson, dripDays: days });
                      const updatedMods = course.modules.map(m => ({
                        ...m,
                        lessons: m.lessons.map(l => l.id === selectedLesson.id ? { ...l, dripDays: days } : l)
                      }));
                      setCourse({ ...course, modules: updatedMods });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Duration</label>
                  <input 
                    type="text" 
                    value={selectedLesson.duration || '15 mins'}
                    onChange={(e) => {
                      const dur = e.target.value;
                      setSelectedLesson({ ...selectedLesson, duration: dur });
                      const updatedMods = course.modules.map(m => ({
                        ...m,
                        lessons: m.lessons.map(l => l.id === selectedLesson.id ? { ...l, duration: dur } : l)
                      }));
                      setCourse({ ...course, modules: updatedMods });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100"
                  />
                </div>
              </div>

              {/* Video Player Preview */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Video Stream Preview</label>
                <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative">
                  <video src={selectedLesson.videoUrl} controls className="w-full h-full object-cover" />
                </div>
              </div>

              {/* LESSON DOCUMENTS & PDFS */}
              <div className="pt-6 border-t border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300">Attached Documents & PDFs</label>
                  <button 
                    onClick={() => {
                      const newDoc = { id: `doc_${Date.now()}`, name: '', url: '', type: 'pdf' as const };
                      const docs = selectedLesson.documents || [];
                      // Migrate legacy pdfUrl if needed
                      if (docs.length === 0 && selectedLesson.pdfUrl) {
                        docs.push({ id: `doc_legacy`, name: selectedLesson.pdfName || 'Document', url: selectedLesson.pdfUrl, type: 'pdf' });
                      }
                      const updatedDocs = [...docs, newDoc];
                      setSelectedLesson({ ...selectedLesson, documents: updatedDocs, pdfUrl: '', pdfName: '' });
                      
                      const updatedMods = course.modules.map(m => ({
                        ...m,
                        lessons: m.lessons.map(l => l.id === selectedLesson.id ? { ...l, documents: updatedDocs, pdfUrl: '', pdfName: '' } : l)
                      }));
                      setCourse({ ...course, modules: updatedMods });
                    }}
                    className="text-[10px] text-indigo-400 font-bold hover:text-indigo-300 flex items-center gap-1"
                  >
                    + Add Document
                  </button>
                </div>
                
                <div className="space-y-3">
                  {(() => {
                    let docs = selectedLesson.documents || [];
                    if (docs.length === 0 && selectedLesson.pdfUrl) {
                      docs = [{ id: 'doc_legacy', name: selectedLesson.pdfName || 'Legacy PDF', url: selectedLesson.pdfUrl, type: 'pdf' }];
                    }
                    if (docs.length === 0) return <p className="text-[11px] text-slate-500 italic">No documents attached.</p>;

                    return docs.map((doc, idx) => (
                      <div key={doc.id} className="flex gap-2 items-start bg-slate-900/50 p-2.5 rounded-xl border border-slate-800">
                        <select 
                          value={doc.type}
                          onChange={(e) => {
                            const newDocs = [...docs];
                            newDocs[idx].type = e.target.value as any;
                            setSelectedLesson({ ...selectedLesson, documents: newDocs });
                            const updatedMods = course.modules.map(m => ({ ...m, lessons: m.lessons.map(l => l.id === selectedLesson.id ? { ...l, documents: newDocs } : l) }));
                            setCourse({ ...course, modules: updatedMods });
                          }}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-xs text-slate-300"
                        >
                          <option value="pdf">PDF</option>
                          <option value="doc">Word/Doc</option>
                          <option value="excel">Excel/Sheet</option>
                          <option value="zip">ZIP File</option>
                          <option value="other">Other</option>
                        </select>
                        <input 
                          type="text" 
                          value={doc.name}
                          placeholder="Doc Name"
                          onChange={(e) => {
                            const newDocs = [...docs];
                            newDocs[idx].name = e.target.value;
                            setSelectedLesson({ ...selectedLesson, documents: newDocs });
                            const updatedMods = course.modules.map(m => ({ ...m, lessons: m.lessons.map(l => l.id === selectedLesson.id ? { ...l, documents: newDocs } : l) }));
                            setCourse({ ...course, modules: updatedMods });
                          }}
                          className="w-1/3 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100"
                        />
                        <input 
                          type="text" 
                          value={doc.url}
                          placeholder="https://... (URL)"
                          onChange={(e) => {
                            const newDocs = [...docs];
                            newDocs[idx].url = e.target.value;
                            setSelectedLesson({ ...selectedLesson, documents: newDocs });
                            const updatedMods = course.modules.map(m => ({ ...m, lessons: m.lessons.map(l => l.id === selectedLesson.id ? { ...l, documents: newDocs } : l) }));
                            setCourse({ ...course, modules: updatedMods });
                          }}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono"
                        />
                        <button 
                          onClick={() => {
                            const newDocs = docs.filter(d => d.id !== doc.id);
                            setSelectedLesson({ ...selectedLesson, documents: newDocs });
                            const updatedMods = course.modules.map(m => ({ ...m, lessons: m.lessons.map(l => l.id === selectedLesson.id ? { ...l, documents: newDocs } : l) }));
                            setCourse({ ...course, modules: updatedMods });
                          }}
                          className="p-2 hover:text-rose-400 text-slate-500 rounded-lg shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* FULL LESSON BUILDER (Add Headlines, Paragraphs, Images, Audio, Multiple Videos, Quizzes) */}
              <div className="pt-6 border-t border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <span>Full Lesson Content Builder</span>
                    </h3>
                    <p className="text-xs text-slate-400">Add headlines, body paragraphs, images, audio podcasts, additional videos, and interactive quizzes.</p>
                  </div>
                </div>

                {/* Add Block Toolbar Buttons */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <button onClick={() => handleAddLessonBlock('headline')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-700">
                    <Type className="w-3.5 h-3.5 text-indigo-400" /> + Headline
                  </button>
                  <button onClick={() => handleAddLessonBlock('paragraph')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-700">
                    <FileText className="w-3.5 h-3.5 text-purple-400" /> + Paragraph
                  </button>
                  <button onClick={() => handleAddLessonBlock('image')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-700">
                    <ImageIcon className="w-3.5 h-3.5 text-pink-400" /> + Image
                  </button>
                  <button onClick={() => handleAddLessonBlock('video')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-700">
                    <Video className="w-3.5 h-3.5 text-emerald-400" /> + Video
                  </button>
                  <button onClick={() => handleAddLessonBlock('audio')} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-700">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" /> + Audio Player
                  </button>
                  <button onClick={() => handleAddLessonBlock('quiz')} className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow">
                    <HelpCircle className="w-3.5 h-3.5" /> + Quiz / Exam
                  </button>
                </div>

                {/* Blocks List */}
                <div className="space-y-3">
                  {(selectedLesson.blocks || []).length === 0 ? (
                    <div className="p-6 bg-slate-950/50 border border-dashed border-slate-800 rounded-xl text-center text-xs text-slate-500">
                      No additional content blocks added yet. Click any button above to build this lesson.
                    </div>
                  ) : (
                    (selectedLesson.blocks || []).map((blk, idx) => (
                      <div key={blk.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 relative group">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                            Block {idx + 1}: {blk.type}
                          </span>
                          <button onClick={() => handleDeleteBlock(blk.id)} className="text-slate-500 hover:text-rose-400">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {blk.type === 'headline' && (
                          <input 
                            type="text" 
                            value={blk.headlineText || ''} 
                            onChange={(e) => handleUpdateBlock(blk.id, { headlineText: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        )}

                        {blk.type === 'paragraph' && (
                          <textarea 
                            rows={3}
                            value={blk.paragraphText || ''} 
                            onChange={(e) => handleUpdateBlock(blk.id, { paragraphText: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                          />
                        )}

                        {blk.type === 'image' && (
                          <div className="space-y-2">
                            <input 
                              type="text" 
                              placeholder="Image URL..."
                              value={blk.imageUrl || ''} 
                              onChange={(e) => handleUpdateBlock(blk.id, { imageUrl: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                            />
                            <input 
                              type="text" 
                              placeholder="Image Caption..."
                              value={blk.imageCaption || ''} 
                              onChange={(e) => handleUpdateBlock(blk.id, { imageCaption: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300"
                            />
                          </div>
                        )}

                        {blk.type === 'video' && (
                          <div className="space-y-2">
                            <input 
                              type="text" 
                              placeholder="Video Title..."
                              value={blk.videoTitle || ''} 
                              onChange={(e) => handleUpdateBlock(blk.id, { videoTitle: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                            />
                            <input 
                              type="text" 
                              placeholder="Video Stream URL (MP4 / HLS)..."
                              value={blk.videoUrl || ''} 
                              onChange={(e) => handleUpdateBlock(blk.id, { videoUrl: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                            />
                          </div>
                        )}

                        {blk.type === 'audio' && (
                          <div className="space-y-2">
                            <input 
                              type="text" 
                              placeholder="Audio Title..."
                              value={blk.audioTitle || ''} 
                              onChange={(e) => handleUpdateBlock(blk.id, { audioTitle: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                            />
                            <input 
                              type="text" 
                              placeholder="MP3 / Audio URL..."
                              value={blk.audioUrl || ''} 
                              onChange={(e) => handleUpdateBlock(blk.id, { audioUrl: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                            />
                          </div>
                        )}

                        {blk.type === 'quiz' && (
                          <div className="space-y-2">
                            <input 
                              type="text" 
                              placeholder="Quiz Question..."
                              value={blk.quizQuestion || ''} 
                              onChange={(e) => handleUpdateBlock(blk.id, { quizQuestion: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              {(blk.quizOptions || []).map((opt, oIdx) => (
                                <input 
                                  key={oIdx}
                                  type="text" 
                                  value={opt}
                                  onChange={(e) => {
                                    const opts = [...(blk.quizOptions || [])];
                                    opts[oIdx] = e.target.value;
                                    handleUpdateBlock(blk.id, { quizOptions: opts });
                                  }}
                                  className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: STUDENT PORTAL PREVIEW */}
      {activeTab === 'student_portal' && (
        <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-2xl">
          {/* Dynamic Template Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden h-40 bg-slate-950 border border-slate-800">
            <img src={activeCourseTemplate.coverImage} alt={course.title} className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent p-6 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded text-white shadow" style={{ backgroundColor: activeCourseTemplate.accentColor }}>
                  {activeCourseTemplate.badge}
                </span>
                <span className="text-[10px] font-mono text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                  {activeCourseTemplate.styleTag}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-black text-white" style={{ color: '#ffffff' }}>{course.title}</h2>
                <p className="text-xs text-slate-300 line-clamp-1" style={{ color: '#f8fafc' }}>{course.description}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-base shadow-lg">
                LE
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">Student Access Portal</h3>
                <p className="text-[11px] text-slate-400">Welcome back, Sarah Jenkins (VIP Active Enrollment)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Simulated Enrollment Days Selector */}
              <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-slate-400">Simulate Days Post-Enrollment:</span>
                <select 
                  value={studentEnrollmentDays}
                  onChange={(e) => setStudentEnrollmentDays(parseInt(e.target.value))}
                  className="bg-slate-900 border border-slate-800 text-amber-300 font-bold rounded px-2 py-0.5"
                >
                  <option value={0}>Day 0 (Instant)</option>
                  <option value={3}>Day 3</option>
                  <option value={7}>Day 7</option>
                  <option value={30}>Day 30 (All Unlocked)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-slate-200">Progress: {progressPercent}% ({completedCount}/{allLessons.length})</span>
              </div>
            </div>
          </div>

          {/* Video Player & Drip Lock View */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {(selectedLesson.dripDays || 0) > studentEnrollmentDays ? (
                <div className="aspect-video bg-slate-950 rounded-2xl border border-amber-500/40 p-8 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-amber-950/80 text-amber-400 flex items-center justify-center border border-amber-500/40 shadow-lg">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-amber-200">Lesson Locked via Drip Scheduler</h3>
                  <p className="text-xs text-slate-400 max-w-md">
                    This lesson is scheduled to release on <strong className="text-white">Day {selectedLesson.dripDays}</strong> post-enrollment. You are currently simulating Day {studentEnrollmentDays}.
                  </p>
                </div>
              ) : (
                <div className="aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-indigo-500/40 shadow-xl relative">
                  <video src={selectedLesson.videoUrl} controls autoPlay className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{selectedLesson.title}</h3>
                <button 
                  onClick={() => handleToggleComplete(selectedLesson.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedLesson.isCompleted ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
                >
                  {selectedLesson.isCompleted ? 'Completed ✓' : 'Mark as Complete'}
                </button>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                In this lesson, learn the exact blueprint for configuring automated 1-click upsells, drip schedules, and student portals.
              </p>

              {/* PDF Documents Render */}
              {(() => {
                const docs = selectedLesson.documents || [];
                if (docs.length === 0 && selectedLesson.pdfUrl) {
                  docs.push({ id: 'doc_legacy', name: selectedLesson.pdfName || 'Download Document', url: selectedLesson.pdfUrl, type: 'pdf' });
                }
                
                if (docs.length === 0) return null;

                return (
                  <div className="pt-4 space-y-3">
                    {docs.map(doc => (
                      <a key={doc.id} href={doc.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-3 bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-xl transition-all shadow-sm w-full sm:w-fit">
                        <FileText className={`w-5 h-5 ${doc.type === 'excel' ? 'text-emerald-400' : doc.type === 'doc' ? 'text-blue-400' : doc.type === 'zip' ? 'text-amber-400' : 'text-rose-400'}`} />
                        <div className="flex-1 pr-6">
                          <h4 className="text-sm font-bold text-slate-200">{doc.name || 'Attached Document'}</h4>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">{doc.type} File</p>
                        </div>
                        <Download className="w-4 h-4 text-slate-500" />
                      </a>
                    ))}
                  </div>
                );
              })()}

              {/* Dynamic Lesson Blocks Rendering (Headlines, Paragraphs, Images, Audio, Multiple Videos, Quizzes) */}
              {(selectedLesson.blocks || []).length > 0 && (
                <div className="space-y-6 pt-4 border-t border-slate-800">
                  {(selectedLesson.blocks || []).map((blk) => (
                    <div key={blk.id} className="space-y-3">
                      {blk.type === 'headline' && (
                        <h4 className="text-base font-extrabold text-white">{blk.headlineText}</h4>
                      )}

                      {blk.type === 'paragraph' && (
                        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800/60">{blk.paragraphText}</p>
                      )}

                      {blk.type === 'image' && (
                        <div className="space-y-1.5">
                          <img src={blk.imageUrl} alt={blk.imageCaption || 'Lesson Image'} className="w-full rounded-2xl border border-slate-800 object-cover max-h-80" />
                          {blk.imageCaption && <p className="text-[11px] text-slate-400 italic text-center">{blk.imageCaption}</p>}
                        </div>
                      )}

                      {blk.type === 'video' && (
                        <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                          <h5 className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                            <Video className="w-4 h-4" /> {blk.videoTitle || 'Additional Lesson Video'}
                          </h5>
                          <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden">
                            <video src={blk.videoUrl} controls className="w-full h-full object-cover" />
                          </div>
                        </div>
                      )}

                      {blk.type === 'audio' && (
                        <div className="p-4 bg-slate-950 rounded-2xl border border-amber-500/30 space-y-2">
                          <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                            <Volume2 className="w-4 h-4" /> {blk.audioTitle || 'Lesson Audio Lecture'}
                          </h5>
                          <audio src={blk.audioUrl} controls className="w-full h-10" />
                        </div>
                      )}

                      {blk.type === 'quiz' && (
                        <div className="p-5 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-500/40 space-y-4">
                          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                            <HelpCircle className="w-4 h-4 text-indigo-400" />
                            <span>Interactive Module Quiz / Exam</span>
                          </div>
                          <p className="text-sm font-bold text-white">{blk.quizQuestion}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {(blk.quizOptions || []).map((opt, oIdx) => (
                              <button 
                                key={oIdx}
                                onClick={() => {
                                  if (oIdx === blk.correctOptionIndex) {
                                    alert('🎉 Correct Answer! Excellent job.');
                                  } else {
                                    alert('❌ Incorrect choice, try again!');
                                  }
                                }}
                                className="p-3 bg-slate-900 hover:bg-indigo-600/80 text-left text-xs font-semibold text-slate-200 hover:text-white rounded-xl border border-slate-800 transition-colors"
                              >
                                {oIdx + 1}. {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Curriculum Outline</h4>
              {course.modules.map((m) => (
                <div key={m.id} className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-300">{m.title}</div>
                  {m.lessons.map((l) => {
                    const isLocked = (l.dripDays || 0) > studentEnrollmentDays;
                    return (
                      <button 
                        key={l.id} 
                        onClick={() => setSelectedLesson(l)}
                        className={`w-full p-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-all ${l.id === selectedLesson.id ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-slate-200'}`}
                      >
                        <span className="truncate max-w-[170px]">{l.title}</span>
                        {isLocked ? (
                          <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        ) : l.isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Play className="w-3.5 h-3.5 opacity-60 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: DRIP RULES */}
      {activeTab === 'drip_rules' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">Drip Scheduling Policies</h3>
              <p className="text-xs text-slate-400">Release modules based on calendar dates, days after purchase, or prerequisite lessons.</p>
            </div>
            <Clock className="w-6 h-6 text-amber-400" />
          </div>

          <div className="space-y-4">
            {course.modules.map((m) => (
              <div key={m.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-slate-200">{m.title}</h4>
                {m.lessons.map((les) => (
                  <div key={les.id} className="flex items-center justify-between text-xs p-2 bg-slate-900 rounded-lg">
                    <span className="font-semibold text-slate-300">{les.title}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Unlock Drip Day:</span>
                      <input 
                        type="number" 
                        value={les.dripDays || 0}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          const updatedMods = course.modules.map(mod => ({
                            ...mod,
                            lessons: mod.lessons.map(l => l.id === les.id ? { ...l, dripDays: val } : l)
                          }));
                          setCourse({ ...course, modules: updatedMods });
                        }}
                        className="w-16 bg-slate-950 border border-slate-800 text-amber-400 font-mono font-bold px-2 py-1 rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: PROVEN COURSE TEMPLATES (10) */}
      {activeTab === 'course_templates' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                10 Proven Designer Course Templates
              </h2>
              <p className="text-xs text-slate-400">Select a template matching your teaching style to instantly customize layout and content.</p>
            </div>
            <span className="text-xs font-mono font-bold bg-purple-950 text-purple-300 px-3 py-1 rounded-full border border-purple-800">
              10 TEMPLATES READY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseTemplates.map((tmpl) => (
              <div key={tmpl.id} className="bg-slate-900 border border-slate-800 hover:border-purple-500/60 rounded-3xl overflow-hidden transition-all shadow-xl flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img src={tmpl.coverImage} alt={tmpl.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-4">
                      <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-lg text-white shadow" style={{ backgroundColor: tmpl.accentColor }}>
                        {tmpl.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{tmpl.category}</span>
                      <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{tmpl.styleTag}</span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-tight">{tmpl.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{tmpl.description}</p>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-[11px]">
                      <div className="text-slate-400 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                        <span>Teaching Style: <strong className="text-slate-200">{tmpl.teachingStyle}</strong></span>
                      </div>
                      <div className="flex justify-between text-slate-400 font-mono pt-1 border-t border-slate-800/60">
                        <span>{tmpl.modulesCount} Modules</span>
                        <span>{tmpl.totalLessons} Lessons</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button 
                    onClick={() => {
                      const newMods = getModulesForTemplate(tmpl.id);
                      setCourse({
                        ...course,
                        title: tmpl.name,
                        description: tmpl.description,
                        modules: newMods
                      });
                      setActiveCourseTemplate(tmpl);
                      if (newMods[0]?.lessons[0]) {
                        setSelectedLesson(newMods[0].lessons[0]);
                      }
                      setActiveTab('curriculum');
                      setAppliedToast(`🎉 Applied ${tmpl.name} Template & Modules!`);
                      setTimeout(() => setAppliedToast(null), 3500);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>APPLY TEMPLATE & CUSTOMIZE</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 5: AUTOMATED CERTIFICATES (10) */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: 10 Certificate Templates Selector */}
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-extrabold uppercase text-slate-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Certificate Designs (10)
              </h3>
              <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                AUTO-ISSUED
              </span>
            </div>

              <button 
                onClick={() => setIsBuildingCertificate(true)}
                className="w-full mb-3 flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg border border-green-500 transition-all"
              >
                <Plus className="w-4 h-4" />
                Create Blank Template
              </button>

              <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
                {/* Custom Certificates */}
                {customCertificates.map((cert) => (
                  <div 
                    key={cert.id}
                    onClick={() => {
                      setSelectedCustomCert(cert);
                    }}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${selectedCustomCert?.id === cert.id ? 'bg-amber-950/40 border-amber-500 text-white shadow-lg' : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">🛠️</span>
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">CUSTOM</span>
                    </div>
                    <div className="font-bold text-xs text-slate-100">{cert.title}</div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">Custom Drag & Drop Design</p>
                  </div>
                ))}
                
                {/* Standard Templates */}
              {certificateTemplates.map((cert) => (
                <div 
                  key={cert.id}
                  onClick={() => {
                    setSelectedCustomCert(null);
                    setSelectedCertTemplate(cert);
                    setCustomCertConfig({});
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${(!selectedCustomCert && selectedCertTemplate.id === cert.id) ? 'bg-amber-950/40 border-amber-500 text-white shadow-lg' : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{cert.sealIcon}</span>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">{cert.styleTag}</span>
                  </div>
                  <div className="font-bold text-xs text-slate-100">{cert.title}</div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{cert.description}</p>
                </div>
              ))}
            </div>
            {!selectedCustomCert && (
              <div className="pt-4 border-t border-slate-800 space-y-3 mt-4">
                <h4 className="text-xs font-bold text-slate-300">Customize Certificate</h4>
              
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Title</label>
                <input 
                  type="text" 
                  value={activeCertTemplate.title || ''} 
                  onChange={(e) => setCustomCertConfig({ ...customCertConfig, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Badge Text</label>
                <input 
                  type="text" 
                  value={activeCertTemplate.badgeText || ''} 
                  onChange={(e) => setCustomCertConfig({ ...customCertConfig, badgeText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Description</label>
                <textarea 
                  rows={3}
                  value={activeCertTemplate.description || ''} 
                  onChange={(e) => setCustomCertConfig({ ...customCertConfig, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Accent Color</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={activeCertTemplate.accentColor || '#000000'} 
                    onChange={(e) => setCustomCertConfig({ ...customCertConfig, accentColor: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer bg-slate-950 border border-slate-800 p-0 overflow-hidden"
                  />
                  <input 
                    type="text" 
                    value={activeCertTemplate.accentColor || ''} 
                    onChange={(e) => setCustomCertConfig({ ...customCertConfig, accentColor: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono"
                  />
                </div>
              </div>
            </div>
            )}
          </div>

          {/* Right: Live Interactive Certificate Generator Preview Frame */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-amber-400">AUTOMATED CERTIFICATE PDF GENERATOR</span>
                <h3 className="text-lg font-bold text-white">{selectedCustomCert ? selectedCustomCert.title : activeCertTemplate.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={studentCertName}
                  onChange={(e) => setStudentCertName(e.target.value)}
                  placeholder="Student Full Name..."
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500"
                />
                <button 
                  onClick={() => {
                    setCertIssuedToast(`🎉 Issued Automated Certificate for ${studentCertName}!`);
                    setTimeout(() => setCertIssuedToast(null), 3500);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg flex items-center gap-1.5 shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>Issue PDF Certificate</span>
                </button>
              </div>
            </div>

            {certIssuedToast && (
              <div className="p-3 bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{certIssuedToast}</span>
              </div>
            )}

            {/* LIVE CERTIFICATE DISPLAY FRAME */}
            {selectedCustomCert ? (
              <CustomCertificateRenderer 
                certificate={selectedCustomCert}
                studentName={studentCertName}
                courseTitle={course.title}
              />
            ) : (
              <CertificateFrameRenderer 
                template={activeCertTemplate} 
                studentName={studentCertName} 
                courseTitle={course.title} 
              />
            )}
          </div>
        </div>
      )}
      
      {isBuildingCertificate && (
        <CertificateBuilder 
          onSave={(cert) => {
            setCustomCertificates([...customCertificates, cert]);
            setSelectedCustomCert(cert);
            setIsBuildingCertificate(false);
          }}
          onCancel={() => setIsBuildingCertificate(false)}
        />
      )}
    </div>
  </div>
);
};
