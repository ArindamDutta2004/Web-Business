'use client';

import { motion } from 'framer-motion';
import { FolderKanban, FileText, MessageSquare, Bell, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';

const QUICK_STATS = [
  { label: 'ACTIVE PROJECTS', value: '3', icon: FolderKanban, color: 'text-kinetic' },
  { label: 'PENDING INVOICES', value: '2', icon: FileText, color: 'text-white' },
  { label: 'UNREAD MESSAGES', value: '5', icon: MessageSquare, color: 'text-kinetic' },
  { label: 'NOTIFICATIONS', value: '8', icon: Bell, color: 'text-white' },
];

const RECENT_PROJECTS = [
  { name: 'E-Commerce Platform', status: 'IN PROGRESS', progress: 65 },
  { name: 'Admin Dashboard v2', status: 'REVIEW', progress: 90 },
  { name: 'Mobile App API', status: 'IN PROGRESS', progress: 40 },
];

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div>
      <div className="mb-8">
        <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[OVERVIEW]</p>
        <h1 className="font-display text-3xl md:text-4xl text-white">
          WELCOME BACK, <span className="text-kinetic">{user?.firstName?.toUpperCase()}</span>
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {QUICK_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border-2 border-white/10 p-6 hover:border-kinetic/30 transition-colors"
          >
            <stat.icon className={stat.color} size={18} />
            <div className="font-display text-2xl text-white mt-3">{stat.value}</div>
            <p className="font-technical text-[9px] text-white/30 mt-1 tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg text-white">ACTIVE PROJECTS</h2>
          <Link href="/dashboard/projects" className="font-technical text-[10px] text-kinetic flex items-center gap-1 hover:text-white transition-colors">
            VIEW ALL <ArrowUpRight size={12} />
          </Link>
        </div>
        <div className="space-y-3">
          {RECENT_PROJECTS.map((project) => (
            <div key={project.name} className="border-2 border-white/10 p-6 hover:border-white/20 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-sm text-white">{project.name}</h3>
                <span className="font-technical text-[9px] text-kinetic border border-kinetic/30 px-2 py-0.5">{project.status}</span>
              </div>
              <div className="w-full h-1 bg-white/10">
                <div className="h-full bg-kinetic transition-all" style={{ width: `${project.progress}%` }} />
              </div>
              <p className="font-technical text-[9px] text-white/30 mt-2">{project.progress}% COMPLETE</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display text-lg text-white mb-6">QUICK ACTIONS</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: 'NEW MESSAGE', href: '/dashboard/messages' },
            { label: 'VIEW INVOICES', href: '/dashboard/invoices' },
            { label: 'UPDATE PROFILE', href: '/dashboard/profile' },
          ].map((action) => (
            <Link key={action.label} href={action.href} className="border-2 border-white/10 p-4 font-technical text-[10px] text-white/50 hover:border-kinetic hover:text-kinetic transition-all text-center">
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
