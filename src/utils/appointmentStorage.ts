import { 
  MeetingHost, EventTypeConfig, BookedAppointment, ChronoChimpSettings 
} from '../types/appointment';
import { 
  initialMeetingHosts, initialEventTypes, initialBookedAppointments, initialChronoSettings 
} from '../data/initialAppointmentData';

const KEYS = {
  HOSTS: 'chronochimp_hosts_v1',
  EVENTS: 'chronochimp_events_v1',
  APPOINTMENTS: 'chronochimp_appts_v1',
  SETTINGS: 'chronochimp_settings_v1'
};

export const loadStoredHosts = (): MeetingHost[] => {
  try {
    const raw = localStorage.getItem(KEYS.HOSTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored hosts', e);
  }
  return initialMeetingHosts;
};

export const saveStoredHosts = (hosts: MeetingHost[]) => {
  try {
    localStorage.setItem(KEYS.HOSTS, JSON.stringify(hosts));
  } catch (e) {
    console.error('Error saving hosts', e);
  }
};

export const loadStoredEventTypes = (): EventTypeConfig[] => {
  try {
    const raw = localStorage.getItem(KEYS.EVENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored event types', e);
  }
  return initialEventTypes;
};

export const saveStoredEventTypes = (events: EventTypeConfig[]) => {
  try {
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
  } catch (e) {
    console.error('Error saving event types', e);
  }
};

export const loadStoredAppointments = (): BookedAppointment[] => {
  try {
    const raw = localStorage.getItem(KEYS.APPOINTMENTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored appointments', e);
  }
  return initialBookedAppointments;
};

export const saveStoredAppointments = (appts: BookedAppointment[]) => {
  try {
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(appts));
  } catch (e) {
    console.error('Error saving appointments', e);
  }
};

export const loadStoredChronoSettings = (): ChronoChimpSettings => {
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored chrono settings', e);
  }
  return initialChronoSettings;
};

export const saveStoredChronoSettings = (settings: ChronoChimpSettings) => {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving chrono settings', e);
  }
};
