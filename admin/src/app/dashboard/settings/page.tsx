'use client';

import { Save } from 'lucide-react';

export default function SettingsAdminPage() {
  const inputClass = 'admin-input';

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-kicker">[CONFIGURATION]</p>
          <h1 className="admin-title">SETTINGS</h1>
        </div>
      </div>

      <div className="max-w-3xl space-y-6">
        <div className="admin-card">
          <h2 className="admin-section-title mb-7">GENERAL</h2>
          <div className="space-y-6">
            <div>
              <label className="admin-label">SITE NAME</label>
              <input defaultValue="Kinetic Orange" className={inputClass} />
            </div>
            <div>
              <label className="admin-label">TAGLINE</label>
              <input defaultValue="Premium Software Agency" className={inputClass} />
            </div>
            <div>
              <label className="admin-label">CONTACT EMAIL</label>
              <input defaultValue="hello@kineticorange.com" className={inputClass} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h2 className="admin-section-title mb-7">SOCIAL LINKS</h2>
          <div className="space-y-6">
            {['GITHUB', 'TWITTER', 'LINKEDIN'].map((s) => (
              <div key={s}>
                <label className="admin-label">{s} URL</label>
                <input placeholder={`https://${s.toLowerCase()}.com/kineticorange`} className={inputClass} />
              </div>
            ))}
          </div>
        </div>

        <button className="admin-button">
          <Save size={16} /> SAVE SETTINGS
        </button>
      </div>
    </div>
  );
}
