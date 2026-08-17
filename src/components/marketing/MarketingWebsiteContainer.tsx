import React, { useState } from 'react';
import { MarketingNavbar } from './Navbar';
import { MarketingFooter } from './Footer';
import { HomePageVSL } from './HomePageVSL';
import { FeaturesPage } from './FeaturesPage';
import { PricingPage, FunnelLegendsOrderModal } from './PricingPage';
import { LoginPage } from './LoginPage';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';
import { TermsOfServicePage } from './TermsOfServicePage';
import { EarningsDisclaimerPage } from './EarningsDisclaimerPage';

import { getAdminSession } from '../../utils/adminSeed';

type MarketingTab = 'home' | 'features' | 'pricing' | 'login' | 'privacy' | 'terms' | 'disclaimer';

interface MarketingWebsiteContainerProps {
  onLaunchPlatformApp: () => void;
}

export const MarketingWebsiteContainer: React.FC<MarketingWebsiteContainerProps> = ({
  onLaunchPlatformApp
}) => {
  const [activeTab, setActiveTab] = useState<MarketingTab>('home');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleNavigate = (tab: MarketingTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProtectedLaunch = () => {
    const session = getAdminSession();
    if (session && session.isLoggedIn) {
      onLaunchPlatformApp();
    } else {
      alert('🔒 App Access Restricted: Please sign in with your admin credentials to launch the FunnelLegends Platform.');
      handleNavigate('login');
    }
  };

  const handleOrderSuccess = () => {
    setIsOrderModalOpen(false);
    onLaunchPlatformApp();
  };

  // Only show Navbar and Order modal CTA on main marketing tabs
  const isMainTab = ['home', 'features', 'pricing', 'login'].includes(activeTab);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      
      {/* Universal Marketing Navbar */}
      <MarketingNavbar 
        activeTab={activeTab as any}
        onNavigate={handleNavigate as any}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onLaunchPlatform={handleProtectedLaunch}
      />

      {/* Page Routing Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePageVSL 
            onOpenOrderModal={() => setIsOrderModalOpen(true)}
            onNavigate={handleNavigate as any}
          />
        )}

        {activeTab === 'features' && (
          <FeaturesPage 
            onOpenOrderModal={() => setIsOrderModalOpen(true)}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingPage 
            onOpenOrderModal={() => setIsOrderModalOpen(true)}
            onLaunchPlatform={onLaunchPlatformApp}
          />
        )}

        {activeTab === 'login' && (
          <LoginPage 
            onLoginSuccess={onLaunchPlatformApp}
          />
        )}

        {activeTab === 'privacy' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        )}

        {activeTab === 'terms' && (
          <TermsOfServicePage onNavigate={handleNavigate} />
        )}

        {activeTab === 'disclaimer' && (
          <EarningsDisclaimerPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Universal 2-Step Order Form Modal */}
      <FunnelLegendsOrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSuccess={handleOrderSuccess}
      />

      {/* Universal Marketing Footer */}
      <MarketingFooter 
        onNavigate={handleNavigate as any}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />

    </div>
  );
};
