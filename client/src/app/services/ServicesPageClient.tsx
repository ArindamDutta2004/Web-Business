'use client';

import { RevealOnScroll } from '@/components/animations/RevealAnimations';
import { ArrowUpRight, Code, Bot, LayoutDashboard, Palette, ShoppingCart, Zap } from 'lucide-react';
import Link from 'next/link';

const SERVICES = [
  { icon: Code, index: '01', title: 'WEB APPLICATIONS', tags: ['NEXT.JS', 'REACT', 'NODE.JS', 'TYPESCRIPT'],
    desc: 'Full-stack web applications built with cutting-edge technology. Scalable, performant, and production-ready from day one.',
    features: ['Custom Architecture', 'API Development', 'Real-time Features', 'Cloud Deployment'] },
  { icon: Bot, index: '02', title: 'AI INTEGRATION', tags: ['GPT', 'LANGCHAIN', 'ML', 'AUTOMATION'],
    desc: 'Integrate artificial intelligence into your workflows. From chatbots to predictive analytics, we make AI work for you.',
    features: ['LLM Integration', 'Custom Training', 'Data Pipelines', 'Intelligent Automation'] },
  { icon: LayoutDashboard, index: '03', title: 'ADMIN DASHBOARDS', tags: ['ANALYTICS', 'CMS', 'REAL-TIME'],
    desc: 'Powerful admin panels and dashboards that give you complete control. Data visualization, user management, and more.',
    features: ['Real-time Analytics', 'User Management', 'Role-based Access', 'Custom Reports'] },
  { icon: Palette, index: '04', title: 'BRAND SYSTEMS', tags: ['IDENTITY', 'DESIGN SYSTEMS', 'UI/UX'],
    desc: 'Complete brand identity and design system creation. From logo to component library, we build cohesive visual languages.',
    features: ['Brand Identity', 'Design Tokens', 'Component Libraries', 'Style Guides'] },
  { icon: ShoppingCart, index: '05', title: 'E-COMMERCE', tags: ['STOREFRONT', 'PAYMENTS', 'INVENTORY'],
    desc: 'High-converting e-commerce platforms built to scale. Custom storefronts, payment integration, and inventory management.',
    features: ['Custom Storefront', 'Payment Gateway', 'Inventory System', 'Order Management'] },
  { icon: Zap, index: '06', title: 'AUTOMATION', tags: ['WORKFLOWS', 'API', 'CRON', 'WEBHOOKS'],
    desc: 'Automate repetitive tasks and streamline operations. From API integrations to workflow automation.',
    features: ['Workflow Design', 'API Integration', 'Scheduled Tasks', 'Event-driven Systems'] },
];

export default function ServicesPageClient() {
  return (
    <div className="ko-page">
      <section className="pb-16 md:pb-24">
        <div className="ko-container">
          <RevealOnScroll>
            <p className="ko-eyebrow">[OUR SERVICES]</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h1 className="ko-page-title text-white mb-8 md:mb-10">
              WHAT WE <span className="text-kinetic">BUILD</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="ko-lead">
              Every service is delivered with production-grade quality, aggressive timelines, and obsessive attention to detail.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="ko-container">
          {SERVICES.map((service, i) => (
            <RevealOnScroll key={service.index} delay={i * 0.05}>
              <div className="ko-list-row border-t border-white/10 group">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                  <div className="flex items-start gap-5">
                    <span className="font-technical text-xs text-kinetic mt-1">[{service.index}]</span>
                    <div className="min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-6">
                        <service.icon className="text-kinetic" size={28} strokeWidth={1.5} />
                        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-white">
                          {service.title}
                        </h2>
                      </div>
                      <div className="flex flex-wrap gap-2.5 mb-7">
                        {service.tags.map((tag) => (
                          <span key={tag} className="ko-chip">{tag}</span>
                        ))}
                      </div>
                      <p className="font-body text-white/40 leading-relaxed text-[15px]">{service.desc}</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-technical text-[10px] text-white/30 mb-6 tracking-widest">KEY FEATURES</p>
                    <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                      {service.features.map((f) => (
                        <div key={f} className="ko-card p-4 md:p-5 font-technical text-[10px] text-white/60 hover:border-kinetic/50 hover:text-kinetic">
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="ko-section-compact bg-kinetic">
        <div className="ko-container flex flex-col md:flex-row md:items-center justify-between gap-10">
          <h2 className="ko-cta-title text-black">
            HAVE A PROJECT IN MIND?
          </h2>
          <Link href="/contact" className="ko-button ko-button-dark shrink-0">
            GET A QUOTE <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
