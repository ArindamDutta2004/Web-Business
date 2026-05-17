'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, MessageCircle, Link as LinkIcon, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'SERVICES', href: '/services' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'BLOG', href: '/blog' }
];

const SOCIAL_LINKS = [
  { icon: Globe, href: '#', label: 'GitHub' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: LinkIcon, href: '#', label: 'LinkedIn' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-3 bg-black/92 backdrop-blur-md border-b border-white/10' : 'py-4 sm:py-5'
        }`}
      >
        <div className="ko-container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50 group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-kinetic flex items-center justify-center">
                <span className="font-display text-black text-lg">K</span>
              </div>
              <span className="font-technical text-xs text-white hidden md:block tracking-widest leading-tight">
                KINETIC<br/>ORANGE
              </span>
            </div>
          </Link>

          {/* Center Nav — Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-technical text-[10px] transition-all duration-300 whitespace-nowrap ${
                  pathname === link.href
                    ? 'text-kinetic'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — Social + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-white/60 hover:text-kinetic transition-colors duration-300"
                aria-label={social.label}
              >
                <social.icon size={18} strokeWidth={1.5} />
              </a>
            ))}
            <Link
              href="/contact"
              className="ko-button min-h-0 px-5 py-3 text-[11px]"
            >
              START PROJECT <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col justify-center px-6 sm:px-10"
          >
            <div className="space-y-3 max-w-3xl">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-display text-5xl sm:text-6xl md:text-7xl leading-none block py-1 hover:text-kinetic transition-colors duration-300 ${
                      pathname === link.href ? 'text-kinetic' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-14 flex gap-6"
            >
              {SOCIAL_LINKS.map((social) => (
                <a key={social.label} href={social.href} className="text-white/60 hover:text-kinetic transition-colors">
                  <social.icon size={24} />
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="ko-button ko-button-outline border-kinetic text-kinetic w-auto"
              >
                START A PROJECT
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
