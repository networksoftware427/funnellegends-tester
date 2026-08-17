import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (tab: any) => void;
}

export const TermsOfServicePage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  const lastUpdated = 'August 17, 2026';

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-800 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Document</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Terms of Service</h1>
          <p className="text-white/80 text-sm font-medium">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-slate-600 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-600 transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-bold">Terms of Service</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200">
          <p className="text-sm text-slate-800 font-medium leading-relaxed">
            Please read these Terms of Service ("Terms") carefully before using the <strong>FunnelLegends</strong> platform and services. By accessing or using FunnelLegends, you agree to be bound by these Terms. If you do not agree, please do not use our platform.
          </p>
        </div>

        {[
          {
            title: '1. Acceptance of Terms',
            content: [
              `By creating an account or accessing FunnelLegends, you confirm that you are at least 18 years of age, have the legal authority to enter into this agreement, and agree to comply with these Terms.`,
              `If you are using FunnelLegends on behalf of a company or organisation, you represent that you have the authority to bind that entity to these Terms.`,
            ]
          },
          {
            title: '2. Description of Services',
            content: [
              `FunnelLegends provides a cloud-based all-in-one digital marketing platform including, but not limited to: a visual drag-and-drop funnel and website builder, CRM and sales pipeline management, affiliate management (BountyPack), appointment scheduling (ChronoChimp), community portal (TribeNexus), messaging hub (PingPanda), and membership/course builder.`,
              `We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with reasonable notice.`,
            ]
          },
          {
            title: '3. Account Registration & Security',
            content: [
              `You must provide accurate, current, and complete information during registration and keep your account information updated.`,
              `You are responsible for maintaining the confidentiality of your account credentials. You are liable for all activity that occurs under your account.`,
              `You must notify us immediately at support@funnellegends.com if you suspect unauthorised access to your account.`,
              `We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or are used in ways that harm FunnelLegends or other users.`,
            ]
          },
          {
            title: '4. Subscription, Billing & Payments',
            content: [
              `FunnelLegends offers subscription-based plans. By subscribing, you authorise us to charge your payment method on a recurring basis at the rate specified for your chosen plan.`,
              `<strong>Free Trial:</strong> If you start a free trial, you will not be charged until the trial period ends. If you do not cancel before the trial expires, your subscription will automatically begin and your payment method will be charged.`,
              `<strong>Refunds:</strong> We offer a 30-day money-back guarantee for new subscribers. If you are not satisfied within the first 30 days of your paid subscription, contact us for a full refund. Refunds after 30 days are at our sole discretion.`,
              `All fees are exclusive of applicable taxes. You are responsible for paying all applicable taxes.`,
              `We reserve the right to change pricing with 30 days' notice. Continued use after price changes constitutes acceptance of the new pricing.`,
            ]
          },
          {
            title: '5. Acceptable Use Policy',
            content: [
              `You agree NOT to use FunnelLegends to:`,
              `— Engage in illegal activities, fraud, spam, or phishing.`,
              `— Sell or distribute prohibited items including illegal drugs, weapons, or counterfeit goods.`,
              `— Violate any applicable laws, regulations, or third-party rights (including intellectual property rights).`,
              `— Upload malicious code, viruses, or disruptive content.`,
              `— Harvest or scrape data from the platform without authorisation.`,
              `— Use the platform in ways that impose an unreasonable load on our infrastructure.`,
              `Violation of this policy may result in immediate account suspension or termination without refund.`,
            ]
          },
          {
            title: '6. Intellectual Property',
            content: [
              `<strong>Our IP:</strong> The FunnelLegends platform, branding, software, templates, and content are owned by FunnelLegends and protected by applicable intellectual property laws. You may not copy, modify, or distribute our proprietary materials without written permission.`,
              `<strong>Your Content:</strong> You retain ownership of any content, data, or materials you create or upload to the platform ("User Content"). By using the platform, you grant FunnelLegends a limited, non-exclusive, royalty-free licence to host, process, and display your User Content solely to provide the services.`,
              `You represent that you have all rights necessary to your User Content and that it does not infringe any third-party rights.`,
            ]
          },
          {
            title: '7. Third-Party Integrations',
            content: [
              `FunnelLegends may integrate with or link to third-party services (e.g., Stripe, Zapier, Google, Facebook). Your use of those services is governed by their own terms and privacy policies. We are not responsible for the actions, content, or data practices of third-party services.`,
            ]
          },
          {
            title: '8. Disclaimer of Warranties',
            content: [
              `FunnelLegends is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.`,
              `We do not warrant that the platform will be error-free, uninterrupted, or free from harmful components. We do not guarantee any specific results from using our platform.`,
            ]
          },
          {
            title: '9. Limitation of Liability',
            content: [
              `To the maximum extent permitted by law, FunnelLegends and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, revenue, data, or goodwill.`,
              `Our total aggregate liability to you for any claim arising from these Terms or use of the platform shall not exceed the total fees paid by you to FunnelLegends in the 12 months preceding the claim.`,
            ]
          },
          {
            title: '10. Indemnification',
            content: [
              `You agree to indemnify, defend, and hold harmless FunnelLegends and its affiliates, officers, directors, and employees from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising from your use of the platform, violation of these Terms, or infringement of any third-party rights.`,
            ]
          },
          {
            title: '11. Termination',
            content: [
              `Either party may terminate this agreement at any time. You may cancel your subscription through your account settings. We may terminate or suspend your account for violation of these Terms, non-payment, or for any reason with notice.`,
              `Upon termination, your right to use the platform ceases immediately. We may retain your data for a period as required by law, after which it will be deleted in accordance with our Privacy Policy.`,
            ]
          },
          {
            title: '12. Governing Law & Dispute Resolution',
            content: [
              `These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions.`,
              `Any dispute arising from these Terms or use of FunnelLegends shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration.`,
            ]
          },
          {
            title: '13. Changes to These Terms',
            content: [
              `We may update these Terms at any time. We will provide notice of material changes via email or platform notification. Your continued use of FunnelLegends after such changes constitutes your acceptance.`,
            ]
          },
          {
            title: '14. Contact Information',
            content: [
              `For questions about these Terms, please contact us:`,
              `<strong>FunnelLegends</strong><br/>Email: legal@funnellegends.com<br/>Support: support@funnellegends.com`,
            ]
          },
        ].map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-3">{section.title}</h2>
            <ul className="space-y-3">
              {section.content.map((item, i) => (
                <li key={i} className="text-sm text-slate-700 leading-relaxed pl-4 border-l-2 border-teal-200"
                  dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        ))}

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
          <p className="text-xs text-slate-500 font-medium">This document was last updated on {lastUpdated}.</p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => onNavigate('privacy')} className="text-xs text-emerald-600 hover:underline font-bold">Privacy Policy →</button>
            <button onClick={() => onNavigate('disclaimer')} className="text-xs text-emerald-600 hover:underline font-bold">Earnings Disclaimer →</button>
          </div>
        </div>
      </div>
    </div>
  );
};
