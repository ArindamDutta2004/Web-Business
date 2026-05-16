'use client';

import { RevealOnScroll } from '@/components/animations/RevealAnimations';
import { ArrowUpRight, Check } from 'lucide-react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'STARTER', price: '$5,000', period: 'PROJECT', tag: 'IDEAL FOR MVPS',
    features: ['Single Page Application', 'Responsive Design', 'Basic SEO', 'Contact Form', '2 Revision Rounds', '14-Day Delivery', 'Source Code Ownership'],
  },
  {
    name: 'PROFESSIONAL', price: '$15,000', period: 'PROJECT', tag: 'MOST POPULAR', featured: true,
    features: ['Full-Stack Application', 'Custom Design System', 'Advanced SEO & Analytics', 'Authentication System', 'Admin Dashboard', 'API Development', '5 Revision Rounds', '30-Day Delivery', '30-Day Support'],
  },
  {
    name: 'ENTERPRISE', price: 'CUSTOM', period: 'QUOTE', tag: 'UNLIMITED SCALE',
    features: ['Complex Multi-Service Platform', 'AI/ML Integration', 'Custom Architecture', 'Microservices', 'CI/CD Pipeline', 'Load Testing', 'Unlimited Revisions', 'Dedicated Team', '90-Day Support', 'SLA Guarantee'],
  },
];

export default function PricingPageClient() {
  return (
    <div className="ko-page pb-20 md:pb-28">
      <section className="pb-14 md:pb-20">
        <div className="ko-container">
          <RevealOnScroll>
            <p className="ko-eyebrow">[PRICING]</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h1 className="ko-page-title text-white mb-8">
              TRANSPARENT <span className="text-kinetic">PRICING</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="ko-lead">No hidden fees. No surprises. Just aggressive value delivery.</p>
          </RevealOnScroll>
        </div>
      </section>

      <section>
        <div className="ko-container grid md:grid-cols-3 gap-5 md:gap-6">
          {PLANS.map((plan, i) => (
            <RevealOnScroll key={plan.name} delay={i * 0.1}>
              <div className={`ko-card flex flex-col h-full ${
                plan.featured ? 'border-kinetic bg-kinetic/5' : ''
              }`}>
                <div className="mb-8">
                  <span className="font-technical text-[10px] text-kinetic tracking-widest">[{plan.tag}]</span>
                  <h3 className="font-display text-3xl md:text-4xl text-white mt-3">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-4xl md:text-5xl text-white">{plan.price}</span>
                    <span className="font-technical text-[10px] text-white/30">/ {plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3.5 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="text-kinetic shrink-0 mt-0.5" size={14} />
                      <span className="font-body text-sm text-white/60 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`ko-button w-full ${
                    plan.featured
                      ? ''
                      : 'ko-button-outline'
                  }`}
                >
                  GET STARTED <ArrowUpRight size={14} />
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="mt-16 md:mt-20">
        <div className="ko-container">
          <div className="ko-card flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h3 className="font-display text-2xl md:text-3xl text-white mb-3">NEED SOMETHING CUSTOM?</h3>
            <p className="font-body text-white/40 text-sm leading-relaxed">Let&apos;s discuss your unique requirements and build a tailored solution.</p>
          </div>
          <Link href="/contact" className="ko-button bg-white text-black hover:bg-kinetic shrink-0">
            SCHEDULE A CALL
          </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
