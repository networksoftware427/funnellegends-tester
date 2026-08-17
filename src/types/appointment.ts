// ChronoChimp Appointment & Scheduling System Types
export type MeetingLocationType = 'zoom' | 'google_meet' | 'phone_call' | 'in_person';
export type AppointmentStatus = 'Upcoming' | 'Completed' | 'Rescheduled' | 'Cancelled' | 'NoShow';
export type RoundRobinAssignment = 'equal_distribution' | 'priority_host' | 'availability_first';

export interface MeetingHost {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
  rating: number;
  zoomUrl: string;
  phone: string;
  isAvailable: boolean;
}

export interface CustomIntakeQuestion {
  id: string;
  label: string;
  type: 'text' | 'select' | 'radio' | 'textarea';
  required: boolean;
  options?: string[];
}

export interface DaySchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  enabled: boolean;
  startTime: string; // e.g. "09:00"
  endTime: string;   // e.g. "17:00"
}

export interface EventTypeConfig {
  id: string;
  title: string;
  slug: string;
  description: string;
  color: string;
  durationMinutes: number;
  locationType: MeetingLocationType;
  locationDetails: string;
  priceAmount: number;
  assignedHostIds: string[];
  assignmentMode: RoundRobinAssignment;
  bufferBeforeMinutes: number;
  bufferAfterMinutes: number;
  minNoticeHours: number;
  maxAdvanceDays: number;
  weeklySchedule: DaySchedule[];
  customQuestions: CustomIntakeQuestion[];
  redirectUrl: string;
  sendEmailReminders: boolean;
  sendSmsReminders: boolean;
}

export interface BookedAppointment {
  id: string;
  eventTypeId: string;
  eventTitle: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "14:00"
  locationType: MeetingLocationType;
  meetingLink: string;
  status: AppointmentStatus;
  answers: Record<string, string>;
  createdAt: string;
  notes?: string;
  isPaid: boolean;
  amountPaid: number;
}

export interface ChronoChimpSettings {
  timezone: string;
  companyName: string;
  logoUrl: string;
  brandColor: string;
  twilioSmsEnabled: boolean;
  googleCalendarSync: boolean;
  autoConfirmBooking: boolean;
}
