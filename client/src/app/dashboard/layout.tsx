'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { LayoutDashboard, User, FolderKanban, FileText, MessageSquare, Bell, LogOut, Settings } from 'lucide-react';

const SIDEBAR_LINKS = [
  { label: 'DASHBOARD', href: '/dashboard', icon: LayoutDashboard },
  { label: 'PROJECTS', href: '/dashboard/projects', icon: FolderKanban },
  { label: 'INVOICES', href: '/dashboard/invoices', icon: FileText },
  { label: 'MESSAGES', href: '/dashboard/messages', icon: MessageSquare },
  { label: 'NOTIFICATIONS', href: '/dashboard/notifications', icon: Bell },
  { label: 'PROFILE', href: '/dashboard/profile', icon: User },
  { label: 'SETTINGS', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { checkAuth(); }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push('/auth/login');
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 bg-kinetic animate-brutal-pulse" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="pt-20 min-h-screen flex bg-black">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 fixed top-20 bottom-0 overflow-y-auto bg-black/80 backdrop-blur">
        <div className="px-5 py-5 border-b border-white/5">
          <p className="font-technical text-[10px] text-kinetic tracking-widest mb-1">[DASHBOARD]</p>
          <p className="font-body text-sm text-white/50">Welcome, {user?.firstName}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3.5 font-technical text-[11px] transition-all duration-200 ${
                pathname === link.href
                  ? 'bg-kinetic text-black'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <link.icon size={15} />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-3 px-4 py-3 font-technical text-[11px] text-white/30 hover:text-kinetic transition-colors w-full"
          >
            <LogOut size={15} /> LOGOUT
          </button>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur border-t border-white/10 flex overflow-x-auto">
        {SIDEBAR_LINKS.slice(0, 5).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 px-4 py-3.5 flex-1 min-w-[64px] ${
              pathname === link.href ? 'text-kinetic' : 'text-white/30'
            }`}
          >
            <link.icon size={18} />
            <span className="font-technical text-[8px]">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 lg:ml-64 px-5 sm:px-6 lg:px-10 py-6 md:py-8 lg:py-10 pb-24 lg:pb-10"
      >
        <div className="w-full max-w-6xl mx-auto">{children}</div>
      </motion.div>
    </div>
  );
}
