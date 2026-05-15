'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function ScrollIndicator() {
  const text = 'SCROLL DOWN • SCROLL DOWN • SCROLL DOWN • ';

  return (
    <div className="relative w-36 h-36">
      {/* Rotating text */}
      <svg className="animate-spin-slow w-full h-full" viewBox="0 0 144 144">
        <defs>
          <path
            id="circlePath"
            d="M 72, 72 m -58, 0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0"
          />
        </defs>
        <text className="fill-white" style={{ fontFamily: 'Space Mono', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          <textPath href="#circlePath">{text}</textPath>
        </text>
      </svg>

      {/* Center arrow */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <ArrowDown className="text-kinetic" size={24} strokeWidth={2} />
      </motion.div>
    </div>
  );
}
