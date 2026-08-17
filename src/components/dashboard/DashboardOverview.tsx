import React from 'react';
import { FunnelData } from '../../types/builder';
import { 
  Rocket, Users, DollarSign, TrendingUp, Plus, Activity, 
  MousePointerClick, Calendar, ArrowRight, ArrowUpRight, Layers 
} from 'lucide-react';

interface DashboardOverviewProps {
  funnels: FunnelData[];
  onNavigate: (tab: string) => void;
  onOpenTemplates: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  funnels, 
  onNavigate,
  onOpenTemplates
}) => {
  const recentFunnels = funnels.slice(0, 3);
  
  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back, Marcus! 👋</h2>
            <p className="text-slate-400 mt-1">Here is what is happening with your funnels today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenTemplates}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Funnel</span>
            </button>
          </div>
        </div>

        {/* High-Level Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-indigo-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                +14.5%
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Total Revenue (30d)</h3>
            <div className="text-3xl font-black text-white mt-1">$42,500.00</div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-indigo-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                +8.2%
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">New Leads (30d)</h3>
            <div className="text-3xl font-black text-white mt-1">1,248</div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-indigo-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <MousePointerClick className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3" />
                +2.4%
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Avg Conversion Rate</h3>
            <div className="text-3xl font-black text-white mt-1">12.8%</div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-indigo-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Rocket className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-800 px-2 py-1 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">Active Funnels</h3>
            <div className="text-3xl font-black text-white mt-1">{funnels.length}</div>
          </div>
        </div>

        {/* Bottom Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Funnels */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Rocket className="w-5 h-5 text-indigo-400" />
                Recent Funnels
              </h3>
              <button 
                onClick={() => onNavigate('funnels')}
                className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="divide-y divide-slate-800">
                {recentFunnels.map((fnl) => (
                  <div key={fnl.id} className="p-4 hover:bg-slate-800/50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-indigo-500/50 transition-colors">
                        <Layers className="w-5 h-5 text-slate-400 group-hover:text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors">{fnl.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{fnl.steps.length} Steps • {fnl.type} Funnel</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => onNavigate('funnels')}
                      className="px-4 py-2 bg-slate-800 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition-colors shadow"
                    >
                      Open Builder
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Platform Activity
            </h3>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              {/* Blur gradient effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">New Purchase: Agency Pro Pass</p>
                    <p className="text-xs text-slate-400 mt-0.5">Sarah Jenkins paid <span className="text-emerald-400 font-bold">$297.00</span></p>
                    <p className="text-[10px] text-slate-500 mt-1">2 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-1">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Strategy Call Booked</p>
                    <p className="text-xs text-slate-400 mt-0.5">Mike Vance booked for Nov 2nd</p>
                    <p className="text-[10px] text-slate-500 mt-1">15 minutes ago</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-1">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Affiliate Commission Earned</p>
                    <p className="text-xs text-slate-400 mt-0.5">David S. earned $148.50 tier-1</p>
                    <p className="text-[10px] text-slate-500 mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => onNavigate('crm')}
                className="w-full mt-6 py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                View All Activity
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
