import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <p className="font-technical text-xs text-kinetic mb-4 tracking-widest">[LEGAL]</p>
        <h1 className="font-display text-[8vw] md:text-5xl text-white leading-none mb-12">PRIVACY POLICY</h1>
        <div className="space-y-8 font-body text-white/50 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-white mb-4">1. INFORMATION WE COLLECT</h2>
            <p>We collect information you provide directly, including name, email address, phone number, and company details when you submit forms on our website. We also collect usage data through cookies and analytics tools.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-white mb-4">2. HOW WE USE YOUR INFORMATION</h2>
            <p>We use collected information to provide our services, communicate with you about projects, send relevant updates, and improve our website experience. We never sell your personal data to third parties.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-white mb-4">3. DATA SECURITY</h2>
            <p>We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-white mb-4">4. COOKIES</h2>
            <p>Our website uses cookies to enhance your browsing experience and analyze site traffic. You can control cookie preferences through your browser settings.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-white mb-4">5. CONTACT US</h2>
            <p>For privacy-related inquiries, contact us at privacy@kineticorange.com.</p>
          </section>
        </div>
        <p className="font-technical text-[10px] text-white/20 mt-12">LAST UPDATED: JANUARY 2025</p>
      </div>
    </div>
  );
}
