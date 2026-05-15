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
    <div className="pt-32 pb-24">
      <section className="px-6 md:px-8 mb-20">
        <div className="max-w-[1800px] mx-auto">
          <RevealOnScroll>
            <p className="font-technical text-xs text-kinetic mb-4 tracking-widest">[OUR SERVICES]</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h1 className="font-display text-[10vw] md:text-[7vw] text-white leading-none mb-8">
              WHAT WE <span className="text-kinetic">BUILD</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="font-body text-white/50 text-lg max-w-2xl leading-relaxed">
              Every service is delivered with production-grade quality, aggressive timelines, and obsessive attention to detail.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 md:px-8">
        <div className="max-w-[1800px] mx-auto space-y-0">
          {SERVICES.map((service, i) => (
            <RevealOnScroll key={service.index} delay={i * 0.05}>
              <div className="border-t-2 border-white/10 py-12 md:py-16 group">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                  <div className="flex items-start gap-4 md:w-1/2">
                    <span className="font-technical text-xs text-kinetic">[{service.index}]</span>
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <service.icon className="text-kinetic" size={28} strokeWidth={1.5} />
                        <h2 className="font-display text-[7vw] md:text-[3vw] text-white leading-none">
                          {service.title}
                        </h2>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.tags.map((tag) => (
                          <span key={tag} className="font-technical text-[9px] border border-white/20 text-white/50 px-3 py-1">{tag}</span>
                        ))}
                      </div>
                      <p className="font-body text-white/40 leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <p className="font-technical text-[10px] text-white/30 mb-4 tracking-widest">KEY FEATURES</p>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((f) => (
                        <div key={f} className="border border-white/10 px-4 py-3 font-technical text-[10px] text-white/60 hover:border-kinetic/50 hover:text-kinetic transition-all duration-300">
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

      <section className="px-6 md:px-8 py-24 mt-16 bg-kinetic">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="font-display text-[8vw] md:text-[4vw] text-black leading-none">
            HAVE A PROJECT IN MIND?
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-technical text-sm hover:bg-gray-900 transition-colors shrink-0">
            GET A QUOTE <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
