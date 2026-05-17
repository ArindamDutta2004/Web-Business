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

type AdminNavContentProps = {
  adminEmail?: string;
  collapsed: boolean;
  mobile?: boolean;
  pathname: string;
  onNavigate?: () => void;
  onLogout: () => void;
};

function AdminNavContent({
  adminEmail,
  collapsed,
  mobile = false,
  pathname,
  onNavigate,
  onLogout,
}: AdminNavContentProps) {
  return (
    <>
      {/* Brand */}
      <div className={`admin-sidebar-brand ${collapsed && !mobile ? 'is-collapsed' : ''}`}>
        <div className="admin-brand-mark">
          <Shield className="text-black" size={16} />
        </div>
        {(!collapsed || mobile) && (
          <div className="min-w-0">
            <p className="font-technical text-[9px] text-kinetic tracking-wider">KO ADMIN</p>
            <p className="font-technical text-[9px] text-white/30 truncate mt-0.5">{adminEmail}</p>
          </div>
        )}
      </div>

      {/* Nav groups */}
      <nav className="admin-sidebar-nav">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="admin-nav-group">
            {(!collapsed || mobile) && (
              <p className="admin-nav-group-label">{group.label}</p>
            )}
            <div className="admin-nav-links">
              {group.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate}
                    title={collapsed && !mobile ? link.label : undefined}
                    className={`admin-nav-link ${active ? 'is-active' : ''} ${collapsed && !mobile ? 'is-collapsed' : ''}`}
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
      <div className={`admin-sidebar-footer ${collapsed && !mobile ? 'is-collapsed' : ''}`}>
        <button
          onClick={onLogout}
          title={collapsed && !mobile ? 'LOGOUT' : undefined}
          className={`admin-nav-link admin-logout ${collapsed && !mobile ? 'is-collapsed' : ''}`}
        >
          <LogOut size={15} className="shrink-0" />
          {(!collapsed || mobile) && <span>LOGOUT</span>}
        </button>
      </div>
    </>
  );
}

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

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-8 h-8 bg-kinetic animate-brutal-pulse" />
    </div>
  );
  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className={`admin-shell ${collapsed ? 'is-collapsed' : ''}`}>

      {/* ── Desktop Sidebar ── */}
      <aside className="admin-sidebar">
        <AdminNavContent
          adminEmail={admin?.email}
          collapsed={collapsed}
          pathname={pathname}
          onLogout={handleLogout}
        />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="admin-sidebar-toggle"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
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
      <aside className={`admin-mobile-sidebar ${mobileOpen ? 'is-open' : ''}`}>
        <button
          onClick={() => setMobileOpen(false)}
          className="admin-mobile-close"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
        <AdminNavContent
          adminEmail={admin?.email}
          collapsed={collapsed}
          mobile
          pathname={pathname}
          onNavigate={() => setMobileOpen(false)}
          onLogout={handleLogout}
        />
      </aside>

      {/* ── Mobile Top Bar ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-black/95 backdrop-blur border-b border-white/10 h-14 flex items-center px-4 gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center text-white/50 hover:text-kinetic hover:border-kinetic transition-colors"
          aria-label="Open menu"
        >
          <Menu size={17} />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-kinetic flex items-center justify-center">
            <Shield className="text-black" size={13} />
          </div>
          <p className="font-technical text-[10px] text-kinetic">KO ADMIN</p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="admin-main">
        <div className="admin-main-inner">
          {children}
        </div>
      </main>
    </div>
  );
}
