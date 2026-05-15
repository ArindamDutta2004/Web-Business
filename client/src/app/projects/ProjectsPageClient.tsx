'use client';

import { RevealOnScroll } from '@/components/animations/RevealAnimations';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const PROJECTS = [
  { title: 'NEXUS AI', category: 'AI PLATFORM', year: '2025', desc: 'Enterprise AI management platform with real-time model monitoring and automated pipelines.', tags: ['NEXT.JS', 'PYTHON', 'TENSORFLOW'] },
  { title: 'VAULTPAY', category: 'FINTECH', year: '2025', desc: 'Digital payment ecosystem with multi-currency support and fraud detection.', tags: ['REACT', 'NODE.JS', 'STRIPE'] },
  { title: 'GRIDWORKS', category: 'ADMIN DASHBOARD', year: '2024', desc: 'Real-time analytics dashboard for supply chain management across 12 countries.', tags: ['NEXT.JS', 'D3.JS', 'POSTGRESQL'] },
  { title: 'STUDIOLAB', category: 'CREATIVE SUITE', year: '2024', desc: 'Browser-based design tool with collaborative editing and asset management.', tags: ['REACT', 'WEBGL', 'AWS'] },
  { title: 'AUTOMATE.IO', category: 'SAAS', year: '2024', desc: 'No-code workflow automation platform processing 10M+ events daily.', tags: ['NEXT.JS', 'REDIS', 'KUBERNETES'] },
  { title: 'CRYPTOVAULT', category: 'WEB3', year: '2023', desc: 'Multi-chain cryptocurrency wallet with DeFi integration and portfolio tracking.', tags: ['REACT', 'SOLIDITY', 'ETHERS.JS'] },
];

export default function ProjectsPageClient() {
  return (
    <div className="pt-32 pb-24">
      <section className="px-6 md:px-8 mb-20">
        <div className="max-w-[1800px] mx-auto">
          <RevealOnScroll>
            <p className="font-technical text-xs text-kinetic mb-4 tracking-widest">[PORTFOLIO]</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h1 className="font-display text-[10vw] md:text-[7vw] text-white leading-none mb-8">
              SELECTED <span className="text-kinetic">WORK</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="font-body text-white/50 text-lg max-w-2xl leading-relaxed">
              A curated selection of projects that showcase our technical expertise and design philosophy.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 md:px-8">
        <div className="max-w-[1800px] mx-auto">
          {PROJECTS.map((project, i) => (
            <RevealOnScroll key={project.title} delay={i * 0.05}>
              <div className="border-t-2 border-white/10 py-12 md:py-16 group cursor-pointer hover:bg-white/[0.02] transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-technical text-[10px] text-kinetic">{project.category}</span>
                      <span className="font-technical text-[10px] text-white/20">{project.year}</span>
                    </div>
                    <h2 className="font-display text-[8vw] md:text-[4vw] text-white leading-none group-hover:translate-x-4 transition-transform duration-300">
                      {project.title}
                    </h2>
                    <p className="font-body text-white/40 mt-4 max-w-lg leading-relaxed">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="font-technical text-[9px] border border-white/20 text-white/50 px-3 py-1">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <span className="w-12 h-12 border-2 border-white/10 flex items-center justify-center group-hover:border-kinetic group-hover:text-kinetic transition-all duration-300">
                      <ExternalLink size={18} />
                    </span>
                    <span className="w-12 h-12 border-2 border-white/10 flex items-center justify-center group-hover:border-kinetic group-hover:bg-kinetic group-hover:text-black transition-all duration-300">
                      <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-8 py-24 mt-12 border-t-2 border-white/10">
        <div className="max-w-[1800px] mx-auto text-center">
          <h2 className="font-display text-[8vw] md:text-[4vw] text-white leading-none mb-8">HAVE A SIMILAR PROJECT?</h2>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-kinetic text-black px-8 py-4 font-technical text-sm hover:bg-white transition-colors">
            DISCUSS YOUR IDEA <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
