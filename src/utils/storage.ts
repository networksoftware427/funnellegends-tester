// LaunchEngine State Persistence & Storage Utilities
import { FunnelData, CourseData, ContactData, DealData, WorkflowNodeData, WorkflowEdgeData } from '../types/builder';
import { initialSystemTemplates, initialCourseData, initialContacts, initialDeals, initialWorkflowNodes, initialWorkflowEdges } from '../data/initialTemplates';

const KEYS = {
  FUNNELS: 'launchengine_funnels_v4',
  COURSE: 'launchengine_course_v1',
  CONTACTS: 'launchengine_contacts_v1',
  DEALS: 'launchengine_deals_v1',
  WORKFLOW_NODES: 'launchengine_wf_nodes_v1',
  WORKFLOW_EDGES: 'launchengine_wf_edges_v1',
  ENROLLMENT_DAYS: 'launchengine_student_days_v1'
};

export const loadStoredFunnels = (): FunnelData[] => {
  try {
    const raw = localStorage.getItem(KEYS.FUNNELS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed loading stored funnels', e);
  }
  return initialSystemTemplates;
};

export const saveStoredFunnels = (funnels: FunnelData[]) => {
  try {
    localStorage.setItem(KEYS.FUNNELS, JSON.stringify(funnels));
  } catch (e) {
    console.error('Failed saving funnels', e);
  }
};

export const loadStoredCourse = (): CourseData => {
  try {
    const raw = localStorage.getItem(KEYS.COURSE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed loading stored course', e);
  }
  return initialCourseData;
};

export const saveStoredCourse = (course: CourseData) => {
  try {
    localStorage.setItem(KEYS.COURSE, JSON.stringify(course));
  } catch (e) {
    console.error('Failed saving course', e);
  }
};

export const resetCourseStorageToDefaults = (): CourseData => {
  try {
    localStorage.setItem(KEYS.COURSE, JSON.stringify(initialCourseData));
  } catch (e) {
    console.error('Failed resetting course data', e);
  }
  return initialCourseData;
};

export const loadStoredContacts = (): ContactData[] => {
  try {
    const raw = localStorage.getItem(KEYS.CONTACTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed loading contacts', e);
  }
  return initialContacts;
};

export const saveStoredContacts = (contacts: ContactData[]) => {
  try {
    localStorage.setItem(KEYS.CONTACTS, JSON.stringify(contacts));
  } catch (e) {
    console.error('Failed saving contacts', e);
  }
};

export const loadStoredDeals = (): DealData[] => {
  try {
    const raw = localStorage.getItem(KEYS.DEALS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed loading deals', e);
  }
  return initialDeals;
};

export const saveStoredDeals = (deals: DealData[]) => {
  try {
    localStorage.setItem(KEYS.DEALS, JSON.stringify(deals));
  } catch (e) {
    console.error('Failed saving deals', e);
  }
};

export const resetCrmStorageToDefaults = () => {
  try {
    localStorage.setItem(KEYS.CONTACTS, JSON.stringify(initialContacts));
    localStorage.setItem(KEYS.DEALS, JSON.stringify(initialDeals));
  } catch (e) {
    console.error('Failed resetting CRM data', e);
  }
  return { contacts: initialContacts, deals: initialDeals };
};

export const loadStoredWorkflows = () => {
  try {
    const rawNodes = localStorage.getItem(KEYS.WORKFLOW_NODES);
    const rawEdges = localStorage.getItem(KEYS.WORKFLOW_EDGES);
    if (rawNodes && rawEdges) {
      return { nodes: JSON.parse(rawNodes), edges: JSON.parse(rawEdges) };
    }
  } catch (e) {
    console.error('Failed loading workflows', e);
  }
  return { nodes: initialWorkflowNodes, edges: initialWorkflowEdges };
};

export const saveStoredWorkflows = (nodes: WorkflowNodeData[], edges: WorkflowEdgeData[]) => {
  try {
    localStorage.setItem(KEYS.WORKFLOW_NODES, JSON.stringify(nodes));
    localStorage.setItem(KEYS.WORKFLOW_EDGES, JSON.stringify(edges));
  } catch (e) {
    console.error('Failed saving workflows', e);
  }
};

export const clearAllApplicationData = () => {
  try {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    localStorage.removeItem('bountypack_plans_v1');
    localStorage.removeItem('bountypack_affiliates_v1');
    localStorage.removeItem('bountypack_transactions_v1');
    localStorage.removeItem('bountypack_promo_v1');
    localStorage.removeItem('bountypack_contests_v1');
    localStorage.removeItem('bountypack_settings_v1');
    localStorage.removeItem('chronochimp_appointments_v1');
    localStorage.removeItem('chronochimp_event_types_v1');
    localStorage.removeItem('chronochimp_hosts_v1');
    localStorage.removeItem('launchengine_custom_themes_v1');
    window.location.reload();
  } catch (e) {
    console.error('Failed clearing application data', e);
  }
};
