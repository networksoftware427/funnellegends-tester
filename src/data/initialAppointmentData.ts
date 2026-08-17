import { 
  MeetingHost, EventTypeConfig, BookedAppointment, ChronoChimpSettings 
} from '../types/appointment';

export const initialMeetingHosts: MeetingHost[] = [
  {
    id: 'host_marcus_v',
    name: 'Marcus Vance',
    email: 'marcus@growthlabs.demo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Funnel Architect & Strategist',
    bio: 'Built 30+ 7-figure sales funnels. Specializes in webinar & high-ticket closing architecture.',
    rating: 4.9,
    zoomUrl: 'https://zoom.us/j/9981248019',
    phone: '+1 (555) 234-8901',
    isAvailable: true
  },
  {
    id: 'host_sarah_j',
    name: 'Sarah Jenkins',
    email: 'sarah@growthlabs.demo',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    role: 'Lead Growth & Conversion Specialist',
    bio: 'Expert in A/B split testing, order bump optimization, and automated email follow-up systems.',
    rating: 5.0,
    zoomUrl: 'https://zoom.us/j/8839120481',
    phone: '+1 (555) 891-2309',
    isAvailable: true
  },
  {
    id: 'host_david_s',
    name: 'David Sterling',
    email: 'david@growthlabs.demo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Enterprise Client Advisor',
    bio: 'Dedicated account advisor managing custom CRM pipelines and high-ticket mastermind onboarding.',
    rating: 4.8,
    zoomUrl: 'https://zoom.us/j/7721049281',
    phone: '+1 (555) 432-1092',
    isAvailable: true
  }
];

export const initialEventTypes: EventTypeConfig[] = [
  {
    id: 'event_discovery_15',
    title: '15-Minute Funnel Audit Discovery Call',
    slug: '15min-discovery',
    description: 'Quick 15-minute 1-on-1 strategy call to review your current offer and identify funnel bottlenecks.',
    color: '#6366f1',
    durationMinutes: 15,
    locationType: 'zoom',
    locationDetails: 'Zoom HD Video Conference',
    priceAmount: 0,
    assignedHostIds: ['host_marcus_v', 'host_sarah_j'],
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
      { id: 'q_revenue', label: 'What is your current monthly business revenue?', type: 'select', required: true, options: ['Under $10k/mo', '$10k - $50k/mo', '$50k - $100k/mo', '$100k+/mo'] },
      { id: 'q_goal', label: 'What is your primary goal for this call?', type: 'text', required: true }
    ],
    redirectUrl: 'https://growthlabs.launchengine.io/thank-you',
    sendEmailReminders: true,
    sendSmsReminders: true
  },
  {
    id: 'event_strategy_45',
    title: '45-Minute 7-Figure Launch Blueprint Session',
    slug: '45min-blueprint',
    description: 'Deep dive architectural consultation. We build your entire funnel roadmap live on screen.',
    color: '#8b5cf6',
    durationMinutes: 45,
    locationType: 'zoom',
    locationDetails: 'Zoom HD Meeting Room',
    priceAmount: 0,
    assignedHostIds: ['host_marcus_v'],
    assignmentMode: 'priority_host',
    bufferBeforeMinutes: 10,
    bufferAfterMinutes: 15,
    minNoticeHours: 12,
    maxAdvanceDays: 14,
    weeklySchedule: [
      { day: 'Monday', enabled: true, startTime: '10:00', endTime: '16:00' },
      { day: 'Tuesday', enabled: true, startTime: '10:00', endTime: '16:00' },
      { day: 'Wednesday', enabled: true, startTime: '10:00', endTime: '16:00' },
      { day: 'Thursday', enabled: true, startTime: '10:00', endTime: '16:00' },
      { day: 'Friday', enabled: true, startTime: '10:00', endTime: '15:00' },
      { day: 'Saturday', enabled: false, startTime: '10:00', endTime: '14:00' },
      { day: 'Sunday', enabled: false, startTime: '10:00', endTime: '14:00' }
    ],
    customQuestions: [
      { id: 'q_website', label: 'Your website or active funnel URL:', type: 'text', required: true },
      { id: 'q_challenge', label: 'Describe your biggest challenge in scaling:', type: 'textarea', required: true }
    ],
    redirectUrl: 'https://growthlabs.launchengine.io/confirmation',
    sendEmailReminders: true,
    sendSmsReminders: true
  },
  {
    id: 'event_paid_vip_60',
    title: '60-Minute Paid VIP Mastermind Consultation',
    slug: '60min-paid-vip',
    description: '1-on-1 private VIP session with our Lead Architect. Includes full funnel teardown & video recording.',
    color: '#f59e0b',
    durationMinutes: 60,
    locationType: 'zoom',
    locationDetails: 'Private Recorded Zoom VIP Room',
    priceAmount: 297,
    assignedHostIds: ['host_marcus_v', 'host_sarah_j', 'host_david_s'],
    assignmentMode: 'availability_first',
    bufferBeforeMinutes: 15,
    bufferAfterMinutes: 15,
    minNoticeHours: 24,
    maxAdvanceDays: 60,
    weeklySchedule: [
      { day: 'Monday', enabled: true, startTime: '13:00', endTime: '18:00' },
      { day: 'Tuesday', enabled: true, startTime: '13:00', endTime: '18:00' },
      { day: 'Wednesday', enabled: true, startTime: '13:00', endTime: '18:00' },
      { day: 'Thursday', enabled: true, startTime: '13:00', endTime: '18:00' },
      { day: 'Friday', enabled: true, startTime: '13:00', endTime: '17:00' },
      { day: 'Saturday', enabled: false, startTime: '10:00', endTime: '14:00' },
      { day: 'Sunday', enabled: false, startTime: '10:00', endTime: '14:00' }
    ],
    customQuestions: [
      { id: 'q_industry', label: 'Industry / Niche:', type: 'text', required: true },
      { id: 'q_notes', label: 'Specific areas you want solved during VIP session:', type: 'textarea', required: false }
    ],
    redirectUrl: 'https://growthlabs.launchengine.io/vip-access',
    sendEmailReminders: true,
    sendSmsReminders: true
  }
];

