'use client';

import { useEffect, useState } from 'react';
import { RevealOnScroll } from '@/components/animations/RevealAnimations';
import { ArrowUpRight, Clock, Eye } from 'lucide-react';
import api from '@/lib/api';

const POSTS = [
  { title: 'WHY BRUTALIST DESIGN IS THE FUTURE OF WEB', category: 'DESIGN', readTime: 8, views: '2.4K', date: 'MAR 2025', excerpt: 'The web is drowning in sameness. Brutalism offers a radical alternative that commands attention and refuses to be ignored.' },
  { title: 'BUILDING PRODUCTION-GRADE AI PIPELINES', category: 'ENGINEERING', readTime: 12, views: '3.1K', date: 'FEB 2025', excerpt: 'From prototype to production: how we architect AI systems that handle millions of requests with sub-second latency.' },
  { title: 'THE DEATH OF TRADITIONAL SAAS DESIGN', category: 'OPINION', readTime: 6, views: '5.7K', date: 'FEB 2025', excerpt: 'Generic SaaS templates are killing innovation. Here\'s how bold design choices create competitive advantages.' },
  { title: 'NEXT.JS APP ROUTER: A DEEP DIVE', category: 'TUTORIAL', readTime: 15, views: '8.2K', date: 'JAN 2025', excerpt: 'Everything you need to know about server components, streaming, and the new paradigms in Next.js 15.' },
  { title: 'SCALING MONGODB FOR ENTERPRISE', category: 'ENGINEERING', readTime: 10, views: '1.8K', date: 'JAN 2025', excerpt: 'Sharding strategies, indexing patterns, and aggregation pipelines for handling billions of documents.' },
  { title: 'DESIGN SYSTEMS THAT ACTUALLY SCALE', category: 'DESIGN', readTime: 9, views: '4.3K', date: 'DEC 2024', excerpt: 'Most design systems break at scale. Here\'s our battle-tested approach to building tokens that last.' },
];

type ApiPost = {
  title?: string;
  category?: string;
  readTime?: number;
  views?: number;
  publishedAt?: string;
  excerpt?: string;
};

export default function BlogPageClient() {
  const [posts, setPosts] = useState(POSTS);

  useEffect(() => {
    api.get('/blog')
      .then(({ data }) => {
        if (!Array.isArray(data.data) || data.data.length === 0) return;
        setPosts((data.data as ApiPost[]).map((post) => ({
          title: post.title?.toUpperCase() || 'POST',
          category: post.category?.toUpperCase() || 'INSIGHT',
          readTime: post.readTime || 1,
          views: (post.views || 0).toLocaleString(),
          date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }).toUpperCase() : '',
          excerpt: post.excerpt || '',
        })));
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="ko-page pb-20 md:pb-28">
      <section className="pb-16 md:pb-24">
        <div className="ko-container">
          <RevealOnScroll>
            <p className="ko-eyebrow">[INSIGHTS]</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h1 className="ko-page-title text-white mb-8">
              THE <span className="text-kinetic">BLOG</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="ko-lead max-w-xl font-technical">
              Deep dives into engineering, design, and the future of digital products.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section>
        <div className="ko-container">
          {posts.map((post, i) => (
            <RevealOnScroll key={post.title} delay={i * 0.05}>
              <article className="ko-list-row border-t border-white/10 group cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-5 mb-6">
                      <span className="font-technical text-[10px] text-kinetic">{post.category}</span>
                      <span className="font-technical text-[10px] text-white/20">{post.date}</span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl text-white group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-300 mb-5 max-w-4xl">
                      {post.title}
                    </h2>
                    <p className="font-body text-white/40 text-sm max-w-xl leading-relaxed mb-6">{post.excerpt}</p>
                    <div className="flex items-center gap-6">
                      <span className="font-technical text-[10px] text-white/20 flex items-center gap-1.5"><Clock size={12} /> {post.readTime} MIN</span>
                      <span className="font-technical text-[10px] text-white/20 flex items-center gap-1.5"><Eye size={12} /> {post.views}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="text-white/0 group-hover:text-kinetic group-hover:rotate-45 transition-all duration-300 shrink-0 mt-2" size={28} />
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </div>
  );
}
