'use client';

const CONTACTS = [
  { name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', status: 'new', date: 'MAR 15' },
  { name: 'Jane Smith', email: 'jane@corp.com', subject: 'Partnership', status: 'replied', date: 'MAR 12' },
  { name: 'Alex Chen', email: 'alex@tech.io', subject: 'Quote Request', status: 'read', date: 'MAR 10' },
];

export default function ContactsPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[INBOX]</p>
        <h1 className="font-display text-3xl text-white">CONTACT SUBMISSIONS</h1>
      </div>

      <div className="space-y-3">
        {CONTACTS.map((c) => (
          <div key={c.email} className={`border-2 p-6 cursor-pointer transition-all hover:border-kinetic/30 ${c.status === 'new' ? 'border-kinetic/20 bg-kinetic/5' : 'border-white/10'}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-sm text-white">{c.name}</h3>
                <p className="text-sm text-white/40 mt-1">{c.subject}</p>
                <p className="font-technical text-[10px] text-white/20 mt-2">{c.email}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`font-technical text-[9px] px-2 py-0.5 border ${c.status === 'new' ? 'text-kinetic border-kinetic/30' : c.status === 'replied' ? 'text-green-500 border-green-500/30' : 'text-white/30 border-white/10'}`}>{c.status.toUpperCase()}</span>
                <p className="font-technical text-[9px] text-white/20 mt-2">{c.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
