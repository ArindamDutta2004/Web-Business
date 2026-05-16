'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAdminStore } from '@/store/adminStore';
import { LayoutDashboard, Users, FolderKanban, Briefcase, FileEdit, Target, Mail, CreditCard, Bell, Settings, BarChart3, LogOut, Shield } from 'lucide-react';

const LINKS = [
  { label: 'DASHBOARD', href: '/dashboard', icon: LayoutDashboard },
  { label: 'USERS', href: '/dashboard/users', icon: Users },
  { label: 'PROJECTS', href: '/dashboard/projects', icon: FolderKanban },
  { label: 'SERVICES', href: '/dashboard/services', icon: Briefcase },
  { label: 'BLOG', href: '/dashboard/blog', icon: FileEdit },
  { label: 'LEADS', href: '/dashboard/leads', icon: Target },
  { label: 'CONTACTS', href: '/dashboard/contacts', icon: Mail },
  { label: 'INVOICES', href: '/dashboard/invoices', icon: CreditCard },
  { label: 'NOTIFICATIONS', href: '/dashboard/notifications', icon: Bell },
  { label: 'SEO', href: '/dashboard/seo', icon: BarChart3 },
  { label: 'SETTINGS', href: '/dashboard/settings', icon: Settings },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { admin, isAuthenticated, isLoading, checkAuth, logout } = useAdminStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { checkAuth(); }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push('/');
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 bg-kinetic animate-brutal-pulse" /></div>;
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex bg-gray-950">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-black/95 border-r border-white/10 fixed top-0 bottom-0 overflow-y-auto">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-kinetic flex items-center justify-center shrink-0">
              <Shield className="text-black" size={18} />
            </div>
            <div className="min-w-0">
              <p className="font-technical text-[9px] text-kinetic tracking-widest">KO ADMIN</p>
              <p className="font-technical text-[9px] text-white/30 truncate mt-1">{admin?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-1.5">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3.5 px-4 py-3.5 text-[11px] font-technical transition-all duration-200 ${
                pathname === link.href ? 'bg-kinetic text-black' : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <link.icon size={15} />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-5 border-t border-white/10">
          <button onClick={() => { logout(); router.push('/'); }} className="flex items-center gap-3.5 px-4 py-3.5 text-[11px] font-technical text-white/30 hover:text-kinetic transition-colors w-full">
            <LogOut size={15} /> LOGOUT
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur border-b border-white/10">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 bg-kinetic flex items-center justify-center shrink-0">
              <Shield className="text-black" size={16} />
            </div>
            <div className="min-w-0">
              <p className="font-technical text-[9px] text-kinetic">KO ADMIN</p>
              <p className="font-technical text-[9px] text-white/30 truncate">{admin?.email}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/45 hover:text-kinetic"
            aria-label="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur border-t border-white/10 overflow-x-auto">
        <div className="flex min-w-max">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex min-w-[76px] flex-col items-center gap-1 px-3 py-3 ${
                pathname === link.href ? 'text-kinetic' : 'text-white/35'
              }`}
            >
              <link.icon size={17} />
              <span className="font-technical text-[8px]">{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 lg:ml-72 px-4 sm:px-6 lg:px-10 xl:px-12 pt-24 lg:pt-10 pb-28 lg:pb-12 min-h-screen">
        {children}
      </main>
    </div>
  );
}
