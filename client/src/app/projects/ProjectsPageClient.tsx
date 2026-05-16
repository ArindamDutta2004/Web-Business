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
    <div className="ko-page">
      <section className="pb-16 md:pb-24">
        <div className="ko-container">
          <RevealOnScroll>
            <p className="ko-eyebrow">[PORTFOLIO]</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h1 className="ko-page-title text-white mb-8 md:mb-10">
              SELECTED <span className="text-kinetic">WORK</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="ko-lead">
              A curated selection of projects that showcase our technical expertise and design philosophy.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="ko-container">
          {PROJECTS.map((project, i) => (
            <RevealOnScroll key={project.title} delay={i * 0.05}>
              <div className="ko-list-row border-t border-white/10 group cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-5 mb-6">
                      <span className="font-technical text-[10px] text-kinetic">{project.category}</span>
                      <span className="font-technical text-[10px] text-white/20">{project.year}</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-300 mb-6">
                      {project.title}
                    </h2>
                    <p className="font-body text-white/40 max-w-lg leading-relaxed text-[15px]">{project.desc}</p>
                    <div className="flex flex-wrap gap-2.5 mt-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="ko-chip">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 shrink-0 mt-2">
                    <span className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-kinetic group-hover:text-kinetic transition-all duration-300">
                      <ExternalLink size={18} />
                    </span>
                    <span className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-kinetic group-hover:bg-kinetic group-hover:text-black transition-all duration-300">
                      <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="ko-section border-t border-white/10">
        <div className="ko-container text-center">
          <h2 className="ko-cta-title text-white mb-10 md:mb-12 mx-auto">HAVE A SIMILAR PROJECT?</h2>
          <Link href="/contact" className="ko-button">
            DISCUSS YOUR IDEA <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
