'use client';

import { Plus, MoreHorizontal } from 'lucide-react';

const PROJECTS = [
  { title: 'NexusAI Platform', client: 'TechCorp', status: 'in-progress', priority: 'high', progress: 65, budget: '$45,000' },
  { title: 'VaultPay Dashboard', client: 'FinanceHub', status: 'review', priority: 'urgent', progress: 90, budget: '$32,000' },
  { title: 'GridWorks Admin', client: 'LogiChain', status: 'in-progress', priority: 'medium', progress: 40, budget: '$28,000' },
  { title: 'StudioLab Website', client: 'CreativesCo', status: 'completed', priority: 'low', progress: 100, budget: '$15,000' },
  { title: 'AutoFlow API', client: 'StartupXYZ', status: 'proposal', priority: 'high', progress: 0, budget: '$52,000' },
];

const statusColor: Record<string, string> = {
  'inquiry': 'text-white/30 border-white/10', 'proposal': 'text-blue-400 border-blue-400/30',
  'in-progress': 'text-kinetic border-kinetic/30', 'review': 'text-yellow-400 border-yellow-400/30',
  'completed': 'text-green-500 border-green-500/30', 'cancelled': 'text-red-400 border-red-400/30',
};

export default function AdminProjectsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[MANAGEMENT]</p>
          <h1 className="font-display text-3xl text-white">PROJECTS</h1>
        </div>
        <button className="bg-kinetic text-black px-5 py-2.5 font-technical text-[11px] flex items-center gap-2 hover:bg-white transition-colors">
          <Plus size={14} /> NEW PROJECT
        </button>
      </div>

      <div className="space-y-3">
        {PROJECTS.map((p) => (
          <div key={p.title} className="border-2 border-white/10 p-6 hover:border-white/20 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex-1">
                <h3 className="font-display text-sm text-white">{p.title}</h3>
                <p className="font-technical text-[10px] text-white/30 mt-1">CLIENT: {p.client} • BUDGET: {p.budget}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-technical text-[9px] px-2 py-0.5 border ${statusColor[p.status] || 'text-white/30 border-white/10'}`}>
                  {p.status.toUpperCase().replace('-', ' ')}
                </span>
                <span className={`font-technical text-[9px] px-2 py-0.5 border ${
                  p.priority === 'urgent' ? 'text-red-400 border-red-400/30' :
                  p.priority === 'high' ? 'text-kinetic border-kinetic/30' :
                  'text-white/30 border-white/10'
                }`}>{p.priority.toUpperCase()}</span>
                <button className="text-white/20 hover:text-white"><MoreHorizontal size={16} /></button>
              </div>
            </div>
            <div className="w-full h-1 bg-white/10">
              <div className={`h-full ${p.status === 'completed' ? 'bg-green-500' : 'bg-kinetic'}`} style={{ width: `${p.progress}%` }} />
            </div>
            <p className="font-technical text-[9px] text-white/30 mt-2">{p.progress}% COMPLETE</p>
          </div>
        ))}
      </div>
    </div>
  );
}
