import React, { useState, useEffect } from 'react';
import { 
  MeetingHost, EventTypeConfig, BookedAppointment, ChronoChimpSettings, AppointmentStatus, MeetingLocationType 
} from '../../types/appointment';
import { 
  loadStoredHosts, saveStoredHosts, 
  loadStoredEventTypes, saveStoredEventTypes, 
  loadStoredAppointments, saveStoredAppointments, 
  loadStoredChronoSettings, saveStoredChronoSettings,
  resetChronoChimpStorageToDefaults
} from '../../utils/appointmentStorage';
import { syncChronoChimpToSupabase, CHRONOCHIMP_SQL_SCHEMA } from '../../utils/chronochimpDbSync';
import { 
  Calendar, Clock, Video, Users, CheckCircle2, XCircle, Plus, Search, 
  Filter, Download, RefreshCw, ChevronRight, Eye, Settings, Share2, 
  Sparkles, ExternalLink, Trash2, Edit3, UserPlus, Check, X, AlertCircle, 
  Phone, MapPin, CreditCard, Mail, ShieldCheck, Zap, BarChart2, CalendarCheck,
  MessageSquare, Copy, Sliders, Globe, ArrowRight, CheckSquare, Layers,
  Smartphone, Terminal, Database, Send, Radio, Activity, CheckCheck, RefreshCcw
} from 'lucide-react';

