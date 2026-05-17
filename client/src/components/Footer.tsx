'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const FOOTER_LINKS = [
  { section: 'NAVIGATE', links: [
    { label: 'Home', href: '/' }, { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' }, { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
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
      <div className="border-b border-white/10">
        <div className="ko-container py-16 md:py-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 md:gap-14 pt-10">
          <div>
            <p className="ko-eyebrow">[READY TO BUILD?]</p>
            <h2 className="ko-cta-title text-white">
              LET&apos;S CREATE<br/>SOMETHING<br/>
              <span className="text-kinetic">BRUTAL</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div>
        <div className="ko-container h-75 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-0">
              <div className="w-9 h-9 bg-kinetic flex items-center justify-center">
                <span className="font-display text-black text-sm">Q</span>
              </div>
              <span className="font-technical text-[10px] text-white/80 leading-tight">QUANTUM<br/>CODE</span>
            </div>
            <p className="font-body text-sm font-technical text-white/50 leading-relaxed">
              Premium software agency building brutal digital solutions.
            </p>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.section} >
              <h4 className="font-technical text-[10px] text-kinetic mb-7 tracking-widest">{section.section}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="font-body text-sm font-technical text-white/50 hover:text-white transition-colors duration-300">
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
      <div className="border-t  border-white/10">
        <div className="ko-container h-50 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="font-technical text-[20px] text-white/30">
            © {new Date().getFullYear()} QUANTUM CODE. ALL RIGHTS RESERVED.
          </p>
          <p className="font-technical text-[20px] text-white/30">
            BASED IN INDIA • BUILDING FOR THE WORLD
          </p>
        </div>
      </div>
    </footer>
  );
}
