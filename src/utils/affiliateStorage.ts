import { 
  CommissionPlan, AffiliateUser, ReferredTransaction, 
  PromoMaterial, AffiliateContest, BountyPackSettings 
} from '../types/affiliate';
import { 
  initialCommissionPlans, initialAffiliates, initialTransactions, 
  initialPromoMaterials, initialContests, initialSettings 
} from '../data/initialAffiliateData';

const KEYS = {
  PLANS: 'bountypack_plans_v1',
  AFFILIATES: 'bountypack_affiliates_v1',
  TRANSACTIONS: 'bountypack_transactions_v1',
  PROMO: 'bountypack_promo_v1',
  CONTESTS: 'bountypack_contests_v1',
  SETTINGS: 'bountypack_settings_v1'
};

export const loadStoredPlans = (): CommissionPlan[] => {
  try {
    const raw = localStorage.getItem(KEYS.PLANS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored plans', e);
  }
  return initialCommissionPlans;
};

export const saveStoredPlans = (plans: CommissionPlan[]) => {
  try {
    localStorage.setItem(KEYS.PLANS, JSON.stringify(plans));
  } catch (e) {
    console.error('Error saving plans', e);
  }
};

export const loadStoredAffiliates = (): AffiliateUser[] => {
  try {
    const raw = localStorage.getItem(KEYS.AFFILIATES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored affiliates', e);
  }
  return initialAffiliates;
};

export const saveStoredAffiliates = (affiliates: AffiliateUser[]) => {
  try {
    localStorage.setItem(KEYS.AFFILIATES, JSON.stringify(affiliates));
  } catch (e) {
    console.error('Error saving affiliates', e);
  }
};

export const loadStoredTransactions = (): ReferredTransaction[] => {
  try {
    const raw = localStorage.getItem(KEYS.TRANSACTIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored transactions', e);
  }
  return initialTransactions;
};

export const saveStoredTransactions = (transactions: ReferredTransaction[]) => {
  try {
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
  } catch (e) {
    console.error('Error saving transactions', e);
  }
};

export const loadStoredPromoMaterials = (): PromoMaterial[] => {
  try {
    const raw = localStorage.getItem(KEYS.PROMO);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored promo materials', e);
  }
  return initialPromoMaterials;
};

export const saveStoredPromoMaterials = (promo: PromoMaterial[]) => {
  try {
    localStorage.setItem(KEYS.PROMO, JSON.stringify(promo));
  } catch (e) {
    console.error('Error saving promo materials', e);
  }
};

export const loadStoredContests = (): AffiliateContest[] => {
  try {
    const raw = localStorage.getItem(KEYS.CONTESTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored contests', e);
  }
  return initialContests;
};

export const saveStoredContests = (contests: AffiliateContest[]) => {
  try {
    localStorage.setItem(KEYS.CONTESTS, JSON.stringify(contests));
  } catch (e) {
    console.error('Error saving contests', e);
  }
};

export const loadStoredSettings = (): BountyPackSettings => {
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored settings', e);
  }
  return initialSettings;
};

export const saveStoredSettings = (settings: BountyPackSettings) => {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings', e);
  }
};

/**
 * Resets all BountyPack data back to demo state
 */
export const resetBountyPackStorageToDefaults = () => {
  try {
    localStorage.setItem(KEYS.PLANS, JSON.stringify(initialCommissionPlans));
    localStorage.setItem(KEYS.AFFILIATES, JSON.stringify(initialAffiliates));
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(initialTransactions));
    localStorage.setItem(KEYS.PROMO, JSON.stringify(initialPromoMaterials));
    localStorage.setItem(KEYS.CONTESTS, JSON.stringify(initialContests));
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(initialSettings));
  } catch (e) {
    console.error('Error resetting BountyPack storage', e);
  }
};