export const ChronoChimpAppointmentManager: React.FC = () => {
  // Store state
  const [hosts, setHosts] = useState<MeetingHost[]>(loadStoredHosts());
  const [eventTypes, setEventTypes] = useState<EventTypeConfig[]>(loadStoredEventTypes());
  const [appointments, setAppointments] = useState<BookedAppointment[]>(loadStoredAppointments());
  const [chronoSettings, setChronoSettings] = useState<ChronoChimpSettings>(loadStoredChronoSettings());

  // Active Main Sub-Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'roster' | 'event_types' | 'hosts' | 'reminders' | 'embed' | 'simulations' | 'database' | 'settings'
  >('overview');

  // Filters & Search
  const [apptFilterStatus, setApptFilterStatus] = useState<AppointmentStatus | 'All'>('All');
  const [apptSearchQuery, setApptSearchQuery] = useState('');
  const [selectedAppt, setSelectedAppt] = useState<BookedAppointment | null>(null);
  const [isApptDetailsOpen, setIsApptDetailsOpen] = useState(false);

  // Event Type Edit/Create Modal
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventTypeConfig | null>(null);
  const [eventFormTitle, setEventFormTitle] = useState('');
  const [eventFormSlug, setEventFormSlug] = useState('');
  const [eventFormDesc, setEventFormDesc] = useState('');
  const [eventFormDuration, setEventFormDuration] = useState('30');
  const [eventFormPrice, setEventFormPrice] = useState('0');
  const [eventFormLocation, setEventFormLocation] = useState<MeetingLocationType>('zoom');
  const [eventFormBufferBefore, setEventFormBufferBefore] = useState('5');
  const [eventFormBufferAfter, setEventFormBufferAfter] = useState('10');

  // Host Add / Edit Modal
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [editingHost, setEditingHost] = useState<MeetingHost | null>(null);
  const [hostFormName, setHostFormName] = useState('');
  const [hostFormEmail, setHostFormEmail] = useState('');
  const [hostFormRole, setHostFormRole] = useState('');
  const [hostFormZoomUrl, setHostFormZoomUrl] = useState('');
  const [hostFormPhone, setHostFormPhone] = useState('');

  // ── SIMULATION ENGINE STATES ──
  const [simSelectedEventId, setSimSelectedEventId] = useState(eventTypes[0]?.id || '');
  const [simSelectedHostId, setSimSelectedHostId] = useState(hosts[0]?.id || '');
  const [simDate, setSimDate] = useState('2026-08-19');
  const [simSlot, setSimSlot] = useState('14:00');
  const [simClientName, setSimClientName] = useState('Oliver Green');
  const [simClientEmail, setSimClientEmail] = useState('oliver@growthagency.demo');
  const [simClientPhone, setSimClientPhone] = useState('+1 (555) 349-2810');
  const [simClientRevenue, setSimClientRevenue] = useState('$50k - $100k/mo');
  const [simClientGoal, setSimClientGoal] = useState('Scale high-ticket VSL funnel to $250k/month');
  const [isSimulatingBooking, setIsSimulatingBooking] = useState(false);
  const [simBookingReceipt, setSimBookingReceipt] = useState<BookedAppointment | null>(null);

  // SMS Simulation
  const [simSmsDispatched, setSimSmsDispatched] = useState(false);

  // Attendance Status Simulator
  const [selectedStatusSimApptId, setSelectedStatusSimApptId] = useState<string>(appointments[0]?.id || '');
  const [statusSimFeedback, setStatusSimFeedback] = useState<string | null>(null);

  // Supabase Sync Status
  const [dbSyncStatus, setDbSyncStatus] = useState<{ success: boolean; message: string; timestamp: string } | null>(null);
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Clipboard toast
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  // Persist state
  useEffect(() => { saveStoredHosts(hosts); }, [hosts]);
  useEffect(() => { saveStoredEventTypes(eventTypes); }, [eventTypes]);
  useEffect(() => { saveStoredAppointments(appointments); }, [appointments]);
  useEffect(() => { saveStoredChronoSettings(chronoSettings); }, [chronoSettings]);

  // Derived metrics
  const totalUpcoming = appointments.filter(a => a.status === 'Upcoming').length;
  const totalCompleted = appointments.filter(a => a.status === 'Completed').length;
  const totalPaidRevenue = appointments.reduce((acc, curr) => acc + (curr.amountPaid || 0), 0);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Status Change
  const handleUpdateApptStatus = (id: string, newStatus: AppointmentStatus) => {
    const updated = appointments.map(a => a.id === id ? { ...a, status: newStatus } : a);
    setAppointments(updated);
    if (selectedAppt && selectedAppt.id === id) {
      setSelectedAppt({ ...selectedAppt, status: newStatus });
    }
  };

  // Create or Update Event Type
  const handleSaveEventType = () => {
    if (!eventFormTitle.trim()) return;

    if (editingEvent) {
      const updated = eventTypes.map(e => e.id === editingEvent.id ? {
        ...e,
        title: eventFormTitle,
        slug: eventFormSlug || eventFormTitle.toLowerCase().replace(/\s+/g, '-'),
        description: eventFormDesc || 'Custom appointment call',
        durationMinutes: parseInt(eventFormDuration) || 30,
        priceAmount: parseFloat(eventFormPrice) || 0,
        locationType: eventFormLocation,
        bufferBeforeMinutes: parseInt(eventFormBufferBefore) || 5,
        bufferAfterMinutes: parseInt(eventFormBufferAfter) || 10
      } : e);
      setEventTypes(updated);
    } else {
      const newEvt: EventTypeConfig = {
        id: `event_${Date.now()}`,
        title: eventFormTitle,
        slug: eventFormSlug || eventFormTitle.toLowerCase().replace(/\s+/g, '-'),
        description: eventFormDesc || 'Custom appointment call',
        color: '#10b981',
        durationMinutes: parseInt(eventFormDuration) || 30,
        locationType: eventFormLocation,
        locationDetails: eventFormLocation === 'zoom' ? 'Zoom HD Video Room' : 'Phone Call',
        priceAmount: parseFloat(eventFormPrice) || 0,
        assignedHostIds: [hosts[0]?.id || 'host_marcus_v'],
        assignmentMode: 'equal_distribution',
        bufferBeforeMinutes: parseInt(eventFormBufferBefore) || 5,
        bufferAfterMinutes: parseInt(eventFormBufferAfter) || 10,
        minNoticeHours: 4,
        maxAdvanceDays: 30,
        weeklySchedule: [
          { day: 'Monday', enabled: true, startTime: '09:00', endTime: '17:00' },
          { day: 'Tuesday', enabled: true, startTime: '09:00', endTime: '17:00' },
          { day: 'Wednesday', enabled: true, startTime: '09:00', endTime: '17:00' },
          { day: 'Thursday', enabled: true, startTime: '09:00', endTime: '17:00' },
          { day: 'Friday', enabled: true, startTime: '09:00', endTime: '16:00' },
          { day: 'Saturday', enabled: false, startTime: '10:00', endTime: '14:00' },
          { day: 'Sunday', enabled: false, startTime: '10:00', endTime: '14:00' }
        ],
        customQuestions: [
          { id: 'q_goal', label: 'Primary objective for this meeting:', type: 'text', required: true }
        ],
        redirectUrl: 'https://growthlabs.launchengine.io/thank-you',
        sendEmailReminders: true,
        sendSmsReminders: true
      };
      setEventTypes([...eventTypes, newEvt]);
    }

    setIsEventModalOpen(false);
    setEditingEvent(null);
    setEventFormTitle('');
    setEventFormSlug('');
    setEventFormDesc('');
  };

  const handleOpenEditEvent = (evt: EventTypeConfig) => {
    setEditingEvent(evt);
    setEventFormTitle(evt.title);
    setEventFormSlug(evt.slug);
    setEventFormDesc(evt.description);
    setEventFormDuration(evt.durationMinutes.toString());
    setEventFormPrice(evt.priceAmount.toString());
    setEventFormLocation(evt.locationType);
    setEventFormBufferBefore(evt.bufferBeforeMinutes.toString());
    setEventFormBufferAfter(evt.bufferAfterMinutes.toString());
    setIsEventModalOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (eventTypes.length <= 1) {
      alert('Must maintain at least 1 active event type.');
      return;
    }
    if (confirm('Delete this event type?')) {
      setEventTypes(eventTypes.filter(e => e.id !== eventId));
    }
  };

  // Create or Update Host
  const handleSaveHost = () => {
    if (!hostFormName.trim() || !hostFormEmail.trim()) return;

    if (editingHost) {
      const updated = hosts.map(h => h.id === editingHost.id ? {
        ...h,
        name: hostFormName,
        email: hostFormEmail,
        role: hostFormRole || 'Account Advisor',
        zoomUrl: hostFormZoomUrl || h.zoomUrl,
        phone: hostFormPhone || h.phone
      } : h);
      setHosts(updated);
    } else {
      const newHost: MeetingHost = {
        id: `host_${Date.now()}`,
        name: hostFormName,
        email: hostFormEmail,
        avatar: `https://images.unsplash.com/photo-${1534528741775 + (hosts.length * 100)}?w=150&auto=format&fit=crop&q=80`,
        role: hostFormRole || 'Account Advisor',
        bio: 'High-ticket sales & funnel strategy specialist.',
        rating: 5.0,
        zoomUrl: hostFormZoomUrl || `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        phone: hostFormPhone || '+1 (555) 019-2831',
        isAvailable: true
      };
      setHosts([...hosts, newHost]);
    }

    setIsHostModalOpen(false);
    setEditingHost(null);
    setHostFormName('');
    setHostFormEmail('');
    setHostFormRole('');
  };

  const handleOpenEditHost = (host: MeetingHost) => {
    setEditingHost(host);
    setHostFormName(host.name);
    setHostFormEmail(host.email);
    setHostFormRole(host.role);
    setHostFormZoomUrl(host.zoomUrl);
    setHostFormPhone(host.phone);
    setIsHostModalOpen(true);
  };

  const handleToggleHostAvailability = (hostId: string) => {
    const updated = hosts.map(h => h.id === hostId ? { ...h, isAvailable: !h.isAvailable } : h);
    setHosts(updated);
  };

  // Reset to Demo Defaults
  const handleResetDefaults = () => {
    if (confirm('Reset ChronoChimp appointments and schedules back to factory demo state?')) {
      resetChronoChimpStorageToDefaults();
      setHosts(loadStoredHosts());
      setEventTypes(loadStoredEventTypes());
      setAppointments(loadStoredAppointments());
      setChronoSettings(loadStoredChronoSettings());
      setSimBookingReceipt(null);
      alert('ChronoChimp data reset to default demo state.');
    }
  };

  // ── SIMULATION 1: EXECUTE LIVE BOOKING ──
  const handleSimulateLiveBooking = () => {
    if (!simClientName.trim() || !simClientEmail.trim()) {
      alert('Please provide customer name and email.');
      return;
    }

    setIsSimulatingBooking(true);

    setTimeout(() => {
      const evt = eventTypes.find(e => e.id === simSelectedEventId) || eventTypes[0];
      const assignedHost = hosts.find(h => h.id === simSelectedHostId) || hosts[0];

      const newAppt: BookedAppointment = {
        id: `appt_${Date.now()}`,
        eventTypeId: evt.id,
        eventTitle: evt.title,
        hostId: assignedHost.id,
        hostName: assignedHost.name,
        hostAvatar: assignedHost.avatar,
        customerName: simClientName,
        customerEmail: simClientEmail,
        customerPhone: simClientPhone,
        date: simDate,
        timeSlot: simSlot,
        locationType: evt.locationType,
        meetingLink: assignedHost.zoomUrl || `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        status: 'Upcoming',
        answers: {
          q_revenue: simClientRevenue,
          q_goal: simClientGoal
        },
        createdAt: new Date().toISOString(),
        isPaid: evt.priceAmount > 0,
        amountPaid: evt.priceAmount
      };

      const updated = [newAppt, ...appointments];
      setAppointments(updated);
      setIsSimulatingBooking(false);
      setSimBookingReceipt(newAppt);
      setBookingSuccessMsg(`🎉 Live Appointment Confirmed with ${assignedHost.name} on ${simDate} at ${simSlot}!`);
    }, 600);
  };

  // ── SIMULATION 2: TEST SMS SEQUENCE DISPATCH ──
  const handleSimulateSmsSequence = () => {
    setSimSmsDispatched(true);
    setTimeout(() => setSimSmsDispatched(false), 5000);
  };

  // ── SIMULATION 3: ATTENDANCE STATUS SIMULATION ──
  const handleSimulateStatusChange = (status: AppointmentStatus) => {
    const target = appointments.find(a => a.id === selectedStatusSimApptId);
    if (!target) return;
    handleUpdateApptStatus(target.id, status);
    setStatusSimFeedback(`✅ Meeting with ${target.customerName} marked as [${status}]. Status logged in DB.`);
    setTimeout(() => setStatusSimFeedback(null), 4000);
  };

  // ── SUPABASE SYNC TRIGGER ──
  const handleTriggerSupabaseSync = async () => {
    setIsSyncingDb(true);
    const res = await syncChronoChimpToSupabase(hosts, eventTypes, appointments, chronoSettings);
    setDbSyncStatus(res);
    setIsSyncingDb(false);
  };

  // Export CSV of Appointments
  const handleExportCsv = () => {
    let csv = 'data:text/csv;charset=utf-8,ID,CustomerName,Email,Phone,EventTitle,Host,Date,Time,Status,Location\n';
    appointments.forEach(a => {
      csv += `${a.id},${a.customerName},${a.customerEmail},${a.customerPhone},${a.eventTitle},${a.hostName},${a.date},${a.timeSlot},${a.status},${a.locationType}\n`;
    });
    const encoded = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute('download', `chronochimp_appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Appointments Roster
  const filteredAppointments = appointments.filter(appt => {
    const matchesStatus = apptFilterStatus === 'All' || appt.status === apptFilterStatus;
    const matchesSearch = appt.customerName.toLowerCase().includes(apptSearchQuery.toLowerCase()) ||
                          appt.customerEmail.toLowerCase().includes(apptSearchQuery.toLowerCase()) ||
                          appt.eventTitle.toLowerCase().includes(apptSearchQuery.toLowerCase()) ||
                          appt.hostName.toLowerCase().includes(apptSearchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto flex flex-col font-sans">
      {/* ── TOP CHRONOCHIMP BRAND HEADER ── */}
      <div 
        className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shrink-0 border-b border-emerald-700/40 shadow-lg"
        style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #0d9488 100%)' }}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl shadow-emerald-950/30">
            <CalendarCheck className="w-6 h-6 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                ChronoChimp
              </h2>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-emerald-400/20 text-emerald-100 border border-emerald-300/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                Appointment & Calendar Engine
              </span>
            </div>
            <p className="text-xs text-emerald-100/90 font-medium">1-on-1 strategy calls, round-robin team scheduling, Zoom automation & SMS reminders.</p>
          </div>
        </div>

        {/* Action Header Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => setActiveTab('simulations')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-sm ${activeTab === 'simulations' ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-amber-500/20 font-black' : 'bg-white/10 hover:bg-white/20 text-white border-white/20'}`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>⚡ Fun Simulations</span>
          </button>

          <button 
            onClick={() => { setEditingEvent(null); setEventFormTitle(''); setEventFormSlug(''); setEventFormDesc(''); setIsEventModalOpen(true); }}
            className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>New Event Type</span>
          </button>

          <button 
            onClick={handleExportCsv}
            className="px-3.5 py-2 bg-emerald-950/40 hover:bg-emerald-950/60 text-white border border-emerald-400/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-300" />
            <span>Export CSV</span>
          </button>

          <button 
            onClick={handleResetDefaults}
            className="p-2 bg-white/10 hover:bg-rose-500/30 text-white hover:text-rose-200 border border-white/20 rounded-xl text-xs transition-all"
            title="Reset to Demo State"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── SECONDARY TAB NAVIGATION ── */}
      <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 shadow-sm">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button 
          onClick={() => setActiveTab('roster')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 relative ${activeTab === 'roster' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Calendar className="w-4 h-4" />
          <span>Appointments ({appointments.length})</span>
          {totalUpcoming > 0 && (
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
              {totalUpcoming}
            </span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('event_types')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'event_types' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Clock className="w-4 h-4" />
          <span>Event Types ({eventTypes.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('hosts')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'hosts' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Users className="w-4 h-4" />
          <span>Team Hosts ({hosts.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('reminders')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'reminders' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>SMS & Reminders</span>
        </button>

        <button 
          onClick={() => setActiveTab('embed')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'embed' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Share2 className="w-4 h-4" />
          <span>Embed Widget</span>
        </button>

        <button 
          onClick={() => setActiveTab('simulations')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'simulations' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/25 font-black' : 'text-amber-700 bg-amber-50 hover:bg-amber-100'}`}
        >
          <Zap className="w-4 h-4 fill-amber-500" />
          <span>Simulations & Workflows</span>
        </button>

        <button 
          onClick={() => setActiveTab('database')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'database' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Database className="w-4 h-4" />
          <span>Database & Schema</span>
        </button>

        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'settings' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-black' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* ── TOAST NOTIFICATION ── */}
      {bookingSuccessMsg && (
        <div className="mx-6 mt-4 p-4 bg-emerald-900 text-white border-2 border-emerald-400 rounded-2xl flex items-center justify-between shadow-2xl animate-fade-in text-xs font-bold">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>{bookingSuccessMsg}</span>
          </div>
          <button onClick={() => setBookingSuccessMsg(null)} className="text-emerald-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── MAIN CONTENT DISPLAY ── */}
      <div className="flex-1 p-6 space-y-6 max-w-[1600px] mx-auto w-full">

        {/* ── TAB 1: OVERVIEW DASHBOARD ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm hover:border-emerald-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Upcoming Bookings</p>
                  <h3 className="text-2xl font-black text-slate-900">{totalUpcoming}</h3>
                </div>
                <div className="text-[11px] text-emerald-700 font-bold">
                  All Zoom links auto-generated
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm hover:border-emerald-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Completed Strategy Calls</p>
                  <h3 className="text-2xl font-black text-teal-700">{totalCompleted}</h3>
                </div>
                <div className="text-[11px] text-teal-700 font-bold">
                  Show-up rate ~94.8%
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm hover:border-emerald-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Paid Consultation Revenue</p>
                  <h3 className="text-2xl font-black text-amber-600">${totalPaidRevenue.toLocaleString()}</h3>
                </div>
                <div className="text-[11px] text-amber-700 font-bold">
                  Direct Stripe & Checkout sync
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm hover:border-emerald-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center border border-green-200">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">Active Team Hosts</p>
                  <h3 className="text-2xl font-black text-green-700">{hosts.length}</h3>
                </div>
                <div className="text-[11px] text-green-700 font-bold">
                  Round-Robin distribution active
                </div>
              </div>
            </div>

            {/* AGENDA & HOST AVAILABILITY ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Agenda Stream */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-black text-slate-900">Upcoming Appointment Agenda</h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('roster')}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                  >
                    View All ({appointments.length}) <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {appointments.filter(a => a.status === 'Upcoming').slice(0, 4).map(appt => (
                    <div key={appt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-300 transition-all">
                      <div className="flex items-start gap-3">
                        <img src={appt.hostAvatar} alt={appt.hostName} className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{appt.customerName}</span>
                            <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              {appt.timeSlot}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{appt.eventTitle}</p>
                          <p className="text-[11px] text-slate-500 font-mono">Host: {appt.hostName} • {appt.customerEmail}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a 
                          href={appt.meetingLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join Zoom</span>
                        </a>

                        <button 
                          onClick={() => { setSelectedAppt(appt); setIsApptDetailsOpen(true); }}
                          className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold border border-slate-200"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Hosts Roster Quick Status */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    Active Team Hosts
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Round-Robin sales reps & call hosts.</p>
                </div>

                <div className="space-y-3">
                  {hosts.map(h => (
                    <div key={h.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={h.avatar} alt={h.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div className="font-bold text-xs text-slate-900">{h.name}</div>
                          <div className="text-[10px] text-slate-500">{h.role}</div>
                        </div>
                      </div>
                      <span className={`w-2.5 h-2.5 rounded-full ${h.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} title={h.isAvailable ? 'Available for calls' : 'Out of Office'} />
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setActiveTab('simulations')}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Launch Booking Simulator</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: APPOINTMENTS ROSTER ── */}
        {activeTab === 'roster' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Appointments Roster & Bookings</h3>
                <p className="text-xs text-slate-500">Manage all booked calls, inspect customer qualification answers, and update meeting statuses.</p>
              </div>

              <button 
                onClick={() => setActiveTab('simulations')}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Simulate New Booking</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="text"
                  placeholder="Search by client name, email, event, or host..."
                  value={apptSearchQuery}
                  onChange={(e) => setApptSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {(['All', 'Upcoming', 'Completed', 'Rescheduled', 'Cancelled'] as const).map(status => (
                  <button 
                    key={status}
                    onClick={() => setApptFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${apptFilterStatus === status ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 uppercase font-mono text-[10px]">
                    <th className="py-3 px-4 font-bold">Client / Attendee</th>
                    <th className="py-3 px-4 font-bold">Event Type</th>
                    <th className="py-3 px-4 font-bold">Host</th>
                    <th className="py-3 px-4 font-bold">Date & Time</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold">Meeting Link</th>
                    <th className="py-3 px-4 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map(appt => (
                    <tr key={appt.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{appt.customerName}</div>
                        <div className="text-[11px] text-slate-500">{appt.customerEmail}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800">{appt.eventTitle}</div>
                        {appt.isPaid && (
                          <span className="text-[10px] font-bold text-amber-700 font-mono">Paid (${appt.amountPaid})</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <img src={appt.hostAvatar} alt={appt.hostName} className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-medium text-slate-800">{appt.hostName}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-bold text-slate-900">{appt.date}</div>
                        <div className="text-[11px] text-emerald-700 font-bold">{appt.timeSlot}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${
                          appt.status === 'Upcoming' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          appt.status === 'Completed' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                          appt.status === 'Rescheduled' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                          'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}>
                          {appt.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <a 
                          href={appt.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 rounded text-xs font-mono font-bold inline-flex items-center gap-1.5"
                        >
                          <Video className="w-3 h-3 text-emerald-600" />
                          <span>Zoom Link</span>
                        </a>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1">
                        <button 
                          onClick={() => { setSelectedAppt(appt); setIsApptDetailsOpen(true); }}
                          className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold border border-slate-200"
                        >
                          Details
                        </button>

                        {appt.status === 'Upcoming' && (
                          <button 
                            onClick={() => handleUpdateApptStatus(appt.id, 'Completed')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                          >
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 3: EVENT TYPES & SERVICES ── */}
        {activeTab === 'event_types' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Event Types & Call Packages</h3>
                <p className="text-xs text-slate-500">Configure meeting durations, custom intake questionnaires, pricing, buffer rules & round-robin hosts.</p>
              </div>

              <button 
                onClick={() => { setEditingEvent(null); setEventFormTitle(''); setEventFormSlug(''); setEventFormDesc(''); setIsEventModalOpen(true); }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Event Type</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventTypes.map(evt => (
                <div key={evt.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:border-emerald-400 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono font-black px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {evt.durationMinutes} MINS • {evt.locationType.toUpperCase()}
                      </span>
                      <span className="font-black text-sm text-emerald-700 font-mono">
                        {evt.priceAmount > 0 ? `$${evt.priceAmount}` : 'FREE'}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900">{evt.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{evt.description}</p>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Buffer Before/After:</span>
                        <span className="font-mono font-bold text-slate-800">{evt.bufferBeforeMinutes}m / {evt.bufferAfterMinutes}m</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Assigned Hosts:</span>
                        <span className="font-bold text-emerald-700">{evt.assignedHostIds.length} Reps</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Custom Intake Form:</span>
                        <span className="font-bold text-slate-800">{evt.customQuestions.length} Questions</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenEditEvent(evt)}
                      className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Edit Rules</span>
                    </button>

                    <button 
                      onClick={() => handleDeleteEvent(evt.id)}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200 text-xs"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: TEAM HOSTS ── */}
        {activeTab === 'hosts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Team Hosts & Sales Reps</h3>
                <p className="text-xs text-slate-500">Manage meeting hosts, personal Zoom meeting rooms, and active availability.</p>
              </div>

              <button 
                onClick={() => { setEditingHost(null); setHostFormName(''); setHostFormEmail(''); setHostFormRole(''); setIsHostModalOpen(true); }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Team Host</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hosts.map(host => (
                <div key={host.id} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <img src={host.avatar} alt={host.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-md" />
                      <button 
                        onClick={() => handleToggleHostAvailability(host.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-mono font-black border transition-all ${host.isAvailable ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-500 border-slate-300'}`}
                      >
                        {host.isAvailable ? '● AVAILABLE' : '○ OUT OF OFFICE'}
                      </button>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-slate-900">{host.name}</h4>
                      <p className="text-xs text-emerald-700 font-bold">{host.role}</p>
                      <p className="text-xs text-slate-500 mt-1">{host.bio}</p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-mono">{host.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Video className="w-3.5 h-3.5 text-teal-600" />
                        <span className="font-mono truncate">{host.zoomUrl}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenEditHost(host)}
                      className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold border border-slate-200 flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Edit Host Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 5: SMS & REMINDERS ── */}
        {activeTab === 'reminders' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h3 className="text-xl font-black text-slate-900">Automated SMS & Email Reminders</h3>
              <p className="text-xs text-slate-500">Keep attendance above 90% with multi-stage automated text reminders and calendar invites.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-emerald-800">1. Instant Booking Confirmation SMS (Sent Immediately)</span>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">AUTOMATED</span>
                  </div>
                  <p className="text-xs font-mono text-slate-800 bg-white p-3 rounded-lg border border-slate-200">
                    "Hey {`{CUSTOMER_NAME}`}, your {`{EVENT_TITLE}`} call with {`{HOST_NAME}`} is confirmed for {`{DATE}`} at {`{TIME}`}. Join Zoom: {`{MEETING_LINK}`}"
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-emerald-800">2. 24-Hour Pre-Call Strategy Prep (Sent 24h Before)</span>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">AUTOMATED</span>
                  </div>
                  <p className="text-xs font-mono text-slate-800 bg-white p-3 rounded-lg border border-slate-200">
                    "Reminder: Tomorrow at {`{TIME}`} is your 1-on-1 session with {`{HOST_NAME}`}. Please be on a laptop with camera ready!"
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-emerald-800">3. 10-Minute Urgent Alert (Sent 10m Before)</span>
                    <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">AUTOMATED</span>
                  </div>
                  <p className="text-xs font-mono text-slate-800 bg-white p-3 rounded-lg border border-slate-200">
                    "Starting now! {`{HOST_NAME}`} is waiting inside the meeting room: {`{MEETING_LINK}`}"
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">Twilio SMS Gateway: <strong className="text-emerald-700">Connected</strong></span>
                <button 
                  onClick={() => setActiveTab('simulations')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-sm"
                >
                  Test SMS Simulation →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 6: EMBED WIDGET & FUNNEL INTEGRATION ── */}
        {activeTab === 'embed' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h3 className="text-xl font-black text-slate-900">Funnel Builder & Embed Code Integration</h3>
              <p className="text-xs text-slate-500">Insert ChronoChimp interactive calendars directly into any FunnelLegends visual canvas page.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  Method 1: Native Visual Canvas Drag-and-Drop (Recommended)
                </h4>
                <p className="text-xs text-slate-600">
                  Open the <strong>Visual Builder</strong>, expand the Interactive catalog, and drag the <strong>ChronoChimp Interactive Booking Widget</strong> onto any section of your page. It automatically loads your active event types!
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-teal-600" />
                    Method 2: Standalone HTML / iFrame Embed Code
                  </h4>
                  <button 
                    onClick={() => handleCopy(`<iframe src="https://growthlabs.launchengine.io/book/${eventTypes[0]?.slug}" width="100%" height="700" frameborder="0"></iframe>`, 'embed_code')}
                    className="px-3 py-1 bg-white border border-slate-200 text-slate-800 hover:text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-1.5"
                  >
                    {copiedId === 'embed_code' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'embed_code' ? 'Copied Code!' : 'Copy iFrame Code'}</span>
                  </button>
                </div>
                <pre className="text-xs font-mono bg-white p-3 rounded-lg border border-slate-200 text-slate-800 overflow-x-auto">
                  {`<iframe src="https://growthlabs.launchengine.io/book/${eventTypes[0]?.slug}" width="100%" height="700" frameborder="0"></iframe>`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 7: FUN SIMULATIONS & WORKFLOWS ENGINE ── */}
        {activeTab === 'simulations' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-400 text-slate-950 rounded-full text-xs font-black font-mono flex items-center gap-1.5 shadow-sm">
                  <Zap className="w-4 h-4 fill-slate-950" /> CHRONOCHIMP SANDBOX
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                ChronoChimp Interactive Booking & Workflow Simulations
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-3xl leading-relaxed">
                Experience full real-time call booking, automatic Zoom room generation, multi-stage SMS sequence dispatch, round-robin team distribution, and status transitions.
              </p>
            </div>

            {/* SIMULATION 1: LIVE BOOKING SIMULATOR */}
            <div className="bg-white border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">Simulation 1: Live Interactive 1-on-1 Booking Simulator</h4>
                    <p className="text-xs text-slate-500">Simulate a client selecting an appointment, submitting qualification answers & generating a Zoom room.</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  REAL-TIME DB SYNC
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Select Event Type</label>
                  <select 
                    value={simSelectedEventId}
                    onChange={(e) => setSimSelectedEventId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold"
                  >
                    {eventTypes.map(e => (
                      <option key={e.id} value={e.id}>{e.title} ({e.durationMinutes}m • {e.priceAmount > 0 ? `$${e.priceAmount}` : 'FREE'})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Assigned Team Host</label>
                  <select 
                    value={simSelectedHostId}
                    onChange={(e) => setSimSelectedHostId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 font-bold"
                  >
                    {hosts.map(h => (
                      <option key={h.id} value={h.id}>{h.name} ({h.role})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Date</label>
                    <input 
                      type="date"
                      value={simDate}
                      onChange={(e) => setSimDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Slot</label>
                    <select 
                      value={simSlot}
                      onChange={(e) => setSimSlot(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-bold"
                    >
                      <option value="09:00">09:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:30">04:30 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Client Full Name</label>
                  <input 
                    type="text"
                    value={simClientName}
                    onChange={(e) => setSimClientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Client Email</label>
                  <input 
                    type="email"
                    value={simClientEmail}
                    onChange={(e) => setSimClientEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Client Phone (SMS Alerts)</label>
                  <input 
                    type="text"
                    value={simClientPhone}
                    onChange={(e) => setSimClientPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <button 
                onClick={handleSimulateLiveBooking}
                disabled={isSimulatingBooking}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:brightness-110 text-white rounded-2xl text-sm font-black shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                {isSimulatingBooking ? (
                  <span className="flex items-center gap-2">
                    <Activity className="w-5 h-5 animate-spin" />
                    Generating Zoom Link & Triggering Calendar Sync...
                  </span>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-white" />
                    <span>SIMULATE LIVE BOOKING & GENERATE ZOOM MEETING ROOM →</span>
                  </>
                )}
              </button>

              {simBookingReceipt && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2 animate-fade-in text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-emerald-950">✓ Appointment Generated: {simBookingReceipt.eventTitle}</span>
                    <span className="font-mono text-emerald-700 font-bold">{simBookingReceipt.id}</span>
                  </div>
                  <p className="text-slate-700">
                    Host: <strong>{simBookingReceipt.hostName}</strong> • Date: <strong>{simBookingReceipt.date} at {simBookingReceipt.timeSlot}</strong> • Zoom URL: <a href={simBookingReceipt.meetingLink} target="_blank" rel="noreferrer" className="text-emerald-700 underline font-mono">{simBookingReceipt.meetingLink}</a>
                  </p>
                </div>
              )}
            </div>

            {/* SIMULATION 2: SMS HANDSET SIMULATION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base font-black text-slate-900">Simulation 2: SMS Handset Simulator</h4>
                </div>
                <p className="text-xs text-slate-500">Live preview of the SMS messages dispatched to {simClientPhone}.</p>

                <div className="bg-slate-950 p-4 rounded-2xl space-y-3 font-mono text-xs text-white">
                  <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl space-y-1">
                    <span className="text-[10px] text-emerald-300 font-bold">ChronoChimp SMS • Just Now</span>
                    <p className="text-emerald-100">
                      Hi {simClientName}! Your strategy call with {hosts[0]?.name} is confirmed for {simDate} at {simSlot}. Zoom: https://zoom.us/j/9981248019
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold">Scheduled • 24h Before Call</span>
                    <p className="text-slate-300">
                      Quick reminder: Tomorrow is your 1-on-1 consultation! Reply YES to confirm attendance.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleSimulateSmsSequence}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{simSmsDispatched ? '✓ SMS Dispatched to Handset!' : 'Test Fire Instant SMS Reminder'}</span>
                </button>
              </div>

              {/* SIMULATION 3: ATTENDANCE STATUS SIMULATION */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <h4 className="text-base font-black text-slate-900">Simulation 3: Meeting Attendance Engine</h4>
                </div>
                <p className="text-xs text-slate-500">Simulate post-meeting attendance marking and automatic CRM status synchronization.</p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Select Target Appointment</label>
                    <select 
                      value={selectedStatusSimApptId}
                      onChange={(e) => setSelectedStatusSimApptId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                    >
                      {appointments.map(a => (
                        <option key={a.id} value={a.id}>{a.customerName} - {a.eventTitle} ({a.date}) [{a.status}]</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button 
                      onClick={() => handleSimulateStatusChange('Completed')}
                      className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-sm"
                    >
                      ✓ Completed
                    </button>
                    <button 
                      onClick={() => handleSimulateStatusChange('Rescheduled')}
                      className="py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-sm"
                    >
                      ↻ Rescheduled
                    </button>
                    <button 
                      onClick={() => handleSimulateStatusChange('Cancelled')}
                      className="py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-sm"
                    >
                      ✕ Cancelled
                    </button>
                    <button 
                      onClick={() => handleSimulateStatusChange('NoShow')}
                      className="py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl shadow-sm"
                    >
                      ⊘ No-Show
                    </button>
                  </div>

                  {statusSimFeedback && (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-950 font-bold animate-fade-in">
                      {statusSimFeedback}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* VISUAL PIPELINE DIAGRAM */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
                <div>
                  <h4 className="text-lg font-black text-white" style={{ fontFamily: 'Outfit, Inter, sans-serif' }}>
                    ChronoChimp Automated Lifecycle Pipeline Architecture
                  </h4>
                  <p className="text-xs text-slate-400">Automated end-to-end flow from visual canvas page booking to live video call execution.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-center text-xs">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">1</span>
                  <h5 className="font-bold text-emerald-300">Canvas Page</h5>
                  <p className="text-[11px] text-slate-300">Visitor views ChronoChimp booking element on sales funnel</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">2</span>
                  <h5 className="font-bold text-emerald-300">Date/Time Slot</h5>
                  <p className="text-[11px] text-slate-300">Real-time availability check across assigned team hosts</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">3</span>
                  <h5 className="font-bold text-emerald-300">Intake Form</h5>
                  <p className="text-[11px] text-slate-300">Prospect answers qualification questions & goal targets</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-teal-400 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">4</span>
                  <h5 className="font-bold text-teal-300">Zoom Created</h5>
                  <p className="text-[11px] text-slate-300">HD Zoom link generated and attached to appointment</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">5</span>
                  <h5 className="font-bold text-amber-300">SMS Reminders</h5>
                  <p className="text-[11px] text-slate-300">Multi-stage 24h & 10min SMS dispatched via Twilio</p>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="w-6 h-6 rounded-full bg-green-400 text-slate-950 font-black text-xs mx-auto flex items-center justify-center">6</span>
                  <h5 className="font-bold text-green-300">CRM Tag Sync</h5>
                  <p className="text-[11px] text-slate-300">Lead tagged in CRM Pipeline as Call_Booked</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 8: DATABASE & SCHEMA ── */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Supabase SQL Database & Schema Inspector</h3>
                <p className="text-xs text-slate-500">Inspect database tables, sync state, and copy production SQL migration script.</p>
              </div>

              <button 
                onClick={handleTriggerSupabaseSync}
                disabled={isSyncingDb}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/20 flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncingDb ? 'animate-spin' : ''}`} />
                <span>{isSyncingDb ? 'Syncing to Supabase...' : 'Sync to Supabase Now'}</span>
              </button>
            </div>

            {dbSyncStatus && (
              <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between ${dbSyncStatus.success ? 'bg-emerald-50 text-emerald-900 border-emerald-300' : 'bg-amber-50 text-amber-900 border-amber-300'}`}>
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  <span>{dbSyncStatus.message}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">{dbSyncStatus.timestamp}</span>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Hosts Table</span>
                <div className="text-xl font-black text-slate-900">{hosts.length} Records</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Event Types</span>
                <div className="text-xl font-black text-emerald-700">{eventTypes.length} Records</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Appointments</span>
                <div className="text-xl font-black text-teal-700">{appointments.length} Records</div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-500">Settings</span>
                <div className="text-xl font-black text-green-700">1 Row (Active)</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base font-black text-slate-900">PostgreSQL / Supabase DDL Migration Script</h4>
                </div>

                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(CHRONOCHIMP_SQL_SCHEMA);
                    setCopiedSchema(true);
                    setTimeout(() => setCopiedSchema(false), 2000);
                  }}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  {copiedSchema ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSchema ? 'Copied SQL Script!' : 'Copy SQL Script'}</span>
                </button>
              </div>

              <div className="bg-slate-950 text-emerald-400 p-4 rounded-2xl font-mono text-xs max-h-96 overflow-y-auto">
                <pre>{CHRONOCHIMP_SQL_SCHEMA}</pre>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 9: SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="text-xl font-black text-slate-900">ChronoChimp Global Settings</h3>
              <p className="text-xs text-slate-500">Configure default timezone, calendar sync & auto-confirmation rules.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <label className="text-xs font-bold text-slate-700 block">Default Organization Timezone</label>
                <input 
                  type="text"
                  value={chronoSettings.timezone}
                  onChange={(e) => setChronoSettings({ ...chronoSettings, timezone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-mono font-bold"
                />
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Google Calendar 2-Way Sync</h4>
                  <p className="text-xs text-slate-500">Block slots automatically when hosts are busy on Google Calendar.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={chronoSettings.googleCalendarSync}
                  onChange={(e) => setChronoSettings({ ...chronoSettings, googleCalendarSync: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-0 cursor-pointer accent-emerald-600"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Auto-Confirm Booking Requests</h4>
                  <p className="text-xs text-slate-500">Automatically confirm meetings without manual admin approval.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={chronoSettings.autoConfirmBooking}
                  onChange={(e) => setChronoSettings({ ...chronoSettings, autoConfirmBooking: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-0 cursor-pointer accent-emerald-600"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── MODAL 1: APPOINTMENT DETAILS & ANSWERS ── */}
      {isApptDetailsOpen && selectedAppt && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">{selectedAppt.customerName} Meeting</h3>
                <p className="text-xs text-slate-500">{selectedAppt.eventTitle}</p>
              </div>
              <button onClick={() => setIsApptDetailsOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-bold">Date & Time:</span>
                  <p className="font-mono font-bold text-slate-900">{selectedAppt.date} at {selectedAppt.timeSlot}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-bold">Assigned Host:</span>
                  <p className="font-bold text-emerald-800">{selectedAppt.hostName}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="text-slate-500 font-bold">Zoom Meeting Room:</span>
                <a href={selectedAppt.meetingLink} target="_blank" rel="noreferrer" className="text-emerald-700 font-mono block underline">
                  {selectedAppt.meetingLink}
                </a>
              </div>

              {selectedAppt.answers && Object.keys(selectedAppt.answers).length > 0 && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <span className="font-bold text-emerald-800 uppercase font-mono text-[10px]">Client Qualification Answers:</span>
                  {Object.entries(selectedAppt.answers).map(([key, val]) => (
                    <div key={key} className="text-xs">
                      <span className="font-bold text-slate-700">{key}: </span>
                      <span className="text-slate-900">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs font-bold text-slate-500">Status: <strong className="text-emerald-700">{selectedAppt.status}</strong></span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    handleUpdateApptStatus(selectedAppt.id, 'Completed');
                    setIsApptDetailsOpen(false);
                  }}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-sm"
                >
                  Mark Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: CREATE / EDIT EVENT TYPE ── */}
      {isEventModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-black text-slate-900">{editingEvent ? 'Edit Event Type' : 'Create New Event Type'}</h3>
              <button onClick={() => setIsEventModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Event Title</label>
                <input 
                  type="text"
                  placeholder="e.g. 30-Minute VIP Consultation"
                  value={eventFormTitle}
                  onChange={(e) => setEventFormTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <input 
                  type="text"
                  placeholder="Brief description of the call"
                  value={eventFormDesc}
                  onChange={(e) => setEventFormDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration (Mins)</label>
                  <input 
                    type="number"
                    value={eventFormDuration}
                    onChange={(e) => setEventFormDuration(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price ($ Amount)</label>
                  <input 
                    type="number"
                    value={eventFormPrice}
                    onChange={(e) => setEventFormPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Buffer Before (Mins)</label>
                  <input 
                    type="number"
                    value={eventFormBufferBefore}
                    onChange={(e) => setEventFormBufferBefore(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Buffer After (Mins)</label>
                  <input 
                    type="number"
                    value={eventFormBufferAfter}
                    onChange={(e) => setEventFormBufferAfter(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <button 
                onClick={handleSaveEventType}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20"
              >
                {editingEvent ? 'Update Event Type' : 'Save Event Type'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 3: CREATE / EDIT HOST ── */}
      {isHostModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-black text-slate-900">{editingHost ? 'Edit Team Host' : 'Add New Team Host'}</h3>
              <button onClick={() => setIsHostModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Host Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Stephen Tofield"
                  value={hostFormName}
                  onChange={(e) => setHostFormName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input 
                  type="email"
                  placeholder="stephen@agency.demo"
                  value={hostFormEmail}
                  onChange={(e) => setHostFormEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Role / Specialization</label>
                <input 
                  type="text"
                  placeholder="e.g. Senior Funnel Strategist"
                  value={hostFormRole}
                  onChange={(e) => setHostFormRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Zoom Personal Meeting Link</label>
                <input 
                  type="text"
                  placeholder="https://zoom.us/j/1234567890"
                  value={hostFormZoomUrl}
                  onChange={(e) => setHostFormZoomUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
              <button 
                onClick={handleSaveHost}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-600/20"
              >
                {editingHost ? 'Update Host' : 'Add Team Host'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
