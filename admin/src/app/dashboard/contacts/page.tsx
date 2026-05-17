'use client';

const CONTACTS = [
  { name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', status: 'new', date: 'MAR 15' },
  { name: 'Jane Smith', email: 'jane@corp.com', subject: 'Partnership', status: 'replied', date: 'MAR 12' },
  { name: 'Alex Chen', email: 'alex@tech.io', subject: 'Quote Request', status: 'read', date: 'MAR 10' },
];

export default function ContactsPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">[INBOX]</p>
          <h1 className="admin-title">CONTACT SUBMISSIONS</h1>
        </div>
      </div>

      <div className="space-y-4">
        {CONTACTS.map((c) => (
          <div key={c.email} className={`admin-card cursor-pointer hover:border-kinetic/30 ${c.status === 'new' ? 'border-kinetic/20 bg-kinetic/5' : 'border-white/10'}`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 sm:gap-6">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white">{c.name}</h3>
                <p className="text-sm text-white/40 mt-2">{c.subject}</p>
                <p className="font-technical text-[10px] text-white/20 mt-3 break-words">{c.email}</p>
              </div>
              <div className="sm:text-right shrink-0">
                <span className={`admin-badge ${c.status === 'new' ? 'text-kinetic border-kinetic/30' : c.status === 'replied' ? 'text-green-500 border-green-500/30' : 'text-white/30 border-white/10'}`}>{c.status.toUpperCase()}</span>
                <p className="font-technical text-[9px] text-white/20 mt-3">{c.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
