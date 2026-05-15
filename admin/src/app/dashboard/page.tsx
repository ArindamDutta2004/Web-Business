'use client';

import { motion } from 'framer-motion';
import { Users, FolderKanban, Mail, Target, CreditCard, FileEdit, TrendingUp, ArrowUpRight } from 'lucide-react';

const STATS = [
  { label: 'TOTAL USERS', value: '1,247', icon: Users, change: '+12%' },
  { label: 'ACTIVE PROJECTS', value: '38', icon: FolderKanban, change: '+5%' },
  { label: 'NEW CONTACTS', value: '24', icon: Mail, change: '+18%' },
  { label: 'ACTIVE LEADS', value: '56', icon: Target, change: '+8%' },
  { label: 'REVENUE (MTD)', value: '$124,500', icon: CreditCard, change: '+22%' },
  { label: 'BLOG POSTS', value: '89', icon: FileEdit, change: '+3' },
];

const RECENT_ACTIVITY = [
  { type: 'contact', text: 'New contact from TechCorp', time: '5M AGO' },
  { type: 'project', text: 'Project "NexusAI" moved to review', time: '1H AGO' },
  { type: 'lead', text: 'Lead qualified: StartupXYZ', time: '2H AGO' },
  { type: 'invoice', text: 'Invoice KO-00045 paid ($8,500)', time: '3H AGO' },
  { type: 'user', text: 'New user registration: john@example.com', time: '5H AGO' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[ADMIN DASHBOARD]</p>
        <h1 className="font-display text-3xl md:text-4xl text-white">COMMAND CENTER</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="border-2 border-white/10 p-6 hover:border-kinetic/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={18} className="text-kinetic" />
              <span className="font-technical text-[9px] text-green-500 flex items-center gap-1">
                <TrendingUp size={10} /> {stat.change}
              </span>
            </div>
            <div className="font-display text-2xl text-white">{stat.value}</div>
            <p className="font-technical text-[9px] text-white/30 mt-1 tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="border-2 border-white/10 p-6">
          <h2 className="font-display text-lg text-white mb-6">RECENT ACTIVITY</h2>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-4 py-2 border-b border-white/5 last:border-0">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-kinetic mt-1.5 shrink-0" />
                  <p className="text-sm text-white/60">{item.text}</p>
                </div>
                <span className="font-technical text-[9px] text-white/20 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="border-2 border-white/10 p-6">
          <h2 className="font-display text-lg text-white mb-6">QUICK ACTIONS</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'NEW PROJECT', href: '/dashboard/projects' },
              { label: 'CREATE INVOICE', href: '/dashboard/invoices' },
              { label: 'WRITE BLOG POST', href: '/dashboard/blog' },
              { label: 'MANAGE USERS', href: '/dashboard/users' },
              { label: 'VIEW LEADS', href: '/dashboard/leads' },
              { label: 'SITE SETTINGS', href: '/dashboard/settings' },
            ].map((action) => (
              <a key={action.label} href={action.href} className="border border-white/10 p-4 font-technical text-[10px] text-white/50 hover:border-kinetic hover:text-kinetic transition-all flex items-center justify-between">
                {action.label} <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
