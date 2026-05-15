'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ScrollIndicator from '@/components/ScrollIndicator';
import { RevealOnScroll } from '@/components/animations/RevealAnimations';

const SERVICES = [
  { index: '01', title: 'WEB APPLICATIONS', tags: ['NEXT.JS', 'REACT', 'TYPESCRIPT'] },
  { index: '02', title: 'AI INTEGRATION', tags: ['LLM', 'AUTOMATION', 'ML PIPELINES'] },
  { index: '03', title: 'ADMIN DASHBOARDS', tags: ['ANALYTICS', 'CMS', 'REAL-TIME'] },
  { index: '04', title: 'BRAND SYSTEMS', tags: ['IDENTITY', 'DESIGN', 'GUIDELINES'] },
  { index: '05', title: 'E-COMMERCE', tags: ['STOREFRONT', 'PAYMENTS', 'INVENTORY'] },
  { index: '06', title: 'AUTOMATION', tags: ['WORKFLOWS', 'API', 'INTEGRATION'] },
];

const STATS = [
  { value: '150+', label: 'PROJECTS DELIVERED' },
  { value: '98%', label: 'CLIENT RETENTION' },
  { value: '12+', label: 'YEARS EXPERIENCE' },
  { value: '24/7', label: 'SUPPORT AVAILABLE' },
];

// ─── Hero Section ────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-8 pt-24">
      <div className="max-w-[1800px] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-technical text-[10px] md:text-xs text-kinetic mb-6 tracking-widest">
            [PREMIUM SOFTWARE AGENCY]
          </p>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[14vw] md:text-[16vw] text-white leading-none"
          >
            WE BUILD
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[14vw] md:text-[16vw] text-kinetic leading-none"
          >
            DIGITAL
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[14vw] md:text-[16vw] text-white leading-none"
          >
            FUTURES
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-body text-white/50 text-sm md:text-base max-w-lg mt-8 leading-relaxed"
        >
          We craft premium web applications, AI-powered platforms, and brutal digital solutions
          that push boundaries and drive results.
        </motion.p>
      </div>

      {/* Divider + Metadata Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0"
      >
        <div className="h-[2px] bg-white/10 w-full" />
        <div className="max-w-[1800px] mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
          <span className="font-technical text-[10px] text-white/40 hidden md:block">BASED IN INDIA</span>
          <div className="mx-auto md:mx-0">
            <ScrollIndicator />
          </div>
          <div className="font-technical text-[10px] text-white/40 text-right leading-relaxed hidden md:block">
            SOFTWARE ENGINEERS<br />UI/UX ARCHITECTS<br />DIGITAL STRATEGISTS
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Marquee Section ─────────────────────────────────────
function MarqueeSection() {
  const marqueeText = 'KINETIC ORANGE • BUILD DIFFERENT • PUSH BOUNDARIES • DIGITAL FUTURES • ';

  return (
    <section className="py-12 bg-black overflow-hidden" style={{ transform: 'skewY(-2deg)' }}>
      <div className="space-y-4">
        {/* Row 1 — Orange */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="animate-marquee flex shrink-0">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-display text-[8vw] md:text-[10vw] text-kinetic mx-4 leading-none">
                {marqueeText}
              </span>
            ))}
          </div>
          <div className="animate-marquee flex shrink-0" aria-hidden>
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-display text-[8vw] md:text-[10vw] text-kinetic mx-4 leading-none">
                {marqueeText}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — White, reverse */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="animate-marquee-reverse flex shrink-0">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-display text-[6vw] md:text-[8vw] text-white/20 mx-4 leading-none">
                {marqueeText}
              </span>
            ))}
          </div>
          <div className="animate-marquee-reverse flex shrink-0" aria-hidden>
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-display text-[6vw] md:text-[8vw] text-white/20 mx-4 leading-none">
                {marqueeText}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ────────────────────────────────────
