'use client';

import { Plus, Edit, Eye, Trash2 } from 'lucide-react';

const POSTS = [
  { title: 'Why Brutalist Design Works', status: 'published', category: 'Design', views: 2400, date: 'MAR 2025' },
  { title: 'Building AI Pipelines', status: 'published', category: 'Engineering', views: 3100, date: 'FEB 2025' },
  { title: 'Next.js 15 Deep Dive', status: 'draft', category: 'Tutorial', views: 0, date: 'APR 2025' },
];

export default function BlogAdminPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">[CMS]</p>
          <h1 className="admin-title">BLOG</h1>
        </div>
        <button className="admin-button">
          <Plus size={14} /> NEW POST
        </button>
      </div>

      <div className="space-y-4">
        {POSTS.map((p) => (
          <div key={p.title} className="admin-card flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white">{p.title.toUpperCase()}</h3>
              <div className="flex flex-wrap gap-4 md:gap-5 mt-3">
                <span className="font-technical text-[9px] text-white/30">{p.category.toUpperCase()}</span>
                <span className="font-technical text-[9px] text-white/20">{p.date}</span>
                <span className="font-technical text-[9px] text-white/20 flex items-center gap-1.5"><Eye size={10} />{p.views.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-5">
              <span className={`admin-badge ${p.status === 'published' ? 'text-green-500 border-green-500/30' : 'text-yellow-400 border-yellow-400/30'}`}>{p.status.toUpperCase()}</span>
              <button className="text-white/20 hover:text-kinetic p-1.5"><Edit size={14} /></button>
              <button className="text-white/20 hover:text-red-400 p-1.5"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
