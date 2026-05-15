'use client';

import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';

const SERVICES = [
  { id: 1, title: 'Web Applications', status: 'active', order: 1, featured: true },
  { id: 2, title: 'AI Integration', status: 'active', order: 2, featured: true },
  { id: 3, title: 'Admin Dashboards', status: 'active', order: 3, featured: false },
  { id: 4, title: 'Brand Systems', status: 'active', order: 4, featured: false },
  { id: 5, title: 'E-Commerce', status: 'active', order: 5, featured: true },
  { id: 6, title: 'Automation', status: 'draft', order: 6, featured: false },
];

export default function ServicesAdminPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[MANAGEMENT]</p>
          <h1 className="font-display text-3xl text-white">SERVICES</h1>
        </div>
        <button className="bg-kinetic text-black px-5 py-2.5 font-technical text-[11px] flex items-center gap-2 hover:bg-white transition-colors">
          <Plus size={14} /> ADD SERVICE
        </button>
      </div>

      <div className="border-2 border-white/10">
        {SERVICES.map((s) => (
          <div key={s.id} className="flex items-center justify-between px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4">
              <GripVertical size={16} className="text-white/10 cursor-grab" />
              <span className="font-technical text-[10px] text-white/20">#{s.order}</span>
              <span className="font-display text-sm text-white">{s.title.toUpperCase()}</span>
              {s.featured && <span className="font-technical text-[8px] bg-kinetic text-black px-2 py-0.5">FEATURED</span>}
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-technical text-[9px] px-2 py-0.5 border ${s.status === 'active' ? 'text-green-500 border-green-500/30' : 'text-white/30 border-white/10'}`}>{s.status.toUpperCase()}</span>
              <button className="text-white/20 hover:text-kinetic"><Edit size={14} /></button>
              <button className="text-white/20 hover:text-red-400"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