function ServicesSection() {
  return (
    <section className="bg-black px-6 md:px-8 py-24 md:py-32">
      <div className="max-w-[1800px] mx-auto">
        <RevealOnScroll>
          <p className="font-technical text-xs text-kinetic mb-4 tracking-widest">[WHAT WE DO]</p>
          <h2 className="font-display text-[8vw] md:text-[5vw] text-white leading-none mb-16">
            OUR SERVICES
          </h2>
        </RevealOnScroll>

        <div className="border-t-2 border-white/10">
          {SERVICES.map((service, i) => (
            <RevealOnScroll key={service.index} delay={i * 0.05}>
              <Link
                href="/services"
                className="group flex items-center justify-between py-6 md:py-8 border-b-2 border-white/10 hover:bg-white/5 transition-all duration-300 px-2 md:px-4"
              >
                <div className="flex items-start md:items-center gap-4 md:gap-8 flex-1">
                  <span className="font-technical text-xs text-white/30 pt-1 md:pt-0">{service.index}</span>
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 flex-1">
                    <h3 className="font-display text-[6vw] md:text-[4vw] lg:text-[3vw] text-white leading-none group-hover:translate-x-4 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="font-technical text-[9px] border border-white/20 text-white/50 px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <ArrowUpRight
                  className="text-white/0 group-hover:text-kinetic group-hover:rotate-45 transition-all duration-300 shrink-0"
                  size={28}
                />
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ───────────────────────────────────────
function StatsSection() {
  return (
    <section className="bg-kinetic px-6 md:px-8 py-20 md:py-24">
      <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {STATS.map((stat, i) => (
          <RevealOnScroll key={stat.label} delay={i * 0.1}>
            <div className="text-center md:text-left">
              <div className="font-display text-[12vw] md:text-[5vw] text-black leading-none">{stat.value}</div>
              <p className="font-technical text-[10px] text-black/60 mt-2 tracking-widest">{stat.label}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}

// ─── About Preview ───────────────────────────────────────
function AboutPreview() {
  return (
    <section className="bg-black px-6 md:px-8 py-24 md:py-32">
      <div className="max-w-[1800px] mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-start">
        <RevealOnScroll>
          <p className="font-technical text-xs text-kinetic mb-4 tracking-widest">[WHO WE ARE]</p>
          <h2 className="font-display text-[8vw] md:text-[4vw] text-white leading-none">
            NOT YOUR<br/>AVERAGE<br/>
            <span className="text-kinetic">AGENCY</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="space-y-6">
            <p className="font-body text-white/60 text-lg leading-relaxed">
              We are a collective of engineers, designers, and strategists who believe in the power
              of brutal simplicity. No fluff. No filler. Just aggressive execution and premium results.
            </p>
            <p className="font-body text-white/40 leading-relaxed">
              From AI-powered platforms to enterprise dashboards, we build digital products
              that dominate markets and define categories. Our approach is technical, our
              standards are ruthless, and our output is unforgettable.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 font-technical text-xs text-kinetic border-b-2 border-kinetic pb-1 hover:text-white hover:border-white transition-colors duration-300 mt-4"
            >
              LEARN MORE ABOUT US <ArrowRight size={14} />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────
function CTASection() {
  return (
    <section className="bg-black px-6 md:px-8 py-24 md:py-32 border-t-2 border-white/10">
      <div className="max-w-[1800px] mx-auto text-center">
        <RevealOnScroll>
          <p className="font-technical text-xs text-kinetic mb-6 tracking-widest">[LET&apos;S WORK TOGETHER]</p>
          <h2 className="font-display text-[10vw] md:text-[7vw] text-white leading-none mb-8">
            READY TO BUILD<br/>SOMETHING <span className="text-kinetic">BRUTAL?</span>
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-kinetic text-black px-10 py-5 font-technical text-sm hover:bg-white transition-colors duration-300"
          >
            START YOUR PROJECT <ArrowUpRight size={18} />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

// ─── Home Page ───────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <StatsSection />
      <AboutPreview />
      <CTASection />
    </>
  );
}
