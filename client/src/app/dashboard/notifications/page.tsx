'use client';

import { Bell, Check } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    { type: 'project', title: 'Project milestone completed', msg: 'E-Commerce Platform reached 65% completion', time: '1H AGO', unread: true },
    { type: 'invoice', title: 'Invoice generated', msg: 'Invoice KO-00003 has been created for Mobile App API', time: '3H AGO', unread: true },
    { type: 'message', title: 'New message from Arjun', msg: 'Project update regarding the admin dashboard review', time: '5H AGO', unread: false },
    { type: 'system', title: 'System maintenance', msg: 'Scheduled maintenance on May 20, 2025 from 2:00 AM to 4:00 AM IST', time: '1D AGO', unread: false },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[ALERTS]</p>
          <h1 className="font-display text-3xl text-white">NOTIFICATIONS</h1>
        </div>
        <button className="font-technical text-[10px] text-white/30 hover:text-kinetic transition-colors flex items-center gap-2 border border-white/10 px-4 py-2.5">
          <Check size={12} /> MARK ALL READ
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className={`border-2 p-6 transition-all ${n.unread ? 'border-kinetic/20 bg-kinetic/5' : 'border-white/10'}`}>
            <div className="flex items-start gap-4">
              <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${n.unread ? 'bg-kinetic' : 'bg-white/10'}`}>
                <Bell size={14} className={n.unread ? 'text-black' : 'text-white/30'} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-sm text-white">{n.title}</h3>
                  <span className="font-technical text-[9px] text-white/20 shrink-0">{n.time}</span>
                </div>
                <p className="font-body text-sm text-white/40 mt-1">{n.msg}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
