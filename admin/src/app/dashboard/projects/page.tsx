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
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">[MANAGEMENT]</p>
          <h1 className="admin-title">PROJECTS</h1>
        </div>
        <button className="admin-button">
          <Plus size={14} /> NEW PROJECT
        </button>
      </div>

      <div className="space-y-4">
        {PROJECTS.map((p) => (
          <div key={p.title} className="admin-card">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-5">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                <p className="font-technical text-[10px] text-white/30 mt-2">CLIENT: {p.client} • BUDGET: {p.budget}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`admin-badge ${statusColor[p.status] || 'text-white/30 border-white/10'}`}>
                  {p.status.toUpperCase().replace('-', ' ')}
                </span>
                <span className={`admin-badge ${
                  p.priority === 'urgent' ? 'text-red-400 border-red-400/30' :
                  p.priority === 'high' ? 'text-kinetic border-kinetic/30' :
                  'text-white/30 border-white/10'
                }`}>{p.priority.toUpperCase()}</span>
                <button className="text-white/20 hover:text-white"><MoreHorizontal size={16} /></button>
              </div>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-sm overflow-hidden">
              <div className={`h-full rounded-sm ${p.status === 'completed' ? 'bg-green-500' : 'bg-kinetic'}`} style={{ width: `${p.progress}%` }} />
            </div>
            <p className="font-technical text-[9px] text-white/30 mt-3">{p.progress}% COMPLETE</p>
          </div>
        ))}
      </div>
    </div>
  );
}
