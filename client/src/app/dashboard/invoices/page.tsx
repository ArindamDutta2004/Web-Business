'use client';

export default function InvoicesPage() {
  const invoices = [
    { id: 'KO-00001', project: 'E-Commerce Platform', amount: '$12,500', status: 'PAID', date: 'MAR 15, 2025' },
    { id: 'KO-00002', project: 'Admin Dashboard v2', amount: '$8,000', status: 'PENDING', date: 'APR 01, 2025' },
    { id: 'KO-00003', project: 'Mobile App API', amount: '$15,000', status: 'DRAFT', date: 'APR 10, 2025' },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[BILLING]</p>
        <h1 className="font-display text-3xl text-white">INVOICES</h1>
      </div>

      <div className="border-2 border-white/10">
        <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3.5 border-b-2 border-white/10">
          {['INVOICE', 'PROJECT', 'AMOUNT', 'STATUS', 'DATE'].map((h) => (
            <span key={h} className="font-technical text-[10px] text-white/30">{h}</span>
          ))}
        </div>
        {invoices.map((inv) => (
          <div key={inv.id} className="grid md:grid-cols-5 gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors items-center">
            <span className="font-technical text-xs text-kinetic">{inv.id}</span>
            <span className="font-body text-sm text-white/60">{inv.project}</span>
            <span className="font-display text-sm text-white">{inv.amount}</span>
            <span className={`font-technical text-[10px] px-3 py-1 border self-start w-fit ${
              inv.status === 'PAID' ? 'border-green-500 text-green-500' :
              inv.status === 'PENDING' ? 'border-yellow-500 text-yellow-500' :
              'border-white/20 text-white/30'
            }`}>{inv.status}</span>
            <span className="font-technical text-[10px] text-white/30">{inv.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
