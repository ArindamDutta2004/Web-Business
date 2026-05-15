'use client';

export default function SEOAdminPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[SEO]</p>
        <h1 className="font-display text-3xl text-white">SEO MANAGEMENT</h1>
      </div>

      <div className="space-y-3">
        {['Homepage', 'About', 'Services', 'Projects', 'Blog', 'Contact'].map((page) => (
          <div key={page} className="border-2 border-white/10 p-6 flex items-center justify-between hover:border-white/20 transition-colors cursor-pointer">
            <div>
              <h3 className="font-display text-sm text-white">{page.toUpperCase()}</h3>
              <p className="font-technical text-[9px] text-white/30 mt-1">/{page.toLowerCase() === 'homepage' ? '' : page.toLowerCase()}</p>
            </div>
            <span className="font-technical text-[9px] text-green-500 border border-green-500/30 px-2 py-0.5">CONFIGURED</span>
          </div>
        ))}
      </div>
    </div>
  );
}
