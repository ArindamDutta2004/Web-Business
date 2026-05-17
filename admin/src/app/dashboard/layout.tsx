'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAdminStore } from '@/store/adminStore';
import {
  LayoutDashboard, Users, FolderKanban, Briefcase, FileEdit,
  Target, Mail, CreditCard, Bell, Settings, BarChart3,
  LogOut, Shield, ChevronLeft, ChevronRight, Menu, X,
} from 'lucide-react';

const NAV_GROUPS = [
  {
    label: 'OVERVIEW',
    links: [
      { label: 'DASHBOARD', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'MANAGEMENT',
    links: [
      { label: 'USERS',     href: '/dashboard/users',     icon: Users },
      { label: 'PROJECTS',  href: '/dashboard/projects',  icon: FolderKanban },
      { label: 'SERVICES',  href: '/dashboard/services',  icon: Briefcase },
      { label: 'INVOICES',  href: '/dashboard/invoices',  icon: CreditCard },
    ],
  },
  {
    label: 'CONTENT',
    links: [
      { label: 'BLOG',          href: '/dashboard/blog',          icon: FileEdit },
      { label: 'SEO',           href: '/dashboard/seo',           icon: BarChart3 },
    ],
  },
  {
    label: 'CRM',
    links: [
      { label: 'LEADS',    href: '/dashboard/leads',    icon: Target },
      { label: 'CONTACTS', href: '/dashboard/contacts', icon: Mail },
    ],
  },
  {
    label: 'SYSTEM',
    links: [
      { label: 'NOTIFICATIONS', href: '/dashboard/notifications', icon: Bell },
      { label: 'SETTINGS',      href: '/dashboard/settings',      icon: Settings },
    ],
  },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { admin, isAuthenticated, isLoading, checkAuth, logout } = useAdminStore();
  const router   = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { checkAuth(); }, [checkAuth]);
  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push('/');
  }, [isLoading, isAuthenticated, router]);

  // close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-8 h-8 bg-kinetic animate-brutal-pulse" />
    </div>
  );
  if (!isAuthenticated) return null;

  const sidebarW = collapsed ? 'w-[68px]' : 'w-60';

  const NavContent = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {/* Brand */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed && !mobile ? 'justify-center px-0' : ''}`}>
        <div className="w-9 h-9 bg-kinetic flex items-center justify-center shrink-0">
          <Shield className="text-black" size={16} />
        </div>
        {(!collapsed || mobile) && (
          <div className="min-w-0">
            <p className="font-technical text-[9px] text-kinetic tracking-wider">KO ADMIN</p>
            <p className="font-technical text-[9px] text-white/30 truncate mt-0.5">{admin?.email}</p>
          </div>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            {(!collapsed || mobile) && (
              <p className="font-technical text-[8px] text-white/20 px-3 mb-2 tracking-wider">{group.label}</p>
            )}
            <div className="space-y-0.5">
              {group.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    title={collapsed && !mobile ? link.label : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 text-[11px] font-technical transition-all duration-150 rounded-sm
                      ${collapsed && !mobile ? 'justify-center' : ''}
                      ${active
                        ? 'bg-kinetic text-black'
                        : 'text-white/45 hover:text-white hover:bg-white/6'
                      }`}
                  >
                    <link.icon size={15} className="shrink-0" />
                    {(!collapsed || mobile) && <span>{link.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className={`px-2 py-3 border-t border-white/10 ${collapsed && !mobile ? 'flex justify-center' : ''}`}>
        <button
          onClick={() => { logout(); router.push('/'); }}
          title={collapsed && !mobile ? 'LOGOUT' : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 text-[11px] font-technical text-white/30 hover:text-kinetic transition-colors rounded-sm w-full
            ${collapsed && !mobile ? 'justify-center w-auto' : ''}`}
        >
          <LogOut size={15} className="shrink-0" />
          {(!collapsed || mobile) && <span>LOGOUT</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-gray-950">

      {/* ── Desktop Sidebar ── */}
      <aside className={`hidden lg:flex flex-col ${sidebarW} bg-black/95 border-r border-white/10 fixed top-0 bottom-0 transition-all duration-200 z-30`}>
        <NavContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-[72px] w-6 h-6 bg-gray-900 border border-white/15 flex items-center justify-center text-white/40 hover:text-kinetic hover:border-kinetic transition-colors z-10"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* ── Mobile Overlay ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <aside className={`lg:hidden fixed top-0 bottom-0 left-0 z-50 w-64 bg-black/98 border-r border-white/10 flex flex-col transition-transform duration-200 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-white/30 hover:text-white"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
        <NavContent mobile />
      </aside>

      {/* ── Mobile Top Bar ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-black/95 backdrop-blur border-b border-white/10 h-14 flex items-center px-4 gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/50 hover:text-kinetic hover:border-kinetic transition-colors"
          aria-label="Open menu"
        >
          <Menu size={17} />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-kinetic flex items-center justify-center">
            <Shield className="text-black" size={13} />
          </div>
          <p className="font-technical text-[10px] text-kinetic">KO ADMIN</p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className={`flex-1 transition-all duration-200 ${collapsed ? 'lg:ml-[68px]' : 'lg:ml-60'} pt-14 lg:pt-0 min-h-screen`}>
        <div className="px-5 sm:px-7 lg:px-10 py-8 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
