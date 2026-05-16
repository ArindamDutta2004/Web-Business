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
      <div className="mb-8 md:mb-10">
        <p className="ko-eyebrow mb-2">[OVERVIEW]</p>
        <h1 className="font-display text-3xl md:text-4xl text-white leading-tight">
          WELCOME BACK, <span className="text-kinetic">{user?.firstName?.toUpperCase()}</span>
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
        {QUICK_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="ko-card p-5 md:p-6"
          >
            <stat.icon className={stat.color} size={18} />
            <div className="font-display text-3xl text-white mt-3">{stat.value}</div>
            <p className="font-technical text-[9px] text-white/30 mt-2 tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="mb-10">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="font-display text-lg text-white">ACTIVE PROJECTS</h2>
          <Link href="/dashboard/projects" className="font-technical text-[10px] text-kinetic flex items-center gap-1.5 hover:text-white transition-colors">
            VIEW ALL <ArrowUpRight size={12} />
          </Link>
        </div>
        <div className="space-y-3">
          {RECENT_PROJECTS.map((project) => (
            <div key={project.name} className="ko-card p-5 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="font-display text-sm text-white">{project.name}</h3>
                <span className="ko-chip border-kinetic/30 text-kinetic">{project.status}</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-sm overflow-hidden">
                <div className="h-full bg-kinetic transition-all rounded-sm" style={{ width: `${project.progress}%` }} />
              </div>
              <p className="font-technical text-[9px] text-white/30 mt-2.5">{project.progress}% COMPLETE</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display text-lg text-white mb-5">QUICK ACTIONS</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {[
            { label: 'NEW MESSAGE', href: '/dashboard/messages' },
            { label: 'VIEW INVOICES', href: '/dashboard/invoices' },
            { label: 'UPDATE PROFILE', href: '/dashboard/profile' },
          ].map((action) => (
            <Link key={action.label} href={action.href} className="ko-card p-5 font-technical text-[10px] text-white/55 hover:border-kinetic hover:text-kinetic text-center">
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
