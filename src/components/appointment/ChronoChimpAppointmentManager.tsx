import React, { useState, useEffect } from 'react';
import { 
  MeetingHost, EventTypeConfig, BookedAppointment, ChronoChimpSettings, AppointmentStatus, MeetingLocationType 
} from '../../types/appointment';
import { 
  loadStoredHosts, saveStoredHosts, 
  loadStoredEventTypes, saveStoredEventTypes, 
  loadStoredAppointments, saveStoredAppointments, 
  loadStoredChronoSettings, saveStoredChronoSettings 
} from '../../utils/appointmentStorage';
import { 
  Calendar, Clock, Video, Users, CheckCircle2, XCircle, Plus, Search, 
  Filter, Download, RefreshCw, ChevronRight, Eye, Settings, Share2, 
  Sparkles, ExternalLink, Trash2, Edit3, UserPlus, Check, X, AlertCircle, 
  Phone, MapPin, CreditCard, Mail, ShieldCheck, Zap, BarChart2, CalendarCheck,
  MessageSquare, Copy, Sliders, Globe, ArrowRight, CheckSquare, Layers
} from 'lucide-react';

export const ChronoChimpAppointmentManager: React.FC = () => {
  // Store state
  const [hosts, setHosts] = useState<MeetingHost[]>(loadStoredHosts());
  const [eventTypes, setEventTypes] = useState<EventTypeConfig[]>(loadStoredEventTypes());
  const [appointments, setAppointments] = useState<BookedAppointment[]>(loadStoredAppointments());
  const [chronoSettings, setChronoSettings] = useState<ChronoChimpSettings>(loadStoredChronoSettings());

  // Active Main Sub-Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'roster' | 'event_types' | 'hosts' | 'reminders' | 'embed' | 'settings'>('overview');

  // Filters & Search
  const [apptFilterStatus, setApptFilterStatus] = useState<AppointmentStatus | 'All'>('All');
  const [apptSearchQuery, setApptSearchQuery] = useState('');
  const [selectedAppt, setSelectedAppt] = useState<BookedAppointment | null>(null);
  const [isApptDetailsOpen, setIsApptDetailsOpen] = useState(false);

  // Event Type Edit/Create Modal
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventSlug, setNewEventSlug] = useState('');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [newEventDuration, setNewEventDuration] = useState('30');
  const [newEventPrice, setNewEventPrice] = useState('0');

  // Host Add Modal
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  const [newHostName, setNewHostName] = useState('');
  const [newHostEmail, setNewHostEmail] = useState('');
  const [newHostRole, setNewHostRole] = useState('');

  // Live Booking Demo Modal
  const [isBookingDemoOpen, setIsBookingDemoOpen] = useState(false);
  const [demoSelectedEventId, setDemoSelectedEventId] = useState(eventTypes[0]?.id || '');
  const [demoSelectedDate, setDemoSelectedDate] = useState('2026-08-16');
  const [demoSelectedSlot, setDemoSelectedSlot] = useState('11:00');
  const [demoName, setDemoName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  // Clipboard toast
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  // Create Event Type
  const handleCreateEventType = () => {
    if (!newEventTitle.trim()) return;
    const newEvt: EventTypeConfig = {
      id: `event_${Date.now()}`,
      title: newEventTitle,
      slug: newEventSlug || newEventTitle.toLowerCase().replace(/\s+/g, '-'),
      description: newEventDesc || 'Custom appointment call',
      color: '#6366f1',
      durationMinutes: parseInt(newEventDuration) || 30,
      locationType: 'zoom',
      locationDetails: 'Zoom HD Meeting',
      priceAmount: parseFloat(newEventPrice) || 0,
      assignedHostIds: [hosts[0]?.id || 'host_marcus_v'],
      assignmentMode: 'equal_distribution',
      bufferBeforeMinutes: 5,
      bufferAfterMinutes: 10,
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
    setIsEventModalOpen(false);
    setNewEventTitle('');
    setNewEventSlug('');
    setNewEventDesc('');
  };

  // Create Team Host
  const handleCreateHost = () => {
    if (!newHostName.trim() || !newHostEmail.trim()) return;
    const newHost: MeetingHost = {
      id: `host_${Date.now()}`,
      name: newHostName,
      email: newHostEmail,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: newHostRole || 'Account Advisor',
      bio: 'High-ticket sales & strategy specialist.',
      rating: 5.0,
      zoomUrl: `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      phone: '+1 (555) 019-2831',
      isAvailable: true
    };
    setHosts([...hosts, newHost]);
    setIsHostModalOpen(false);
    setNewHostName('');
    setNewHostEmail('');
    setNewHostRole('');
  };

  // Live Booking Submission Demo
  const handleExecuteDemoBooking = () => {
    if (!demoName.trim() || !demoEmail.trim()) {
      alert('Please fill in your name and email.');
      return;
    }
    const evt = eventTypes.find(e => e.id === demoSelectedEventId) || eventTypes[0];
    const assignedHost = hosts[0] || { id: 'host_marcus_v', name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' };

    const newAppt: BookedAppointment = {
      id: `appt_${Date.now()}`,
      eventTypeId: evt.id,
      eventTitle: evt.title,
      hostId: assignedHost.id,
      hostName: assignedHost.name,
      hostAvatar: assignedHost.avatar,
      customerName: demoName,
      customerEmail: demoEmail,
      customerPhone: demoPhone || '+1 (555) 881-2093',
      date: demoSelectedDate,
      timeSlot: demoSelectedSlot,
      locationType: evt.locationType,
      meetingLink: 'https://zoom.us/j/9981248019',
      status: 'Upcoming',
      answers: {
        q_goal: 'Test live booking via ChronoChimp scheduling widget.'
      },
      createdAt: new Date().toISOString(),
      isPaid: evt.priceAmount > 0,
      amountPaid: evt.priceAmount
    };

    const updated = [newAppt, ...appointments];
    setAppointments(updated);
    setIsBookingDemoOpen(false);
    setBookingSuccessMsg(`🎉 Appointment confirmed for ${demoName} on ${demoSelectedDate} at ${demoSelectedSlot}!`);
    setTimeout(() => setBookingSuccessMsg(null), 5000);
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
    <div className="flex-1 bg-white text-gray-900 overflow-y-auto flex flex-col">
      {/* TOP BRAND HEADER BAR */}
      <div className="bg-green-600 backdrop-blur-md border-b border-green-700 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-xl shadow-purple-600/30">
            <CalendarCheck className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black tracking-tight text-white">ChronoChimp</h2>
              <span className="text-[10px] uppercase font-mono font-extrabold bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3 text-white" />
                Calendar & Appointment Engine
              </span>
            </div>
            <p className="text-xs text-green-100">High-converting 1-on-1 calls, group masterclasses, round-robin team scheduling & SMS reminders.</p>
          </div>
        </div>

        {/* Action Header Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => setIsBookingDemoOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Test Live Booking Widget</span>
          </button>

          <button 
            onClick={() => setIsEventModalOpen(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>New Event Type</span>
          </button>

          <button 
            onClick={handleExportCsv}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* SECONDARY TAB NAVIGATION */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'overview' ? 'bg-green-600 text-white shadow-md shadow-green-600/30' : 'text-gray-500 hover:text-gray-800'}`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button 
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 relative ${activeTab === 'roster' ? 'bg-green-600 text-white shadow-md shadow-green-600/30' : 'text-gray-500 hover:text-gray-800'}`}
        >
          <Calendar className="w-4 h-4" />
          <span>Appointments ({appointments.length})</span>
          {totalUpcoming > 0 && (
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
              {totalUpcoming}
            </span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('event_types')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'event_types' ? 'bg-green-600 text-white shadow-md shadow-green-600/30' : 'text-gray-500 hover:text-gray-800'}`}
        >
          <Clock className="w-4 h-4" />
          <span>Event Types ({eventTypes.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('hosts')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'hosts' ? 'bg-green-600 text-white shadow-md shadow-green-600/30' : 'text-gray-500 hover:text-gray-800'}`}
        >
          <Users className="w-4 h-4" />
          <span>Team Hosts ({hosts.length})</span>
        </button>

        <button 
          onClick={() => setActiveTab('reminders')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'reminders' ? 'bg-green-600 text-white shadow-md shadow-green-600/30' : 'text-gray-500 hover:text-gray-800'}`}
        >
          <MessageSquare className="w-4 h-4 text-amber-400" />
          <span>SMS & Reminders</span>
        </button>

        <button 
          onClick={() => setActiveTab('embed')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'embed' ? 'bg-green-600 text-white shadow-md shadow-green-600/30' : 'text-gray-500 hover:text-gray-800'}`}
        >
          <Share2 className="w-4 h-4" />
          <span>Embed Widget</span>
        </button>

        <button 
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${activeTab === 'settings' ? 'bg-green-600 text-white shadow-md shadow-green-600/30' : 'text-gray-500 hover:text-gray-800'}`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>

      {/* FEEDBACK SUCCESS NOTIFICATION TOAST */}
      {bookingSuccessMsg && (
        <div className="mx-6 mt-4 p-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-2xl flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{bookingSuccessMsg}</span>
          </div>
          <button onClick={() => setBookingSuccessMsg(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MAIN CONTENT DISPLAY */}
      <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Upcoming Bookings</p>
                  <h3 className="text-2xl font-black text-white">{totalUpcoming}</h3>
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                  All Zoom links auto-generated
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Completed Meetings</p>
                  <h3 className="text-2xl font-black text-emerald-400">{totalCompleted}</h3>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Show-up rate ~92.4%
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Paid Consultation Revenue</p>
                  <h3 className="text-2xl font-black text-amber-300">${totalPaidRevenue.toLocaleString()}</h3>
                </div>
                <div className="text-[10px] text-amber-400/80 font-mono">
                  Stripe checkout deposit active
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 relative overflow-hidden shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Active Team Hosts</p>
                  <h3 className="text-2xl font-black text-indigo-300">{hosts.length}</h3>
                </div>
                <div className="text-[10px] text-indigo-400 font-mono">
                  Round-Robin distribution
                </div>
              </div>
            </div>

            {/* AGENDA & HOST AVAILABILITY ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Agenda Stream */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <h3 className="text-base font-bold text-slate-100">Upcoming Appointment Agenda</h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('roster')}
                    className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    View All ({appointments.length}) <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {appointments.filter(a => a.status === 'Upcoming').slice(0, 4).map(appt => (
                    <div key={appt.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-purple-500/50 transition-all">
                      <div className="flex items-start gap-3">
                        <img src={appt.hostAvatar} alt={appt.hostName} className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-100">{appt.customerName}</span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                              {appt.timeSlot}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{appt.eventTitle}</p>
                          <p className="text-[11px] text-slate-500 font-mono">Host: {appt.hostName} • {appt.customerEmail}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a 
                          href={appt.meetingLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join Zoom</span>
                        </a>

                        <button 
                          onClick={() => { setSelectedAppt(appt); setIsApptDetailsOpen(true); }}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold border border-slate-700"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Hosts Roster Quick Status */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    Active Team Hosts
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Round-Robin sales reps & call hosts.</p>
                </div>

                <div className="space-y-3">
                  {hosts.map(h => (
                    <div key={h.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={h.avatar} alt={h.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div className="font-bold text-xs text-slate-200">{h.name}</div>
                          <div className="text-[10px] text-slate-400">{h.role}</div>
                        </div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="Available for calls" />
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsBookingDemoOpen(true)}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Launch Booking Experience</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPOINTMENTS ROSTER */}
        {activeTab === 'roster' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input 
                  type="text"
                  placeholder="Search by client name, email, host, or call title..."
                  value={apptSearchQuery}
                  onChange={(e) => setApptSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {(['All', 'Upcoming', 'Completed', 'Rescheduled', 'Cancelled', 'NoShow'] as const).map(status => (
                  <button 
                    key={status}
                    onClick={() => setApptFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${apptFilterStatus === status ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Roster Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px]">
                    <th className="py-3.5 px-4">Client Name / Contact</th>
                    <th className="py-3.5 px-4">Event Type</th>
                    <th className="py-3.5 px-4">Assigned Host</th>
                    <th className="py-3.5 px-4">Date & Slot</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredAppointments.map(appt => (
                    <tr key={appt.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-100">{appt.customerName}</div>
                        <div className="text-[11px] text-slate-400">{appt.customerEmail} • {appt.customerPhone}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-200">{appt.eventTitle}</span>
                        {appt.isPaid && (
                          <span className="ml-2 px-2 py-0.5 bg-amber-950 text-amber-300 border border-amber-800 rounded text-[10px] font-mono font-bold">
                            PAID ${appt.amountPaid}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <img src={appt.hostAvatar} alt={appt.hostName} className="w-6 h-6 rounded-full object-cover" />
                          <span className="text-slate-300 font-medium">{appt.hostName}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-bold text-purple-300">{appt.date}</div>
                        <div className="text-[11px] text-slate-400">{appt.timeSlot} (EST)</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <a 
                          href={appt.meetingLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-indigo-400 hover:text-indigo-300 rounded font-mono text-[11px] font-bold flex items-center gap-1 w-max"
                        >
                          <Video className="w-3 h-3" />
                          <span>Zoom HD</span>
                        </a>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${
                          appt.status === 'Upcoming' ? 'bg-purple-950 text-purple-300 border border-purple-800 shadow-sm' :
                          appt.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          appt.status === 'Rescheduled' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                          'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}>
                          {appt.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        <button 
                          onClick={() => { setSelectedAppt(appt); setIsApptDetailsOpen(true); }}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold border border-slate-700"
                        >
                          View Details
                        </button>

                        {appt.status === 'Upcoming' && (
                          <>
                            <button 
                              onClick={() => handleUpdateApptStatus(appt.id, 'Completed')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                            >
                              Mark Done
                            </button>
                            <button 
                              onClick={() => handleUpdateApptStatus(appt.id, 'Cancelled')}
                              className="px-2.5 py-1 bg-rose-950 hover:bg-rose-900 text-rose-400 border border-rose-800 rounded-lg text-xs font-bold"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: EVENT TYPES */}
        {activeTab === 'event_types' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-100">Event Types & Meeting Rules</h3>
                <p className="text-xs text-slate-400">Configure call durations, location links, round-robin rules & qualification questions.</p>
              </div>

              <button 
                onClick={() => setIsEventModalOpen(true)}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-purple-600/30 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Event Type</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventTypes.map(evt => (
                <div key={evt.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl hover:border-purple-500/50 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: evt.color }} />
                      <span className="text-xs font-mono font-bold text-slate-400">{evt.durationMinutes} Mins Duration</span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-100">{evt.title}</h4>
                    <p className="text-xs text-slate-400">{evt.description}</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Location:</span>
                      <span className="font-bold text-indigo-400 font-mono">{evt.locationDetails}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Pricing:</span>
                      <span className="font-bold text-emerald-400 font-mono">{evt.priceAmount > 0 ? `$${evt.priceAmount} Paid Call` : 'Free Strategy Call'}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                      <span className="text-slate-400 font-medium">Buffer Times:</span>
                      <span className="font-bold text-slate-300 font-mono">+{evt.bufferBeforeMinutes}m / +{evt.bufferAfterMinutes}m</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-medium">Notice Window:</span>
                      <span className="font-bold text-amber-300 font-mono">{evt.minNoticeHours}h Min Notice</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button 
                      onClick={() => handleCopy(`https://growthlabs.launchengine.io/book/${evt.slug}`, evt.id)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5"
                    >
                      {copiedId === evt.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === evt.id ? 'Copied Link!' : 'Copy Direct Booking URL'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TEAM HOSTS */}
        {activeTab === 'hosts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-100">Team Hosts & Round-Robin Assignments</h3>
                <p className="text-xs text-slate-400">Manage hosts, personal Zoom links, availability toggles and round-robin weights.</p>
              </div>

              <button 
                onClick={() => setIsHostModalOpen(true)}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-purple-600/30 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Team Host</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hosts.map(host => (
                <div key={host.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <img src={host.avatar} alt={host.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500" />
                      <div>
                        <h4 className="text-base font-bold text-white">{host.name}</h4>
                        <p className="text-xs text-purple-400 font-mono">{host.role}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300">{host.bio}</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Personal Zoom:</span>
                      <span className="text-indigo-400 truncate max-w-[140px]">{host.zoomUrl}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Direct Phone:</span>
                      <span className="text-slate-200">{host.phone}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                      <span className="text-slate-400">Host Rating:</span>
                      <span className="text-amber-400 font-bold">★ {host.rating} / 5.0</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-400 font-bold">Call Availability:</span>
                    <button 
                      onClick={() => {
                        const updated = hosts.map(h => h.id === host.id ? { ...h, isAvailable: !h.isAvailable } : h);
                        setHosts(updated);
                      }}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${host.isAvailable ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-950 text-slate-500 border border-slate-800'}`}
                    >
                      {host.isAvailable ? 'AVAILABLE' : 'OFFLINE'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: REMINDERS & AUTOMATIONS */}
        {activeTab === 'reminders' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h3 className="text-xl font-black text-slate-100">SMS Text & Email Reminder Sequences</h3>
              <p className="text-xs text-slate-400">Twilio SMS integration and calendar notifications to ensure 90%+ show-up rates.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-purple-400 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-purple-200">Twilio SMS Reminder Engine</h4>
                    <p className="text-[11px] text-purple-300/80">Sends text messages directly to client phones prior to call start time.</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded text-[10px] font-mono font-bold">ACTIVE</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">⚡ 24 Hours Before Call (SMS & Email)</span>
                    <span className="text-[10px] text-emerald-400 font-mono">ENABLED</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">"Hey {`{CLIENT_NAME}`}, your strategy call with {`{HOST_NAME}`} is tomorrow at {`{TIME_SLOT}`}. Join link: {`{ZOOM_LINK}`}"</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">🔥 1 Hour Before Call (SMS Alert)</span>
                    <span className="text-[10px] text-emerald-400 font-mono">ENABLED</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">"Starting in 60 mins! Grab your laptop and join us here: {`{ZOOM_LINK}`}"</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: EMBED WIDGET */}
        {activeTab === 'embed' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <h3 className="text-xl font-black text-slate-100">Funnel & Website Embed Generator</h3>
              <p className="text-xs text-slate-400">Embed ChronoChimp directly into any sales page or opt-in step in your funnel builder.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">Select Event Type to Embed</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-medium">
                  {eventTypes.map(e => (
                    <option key={e.id} value={e.id}>{e.title} ({e.durationMinutes} mins)</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">HTML Embed Code (iFrame Container)</label>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 relative">
                  <pre className="whitespace-pre-wrap">{`<iframe src="https://growthlabs.launchengine.io/book/15min-discovery?embed=true" width="100%" height="700" frameborder="0"></iframe>`}</pre>
                </div>
              </div>

              <button 
                onClick={() => handleCopy(`<iframe src="https://growthlabs.launchengine.io/book/15min-discovery?embed=true" width="100%" height="700" frameborder="0"></iframe>`, 'embed_code')}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30"
              >
                {copiedId === 'embed_code' ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copiedId === 'embed_code' ? 'Copied Embed Code!' : 'Copy iFrame Embed Snippet'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="text-xl font-black text-slate-100">ChronoChimp Global Settings</h3>
              <p className="text-xs text-slate-400">Configure timezone auto-detection, brand styling and calendar 2-way sync.</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="space-y-2 border-b border-slate-800 pb-4">
                <label className="text-xs font-bold text-slate-300 block">System Timezone</label>
                <input 
                  type="text" 
                  value={chronoSettings.timezone}
                  onChange={(e) => setChronoSettings({ ...chronoSettings, timezone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                />
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Auto-Confirm Bookings</h4>
                  <p className="text-xs text-slate-400">Instantly generate Zoom link and calendar invite upon client submit.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={chronoSettings.autoConfirmBooking}
                  onChange={(e) => setChronoSettings({ ...chronoSettings, autoConfirmBooking: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Google Calendar 2-Way Sync</h4>
                  <p className="text-xs text-slate-400">Automatically block out personal events from Google Calendar.</p>
                </div>
                <input 
                  type="checkbox"
                  checked={chronoSettings.googleCalendarSync}
                  onChange={(e) => setChronoSettings({ ...chronoSettings, googleCalendarSync: e.target.checked })}
                  className="w-5 h-5 rounded border-slate-700 text-purple-600 focus:ring-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: VIEW APPOINTMENT DETAILS */}
      {isApptDetailsOpen && selectedAppt && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-100">{selectedAppt.eventTitle}</h3>
                <p className="text-xs text-purple-400 font-mono">{selectedAppt.date} at {selectedAppt.timeSlot} (EST)</p>
              </div>
              <button onClick={() => setIsApptDetailsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-400">Client Details:</span>
                <p className="text-slate-200 font-bold">{selectedAppt.customerName}</p>
                <p className="text-slate-400 font-mono">{selectedAppt.customerEmail} • {selectedAppt.customerPhone}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-400">Host & Zoom Video Link:</span>
                <p className="text-slate-200 font-bold">{selectedAppt.hostName}</p>
                <a href={selectedAppt.meetingLink} target="_blank" rel="noreferrer" className="text-indigo-400 font-mono hover:underline block break-all">
                  {selectedAppt.meetingLink}
                </a>
              </div>

              {selectedAppt.answers && Object.keys(selectedAppt.answers).length > 0 && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-indigo-400">Client Intake Answers:</span>
                  {Object.entries(selectedAppt.answers).map(([key, ans]) => (
                    <div key={key} className="text-slate-300">
                      <span className="text-slate-500 font-mono">{key}: </span>
                      <span className="font-medium text-slate-100">{ans}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
              <button 
                onClick={() => setIsApptDetailsOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CREATE EVENT TYPE */}
      {isEventModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-slate-100">Create New Event Type</h3>
              <button onClick={() => setIsEventModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Event Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. 30-Minute VIP Discovery Call" 
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">URL Slug</label>
                <input 
                  type="text" 
                  placeholder="30min-vip-discovery" 
                  value={newEventSlug}
                  onChange={(e) => setNewEventSlug(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Duration (Mins)</label>
                  <select 
                    value={newEventDuration}
                    onChange={(e) => setNewEventDuration(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="15">15 Minutes</option>
                    <option value="30">30 Minutes</option>
                    <option value="45">45 Minutes</option>
                    <option value="60">60 Minutes</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Price ($0 if Free)</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    value={newEventPrice}
                    onChange={(e) => setNewEventPrice(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono" 
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-4">
              <button 
                onClick={handleCreateEventType}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-purple-600/30"
              >
                Publish Event Type
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD HOST */}
      {isHostModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-slate-100">Add Team Host</h3>
              <button onClick={() => setIsHostModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Host Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sarah Jenkins" 
                  value={newHostName}
                  onChange={(e) => setNewHostName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Host Email</label>
                <input 
                  type="email" 
                  placeholder="sarah@growthlabs.demo" 
                  value={newHostEmail}
                  onChange={(e) => setNewHostEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Role Title</label>
                <input 
                  type="text" 
                  placeholder="Senior Sales Advisor" 
                  value={newHostRole}
                  onChange={(e) => setNewHostRole(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200" 
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-4">
              <button 
                onClick={handleCreateHost}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-purple-600/30"
              >
                Save Team Host
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: TEST LIVE BOOKING EXPERIENCE */}
      {isBookingDemoOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button onClick={() => setIsBookingDemoOpen(false)} className="text-slate-400 hover:text-white absolute right-6 top-6">
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-800 pb-4">
              <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800">
                CHRONOCHIMP LIVE EMBED ENGINE
              </span>
              <h3 className="text-xl font-black text-white mt-2">Schedule Your Strategy Call</h3>
              <p className="text-xs text-slate-400">Select a date and time slot to book your 1-on-1 session.</p>
            </div>

            {/* Event Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {eventTypes.map(evt => (
                <button 
                  key={evt.id}
                  onClick={() => setDemoSelectedEventId(evt.id)}
                  className={`p-3 rounded-xl border text-xs text-left transition-all ${demoSelectedEventId === evt.id ? 'bg-purple-600 text-white border-purple-500 shadow-lg' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                >
                  <div className="font-bold text-white">{evt.title}</div>
                  <div className="text-[10px] opacity-80 mt-1">{evt.durationMinutes} mins • {evt.priceAmount > 0 ? `$${evt.priceAmount}` : 'FREE'}</div>
                </button>
              ))}
            </div>

            {/* Time Slot Picker Grid */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">Select Date:</span>
                <input 
                  type="date" 
                  value={demoSelectedDate}
                  onChange={(e) => setDemoSelectedDate(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-100 font-mono"
                />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                {['09:00', '10:30', '11:00', '13:30', '15:00', '16:30'].map(slot => (
                  <button 
                    key={slot}
                    onClick={() => setDemoSelectedSlot(slot)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${demoSelectedSlot === slot ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Details Input */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Your Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jonathan Hayes"
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100" 
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Your Email</label>
                  <input 
                    type="email" 
                    placeholder="jhayes@techcorp.demo"
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100" 
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Phone (For Instant Twilio SMS Reminder)</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 492-1082"
                  value={demoPhone}
                  onChange={(e) => setDemoPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono" 
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={handleExecuteDemoBooking}
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
              >
                <span>CONFIRM APPOINTMENT & GENERATE ZOOM LINK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
