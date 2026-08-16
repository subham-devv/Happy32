import React, { useEffect, useRef, useState } from 'react';

export const BreathCursor: React.FC = () => {
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);
  const [cursorType, setCursorType] = useState<'default' | 'cta' | 'link' | 'image'>('default');

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({ x: -100, y: -100 });
  const dotPosRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Strictly restrict custom cursor to desktop / fine pointer devices >= 768px
    const checkIsDesktopPointer = () => {
      const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const isDesktopWidth = window.innerWidth >= 768;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsHoverDevice(isFinePointer && isDesktopWidth && !isTouchDevice);
    };

    checkIsDesktopPointer();

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const handleMediaChange = () => checkIsDesktopPointer();
    
    mediaQuery.addEventListener('change', handleMediaChange);
    window.addEventListener('resize', checkIsDesktopPointer);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', checkIsDesktopPointer);
    };
  }, []);

  useEffect(() => {
    if (!isHoverDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestLink = target.closest('a');
      const closestBtn = target.closest('button, .cta-button, [role="button"]');
      const closestImg = target.closest('img, .reveal-image');

      if (closestLink?.getAttribute('href')?.startsWith('tel:')) {
        setCursorType('link');
        setCursorLabel('CALL');
      } else if (
        closestLink?.getAttribute('href')?.includes('wa.me') ||
        closestLink?.getAttribute('href')?.includes('whatsapp')
      ) {
        setCursorType('link');
        setCursorLabel('CHAT');
      } else if (closestBtn) {
        setCursorType('cta');
        setCursorLabel(null);
      } else if (closestImg) {
        setCursorType('image');
        setCursorLabel('VIEW');
      } else if (closestLink) {
        setCursorType('link');
        setCursorLabel(null);
      } else {
        setCursorType('default');
        setCursorLabel(null);
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;

    const render = () => {
      // High-precision immediate dot response
      dotPosRef.current.x += (posRef.current.x - dotPosRef.current.x) * 0.65;
      dotPosRef.current.y += (posRef.current.y - dotPosRef.current.y) * 0.65;

      // Silky magnetic trailing ring
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.25;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.25;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPosRef.current.x}px, ${dotPosRef.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHoverDevice]);

  if (!isHoverDevice) return null;

  return (
    <>
      {/* 1. Precision Central Dot - Warm Antique Gold (#A8854A / #D4AF37) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -ml-1 -mt-1 rounded-full transition-all duration-200 ease-out ${
          cursorType === 'cta' || cursorType === 'link'
            ? 'w-2.5 h-2.5 -ml-1.25 -mt-1.25 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.7)]'
            : 'w-2 h-2 bg-[#A8854A] shadow-[0_0_6px_rgba(168,133,74,0.5)]'
        }`}
      />

      {/* 2. Magnetic Trailing Ring & Label Badge - Warm Gold Palette */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300 ease-out flex items-center justify-center font-dmSans uppercase tracking-[0.2em] text-[9px] font-semibold ${
          cursorType === 'cta'
            ? 'w-12 h-12 -ml-6 -mt-6 rounded-full border border-[#D4AF37] bg-[#A8854A]/15 backdrop-blur-[1px] scale-110 shadow-[0_0_14px_rgba(212,175,55,0.25)]'
            : cursorType === 'link'
            ? 'w-11 h-11 -ml-5.5 -mt-5.5 rounded-full border border-[#A8854A] bg-[#A8854A]/10 text-[#A8854A]'
            : cursorType === 'image'
            ? 'w-16 h-8 -ml-8 -mt-4 rounded-full border border-[#A8854A]/60 bg-[#0E0C0A]/90 text-[#F8F4EE] shadow-md'
            : 'w-9 h-9 -ml-4.5 -mt-4.5 rounded-full border border-[#A8854A]/35 bg-[#A8854A]/5'
        }`}
      >
        {cursorLabel}
      </div>
    </>
  );
};



