'use client';

export default function InvoicesAdminPage() {
  const invoices = [
    { id: 'KO-00001', client: 'TechCorp', amount: '$45,000', status: 'paid', date: 'MAR 15' },
    { id: 'KO-00002', client: 'StartupXYZ', amount: '$32,000', status: 'sent', date: 'APR 01' },
    { id: 'KO-00003', client: 'DesignCo', amount: '$15,000', status: 'overdue', date: 'FEB 28' },
    { id: 'KO-00004', client: 'FinanceHub', amount: '$28,000', status: 'draft', date: 'APR 10' },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[BILLING]</p>
        <h1 className="font-display text-3xl text-white">INVOICES</h1>
      </div>

      <div className="border-2 border-white/10">
        {invoices.map((inv) => (
          <div key={inv.id} className="flex items-center justify-between px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-6">
              <span className="font-technical text-xs text-kinetic">{inv.id}</span>
              <span className="text-sm text-white/60">{inv.client}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-display text-sm text-white">{inv.amount}</span>
              <span className={`font-technical text-[9px] px-2 py-0.5 border ${
                inv.status === 'paid' ? 'text-green-500 border-green-500/30' :
                inv.status === 'overdue' ? 'text-red-400 border-red-400/30' :
                inv.status === 'sent' ? 'text-blue-400 border-blue-400/30' :
                'text-white/30 border-white/10'
              }`}>{inv.status.toUpperCase()}</span>
              <span className="font-technical text-[9px] text-white/20">{inv.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
