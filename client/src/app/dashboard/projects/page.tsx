'use client';

export default function DashboardProjectsPage() {
  const projects = [
    { name: 'E-Commerce Platform', status: 'IN PROGRESS', progress: 65, deadline: 'JUN 2025' },
    { name: 'Admin Dashboard v2', status: 'REVIEW', progress: 90, deadline: 'MAY 2025' },
    { name: 'Mobile App API', status: 'IN PROGRESS', progress: 40, deadline: 'JUL 2025' },
    { name: 'Brand Website Redesign', status: 'COMPLETED', progress: 100, deadline: 'APR 2025' },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="ko-eyebrow mb-2">[MY PROJECTS]</p>
        <h1 className="font-display text-3xl text-white">PROJECT TRACKING</h1>
      </div>

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.name} className="ko-card p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-display text-sm text-white">{p.name}</h3>
                <p className="font-technical text-[10px] text-white/30 mt-1">DEADLINE: {p.deadline}</p>
              </div>
              <span className={`ko-chip self-start ${
                p.status === 'COMPLETED' ? 'border-green-500 text-green-500' :
                p.status === 'REVIEW' ? 'border-yellow-500 text-yellow-500' :
                'border-kinetic text-kinetic'
              }`}>{p.status}</span>
            </div>
            <div className="w-full h-1 bg-white/10">
              <div className={`h-full transition-all ${p.status === 'COMPLETED' ? 'bg-green-500' : 'bg-kinetic'}`} style={{ width: `${p.progress}%` }} />
            </div>
            <p className="font-technical text-[9px] text-white/30 mt-2">{p.progress}% COMPLETE</p>
          </div>
        ))}
      </div>
    </div>
  );
}