export const initialBookedAppointments: BookedAppointment[] = [
  {
    id: 'appt_101',
    eventTypeId: 'event_discovery_15',
    eventTitle: '15-Minute Funnel Audit Discovery Call',
    hostId: 'host_marcus_v',
    hostName: 'Marcus Vance',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    customerName: 'Jonathan Hayes',
    customerEmail: 'jhayes@techcorp.demo',
    customerPhone: '+1 (555) 492-1082',
    date: '2026-08-14',
    timeSlot: '10:30',
    locationType: 'zoom',
    meetingLink: 'https://zoom.us/j/9981248019',
    status: 'Upcoming',
    answers: {
      q_revenue: '$50k - $100k/mo',
      q_goal: 'Scaling our webinar funnel from 3% to 6% conversion rate.'
    },
    createdAt: '2026-08-11T14:22:00Z',
    notes: 'High priority lead. Interested in full agency implementation.',
    isPaid: false,
    amountPaid: 0
  },
  {
    id: 'appt_102',
    eventTypeId: 'event_strategy_45',
    eventTitle: '45-Minute 7-Figure Launch Blueprint Session',
    hostId: 'host_sarah_j',
    hostName: 'Sarah Jenkins',
    hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@designstudio.demo',
    customerPhone: '+1 (555) 912-3840',
    date: '2026-08-15',
    timeSlot: '14:00',
    locationType: 'zoom',
    meetingLink: 'https://zoom.us/j/8839120481',
    status: 'Upcoming',
    answers: {
      q_website: 'https://designstudio.demo',
      q_challenge: 'Low order bump checkout conversion.'
    },
    createdAt: '2026-08-12T08:15:00Z',
    notes: 'Referred by Alex Hormozi partner link.',
    isPaid: false,
    amountPaid: 0
  },
  {
    id: 'appt_103',
    eventTypeId: 'event_paid_vip_60',
    eventTitle: '60-Minute Paid VIP Mastermind Consultation',
    hostId: 'host_marcus_v',
    hostName: 'Marcus Vance',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    customerName: 'Robert Vance',
    customerEmail: 'robert@techcorp.demo',
    customerPhone: '+1 (555) 201-9988',
    date: '2026-08-18',
    timeSlot: '15:00',
    locationType: 'zoom',
    meetingLink: 'https://zoom.us/j/9981248019',
    status: 'Upcoming',
    answers: {
      q_industry: 'SaaS & E-Learning',
      q_notes: 'Wants complete 2-tier affiliate system teardown.'
    },
    createdAt: '2026-08-10T11:00:00Z',
    isPaid: true,
    amountPaid: 297
  },
  {
    id: 'appt_104',
    eventTypeId: 'event_discovery_15',
    eventTitle: '15-Minute Funnel Audit Discovery Call',
    hostId: 'host_david_s',
    hostName: 'David Sterling',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    customerName: 'Claire Bennett',
    customerEmail: 'claire@bennettmedia.demo',
    customerPhone: '+1 (555) 771-4400',
    date: '2026-08-10',
    timeSlot: '11:00',
    locationType: 'zoom',
    meetingLink: 'https://zoom.us/j/7721049281',
    status: 'Completed',
    answers: {
      q_revenue: '$10k - $50k/mo',
      q_goal: 'Add 1-click upsells to course platform.'
    },
    createdAt: '2026-08-08T09:30:00Z',
    notes: 'Completed successfully. Client upgrading to Enterprise Pass.',
    isPaid: false,
    amountPaid: 0
  }
];

export const initialChronoSettings: ChronoChimpSettings = {
  timezone: 'America/New_York (EST)',
  companyName: 'LaunchEngine Growth Labs',
  logoUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&auto=format&fit=crop&q=80',
  brandColor: '#4f46e5',
  twilioSmsEnabled: true,
  googleCalendarSync: true,
  autoConfirmBooking: true
};
