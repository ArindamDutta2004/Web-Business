'use client';

const LEADS = [
  { name: 'TechCorp Inc', email: 'cto@techcorp.com', service: 'AI Integration', budget: '$50K+', status: 'qualified', priority: 'high' },
  { name: 'StartupXYZ', email: 'founder@xyz.io', service: 'Web App', budget: '$25K-50K', status: 'new', priority: 'medium' },
  { name: 'DesignCo', email: 'hello@designco.com', service: 'Brand System', budget: '$10K-25K', status: 'contacted', priority: 'low' },
];

const sc: Record<string, string> = { new: 'text-blue-400 border-blue-400/30', contacted: 'text-yellow-400 border-yellow-400/30', qualified: 'text-green-500 border-green-500/30', proposal: 'text-kinetic border-kinetic/30' };

export default function LeadsPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[SALES]</p>
        <h1 className="font-display text-3xl text-white">LEADS</h1>
      </div>

      <div className="space-y-3">
        {LEADS.map((l) => (
          <div key={l.email} className="border-2 border-white/10 p-6 hover:border-white/20 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-sm text-white">{l.name}</h3>
                <p className="text-sm text-white/30 mt-1">{l.email} • {l.service} • {l.budget}</p>
              </div>
              <div className="flex gap-2">
                <span className={`font-technical text-[9px] px-2 py-0.5 border ${sc[l.status] || 'text-white/30 border-white/10'}`}>{l.status.toUpperCase()}</span>
                <span className={`font-technical text-[9px] px-2 py-0.5 border ${l.priority === 'high' ? 'text-kinetic border-kinetic/30' : 'text-white/30 border-white/10'}`}>{l.priority.toUpperCase()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
