'use client';

export default function DashboardSettingsPage() {
  const inputClass = 'ko-input';

  return (
    <div>
      <div className="mb-8">
        <p className="ko-eyebrow mb-2">[SETTINGS]</p>
        <h1 className="font-display text-3xl text-white">ACCOUNT SETTINGS</h1>
      </div>

      <div className="max-w-2xl space-y-5">
        <div className="ko-card">
          <h2 className="font-display text-lg text-white mb-5">CHANGE PASSWORD</h2>
          <div className="space-y-5">
            <div>
              <label className="ko-label">CURRENT PASSWORD</label>
              <input type="password" className={inputClass} placeholder="••••••••" />
            </div>
            <div>
              <label className="ko-label">NEW PASSWORD</label>
              <input type="password" className={inputClass} placeholder="Min. 8 characters" />
            </div>
            <div>
              <label className="ko-label">CONFIRM PASSWORD</label>
              <input type="password" className={inputClass} placeholder="Confirm new password" />
            </div>
            <button className="ko-button">UPDATE PASSWORD</button>
          </div>
        </div>

        <div className="ko-card">
          <h2 className="font-display text-lg text-white mb-5">PREFERENCES</h2>
          <div className="space-y-5">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-technical text-[10px] text-white/50">EMAIL NOTIFICATIONS</span>
              <div className="w-10 h-5 bg-kinetic rounded-none relative"><div className="w-4 h-4 bg-black absolute right-0.5 top-0.5" /></div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-technical text-[10px] text-white/50">PROJECT UPDATES</span>
              <div className="w-10 h-5 bg-kinetic rounded-none relative"><div className="w-4 h-4 bg-black absolute right-0.5 top-0.5" /></div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-technical text-[10px] text-white/50">INVOICE ALERTS</span>
              <div className="w-10 h-5 bg-white/20 rounded-none relative"><div className="w-4 h-4 bg-white/40 absolute left-0.5 top-0.5" /></div>
            </label>
          </div>
        </div>

        <div className="ko-card border-red-500/20">
          <h2 className="font-display text-lg text-red-400 mb-2">DANGER ZONE</h2>
          <p className="font-body text-white/30 text-sm mb-4">Once deleted, your account cannot be recovered.</p>
          <button className="ko-button ko-button-outline border-red-500/30 text-red-400 hover:bg-red-500/10">DELETE ACCOUNT</button>
        </div>
      </div>
    </div>
  );
}
