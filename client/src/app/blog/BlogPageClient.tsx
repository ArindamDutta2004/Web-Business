'use client';

import { RevealOnScroll } from '@/components/animations/RevealAnimations';
import { ArrowUpRight, Clock, Eye } from 'lucide-react';

const POSTS = [
  { title: 'WHY BRUTALIST DESIGN IS THE FUTURE OF WEB', category: 'DESIGN', readTime: 8, views: '2.4K', date: 'MAR 2025', excerpt: 'The web is drowning in sameness. Brutalism offers a radical alternative that commands attention and refuses to be ignored.' },
  { title: 'BUILDING PRODUCTION-GRADE AI PIPELINES', category: 'ENGINEERING', readTime: 12, views: '3.1K', date: 'FEB 2025', excerpt: 'From prototype to production: how we architect AI systems that handle millions of requests with sub-second latency.' },
  { title: 'THE DEATH OF TRADITIONAL SAAS DESIGN', category: 'OPINION', readTime: 6, views: '5.7K', date: 'FEB 2025', excerpt: 'Generic SaaS templates are killing innovation. Here\'s how bold design choices create competitive advantages.' },
  { title: 'NEXT.JS APP ROUTER: A DEEP DIVE', category: 'TUTORIAL', readTime: 15, views: '8.2K', date: 'JAN 2025', excerpt: 'Everything you need to know about server components, streaming, and the new paradigms in Next.js 15.' },
  { title: 'SCALING MONGODB FOR ENTERPRISE', category: 'ENGINEERING', readTime: 10, views: '1.8K', date: 'JAN 2025', excerpt: 'Sharding strategies, indexing patterns, and aggregation pipelines for handling billions of documents.' },
  { title: 'DESIGN SYSTEMS THAT ACTUALLY SCALE', category: 'DESIGN', readTime: 9, views: '4.3K', date: 'DEC 2024', excerpt: 'Most design systems break at scale. Here\'s our battle-tested approach to building tokens that last.' },
];

export default function BlogPageClient() {
  return (
    <div className="pt-32 pb-24">
      <section className="px-6 md:px-8 mb-20">
        <div className="max-w-[1800px] mx-auto">
          <RevealOnScroll>
            <p className="font-technical text-xs text-kinetic mb-4 tracking-widest">[INSIGHTS]</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h1 className="font-display text-[10vw] md:text-[7vw] text-white leading-none mb-8">
              THE <span className="text-kinetic">BLOG</span>
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 md:px-8">
        <div className="max-w-[1800px] mx-auto">
          {POSTS.map((post, i) => (
            <RevealOnScroll key={post.title} delay={i * 0.05}>
              <article className="border-t-2 border-white/10 py-10 md:py-12 group cursor-pointer hover:bg-white/[0.02] transition-all duration-300 px-2">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-technical text-[10px] text-kinetic">{post.category}</span>
                      <span className="font-technical text-[10px] text-white/20">{post.date}</span>
                    </div>
                    <h2 className="font-display text-[5vw] md:text-[2.5vw] text-white leading-none group-hover:translate-x-4 transition-transform duration-300 mb-4">
                      {post.title}
                    </h2>
                    <p className="font-body text-white/40 text-sm max-w-xl leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center gap-6 mt-4">
                      <span className="font-technical text-[10px] text-white/20 flex items-center gap-1"><Clock size={12} /> {post.readTime} MIN</span>
                      <span className="font-technical text-[10px] text-white/20 flex items-center gap-1"><Eye size={12} /> {post.views}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="text-white/0 group-hover:text-kinetic group-hover:rotate-45 transition-all duration-300 shrink-0" size={28} />
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </div>
  );
}
