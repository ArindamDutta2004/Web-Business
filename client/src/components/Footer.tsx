'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const FOOTER_LINKS = [
  { section: 'NAVIGATE', links: [
    { label: 'Home', href: '/' }, { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' }, { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' }, { label: 'Careers', href: '/careers' },
  ]},
  { section: 'SERVICES', links: [
    { label: 'Web Applications', href: '/services' }, { label: 'AI Integration', href: '/services' },
    { label: 'Admin Dashboards', href: '/services' }, { label: 'E-Commerce', href: '/services' },
    { label: 'Brand Systems', href: '/services' }, { label: 'Automation', href: '/services' },
  ]},
  { section: 'LEGAL', links: [
    { label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Service', href: '/terms' },
    { label: 'Contact', href: '/contact' },
  ]},
];

export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-white/10">
      {/* CTA Banner */}
      <div className="border-b-2 border-white/10 px-6 md:px-8">
        <div className="max-w-[1800px] mx-auto py-16 md:py-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <p className="font-technical text-xs text-kinetic mb-4">[READY TO BUILD?]</p>
            <h2 className="font-display text-[10vw] md:text-[6vw] text-white leading-none">
              LET&apos;S CREATE<br/>SOMETHING<br/>
              <span className="text-kinetic">BRUTAL</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group flex items-center gap-3 bg-kinetic text-black px-8 py-4 font-technical text-sm hover:bg-white transition-colors duration-300 shrink-0"
          >
            START PROJECT
            <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" size={20} />
          </Link>
        </div>
      </div>

      {/* Links Grid */}
      <div className="px-6 md:px-8">
        <div className="max-w-[1800px] mx-auto py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-kinetic flex items-center justify-center">
                <span className="font-display text-black text-sm">K</span>
              </div>
              <span className="font-technical text-[10px] text-white/80">KINETIC<br/>ORANGE</span>
            </div>
            <p className="font-body text-sm text-white/50 leading-relaxed">
              Premium software agency building brutal digital solutions.
            </p>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.section}>
              <h4 className="font-technical text-[10px] text-kinetic mb-6 tracking-widest">{section.section}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="font-body text-sm text-white/50 hover:text-white transition-colors duration-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-6 md:px-8">
        <div className="max-w-[1800px] mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-technical text-[10px] text-white/30">
            © {new Date().getFullYear()} KINETIC ORANGE. ALL RIGHTS RESERVED.
          </p>
          <p className="font-technical text-[10px] text-white/30">
            BASED IN INDIA • BUILDING FOR THE WORLD
          </p>
        </div>
      </div>
    </footer>
  );
}
