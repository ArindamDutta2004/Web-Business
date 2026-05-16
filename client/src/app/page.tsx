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
    <section className="relative min-h-[760px] sm:min-h-[820px] lg:min-h-screen flex flex-col justify-start lg:justify-center ko-hero-section">
      <div className="ko-container w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="ko-eyebrow mb-8">
            [PREMIUM SOFTWARE AGENCY]
          </p>
        </motion.div>

        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="ko-hero-title text-white"
          >
            WE BUILD
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="ko-hero-title text-kinetic"
          >
            DIGITAL
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="ko-hero-title text-white"
          >
            FUTURES
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="ko-lead mt-10 md:mt-12 max-w-xl"
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
        <div className="ko-container py-5 md:py-6 flex items-center justify-between">
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
    <section className="py-8 md:py-12 bg-black overflow-hidden border-y border-white/5">
      <div className="space-y-5 overflow-hidden">
        {/* Row 1 — Orange */}
        <div className="flex whitespace-nowrap overflow-hidden h-12 sm:h-14 md:h-16 items-center">
          <div className="animate-marquee flex shrink-0">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-display text-3xl sm:text-4xl md:text-5xl text-kinetic mx-4 leading-[1.1]">
                {marqueeText}
              </span>
            ))}
          </div>
          <div className="animate-marquee flex shrink-0" aria-hidden>
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-display text-3xl sm:text-4xl md:text-5xl text-kinetic mx-4 leading-[1.1]">
                {marqueeText}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — White, reverse */}
        <div className="flex whitespace-nowrap overflow-hidden h-9 sm:h-10 md:h-12 items-center">
          <div className="animate-marquee-reverse flex shrink-0">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-display text-xl sm:text-2xl md:text-3xl text-white/15 mx-4 leading-[1.1]">
                {marqueeText}
              </span>
            ))}
          </div>
          <div className="animate-marquee-reverse flex shrink-0" aria-hidden>
            {[...Array(4)].map((_, i) => (
              <span key={i} className="font-display text-xl sm:text-2xl md:text-3xl text-white/15 mx-4 leading-[1.1]">
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
    <section className="ko-section bg-black">
      <div className="ko-container">
        <RevealOnScroll>
          <p className="ko-eyebrow">[WHAT WE DO]</p>
          <h2 className="ko-section-title text-white mb-12 md:mb-20">
            OUR SERVICES
          </h2>
        </RevealOnScroll>

        <div className="ko-list">
          {SERVICES.map((service, i) => (
            <RevealOnScroll key={service.index} delay={i * 0.05}>
              <Link
                href="/services"
                className="ko-list-row group flex items-center justify-between gap-5"
              >
                <div className="flex items-start md:items-center gap-5 md:gap-10 flex-1">
                  <span className="font-technical text-xs text-white/30 pt-1 md:pt-0 shrink-0">{service.index}</span>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 flex-1 min-w-0">
                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white group-hover:translate-x-4 transition-transform duration-300">
                      {service.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="ko-chip">
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
    <section className="bg-kinetic ko-section-compact">
      <div className="ko-container grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
        {STATS.map((stat, i) => (
          <RevealOnScroll key={stat.label} delay={i * 0.1}>
            <div className="text-center md:text-left">
              <div className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-black leading-[1.1]">{stat.value}</div>
              <p className="font-technical text-[10px] text-black/60 mt-4 tracking-widest">{stat.label}</p>
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
    <section className="bg-black ko-section">
      <div className="ko-container ko-two-col items-start">
        <RevealOnScroll>
          <p className="ko-eyebrow">[WHO WE ARE]</p>
          <h2 className="ko-section-title text-white">
            NOT YOUR<br/>AVERAGE<br/>
            <span className="text-kinetic">AGENCY</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="space-y-8 md:pt-10">
            <p className="font-body text-white/60 text-base md:text-lg leading-relaxed">
              We are a collective of engineers, designers, and strategists who believe in the power
              of brutal simplicity. No fluff. No filler. Just aggressive execution and premium results.
            </p>
            <p className="font-body text-white/40 text-sm md:text-base leading-relaxed">
              From AI-powered platforms to enterprise dashboards, we build digital products
              that dominate markets and define categories. Our approach is technical, our
              standards are ruthless, and our output is unforgettable.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 font-technical text-xs text-kinetic border-b-2 border-kinetic pb-1 hover:text-white hover:border-white transition-colors duration-300 mt-2"
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
    <section className="bg-black ko-section border-t border-white/10">
      <div className="ko-container text-center">
        <RevealOnScroll>
          <p className="ko-eyebrow mb-8">[LET&apos;S WORK TOGETHER]</p>
          <h2 className="ko-cta-title text-white mb-10 md:mb-12 mx-auto">
            READY TO BUILD<br/>SOMETHING <span className="text-kinetic">BRUTAL?</span>
          </h2>
          <Link
            href="/contact"
            className="ko-button"
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
