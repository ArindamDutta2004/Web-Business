'use client';

import { RevealOnScroll } from '@/components/animations/RevealAnimations';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

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
  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="px-6 md:px-8 mb-20">
        <div className="max-w-[1800px] mx-auto">
          <RevealOnScroll>
            <p className="font-technical text-xs text-kinetic mb-4 tracking-widest">[ABOUT US]</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h1 className="font-display text-[10vw] md:text-[8vw] text-white leading-none mb-8">
              WE DON&apos;T JUST<br/>BUILD WEBSITES.<br/>
              <span className="text-kinetic">WE BUILD EMPIRES.</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="font-body text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed">
              Kinetic Orange is a premium software agency that transforms ambitious ideas into
              aggressive digital realities. We combine technical mastery with brutalist design
              thinking to create products that dominate.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-8 py-24 border-t-2 border-white/10">
        <div className="max-w-[1800px] mx-auto">
          <RevealOnScroll>
            <p className="font-technical text-xs text-kinetic mb-4 tracking-widest">[OUR VALUES]</p>
            <h2 className="font-display text-[6vw] md:text-[4vw] text-white leading-none mb-16">WHAT DRIVES US</h2>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-0">
            {VALUES.map((value, i) => (
              <RevealOnScroll key={value.num} delay={i * 0.1}>
                <div className="border-2 border-white/10 p-8 md:p-12 hover:border-kinetic/50 transition-colors duration-500">
                  <span className="font-technical text-xs text-kinetic">[{value.num}]</span>
                  <h3 className="font-display text-2xl md:text-3xl text-white mt-4 mb-4">{value.title}</h3>
                  <p className="font-body text-white/40 leading-relaxed">{value.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-8 py-24 border-t-2 border-white/10">
        <div className="max-w-[1800px] mx-auto">
          <RevealOnScroll>
            <p className="font-technical text-xs text-kinetic mb-4 tracking-widest">[THE TEAM]</p>
            <h2 className="font-display text-[6vw] md:text-[4vw] text-white leading-none mb-16">THE MINDS BEHIND THE MACHINE</h2>
          </RevealOnScroll>

          <div className="border-t-2 border-white/10">
            {TEAM.map((member, i) => (
              <RevealOnScroll key={member.name} delay={i * 0.1}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 border-b-2 border-white/10 gap-4">
                  <div>
                    <h3 className="font-display text-[6vw] md:text-[3vw] text-white">{member.name}</h3>
                    <p className="font-technical text-[10px] text-kinetic mt-1">{member.role}</p>
                  </div>
                  <span className="font-technical text-[10px] text-white/30 border border-white/10 px-4 py-2">
                    {member.specialty}
                  </span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-8 py-24 bg-kinetic">
        <div className="max-w-[1800px] mx-auto text-center">
          <h2 className="font-display text-[8vw] md:text-[5vw] text-black leading-none mb-8">
            WANT TO JOIN THE TEAM?
          </h2>
          <Link href="/careers" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-technical text-sm hover:bg-gray-900 transition-colors">
            VIEW OPEN POSITIONS <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
