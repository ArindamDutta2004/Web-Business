'use client';

import { MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  const messages = [
    { from: 'Arjun Patel', subject: 'Project Update: E-Commerce', time: '2H AGO', unread: true },
    { from: 'Priya Sharma', subject: 'Design Review Ready', time: '5H AGO', unread: true },
    { from: 'Support Team', subject: 'Invoice KO-00002 Generated', time: '1D AGO', unread: false },
    { from: 'Arjun Patel', subject: 'Sprint Planning Notes', time: '2D AGO', unread: false },
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[COMMUNICATION]</p>
        <h1 className="font-display text-3xl text-white">MESSAGES</h1>
      </div>

      <div className="space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`border-2 p-6 cursor-pointer transition-all hover:border-kinetic/30 ${
            msg.unread ? 'border-kinetic/20 bg-kinetic/5' : 'border-white/10'
          }`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className={msg.unread ? 'text-kinetic' : 'text-white/30'} />
                </div>
                <div>
                  <p className="font-display text-sm text-white">{msg.from}</p>
                  <p className="font-body text-sm text-white/40 mt-1">{msg.subject}</p>
                </div>
              </div>
              <span className="font-technical text-[9px] text-white/20 shrink-0">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
