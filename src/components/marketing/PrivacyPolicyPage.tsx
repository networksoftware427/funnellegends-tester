import React from 'react';
import { Shield, ChevronRight } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (tab: any) => void;
}

export const PrivacyPolicyPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  const lastUpdated = 'August 17, 2026';

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-widest">
            <Shield className="w-3.5 h-3.5" />
            <span>Legal Document</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Privacy Policy</h1>
          <p className="text-white/80 text-sm font-medium">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-slate-600 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-600 transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-bold">Privacy Policy</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200">
          <p className="text-sm text-slate-800 font-medium leading-relaxed">
            At <strong>FunnelLegends</strong>, we are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, and share information when you use our platform, website, and services. By accessing or using FunnelLegends, you agree to this policy.
          </p>
        </div>

        {[
          {
            title: '1. Information We Collect',
            content: [
              `<strong>Account Information:</strong> When you register for FunnelLegends, we collect your name, email address, billing information, and any other details you provide during account creation.`,
              `<strong>Usage Data:</strong> We automatically collect data about how you use the platform, including pages visited, features accessed, session duration, IP address, browser type, and device information.`,
              `<strong>Payment Information:</strong> Payment data is processed by our third-party payment processors (Stripe). We do not store your full credit card details on our servers.`,
              `<strong>Communications:</strong> If you contact our support team, we collect your messages and any attachments you send to us.`,
              `<strong>Cookies & Tracking:</strong> We use cookies, pixel tags, and similar technologies to personalise your experience and analyse platform usage.`,
            ]
          },
          {
            title: '2. How We Use Your Information',
            content: [
              `To provide, maintain, and improve the FunnelLegends platform and services.`,
              `To process payments, prevent fraud, and manage your subscription.`,
              `To communicate with you regarding your account, product updates, and marketing (with your consent).`,
              `To personalise your experience and deliver relevant content and product recommendations.`,
              `To comply with legal obligations and enforce our Terms of Service.`,
              `To monitor and analyse usage trends and platform performance.`,
            ]
          },
          {
            title: '3. How We Share Your Information',
            content: [
              `<strong>Service Providers:</strong> We share data with trusted third-party vendors who assist in operating our platform (e.g., Supabase for database, Vercel for hosting, Stripe for payments, and email service providers). These parties are contractually obligated to keep your data secure.`,
              `<strong>Legal Requirements:</strong> We may disclose information if required by law, subpoena, or legal process.`,
              `<strong>Business Transfers:</strong> If FunnelLegends is acquired or merges with another company, your data may be transferred as part of that transaction.`,
              `<strong>We do not sell your personal data to third parties.</strong>`,
            ]
          },
          {
            title: '4. Data Retention',
            content: [
              `We retain your personal data for as long as your account is active or as needed to provide services. If you close your account, we will retain certain information for legal and compliance purposes for up to 7 years, then securely delete it.`,
            ]
          },
          {
            title: '5. Cookies',
            content: [
              `We use cookies to keep you logged in, remember your preferences, and gather analytics. You can control cookie settings through your browser. Disabling cookies may affect certain platform features.`,
              `<strong>Types of cookies used:</strong> Session cookies (essential for login), preference cookies (to remember settings), analytics cookies (Google Analytics), and marketing cookies (Facebook Pixel, if applicable).`,
            ]
          },
          {
            title: '6. Your Rights',
            content: [
              `<strong>Access:</strong> You have the right to request a copy of the personal data we hold about you.`,
              `<strong>Correction:</strong> You may request correction of inaccurate or incomplete data.`,
              `<strong>Deletion:</strong> You may request deletion of your personal data ("right to be forgotten"), subject to legal retention requirements.`,
              `<strong>Portability:</strong> You may request your data in a structured, machine-readable format.`,
              `<strong>Objection:</strong> You may object to data processing carried out on the basis of legitimate interests.`,
              `To exercise any of these rights, please contact us at: <strong>legal@funnellegends.com</strong>`,
            ]
          },
          {
            title: '7. Security',
            content: [
              `We implement industry-standard security measures including 256-bit SSL encryption, secure data centres via Supabase and Vercel, role-based access controls, and routine security audits. However, no system is 100% secure and we cannot guarantee absolute security.`,
            ]
          },
          {
            title: '8. Children\'s Privacy',
            content: [
              `FunnelLegends is not intended for users under the age of 18. We do not knowingly collect personal data from children. If you believe we have inadvertently collected information from a minor, please contact us immediately.`,
            ]
          },
          {
            title: '9. Third-Party Links',
            content: [
              `Our platform may contain links to third-party websites or integrations. We are not responsible for the privacy practices of those third parties. We encourage you to read their privacy policies before sharing your data.`,
            ]
          },
          {
            title: '10. Changes to This Policy',
            content: [
              `We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on our platform. Continued use of FunnelLegends after changes take effect constitutes your acceptance of the new policy.`,
            ]
          },
          {
            title: '11. Contact Us',
            content: [
              `If you have questions or concerns about this Privacy Policy, please contact us:`,
              `<strong>FunnelLegends</strong><br/>Email: legal@funnellegends.com<br/>Support: support@funnellegends.com`,
            ]
          },
        ].map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-3">{section.title}</h2>
            <ul className="space-y-3">
              {section.content.map((item, i) => (
                <li key={i} className="text-sm text-slate-700 leading-relaxed pl-4 border-l-2 border-emerald-200"
                  dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        ))}

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
          <p className="text-xs text-slate-500 font-medium">This document was last updated on {lastUpdated}.</p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => onNavigate('terms')} className="text-xs text-emerald-600 hover:underline font-bold">Terms of Service →</button>
            <button onClick={() => onNavigate('disclaimer')} className="text-xs text-emerald-600 hover:underline font-bold">Earnings Disclaimer →</button>
          </div>
        </div>
      </div>
    </div>
  );
};
