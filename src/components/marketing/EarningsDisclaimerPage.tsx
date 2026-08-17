import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (tab: any) => void;
}

export const EarningsDisclaimerPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  const lastUpdated = 'August 17, 2026';

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-widest">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Legal Document</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Earnings Disclaimer</h1>
          <p className="text-white/80 text-sm font-medium">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-slate-600 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-emerald-600 transition-colors">Home</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-bold">Earnings Disclaimer</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">

        {/* Important Notice Banner */}
        <div className="p-6 rounded-2xl bg-orange-50 border-2 border-orange-200">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h2 className="text-base font-black text-slate-900">Important Notice — Please Read Before Proceeding</h2>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">
                The following Earnings Disclaimer applies to all content, testimonials, case studies, projections, and income claims made by or on behalf of <strong>FunnelLegends</strong> on this website, our platform, emails, social media, webinars, and any other marketing materials.
              </p>
            </div>
          </div>
        </div>

        {[
          {
            title: '1. No Income Guarantee',
            content: [
              `FunnelLegends is a software platform — a tool to help you build sales funnels, manage affiliates, run campaigns, and grow your online business. Like any tool, results depend entirely on how you use it, the effort you invest, your skills, your market, and numerous other individual factors beyond our control.`,
              `<strong>We do not guarantee that you will earn any specific amount of money or achieve any particular result by using FunnelLegends.</strong> Any income or earnings statements are estimates of what we believe is possible, not promises or guarantees.`,
            ]
          },
          {
            title: '2. Testimonials & Case Studies',
            content: [
              `Testimonials, success stories, and case studies featured on this website or in our marketing materials represent individual experiences and exceptional results. They are not typical and should not be interpreted as typical.`,
              `The individuals featured in testimonials may have received compensation, free access to the platform, or other incentives for providing their testimonials. Results shared are specific to those individuals and are not indicative of what you should expect.`,
              `Your experience will vary based on your background, effort, market conditions, technical ability, and many other factors we cannot control.`,
            ]
          },
          {
            title: '3. Forward-Looking Statements',
            content: [
              `Certain statements made on this website, in our marketing materials, or by FunnelLegends representatives may constitute "forward-looking statements." These include any statements regarding potential income, business outcomes, or product performance.`,
              `Such statements are based on assumptions and beliefs and involve known and unknown risks. Actual results may differ materially from those described. Forward-looking statements should not be relied upon as guarantees of future performance.`,
            ]
          },
          {
            title: '4. Individual Results May Vary',
            content: [
              `Your results using FunnelLegends will depend on many factors, including but not limited to:`,
              `— Your industry, market, and niche.`,
              `— Your prior business, marketing, or technical experience.`,
              `— The quality of your offers, traffic, and audience.`,
              `— The amount of time, effort, and investment you commit.`,
              `— Economic conditions, market trends, and competition.`,
              `— Your ability to follow through, implement strategies, and adapt.`,
              `We make no representation that average users will achieve any particular level of income or results.`,
            ]
          },
          {
            title: '5. Not Financial or Business Advice',
            content: [
              `Nothing on this website or within the FunnelLegends platform constitutes professional financial, legal, tax, or business advice. All information provided is for general educational and informational purposes only.`,
              `Before making any financial or business decisions, you should consult with a qualified financial advisor, accountant, or legal professional who can assess your specific situation.`,
            ]
          },
          {
            title: '6. Risk Acknowledgement',
            content: [
              `Building and operating an online business involves risk. You could lose money. You may invest time and resources without achieving the results you desire.`,
              `<strong>By using FunnelLegends, you acknowledge and accept that:</strong>`,
              `— There is no guarantee of income, business success, or any specific outcome.`,
              `— Past results of other users do not guarantee your future results.`,
              `— You are solely responsible for your own business decisions and any outcomes that result.`,
              `— FunnelLegends is not responsible for any losses you may incur.`,
            ]
          },
          {
            title: '7. Regulatory Compliance',
            content: [
              `All income claims and testimonials used in our marketing comply with the guidelines set by the United Kingdom's Advertising Standards Authority (ASA) and the Competition and Markets Authority (CMA), as well as the United States Federal Trade Commission (FTC) guidelines on endorsements and testimonials.`,
              `Where specific income figures are shared, we endeavour to provide context on whether these are typical, exceptional, or hypothetical. If you believe any of our claims are misleading, please contact us immediately.`,
            ]
          },
          {
            title: '8. Contact & Corrections',
            content: [
              `If you have any questions about this Earnings Disclaimer or believe any claims made are inaccurate or misleading, please contact us:`,
              `<strong>FunnelLegends</strong><br/>Email: legal@funnellegends.com<br/>Support: support@funnellegends.com`,
            ]
          },
        ].map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-3">{section.title}</h2>
            <ul className="space-y-3">
              {section.content.map((item, i) => (
                <li key={i} className="text-sm text-slate-700 leading-relaxed pl-4 border-l-2 border-orange-200"
                  dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        ))}

        {/* Final Summary Box */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 text-center space-y-4">
          <AlertTriangle className="w-8 h-8 text-orange-400 mx-auto" />
          <h3 className="text-lg font-black text-white">Summary</h3>
          <p className="text-sm text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            FunnelLegends is a powerful platform. When used consistently and correctly, it can help you significantly grow your business. But results are never guaranteed. Your success depends on you — your effort, your strategy, and your persistence.
          </p>
          <p className="text-xs text-slate-400 font-medium">
            This disclaimer was last updated on {lastUpdated}.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
          <p className="text-xs text-slate-500 font-medium">See also our other legal documents:</p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => onNavigate('privacy')} className="text-xs text-emerald-600 hover:underline font-bold">Privacy Policy →</button>
            <button onClick={() => onNavigate('terms')} className="text-xs text-emerald-600 hover:underline font-bold">Terms of Service →</button>
          </div>
        </div>
      </div>
    </div>
  );
};
