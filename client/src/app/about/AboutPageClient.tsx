'use client';

import { useEffect, useState } from 'react';
import { RevealOnScroll } from '@/components/animations/RevealAnimations';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

const TEAM = [
  { name: 'ARJUN PATEL', role: 'FOUNDER & CTO', specialty: 'FULL-STACK ARCHITECTURE' },
  { name: 'PRIYA SHARMA', role: 'DESIGN DIRECTOR', specialty: 'UI/UX & BRAND SYSTEMS' },
  { name: 'RAHUL MENON', role: 'AI LEAD', specialty: 'ML & AUTOMATION' },
  { name: 'ANANYA GUPTA', role: 'PROJECT DIRECTOR', specialty: 'STRATEGY & DELIVERY' },
];

const VALUES = [
  { num: '01', title: 'BRUTAL HONESTY', desc: 'We tell you what you need to hear, not what you want to hear. Every decision is data-driven.' },
  { num: '02', title: 'TECHNICAL EXCELLENCE', desc: 'We don\'t cut corners. Every line of code is crafted with production-grade standards.' },
  { num: '03', title: 'AGGRESSIVE DELIVERY', desc: 'We move fast. Tight timelines, relentless execution, zero excuses.' },
  { num: '04', title: 'OBSESSIVE QUALITY', desc: 'Pixel-perfect. Performance-optimized. Accessibility-compliant. Always.' },
];

export default function AboutPageClient() {
  const [content, setContent] = useState({
    title: "WE DON'T JUST\nBUILD WEBSITES.\nWE BUILD EMPIRES.",
    lead: 'Kinetic Orange is a premium software agency that transforms ambitious ideas into aggressive digital realities. We combine technical mastery with brutalist design thinking to create products that dominate.',
  });

  useEffect(() => {
    api.get('/settings/public')
      .then(({ data }) => {
        setContent((current) => ({
          title: data.data?.['about.title'] || current.title,
          lead: data.data?.['about.lead'] || current.lead,
        }));
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="ko-page">
      {/* Hero */}
      <section className="pb-16 md:pb-24">
        <div className="ko-container">
          <RevealOnScroll>
            <p className="ko-eyebrow">[ABOUT US]</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h1 className="ko-page-title text-white mb-8 md:mb-10">
              {content.title.split('\n').map((line, index, lines) => (
                <span key={line}>
                  {index === lines.length - 1 ? <span className="text-kinetic">{line}</span> : line}
                  {index < lines.length - 1 && <br />}
                </span>
              ))}
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="ko-lead">
              {content.lead}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Values */}
      <section className="ko-section border-t border-white/10">
        <div className="ko-container">
          <RevealOnScroll>
            <p className="ko-eyebrow">[OUR VALUES]</p>
            <h2 className="ko-section-title text-white mb-12 md:mb-16">WHAT DRIVES US</h2>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {VALUES.map((value, i) => (
              <RevealOnScroll key={value.num} delay={i * 0.1}>
                <div className="ko-card h-full">
                  <span className="font-technical text-xs text-kinetic">[{value.num}]</span>
                  <h3 className="font-display text-2xl md:text-3xl text-white mt-6 mb-5">{value.title}</h3>
                  <p className="font-body text-white/40 leading-relaxed text-[15px]">{value.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="ko-section border-t border-white/10">
        <div className="ko-container">
          <RevealOnScroll>
            <p className="ko-eyebrow">[THE TEAM]</p>
            <h2 className="ko-section-title text-white mb-12 md:mb-16">THE MINDS BEHIND THE MACHINE</h2>
          </RevealOnScroll>

          <div className="ko-list">
            {TEAM.map((member, i) => (
              <RevealOnScroll key={member.name} delay={i * 0.1}>
                <div className="ko-list-row flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-white">{member.name}</h3>
                    <p className="font-technical text-[10px] text-kinetic mt-3">{member.role}</p>
                  </div>
                  <span className="ko-chip">
                    {member.specialty}
                  </span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ko-section bg-kinetic">
        <div className="ko-container text-center">
          <h2 className="ko-cta-title text-black mb-10 md:mb-12 mx-auto">
            WANT TO JOIN THE TEAM?
          </h2>
          <Link href="/careers" className="ko-button ko-button-dark">
            VIEW OPEN POSITIONS <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
