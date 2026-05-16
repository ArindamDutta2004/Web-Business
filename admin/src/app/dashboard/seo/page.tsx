'use client';

export default function SEOAdminPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">[SEO]</p>
          <h1 className="admin-title">SEO MANAGEMENT</h1>
        </div>
      </div>

      <div className="space-y-4">
        {['Homepage', 'About', 'Services', 'Projects', 'Blog', 'Contact'].map((page) => (
          <div key={page} className="admin-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer">
            <div className="min-w-0">
              <h3 className="font-display text-sm text-white">{page.toUpperCase()}</h3>
              <p className="font-technical text-[9px] text-white/30 mt-2">/{page.toLowerCase() === 'homepage' ? '' : page.toLowerCase()}</p>
            </div>
            <span className="admin-badge text-green-500 border-green-500/30">CONFIGURED</span>
          </div>
        ))}
      </div>
    </div>
  );
}
