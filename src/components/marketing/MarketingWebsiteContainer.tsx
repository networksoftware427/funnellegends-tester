import React, { useState } from 'react';
import { MarketingNavbar } from './Navbar';
import { MarketingFooter } from './Footer';
import { HomePageVSL } from './HomePageVSL';
import { FeaturesPage } from './FeaturesPage';
import { PricingPage, ClickFunnelsOrderModal } from './PricingPage';
import { LoginPage } from './LoginPage';

import { getAdminSession } from '../../utils/adminSeed';

interface MarketingWebsiteContainerProps {
  onLaunchPlatformApp: () => void;
}

export const MarketingWebsiteContainer: React.FC<MarketingWebsiteContainerProps> = ({
  onLaunchPlatformApp
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'features' | 'pricing' | 'login'>('home');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleNavigate = (tab: 'home' | 'features' | 'pricing' | 'login') => {
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

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      
      {/* Universal Marketing Navbar */}
      <MarketingNavbar 
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        onLaunchPlatform={handleProtectedLaunch}
      />

      {/* Page Routing Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePageVSL 
            onOpenOrderModal={() => setIsOrderModalOpen(true)}
            onNavigate={handleNavigate}
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
      </main>

      {/* Universal ClickFunnels 2-Step Order Form Modal */}
      <ClickFunnelsOrderModal 
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSuccess={handleOrderSuccess}
      />

      {/* Universal Marketing Footer */}
      <MarketingFooter 
        onNavigate={handleNavigate}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />

    </div>
  );
};
