'use client';

export default function InvoicesAdminPage() {
  const invoices = [
    { id: 'KO-00001', client: 'TechCorp', amount: '$45,000', status: 'paid', date: 'MAR 15' },
    { id: 'KO-00002', client: 'StartupXYZ', amount: '$32,000', status: 'sent', date: 'APR 01' },
    { id: 'KO-00003', client: 'DesignCo', amount: '$15,000', status: 'overdue', date: 'FEB 28' },
    { id: 'KO-00004', client: 'FinanceHub', amount: '$28,000', status: 'draft', date: 'APR 10' },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">[BILLING]</p>
          <h1 className="admin-title">INVOICES</h1>
        </div>
      </div>

      <div className="admin-list">
        {invoices.map((inv) => (
          <div key={inv.id} className="admin-list-row flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex flex-wrap items-center gap-4 md:gap-8">
              <span className="font-technical text-xs text-kinetic">{inv.id}</span>
              <span className="text-sm text-white/60">{inv.client}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <span className="font-display text-sm text-white">{inv.amount}</span>
              <span className={`admin-badge ${
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
