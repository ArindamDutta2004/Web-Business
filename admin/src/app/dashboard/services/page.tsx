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
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">[MANAGEMENT]</p>
          <h1 className="admin-title">SERVICES</h1>
        </div>
        <button className="admin-button">
          <Plus size={14} /> ADD SERVICE
        </button>
      </div>

      <div className="admin-list">
        {SERVICES.map((s) => (
          <div key={s.id} className="admin-list-row flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <GripVertical size={16} className="text-white/10 cursor-grab" />
              <span className="font-technical text-[10px] text-white/20 w-6">#{s.order}</span>
              <span className="font-display text-sm text-white">{s.title.toUpperCase()}</span>
              {s.featured && <span className="admin-badge bg-kinetic text-black border-kinetic">FEATURED</span>}
            </div>
            <div className="flex items-center gap-4 sm:gap-5">
              <span className={`admin-badge ${s.status === 'active' ? 'text-green-500 border-green-500/30' : 'text-white/30 border-white/10'}`}>{s.status.toUpperCase()}</span>
              <button className="text-white/20 hover:text-kinetic p-1.5"><Edit size={14} /></button>
              <button className="text-white/20 hover:text-red-400 p-1.5"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
