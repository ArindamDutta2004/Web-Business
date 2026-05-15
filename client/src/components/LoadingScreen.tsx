'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-kinetic mx-auto mb-8 flex items-center justify-center">
              <span className="font-display text-black text-2xl">K</span>
            </div>
            <div className="font-display text-[20vw] md:text-[12vw] text-white leading-none">
              {count}
            </div>
            <div className="w-48 h-[2px] bg-white/10 mx-auto mt-8">
              <motion.div
                className="h-full bg-kinetic"
                style={{ width: `${count}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="font-technical text-[10px] text-white/40 mt-4 tracking-widest">
              LOADING EXPERIENCE
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
