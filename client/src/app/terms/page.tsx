import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <p className="font-technical text-xs text-kinetic mb-4 tracking-widest">[LEGAL]</p>
        <h1 className="font-display text-[8vw] md:text-5xl text-white leading-none mb-12">TERMS OF SERVICE</h1>
        <div className="space-y-8 font-body text-white/50 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-white mb-4">1. ACCEPTANCE OF TERMS</h2>
            <p>By accessing and using Kinetic Orange&apos;s services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-white mb-4">2. SERVICES</h2>
            <p>Kinetic Orange provides software development, web design, AI integration, and related digital services. The scope, timeline, and deliverables for each project are defined in individual project agreements.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-white mb-4">3. INTELLECTUAL PROPERTY</h2>
            <p>Upon full payment, clients receive complete ownership of all custom code and designs created for their project. Pre-existing frameworks, libraries, and tools remain the property of their respective owners.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-white mb-4">4. PAYMENT TERMS</h2>
            <p>Payment schedules are defined in project agreements. Standard terms require 50% upfront and 50% upon project completion. Late payments may incur additional fees.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-white mb-4">5. LIMITATION OF LIABILITY</h2>
            <p>Kinetic Orange&apos;s liability is limited to the total amount paid for the specific service in question. We are not liable for indirect, incidental, or consequential damages.</p>
          </section>
        </div>
        <p className="font-technical text-[10px] text-white/20 mt-12">LAST UPDATED: JANUARY 2025</p>
      </div>
    </div>
  );
}
