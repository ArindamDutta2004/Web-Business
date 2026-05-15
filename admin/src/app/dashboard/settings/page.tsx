'use client';

import { Save } from 'lucide-react';

export default function SettingsAdminPage() {
  const inputClass = 'w-full bg-transparent border-2 border-white/20 px-4 py-3.5 font-body text-sm text-white placeholder:text-white/20 focus:border-kinetic focus:outline-none transition-colors';

  return (
    <div>
      <div className="mb-8">
        <p className="font-technical text-[10px] text-kinetic tracking-widest mb-2">[CONFIGURATION]</p>
        <h1 className="font-display text-3xl text-white">SETTINGS</h1>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="border-2 border-white/10 p-6">
          <h2 className="font-display text-lg text-white mb-6">GENERAL</h2>
          <div className="space-y-5">
            <div>
              <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">SITE NAME</label>
              <input defaultValue="Kinetic Orange" className={inputClass} />
            </div>
            <div>
              <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">TAGLINE</label>
              <input defaultValue="Premium Software Agency" className={inputClass} />
            </div>
            <div>
              <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">CONTACT EMAIL</label>
              <input defaultValue="hello@kineticorange.com" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="border-2 border-white/10 p-6">
          <h2 className="font-display text-lg text-white mb-6">SOCIAL LINKS</h2>
          <div className="space-y-5">
            {['GITHUB', 'TWITTER', 'LINKEDIN'].map((s) => (
              <div key={s}>
                <label className="font-technical text-[10px] text-white/50 tracking-widest mb-2 block">{s} URL</label>
                <input placeholder={`https://${s.toLowerCase()}.com/kineticorange`} className={inputClass} />
              </div>
            ))}
          </div>
        </div>

        <button className="bg-kinetic text-black px-8 py-3.5 font-technical text-sm flex items-center gap-2 hover:bg-white transition-colors">
          <Save size={16} /> SAVE SETTINGS
        </button>
      </div>
    </div>
  );
}
