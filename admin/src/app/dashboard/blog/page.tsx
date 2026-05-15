'use client';

import { Plus, Edit, Eye, Trash2 } from 'lucide-react';

const POSTS = [
  { title: 'Why Brutalist Design Works', status: 'published', category: 'Design', views: 2400, date: 'MAR 2025' },
  { title: 'Building AI Pipelines', status: 'published', category: 'Engineering', views: 3100, date: 'FEB 2025' },
  { title: 'Next.js 15 Deep Dive', status: 'draft', category: 'Tutorial', views: 0, date: 'APR 2025' },
];

export default function BlogAdminPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[CMS]</p>
          <h1 className="font-display text-3xl text-white">BLOG</h1>
        </div>
        <button className="bg-kinetic text-black px-5 py-2.5 font-technical text-[11px] flex items-center gap-2 hover:bg-white transition-colors">
          <Plus size={14} /> NEW POST
        </button>
      </div>

      <div className="space-y-3">
        {POSTS.map((p) => (
          <div key={p.title} className="border-2 border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/20 transition-colors">
            <div>
              <h3 className="font-display text-sm text-white">{p.title.toUpperCase()}</h3>
              <div className="flex gap-3 mt-2">
                <span className="font-technical text-[9px] text-white/30">{p.category.toUpperCase()}</span>
                <span className="font-technical text-[9px] text-white/20">{p.date}</span>
                <span className="font-technical text-[9px] text-white/20 flex items-center gap-1"><Eye size={10} />{p.views}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`font-technical text-[9px] px-2 py-0.5 border ${p.status === 'published' ? 'text-green-500 border-green-500/30' : 'text-yellow-400 border-yellow-400/30'}`}>{p.status.toUpperCase()}</span>
              <button className="text-white/20 hover:text-kinetic"><Edit size={14} /></button>
              <button className="text-white/20 hover:text-red-400"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
