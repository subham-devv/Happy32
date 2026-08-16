import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface CurtainTransitionProps {
  children: React.ReactNode;
}

export const CurtainTransition: React.FC<CurtainTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [prevPath, setPrevPath] = useState(location.pathname);

  // 1. Initial Page Load / Hard Refresh curtain reveal (1300ms)
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setTransitioning(false);
      setInitialLoad(false);
    }, 1300);

    return () => clearTimeout(initialTimer);
  }, []);

  // 2. Page Navigation Transition
  useEffect(() => {
    if (!initialLoad && location.pathname !== prevPath) {
      setTransitioning(true);
      window.scrollTo(0, 0);

      const timer = setTimeout(() => {
        setPrevPath(location.pathname);
        setTransitioning(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, prevPath, initialLoad]);

  return (
    <>
      {/* Dual Dark Curtain Panels */}
      <AnimatePresence>
        {transitioning && (
          <div className="fixed inset-0 z-[99999] pointer-events-none flex overflow-hidden">
            {/* Left Curtain Panel - slides from/to left */}
            <motion.div
              initial={initialLoad ? { x: '0%' } : { x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{
                duration: 0.45,
                ease: [0.77, 0, 0.18, 1],
              }}
              className="w-1/2 h-full bg-[#0E0C0A] border-r border-[#A8854A]/25"
            />

            {/* Right Curtain Panel - slides from/to right */}
            <motion.div
              initial={initialLoad ? { x: '0%' } : { x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{
                duration: 0.45,
                ease: [0.77, 0, 0.18, 1],
              }}
              className="w-1/2 h-full bg-[#0E0C0A] border-l border-[#A8854A]/25"
            />

            {/* Center Glowing Logo Branding Emblem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none select-none"
            >
              <div className="relative flex flex-col items-center">
                {/* Ambient Radial Golden Glow */}
                <div className="absolute -inset-10 bg-radial from-[#D4AF37]/25 via-[#A8854A]/10 to-transparent blur-2xl rounded-full pointer-events-none animate-pulse" />

                {/* Logo Image with Golden Drop-Shadow & Border Badge */}
                <div className="relative mb-3 sm:mb-4 p-2 sm:p-2.5 rounded-2xl bg-[#12100E]/90 border border-[#D4AF37]/40 shadow-[0_0_30px_rgba(212,175,55,0.35)] backdrop-blur-md">
                  <img
                    src="/logo-dark.png"
                    alt="Happy 32 Emblem"
                    className="h-12 sm:h-16 w-auto object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Brand Typography */}
                <span className="font-cormorant text-4xl sm:text-5xl font-light text-[#FAF7F2] tracking-tight drop-shadow-[0_2px_12px_rgba(212,175,55,0.25)]">
                  Happy 32
                </span>

                {/* Shimmer Divider */}
                <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-2.5 sm:my-3" />

                <span className="font-dmSans font-medium text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                  Dentofacial Clinic
                </span>

                <span className="font-dmSans font-light text-[9.5px] sm:text-[10.5px] tracking-[0.22em] uppercase text-[#A09588] mt-1">
                  Dental & Cosmetic Surgeon
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Page View */}
      <main className="w-full min-h-screen">
        {children}
      </main>
    </>
  );
};

