'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users, FolderKanban, Mail, Target, CreditCard, FileEdit,
  TrendingUp, ArrowUpRight, PlusCircle, ReceiptText, PenLine,
  UserCog, SlidersHorizontal,
} from 'lucide-react';
import api from '@/lib/api';
import { formatDate, money } from '@/components/admin/ResourcePage';

const QUICK_ACTIONS = [
  { label: 'NEW PROJECT', href: '/dashboard/projects', icon: PlusCircle },
  { label: 'CREATE INVOICE', href: '/dashboard/invoices', icon: ReceiptText },
  { label: 'WRITE BLOG POST', href: '/dashboard/blog', icon: PenLine },
  { label: 'MANAGE USERS', href: '/dashboard/users', icon: UserCog },
  { label: 'VIEW LEADS', href: '/dashboard/leads', icon: Target },
  { label: 'SITE SETTINGS', href: '/dashboard/settings', icon: SlidersHorizontal },
];

type DashboardStats = {
  counts?: {
    users?: number;
    projects?: number;
    newContacts?: number;
    leads?: number;
    publishedBlogs?: number;
  };
  totalRevenue?: number;
  recentContacts?: Array<{ name?: string; subject?: string; createdAt?: string }>;
  recentProjects?: Array<{ title?: string; updatedAt?: string; createdAt?: string }>;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    api.get('/admin/dashboard')
      .then(({ data }) => setStats(data.data))
      .catch(() => setStats(null));
  }, []);

  const statCards = useMemo(() => [
    { label: 'TOTAL USERS', value: stats?.counts?.users?.toLocaleString() || '0', icon: Users, change: 'LIVE' },
    { label: 'TOTAL PROJECTS', value: stats?.counts?.projects?.toLocaleString() || '0', icon: FolderKanban, change: 'LIVE' },
    { label: 'NEW CONTACTS', value: stats?.counts?.newContacts?.toLocaleString() || '0', icon: Mail, change: 'INBOX' },
    { label: 'ACTIVE LEADS', value: stats?.counts?.leads?.toLocaleString() || '0', icon: Target, change: 'CRM' },
    { label: 'PAID REVENUE', value: money(stats?.totalRevenue || 0), icon: CreditCard, change: 'TOTAL' },
    { label: 'PUBLISHED POSTS', value: stats?.counts?.publishedBlogs?.toLocaleString() || '0', icon: FileEdit, change: 'CMS' },
  ], [stats]);

  const recentActivity = [
    ...(stats?.recentContacts || []).map((contact) => ({
      text: `Contact from ${contact.name}: ${contact.subject}`,
      time: formatDate(contact.createdAt),
    })),
    ...(stats?.recentProjects || []).map((project) => ({
      text: `Project updated: ${project.title}`,
      time: formatDate(project.updatedAt || project.createdAt),
    })),
  ].slice(0, 7);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">[ADMIN DASHBOARD]</p>
          <h1 className="admin-title">COMMAND CENTER</h1>
        </div>
        <div className="admin-header-meta">
          <span className="admin-badge text-green-500 border-green-500/30">LIVE</span>
          <span className="admin-badge text-white/45 border-white/10">Q2 OPS</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-dashboard-stats">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="admin-card admin-stat-card"
          >
            <div className="admin-stat-topline">
              <span className="admin-stat-icon">
                <stat.icon size={18} />
              </span>
              <span className="admin-stat-change">
                <TrendingUp size={12} /> {stat.change}
              </span>
            </div>
            <div>
              <div className="admin-stat-value">{stat.value}</div>
              <p className="admin-stat-label">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="admin-dashboard-panels">
        {/* Recent Activity */}
        <div className="admin-card admin-panel-card">
          <div className="admin-panel-header">
            <h2 className="admin-section-title">RECENT ACTIVITY</h2>
          </div>
          <div className="admin-activity-list">
            {recentActivity.length === 0 && (
              <div className="admin-empty">No recent activity yet.</div>
            )}
            {recentActivity.map((item, i) => (
              <div key={i} className="admin-activity-row">
                <div className="admin-activity-copy">
                  <div className="admin-activity-dot" />
                  <p className="admin-activity-text">{item.text}</p>
                </div>
                <span className="admin-activity-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-card admin-panel-card">
          <div className="admin-panel-header">
            <h2 className="admin-section-title">QUICK ACTIONS</h2>
          </div>
          <div className="admin-action-grid">
            {QUICK_ACTIONS.map((action) => (
              <Link key={action.label} href={action.href} className="admin-action-link">
                <span className="admin-action-main">
                  <span className="admin-action-icon">
                    <action.icon size={16} />
                  </span>
                  <span>{action.label}</span>
                </span>
                <ArrowUpRight size={13} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
